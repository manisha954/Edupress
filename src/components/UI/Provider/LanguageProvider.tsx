/** @format */
"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { useUserSettings } from "./UserSettingProvider";
import useAdminDetailMutation from "@/components/Dashboard/Admin/Profile/AdminSettingMutation";

interface LanguageContextType {
  langData: any;
  switchLanguage: (language: string) => void;
}

// Providing a default value that matches the context type
const defaultValue: LanguageContextType = {
  langData: {},
  switchLanguage: () => {}, // An empty function as a placeholder
};

const LanguageContext = createContext<LanguageContextType>(defaultValue);
interface Dictionaries {
  [key: string]: () => Promise<any>;
}

// Now declare your dictionaries with the type
// const dictionaries: Dictionaries = {
//   en: () =>
//     import("../../../dictionaries/en.json").then((module) => module.default),
//   np: () =>
//     import("../../../dictionaries/np.json").then((module) => module.default),
//   ko: () =>
//     import("../../../dictionaries/ko.json").then((module) => module.default),
// };

interface LanguageProviderProps {
  children: ReactNode; // Ensures type safety for children
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const { updateLang } = useAdminDetailMutation();
  const [language, setLanguage] = useState("");
  const [langData, setLangData] = useState<any>({}); // Use the specific type
  const { settings } = useUserSettings();
  console.log("set", settings);
  useEffect(() => {
    // if (settings?.language) {
    //   dictionaries[settings?.language]()
    //     .then((data: any) => {
    //       setLangData(data);
    //     })
    //     .catch((error) =>
    //       console.error(`Failed to load ${language} dictionary`, error)
    //     );
    // }
  }, [settings?.language]);
  console.log("langData", langData);
  const switchLanguage = async (lang: string) => {
    const dataToPass = {
      userId: settings.userId,
      language: lang,
    };
    const data = await updateLang(JSON.stringify(dataToPass));
    if (data) {
      console.log("Language changed");
    }
    setLanguage(lang);
  };
  return (
    <LanguageContext.Provider value={{ langData, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
