import React, { Component } from "react";
import SearchBar from "../../pages/SearchBar";
import MemoList from "../memo/MemoList";
import { getActiveNotes } from "../../utils/network-data";
import { useSearchParams } from "react-router-dom";
import StartAction from "../action/StartAction";
import PropTypes from "prop-types";
import { LocaleConsumer } from "../../context/LocaleContext";
import { ThemeProvider } from "../../context/ThemeContext";

function StartPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return <Start defaultKeyword={keyword} keywordChange={changeSearchParams} />;
}

class Start extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      keyword: props.defaultKeyword || ""
    };

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  async componentDidMount() {
    const { data } = await getActiveNotes();

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

    const activeNotes = filteredNotes.filter((note) => note.archived === false);

    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <ThemeProvider>
              <div className="app">
                <section className="app_Start-Page">
                  <h2 className="header_h2">
                    {locale === "id"
                      ? "Daftar Catatan Aktif"
                      : "Active Notes List"}
                  </h2>
                  <SearchBar
                    className="SearchBar"
                    keyword={keyword}
                    keywordChange={this.onKeywordChangeHandler}
                  />
                  <div className="form__action">
                    <MemoList notes={activeNotes} />
                  </div>
                </section>
                <section className="app__button__action">
                  <StartAction />
                </section>
              </div>
            </ThemeProvider>
          );
        }}
      </LocaleConsumer>
    );
  }
}

Start.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired
};

Start.defaultProps = {
  defaultKeyword: "",
  keywordChange: () => {}
};

export default StartPage;
