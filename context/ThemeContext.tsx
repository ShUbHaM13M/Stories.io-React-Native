import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useRef, useState } from "react";
import { dark, light, Theme } from "../global/colors";

const THEME_STORAGE_KEY = "@currentTheme";

interface ThemeContextProps {
  currentTheme: Theme;
  setCurrentTheme: React.Dispatch<React.SetStateAction<Theme>>;
  isDarkMode: boolean;
}

const ThemeContext = React.createContext<ThemeContextProps>({
  currentTheme: light,
  setCurrentTheme: (theme) => {},
  isDarkMode: false,
});

export function useTheme() {
  return useContext(ThemeContext);
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(light);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { getItem: getThemeFromStorage, setItem: saveThemeToStorage } =
    useAsyncStorage(THEME_STORAGE_KEY);

  useEffect(() => {
    (async () => {
      const data = await getThemeFromStorage();
      if (data) setCurrentTheme(JSON.parse(data));
    })();
    setLoading(false);
  }, []);

  useEffect(() => {
    setIsDarkMode(currentTheme.name == "dark");
    saveThemeToStorage(JSON.stringify(currentTheme));
  }, [currentTheme]);

  const value = { currentTheme, setCurrentTheme, isDarkMode };

  return (
    <ThemeContext.Provider value={value}>
      {!loading && children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
