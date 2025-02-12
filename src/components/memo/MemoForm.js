import React from "react";
import PropTypes from "prop-types";
import { FcCheckmark } from "react-icons/fc";
import { LocaleConsumer } from "../../context/LocaleContext";

class MemoForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: ""
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    const inputTitle = event.target.value;
    const title =
      inputTitle.length > 35 ? inputTitle.substring(0, 35) : inputTitle;

    this.setState({ title });
  }

  handleBodyChange(event) {
    this.setState({ body: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addMemo(this.state);
    this.setState({ title: "", body: "" });
  }

  render() {
    return (
      <LocaleConsumer>
        {({ locale }) => (
          <aside className="memo-form">
            <h3 className="spacing">
              {locale === "id" ? "Buat catatan" : "Making Notes"}
            </h3>
            <form onSubmit={this.handleSubmit}>
              <p className="memo-form__title-limit">
                &nbsp;&nbsp;&nbsp;&nbsp; Sisa karakter:{" "}
                {this.state.title.length}/35
              </p>
              <input
                className="memo-form__title"
                type="text"
                placeholder="Tulis Judul ..."
                value={this.state.title}
                onChange={this.handleTitleChange}
                required
                style={{
                  display: "inline-block",
                  width: "100%",
                  border: "solid grey"
                }}
              />
              <textarea
                rows="10"
                className="memo-form__body"
                placeholder="Tuliskan Catatan Disini ..."
                value={this.state.body}
                onChange={this.handleBodyChange}
                required
                style={{
                  display: "inline-block",
                  width: "100%",
                  border: "solid grey"
                }}
              ></textarea>
              <button
                type="submit"
                className="memo-form__submit"
                style={{
                  border: "2px solid grey",
                  borderRadius: "4px"
                }}
              >
                Simpan <FcCheckmark />
              </button>
            </form>
          </aside>
        )}
      </LocaleConsumer>
    );
  }
}

MemoForm.propTypes = {
  addMemo: PropTypes.func.isRequired
};

export default MemoForm;
