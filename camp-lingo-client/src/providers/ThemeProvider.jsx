import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const handleTheme = () => {
    setTheme((prevTheme) => !prevTheme);

    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 500);
  };

  useEffect(() => {
    // Update the data-theme attribute on the body element
    if (theme) {
      document.body.dataset.theme = "dark";
      document.body.style.backgroundColor = "#1d232a";
    } else {
      document.body.dataset.theme = "light";
      document.body.style.backgroundColor = "#f8f8fa";
    }
  }, [theme]);

  const themeInfo = {
    theme,
    handleTheme,
    spinning,
  };
  console.log(theme);

  return (
    <ThemeContext.Provider value={themeInfo}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
