// src/context/ThemeContext.jsx
import React, { createContext, useState, useEffect } from 'react';

// Buat Context
export const ThemeContext = createContext();

// Provider untuk mengelola dan menyediakan state tema ke seluruh aplikasi
export const ThemeProvider = ({ children }) => {
  // Ambil nilai tema dari localStorage, default ke dark mode
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "light" ? false : true;
  });

  // Simpan nilai tema ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
