import React, { useState } from "react";
import ThemeContext from "./theme-context";

const ThemeProvider = (props) => {
  const [theme, setTheme] = useState("light");

  const themeContext = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={themeContext}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
