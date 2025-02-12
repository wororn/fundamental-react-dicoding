import React from "react";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import { showFormattedDate } from "../utils/network-data";
import DetailAction from "./DetailAction.js";
import { LocaleConsumer } from "../context/LocaleContext.js";

export default function MemoDetail({
  notes,
  onDelete,
  onUnarchive,
  onArchive
}) {
  const navigate = useNavigate();

  return (
    <LocaleConsumer>
      {({ locale }) => (
        <section className="section-memolist-input">
          <article className="article-input">
            <form className="form">
              <div className="form__title">
                <h2 className="header_h2">
                  {locale === "id" ? "Catatan Terperinci" : "Detail Notes"}
                </h2>
              </div>
              <div className="form__item">
                <div
                  className="new-memo__label"
                  style={{
                    display: "inline-block",
                    width: "100%",
                    textAlign: "left"
                  }}
                >
                  <label className="form__label" htmlFor="inputFormTitle">
                    Judul Catatan &nbsp; &nbsp;: &nbsp; {notes.title}
                  </label>
                  <br></br>
                  <label className="form__label" htmlFor="inputFormTitle">
                    Keterangan &nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;
                    {notes.archived ? "Arsip" : "Aktif"}
                  </label>
                  <br></br>
                  <label className="memo-input__title__char-limit">
                    Dibuat Tanggal &nbsp;: &nbsp;{" "}
                    {showFormattedDate(notes.createdAt)}
                  </label>
                </div>

                <div style={{ display: "inline-block", width: "100%" }}>
                  <input
                    style={{
                      display: "inline-block",
                      width: "100%",
                      border: "solid grey"
                    }}
                    id="memoformtitle"
                    type="text"
                    className="memo-form__title"
                    placeholder="Ketik Judul ..."
                    value={notes.title}
                    readOnly
                  />
                  <span className="form__error"></span>
                </div>
              </div>
              <div className="form__item">
                <div className="new-memo__label">
                  <label
                    className="form__label"
                    htmlFor="inputNoteArea"
                    style={{
                      display: "inline-block",
                      width: "100%",
                      textAlign: "center"
                    }}
                  >
                    ISI CATATAN
                  </label>
                </div>
                <div
                  id="memoformbody"
                  className="memo-form__body"
                  style={{ display: "inline-block", width: "100%" }}
                >
                  {parse(notes.body)}
                </div>
                <span className="form__error"></span>
              </div>
              <div
                className="form__action"
                style={{
                  display: "inline-grid",
                  width: "100%",
                  textAlign: "center"
                }}
              >
                <DetailAction
                  id={notes.id}
                  archived={notes.archived}
                  onUnarchive={onUnarchive}
                  onArchive={onArchive}
                  onDelete={onDelete}
                />
              </div>
              <div className="form__item">
                <button
                  type="button"
                  className="form__btn"
                  onClick={() => navigate(-1)}
                >
                  Kembali ke Daftar Catatan
                </button>
              </div>
            </form>
          </article>
        </section>
      )}
    </LocaleConsumer>
  );
}

MemoDetail.propTypes = {
  notes: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired
  }),
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired
};
