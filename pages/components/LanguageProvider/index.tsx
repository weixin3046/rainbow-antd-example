import { ReactNode, createContext, useState } from "react";

export const LanguageContext = createContext({
  toggleLanguage: (e: string) => {},
  language: "zh",
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState("en");
  const toggleLanguage = (key: string) => {
    setLanguage(key);
  };
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
