import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { showFormattedDate } from "../../utils/network-data";

function MemoItem({ id, title, body, createdAt }) {
  return (
    <div className="memo-item__app">
      <div className="memo-item__body">
        <div className="memo-item__title">
          <h3>
            <Link
              to={`/notes/${id}`}
              style={{
                textDecoration: "none",
                color: "hsla(182, 95.60%, 55.70%, 0.88)"
              }}
            >
              {title}
            </Link>
          </h3>
        </div>
        <div className="memo-item__date">{showFormattedDate(createdAt)}</div>
        <div className="memo-item__desc">{body}</div>
      </div>
    </div>
  );
}
MemoItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired
};

MemoItem.defaultProps = {
  id: "",
  title: "",
  createdAt: "",
  body: ""
};

export default MemoItem;
