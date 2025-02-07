import React from "react";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { LocaleConsumer } from "../../context/LocaleContext";
import { FcHome, FcDocument, FcPlus } from "react-icons/fc";
import { ThemeProvider } from "../../context/ThemeContext";

export default function Navigation({ name, logout }) {
  return (
    <ThemeProvider>
      <LocaleConsumer>
        {({ locale, toggleLocale }) => {
          return (
            <>
              <div className="navigation">
                <div className="navigation-title">
                  <Link
                    style={{
                      textDecoration: "none",
                      color: " hsla(24, 93%, 56%, 0.877)"
                    }}
                    to="/"
                  >
                    <b>
                      <FcHome />
                      &nbsp;
                      <span
                        className={
                          locale === "id" ? "app_title-id" : "app_title-en"
                        }
                        style={{
                          textDecoration: "none",
                          color: " hsla(24, 93%, 56%, 0.877)"
                        }}
                      >
                        {locale === "id"
                          ? "Aplikasi Catatan"
                          : "Notes Application"}
                      </span>
                    </b>
                  </Link>
                </div>
                <div className="navigation-menu">
                  <ul className="navigation-list">
                    <li>
                      <Link style={{ textDecoration: "none" }} to="/archives">
                        <span
                          className={
                            locale === "id" ? "app_title-id" : "app_title-en"
                          }
                          style={{
                            textDecoration: "none",
                            color: " hsla(24, 93%, 56%, 0.877)"
                          }}
                        >
                          {locale === "id" ? "Arsip" : "Archieves"}
                        </span>
                        &nbsp;
                        <FcDocument />
                      </Link>
                    </li>
                    <li>
                      <Link style={{ textDecoration: "none" }} to="/notes/new">
                        <span
                          className={
                            locale === "id" ? "app_title-id" : "app_title-en"
                          }
                          style={{
                            textDecoration: "none",
                            color: " hsla(24, 93%, 56%, 0.877)"
                          }}
                        >
                          {locale === "id" ? "Tambah" : "Add"}
                        </span>
                        &nbsp;
                        <FcPlus />
                      </Link>
                    </li>
                    <li>
                      <button onClick={toggleLocale}>
                        {locale === "id" ? "en" : "id"}
                      </button>
                    </li>
                    <li>
                      <button onClick={logout}>
                        {name} <FiLogOut />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          );
        }}
      </LocaleConsumer>
    </ThemeProvider>
  );
}
