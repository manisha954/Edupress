/** @format */
"use client";

import AdminDash from "@/components/Dash/AdminDash";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Define a type for the context state
type DisplayState = {
  component: ReactNode | null;
  componentId: string | null;
};

// Define a type for the context itself
type DisplayContextType = {
  display: DisplayState;
  setDisplay: Dispatch<SetStateAction<DisplayState>>;
};

// Create a context with a default value
const DisplayContext = createContext<DisplayContextType | undefined>(undefined);

// Context provider component type
interface DisplayProviderAdminMainProps {
  children: ReactNode;
}

// Context provider function component
export const DisplayProviderAdminMain: React.FC<
  DisplayProviderAdminMainProps
> = ({ children }) => {
  const [display, setDisplay] = useState<DisplayState>({
    component: <AdminDash />,
    componentId: "dashboardAdmin",
  });

  return (
    <DisplayContext.Provider value={{ display, setDisplay }}>
      {children}
    </DisplayContext.Provider>
  );
};

// Hook to use the context
export function useAdminDisplay(): DisplayContextType {
  const context = useContext(DisplayContext);
  console.log("component in conte is :", context);
  if (context === undefined) {
    throw new Error(
      "useAdminDisplay must be used within a DisplayProviderAdminMain"
    );
  }
  return context;
}
