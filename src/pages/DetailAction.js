import React from "react";
import PropTypes from "prop-types";
import { FcDown, FcUp } from "react-icons/fc";
import { FcEmptyTrash } from "react-icons/fc";

export default function DetailAction({
  id,
  archived,
  onUnarchive,
  onArchive,
  onDelete
}) {
  const handleArchiveToggle = () => {
    archived ? onUnarchive(id) : onArchive(id);
  };

  return (
    <div className="page__detail">
      <div style={{ display: "inline-grid", width: "10%", padding: "10px" }}>
        <div
          className="toggle-button"
          style={{
            color: archived ? "#f77a26e0" : "#fc1111",
            width: "50%",
            padding: "10px",
            textAlign: "center",
            justifyContent: "center",
            justifyItems: "center"
          }}
        >
          <span className="detail__label">
            {archived ? "Pindahkan" : "Arsipkan"}
          </span>
          <button
            style={{ width: "90px" }}
            className="action"
            type="button"
            title={archived ? "Pindahkan" : "Arsipkan"}
            onClick={handleArchiveToggle}
          >
            {archived ? <FcUp /> : <FcDown />}
          </button>
        </div>
      </div>

      <div style={{ display: "inline-grid", width: "10%", padding: "10px" }}>
        <span className="detail__label">Hapus</span>
        <button
          className="action"
          type="button"
          title="Hapus"
          onClick={() => onDelete(id)}
        >
          <FcEmptyTrash />
        </button>
      </div>
    </div>
  );
}

DetailAction.propTypes = {
  id: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired
};

DetailAction.defaultProps = {
  id: "",
  archived: false,
  onDelete: () => {},
  onArchive: () => {},
  onUnarchive: () => {}
};
