import { createContext, useContext } from "react";

export const ThemeContext = createContext({
  themeMode: "bg-light",
  textMode: "text-dark",
  borderColor: "border-slate-800",
  ToogleTheme: () => {},
});

export const ThemeProvider = ThemeContext.Provider;

export default function useTheme() {
  return useContext(ThemeContext);
}
