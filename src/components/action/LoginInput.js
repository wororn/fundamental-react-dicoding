import React from "react";
import PropTypes from "prop-types";
import LoadingIndicator from "../../components/design/LoadingIndicator";

class LoginInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loading: false
    };

    this.onEmailChangeHandler = this.onEmailChangeHandler.bind(this);
    this.onPasswordChangeHandler = this.onPasswordChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onEmailChangeHandler(event) {
    this.setState(() => {
      return {
        email: event.target.value
      };
    });
  }

  onPasswordChangeHandler(event) {
    this.setState(() => {
      return {
        password: event.target.value
      };
    });
  }

  onSubmitHandler(event) {
    event.preventDefault();
    this.setState({ loading: true });

    this.props.login({
      email: this.state.email,
      password: this.state.password
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <LoadingIndicator />; // Tampilkan LoadingIndicator saat loading true
    }
    return (
      <form
        onSubmit={this.onSubmitHandler}
        className="login-input"
        style={{
          width: "18%",
          border: "1px solid black",
          padding: "10px",
          margin: "50px",
          align: "center"
        }}
      >
        <div style={{ width: "100%" }}>
          <input
            type="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.onEmailChangeHandler}
            style={{
              border: "1px solid black",
              color: " hsla(24, 93%, 56%, 0.877)"
            }}
          />
        </div>
        <div style={{ width: "100%" }}>
          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onPasswordChangeHandler}
            style={{
              border: "1px solid black",
              color: " hsla(24, 93%, 56%, 0.877)"
            }}
          />
        </div>
        <button>Masuk</button>
      </form>
    );
  }
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired
};

export default LoginInput;
