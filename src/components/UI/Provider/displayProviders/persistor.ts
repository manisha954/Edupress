/** @format */

import { get, set, del } from "idb-keyval";
import {
  PersistedClient,
  Persister,
} from "@tanstack/react-query-persist-client";
import { MutationCache, QueryClient } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { deserializeFormData, serializeFormData } from "./formDataPersistence";

function isBrowser() {
  return (
    typeof window !== "undefined" && typeof window.indexedDB !== "undefined"
  );
}

export function createIDBPersister(
  idbValidKey: IDBValidKey = "reactQuery"
): Persister {
  if (!isBrowser()) {
    return {
      persistClient: async () => {},
      restoreClient: async () => undefined,
      removeClient: async () => {},
    };
  }

  return {
    persistClient: async (client: PersistedClient) => {
      // Serialize mutations with FormData
      const serializedClient = {
        ...client,
        clientState: {
          ...client.clientState,
          mutations: await Promise.all(
            client.clientState.mutations.map(async (mutation) => {
              const { variables, ...rest } = mutation.state;
              const serializedVariables =
                variables instanceof FormData
                  ? await serializeFormData(variables)
                  : variables;
              return {
                ...mutation,
                state: {
                  ...rest,
                  variables: serializedVariables,
                },
              };
            })
          ),
        },
      };
      await set(idbValidKey, serializedClient);
    },
    restoreClient: async () => {
      const client = await get<PersistedClient>(idbValidKey);
      if (client) {
        // Deserialize mutations with FormData
        const deserializedClient = {
          ...client,
          clientState: {
            ...client.clientState,
            mutations: client.clientState.mutations.map((mutation) => {
              const { variables, ...rest } = mutation.state;
              const deserializedVariables =
                variables && typeof variables === "object"
                  ? deserializeFormData(variables)
                  : variables;
              return {
                ...mutation,
                state: {
                  ...rest,
                  variables: deserializedVariables,
                },
              };
            }),
          },
        };
        return deserializedClient;
      }
      return client;
    },
    removeClient: async () => {
      await del(idbValidKey);
    },
  };
}

export const getPendingMutations = async () => {
  const persistedClient = await get<PersistedClient>("reactQuery");
  if (persistedClient) {
    return persistedClient.clientState.mutations;
  }
  return [];
};

const persister = createIDBPersister();

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 1000 * 60 * 5, // 5 minutes
      // gcTime: Infinity,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
    },
  },
  mutationCache: new MutationCache({
    onSuccess: (data) => {
      console.log("Mutation success", data);
    },
    onError: (error) => {
      console.log("Mutation error", error);
    },
  }),
});

if (isBrowser()) {
  persistQueryClient({
    queryClient,
    persister,
    maxAge: 1000 * 60 * 60 * 24,
  });
}
