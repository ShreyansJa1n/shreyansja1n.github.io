import { createContext } from "react";

const DarkModeContext = createContext(true);
export const DarkModeProvider = DarkModeContext.Provider;
export const DarkModeConsumer = DarkModeContext.Consumer;
export const useDarkMode = () => {
  const context = DarkModeContext;
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}

export default DarkModeContext;
