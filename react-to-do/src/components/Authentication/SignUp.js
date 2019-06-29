import React, { Component } from "react";
import "../../styles/login.css";
import { connect } from "react-redux";
import { SignUpNewUser } from "../../store/Actions/authActions";
import { Redirect } from "react-router-dom";
import { WrongRetype } from "../../store/Actions/authActions";
import $ from "jquery";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      retypedPassword: ""
    };
  }
  componentDidMount() {
    $("#firstName").focus();
  }

  submitForm = event => {
    this.setState({ submitted: true });
    let { SignUp, auth } = this.props;
    event.preventDefault();
    let newUserData = { firstName: "", lastName: "", password: "", email: "" };

    let { firstName, lastName, password, email, retypedPassword } = this.state;
    //check for correct retyped password
    if (password !== retypedPassword) {
      this.props.WrongRetype();
      return
    }
    newUserData.firstName = firstName;
    newUserData.lastName = lastName;
    newUserData.password = password;
    newUserData.email = email;
    SignUp(newUserData);
    if (auth.uid) {
      $("#firstName").focus();
      this.setState({
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        retypedPassword: "",
        submitted: false
      });
    }
  };

  handleChange = event => {
    let { id, value } = event.target;
    this.setState({ [id]: value });
  };
  render() {
    let { auth } = this.props;
    let { submitted } = this.state;
    if (auth.uid) {
      return <Redirect to="/MyTasks" />;
    }
    let { errors } = this.props;

    return (
      <div className="bgForm">
        {/* <div className="transparent-bg sign-up"></div> */}
        <div className="title">Sign Up</div>

        <form className="form" onSubmit={this.submitForm}>
          <input
            spellCheck="false"
            autoComplete="off"
            id="firstName"
            className="input-bar field"
            placeholder="first name"
            type="text"
            value={this.state.firstName}
            onChange={this.handleChange}
            maxLength="13"
          />

          <input
            spellCheck="false"
            autoComplete="off"
            id="lastName"
            className="input-bar field"
            placeholder="last name"
            type="text"
            value={this.state.lastName}
            onChange={this.handleChange}
            maxLength="13"
          />

          <input
            spellCheck="false"
            autoComplete="new-password"
            className="input-bar field"
            placeholder="email"
            type="text"
            id="email"
            value={this.state.email}
            onChange={this.handleChange}
            maxLength="40"
          />

          <input
            spellCheck="false"
            autoComplete="new-password"
            className="input-bar field"
            placeholder="password"
            type="password"
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
            maxLength="13"
          />
          <input
            spellCheck="false"
            autoComplete="off"
            className="input-bar field"
            placeholder="retype password"
            type="password"
            id="retypedPassword"
            value={this.state.retypedPassword}
            onChange={this.handleChange}
            maxLength="13"
          />

          <button type="submit" id="submit-button">
            Create Account
          </button>
          <label className={submitted ? "error-label" : "hidden"}>
            {errors}
          </label>
        </form>
      </div>
    );
  }
}

const mapDispachToProps = dispach => {
  return {
    SignUp: newUser => {
      dispach(SignUpNewUser(newUser));
    },
    WrongRetype: () => {
      dispach(WrongRetype());
    }
  };
};

const mapStateToProps = state => {
  return {
    errors: state.auth.authError,
    auth: state.firebase.auth
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(SignUp);
