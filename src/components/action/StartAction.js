import React from "react";
import { FcPlus } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function StartAction() {
  return (
    <div className="start__action">
      <Link to="/notes/new">
        <button className="button" type="button" title="Tambah">
          <FcPlus />
        </button>
      </Link>
    </div>
  );
}
