import React from "react";
import { ThemeProvider } from "../../context/ThemeContext";

function Header() {
  return (
    <ThemeProvider>
      <header
        className="app__header"
        style={{ align: "center", width: "100%" }}
      >
        <div
          className="app__header"
          style={{ textAlign: "right", width: "50%" }}
        >
          <h3 style={{ align: "center" }}>Dicoding Indonesia </h3>
        </div>
      </header>
    </ThemeProvider>
  );
}

export default Header;
