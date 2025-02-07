import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/action/RegisterInput";
import { register } from "../utils/network-data";
import { LocaleConsumer } from "../context/LocaleContext";
import { ThemeProvider } from "../context/ThemeContext";

function RegisterPage() {
  const navigate = useNavigate();

  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate("/");
    }
  }

  return (
    <ThemeProvider>
      <LocaleConsumer>
        {({ locale, toggleLocale }) => {
          return (
            <section
              className="app__register-page"
              style={{ justifyItems: "center", width: "90%" }}
            >
              <p style={{ justifyItems: "right" }}>
                <button onClick={toggleLocale}>
                  {locale === "id" ? "en" : "id"}
                </button>
              </p>

              <h2 className="register-page__title">
                <span
                  className={locale === "id" ? "app_title-id" : "app_title-en"}
                  style={{
                    textDecoration: "none",
                    color: " hsla(24, 93%, 56%, 0.877)"
                  }}
                >
                  {locale === "id"
                    ? "Gak perlu serius-serius ya isinya ..."
                    : "You Shouldn't Have to Seriously for filling Form..."}
                </span>
              </h2>
              <RegisterInput register={onRegisterHandler} />
              <p className="register-page__back">
                <span
                  className={locale === "id" ? "app_back-id" : "app_back-en"}
                  style={{
                    textDecoration: "none",
                    color: " hsla(24, 93%, 56%, 0.877)"
                  }}
                >
                  {locale === "id" ? "Kembali Ke " : "Back To "}
                </span>
                <Link to="/">
                  <span
                    className={
                      locale === "id" ? "app_login-id" : "app_login-en"
                    }
                    style={{
                      textDecoration: "none",
                      color: " hsla(24, 93%, 56%, 0.877)"
                    }}
                  >
                    {locale === "id" ? "Masuk" : "Login"}
                  </span>
                </Link>
              </p>
            </section>
          );
        }}
      </LocaleConsumer>
    </ThemeProvider>
  );
}

export default RegisterPage;
