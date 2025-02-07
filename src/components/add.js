import React, { Component } from "react";
import Footer from "./design/footer";
import AddMemo from "../pages/AddMemo";
import Header from "./design/header";
import { ThemeProvider } from "../context/ThemeContext";

class Add extends Component {
  render() {
    return (
      <ThemeProvider>
        <div className="app">
          <Header />
          <AddMemo />
          <Footer />
        </div>
      </ThemeProvider>
    );
  }
}

export default Add;
