import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LoginInput from "../components/action/LoginInput";
import { login } from "../utils/network-data";
import { LocaleConsumer } from "../context/LocaleContext";
import { ThemeProvider } from "../context/ThemeContext";

function LoginPage({ loginSuccess }) {
  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <ThemeProvider>
      <LocaleConsumer>
        {({ locale, toggleLocale }) => {
          return (
            <section
              className="app__login-page"
              style={{ justifyItems: "center", width: "90%" }}
            >
              <p style={{ justifyItems: "right" }}>
                <button onClick={toggleLocale}>
                  {locale === "id" ? "en" : "id"}
                </button>
              </p>
              <h2>
                {locale === "id"
                  ? "Silakan masuk untuk melanjutkan ..."
                  : "Entry For continuing, Please..."}
              </h2>
              <LoginInput login={onLogin} />
              <p
                className="app__login-input"
                style={{
                  justifyItems: "right",

                  padding: "3px",
                  borderRadius: "5px",
                  color: " hsla(24, 93%, 56%, 0.877)"
                }}
              >
                <span
                  className={locale === "id" ? "app_login-id" : "app_login-en"}
                >
                  {locale === "id"
                    ? "Belum punya akun? "
                    : "Haven't Account Yet? "}
                </span>
                <Link to="/register">
                  {locale === "id" ? "Daftar di sini." : "Register Here."}
                </Link>
              </p>
            </section>
          );
        }}
      </LocaleConsumer>
    </ThemeProvider>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired
};

export default LoginPage;
