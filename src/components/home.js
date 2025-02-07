import React from "react";

import Footer from "./design/footer";
import StartPage from "./design/start";
import Header from "./design/header";
import { ThemeProvider } from "../context/ThemeContext";

class Home extends React.Component {
  render() {
    return (
      <ThemeProvider>
        <div className="app">
          <Header />
          <StartPage />
          <Footer />
        </div>
      </ThemeProvider>
    );
  }
}

export default Home;
