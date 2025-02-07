import React from "react";
import { ThemeProvider } from "../../context/ThemeContext";

function Footer() {
  return (
    <ThemeProvider>
      <footer className="app__footer" style={{ textAlign: "center" }}>
        <div className="app__footer" style={{ width: "100%" }}>
          Made by &nbsp;
          <a href="https://woro.webs.com" target="_blank" rel="noreferrer">
            Woro Retnoningsih
          </a>
          &nbsp; © {new Date().getFullYear()}
        </div>
      </footer>
    </ThemeProvider>
  );
}

export default Footer;
