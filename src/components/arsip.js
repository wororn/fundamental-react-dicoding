import React, { Component } from "react";
import Footer from "./design/footer";
import ArchiveWrapper from "../pages/Archives";
import Header from "./design/header";
import { ThemeProvider } from "../context/ThemeContext";

class Arsip extends Component {
  render() {
    return (
      <ThemeProvider>
        <div className="app">
          <Header />
          <ArchiveWrapper />
          <Footer />
        </div>
      </ThemeProvider>
    );
  }
}

export default Arsip;
