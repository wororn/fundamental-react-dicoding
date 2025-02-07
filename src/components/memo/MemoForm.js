import React from "react";
import PropTypes from "prop-types";
import { FcCheckmark } from "react-icons/fc";
class MemoForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: ""
    };

    this.OnLimitTitleHandler = this.OnLimitTitleHandler.bind(this);
    this.onChangeEventHandler = this.onChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  OnLimitTitleHandler(event) {
    const inputTitle = event.target.value;
    let title = "";

    if (inputTitle.length > 35) {
      title = inputTitle.substring(0, 35);
    } else {
      title = inputTitle;
    }

    this.setState(() => {
      return {
        title: title
      };
    });
  }

  onChangeEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value
      };
    });
  }
  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.addMemo(this.state);
    this.setState(() => {
      return {
        title: "",
        body: ""
      };
    });
  }

  render() {
    return (
      <aside className="memo-form">
        <h3 className="spacing">Buat Catatan</h3>
        <form onSubmit={this.onSubmitEventHandler}>
          <p className="memo-form__title-limit">
            &nbsp;&nbsp;&nbsp;&nbsp; Sisa karakter: {this.state.title.length}/35
          </p>
          <input
            className="memo-form__title"
            type="text"
            placeholder="Tulis Judul ..."
            value={this.state.title}
            onChange={this.OnLimitTitleHandler}
            required
          />
          <textarea
            rows="10"
            className="memo-form__body"
            type="text"
            placeholder="Tuliskan Catatan Disini ..."
            onChange={this.onChangeEventHandler}
            resize="false"
            required
          ></textarea>
          <button type="submit" className="memo-form__submit">
            Simpan <FcCheckmark />
          </button>
        </form>
      </aside>
    );
  }
}

MemoForm.propTypes = {
  addMemo: PropTypes.func.isRequired
};

export default MemoForm;
