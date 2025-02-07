import React, { Component } from "react";
import SearchBar from "../pages/SearchBar";
import MemoList from "../components/memo/MemoList";
import PropTypes from "prop-types";
import { getArchivedNotes } from "../utils/network-data";
import { useSearchParams } from "react-router-dom";
import { LocaleConsumer } from "../context/LocaleContext";

function ArchiveWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <ArchivePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
}

class ArchivePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      keyword: props.defaultKeyword || ""
    };

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  async componentDidMount() {
    const { data } = await getArchivedNotes();

    this.setState(() => {
      return {
        notes: data
      };
    });
  }

  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword
      };
    });

    this.props.keywordChange(keyword);
  }

  render() {
    const { notes, keyword } = this.state;

    const filteredNotes = notes.filter((note) => {
      return note.title.toLowerCase().includes(keyword.toLowerCase());
    });

    const archivedNotes = filteredNotes.filter(
      (note) => note.archived === true
    );

    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <section className="app_archives" style={{ margin: "10px" }}>
              <h2 className="header_h2">
                {locale === "id"
                  ? "Daftar Catatan Arsip"
                  : "Archieve Notes List"}
              </h2>
              <SearchBar
                keyword={keyword}
                keywordChange={this.onKeywordChangeHandler}
              />
              <MemoList notes={archivedNotes} style={{ margin: "20px" }} />
            </section>
          );
        }}
      </LocaleConsumer>
    );
  }
}

ArchivePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired
};
ArchivePage.defaultProps = {
  defaultKeyword: "",
  keywordChange: () => {}
};

export default ArchiveWrapper;
