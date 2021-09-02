import React, { createContext, useContext, useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export const DarkModeContext = createContext(null);

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

const usePrefersDarkMode = () => {
  const localPreference = localStorage.getItem("dark_mode");
  const mediaQuery = useMediaQuery("(prefers-color-scheme: dark)", {
    noSsr: true,
  });

  if (localPreference === null) {
    localStorage.setItem("dark_mode", String(mediaQuery));
    return mediaQuery;
  }

  return localPreference === "true";
};

export const DarkModeProvider = (props: any) => {
  const [darkMode, setDarkMode] = useState(usePrefersDarkMode());

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      localStorage.setItem("dark_mode", String(!prev));
      return !prev;
    });
  };

  return (
    <DarkModeContext.Provider value={[darkMode, toggleDarkMode]} {...props} />
  );
};

export default useDarkMode;
