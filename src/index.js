import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import MemoApp from "./MemoApp";
import { ThemeProvider } from "./context/ThemeContext";

import "./styles/style.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeProvider>
      <MemoApp />
    </ThemeProvider>
  </BrowserRouter>
);
