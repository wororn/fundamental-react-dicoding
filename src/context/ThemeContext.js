import React, { createContext, useState, useEffect } from "react";

// Create a context with 'light' as the default value
export const ThemeContext = createContext("light");

export const ThemeProvider = ({ children }) => {
  // State to hold the current theme, default is 'light'
  const [theme, setTheme] = useState("light");

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Save theme to local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Update local storage whenever theme changes
  useEffect(() => {
    localStorage.setItem("theme", theme);

    // Set the data-theme attribute on the root element (e.g., <html> or <body>)
    const myElement = document.querySelector(".app");
    if (myElement) {
      myElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
