"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFooter, deleteFooterDetails } from "./FooterAction";

export default function useFooterMutations() {
  const queryClient = useQueryClient();

  const { mutateAsync: footerDetail } = useMutation({
    mutationFn: addFooter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["footer"] });
    },
  });
  const { mutateAsync: deleteFooter } = useMutation({
    mutationFn: deleteFooterDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["footer"] });
    },
  });

  return {
    footerDetail,
    deleteFooter,
  };
}
