import React from "react";
import PropTypes from "prop-types";

export default function SearchBar({ keyword, keywordChange }) {
  return (
    <section className="search-bar">
      <input
        type="text"
        placeholder="Cari Berdasarkan Judul.............."
        value={keyword}
        onChange={(e) => keywordChange(e.target.value)}
        style={{ width: "98%" }}
      />
    </section>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired
};

SearchBar.defaultProps = {
  keyword: "",
  keywordChange: () => {}
};
