import React from "react";
import PropTypes from "prop-types";
import LoadingIndicator from "../../components/design/LoadingIndicator";

class RegisterInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      loading: false
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onNameChange(event) {
    this.setState(() => {
      return {
        name: event.target.value
      };
    });
  }

  onEmailChange(event) {
    this.setState(() => {
      return {
        email: event.target.value
      };
    });
  }

  onPasswordChange(event) {
    this.setState(() => {
      return {
        password: event.target.value
      };
    });
  }

  onSubmitHandler(event) {
    event.preventDefault();
    this.setState({ loading: true });

    this.props.register({
      name: this.state.name,
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
        className="register-input"
        style={{
          width: "18%",
          border: "1px solid black",
          padding: "10px",
          margin: "50px",
          align: "center"
        }}
      >
        <div style={{ width: "100%" }}>
          <span>
            <input
              type="text"
              placeholder="Nama"
              value={this.state.name}
              onChange={this.onNameChange}
              style={{
                border: "1px solid black",

                color: " hsla(24, 93%, 56%, 0.877)"
              }}
            />
          </span>
        </div>
        <div style={{ width: "100%" }}>
          <span>
            <input
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.onEmailChange}
              style={{
                border: "1px solid black",
                color: " hsla(24, 93%, 56%, 0.877)"
              }}
            />{" "}
          </span>
        </div>
        <div style={{ width: "100%" }}>
          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={this.state.password}
            onChange={this.onPasswordChange}
            style={{
              border: "1px solid black",
              color: " hsla(24, 93%, 56%, 0.877)"
            }}
          />
        </div>
        <button>Register</button>
      </form>
    );
  }
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired
};

export default RegisterInput;
