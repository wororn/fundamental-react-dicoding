import React from "react";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import { showFormattedDate } from "../utils/network-data";
import DetailAction from "./DetailAction.js";

export default function MemoDetail({
  id,
  title,
  created,
  body,
  archived,
  onDelete,
  onArchive,
  onUnarchive
}) {
  const navigate = useNavigate();

  console.log({
    id,
    title,
    created,
    body,
    archived
  });

  return (
    <section className="section-memolist-input">
      <article className="article-input">
        <form className="form">
          <div className="form__title">
            <h2 className="header_h2">Detail Catatan</h2>
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
                Judul Catatan &nbsp; &nbsp;: &nbsp; {title}
              </label>
              <br></br>
              <label className="memo-input__title__char-limit">
                Dibuat Tanggal &nbsp;: &nbsp; {showFormattedDate(created)}
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
                value={title}
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
              {parse(body)}
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
              id={id}
              onDelete={onDelete}
              archived={archived}
              onArchive={onArchive}
              onUnarchive={onUnarchive}
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
  );
}

MemoDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired
};

MemoDetail.defaultProps = {
  id: "",
  title: "",
  created: "",
  body: "",
  archived: false,
  onDelete: () => {},
  onArchive: () => {},
  onUnarchive: () => {}
};
