import React from "react";
import MemoItem from "./MemoItem";
import PropTypes from "prop-types";

export default function MemoList({ notes }) {
  if (!notes.length) {
    return (
      <section className="memo-list-empty__app">
        <p
          className="memo-list__empty__app"
          style={{
            color: " hsla(24, 93%, 56%, 0.877)"
          }}
        >
          Tidak Ada Catatan...
        </p>
      </section>
    );
  }

  return (
    <section className="memo-list">
      {notes.map((note) => (
        <MemoItem key={note.id} id={note.id} {...note} />
      ))}
    </section>
  );
}

MemoList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired
    })
  ).isRequired
};

MemoList.defaultProps = {
  notes: []
};
