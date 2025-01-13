/** @format */
"use client";

import BasicSettingData from "@/lib/data/BasicSettingData";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface UserSettings {
  transactionYear?: string;
  fontSize?: string;
  specificId: string;
  userId: string;
  language?: string;
  selectedYear?: string;
  theme?: string;
  initialSetup?: boolean;
  chatEnable?: boolean;
}

interface UserSettingsContextType {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
}

// Default values for the context
const defaultSettings: UserSettings = {
  fontSize: "small", // Example values: 'small', 'medium', 'large'
  userId: "",
  language: "en",
  specificId: "",
  theme: "light",
};

const UserSettingsContext = createContext<UserSettingsContextType>({
  settings: defaultSettings,
  updateSettings: () => {}, // Placeholder function
});

interface UserSettingProviderProps {
  children: ReactNode; // Ensures type safety for children
}

// Provider component
export const UserSettingProvider: React.FC<UserSettingProviderProps> = ({
  children,
}) => {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);

  const { basicSettingData } = BasicSettingData();
  console.log("first", basicSettingData);

  useEffect(() => {
    if (basicSettingData) {
      console.log("basic", basicSettingData);
      updateSettings({
        ...settings,
        userId: basicSettingData?.userId,
        specificId: basicSettingData?.specificId,
        transactionYear: basicSettingData?.transactionYearId,
        selectedYear: basicSettingData?.selectedYear,
        language: basicSettingData?.language,
        fontSize: basicSettingData?.fontSize,
        theme: basicSettingData?.theme,
        initialSetup: basicSettingData?.initialSetup,
        chatEnable: basicSettingData?.chatEnable,
      });
    }
  }, [basicSettingData]);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
  };

  return (
    <UserSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </UserSettingsContext.Provider>
  );
};

// Custom hook for using the context
export const useUserSettings = () => useContext(UserSettingsContext);
