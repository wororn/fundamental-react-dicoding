import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/design/navigation";
import DetailPageCapsuled from "./pages/DetailPage";
import Add from "./components/add";
import Home from "./components/home";
import Arsip from "./components/arsip";
import PageNotFound from "./pages/PageNotFound";
import LocaleContext from "./context/LocaleContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { getUserLogged, putAccessToken } from "./utils/network-data";
import { ThemeContext } from "./context/ThemeContext";
import "./styles/App.css";
import LoadingIndicator from "./components/design/LoadingIndicator";

class MemoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      authedUser: null,
      initializing: true,
      localeContext: {
        locale: localStorage.getItem("locale") || "id",
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale =
              prevState.localeContext.locale === "id" ? "en" : "id";
            localStorage.setItem("locale", newLocale);
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale
              }
            };
          });
        }
      }
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
      alert("Form submitted successfully!");
    }, 5000);
  };

  static contextType = ThemeContext;

  async componentDidMount() {
    this.setState({ loading: true });
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
        loading: false
      };
    });
  }

  async onLoginSuccess({ accessToken }) {
    this.setState({ loading: true });
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
        loading: false
      };
    });
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null
      };
    });

    putAccessToken("");
  }

  async componentDidUpdate(prevState) {
    const { locale } = this.state;

    if (prevState.locale !== locale) {
      console.log(locale);
    }
  }

  render() {
    const { theme, toggleTheme } = this.context;

    if (this.state.initializing) {
      return null;
    }

    if (this.state.loading) {
      return <LoadingIndicator />;
    }

    if (this.state.authedUser === null) {
      return (
        <LocaleContext.Provider value={this.state.localeContext}>
          <div className={`app ${theme}`}>
            <header className="app-header">
              <header className="memo-app__header">
                <h1>
                  {this.state.localeContext.locale === "id"
                    ? "Aplikasi Catatan"
                    : "Notes App"}
                </h1>
              </header>
            </header>
            <main>
              <Routes>
                <Route
                  path="/*"
                  element={<LoginPage loginSuccess={this.onLoginSuccess} />}
                />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          </div>
        </LocaleContext.Provider>
      );
    }

    return (
      <LocaleContext.Provider value={this.state.localeContext}>
        <div className={`app ${theme}`}>
          <header className="app-header">
            <Navigation
              logout={this.onLogout}
              name={this.state.authedUser.name}
            />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/notes/new" element={<Add />} />
              <Route path="/notes/:id" element={<DetailPageCapsuled />} />
              <Route path="/archieves" element={<Arsip />} />
              <Route path="/*" element={<PageNotFound />}></Route>
            </Routes>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <div
              style={{
                display: "inline-grid",
                width: "100%",
                padding: "10px",
                textAlign: "center",
                justifyContent: "center",
                justifyItems: "center"
              }}
            >
              <button
                onClick={toggleTheme}
                style={{
                  width: "100%",
                  padding: "10px",
                  textAlign: "center",
                  justifyContent: "center",
                  justifyItems: "center"
                }}
              >
                Switch to {theme === "light" ? "Dark" : "Light"} Mode
              </button>
            </div>
          </main>
        </div>
      </LocaleContext.Provider>
    );
  }
}

export default MemoApp;
