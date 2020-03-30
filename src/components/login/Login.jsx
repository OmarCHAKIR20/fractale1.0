import React from "react";
import loginImg from "./login.svg";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      fireErrors: ""
    };
  }

  render() {
    let errorMessage = this.state.fireErrors ? (
      <div> {this.state.fireErrors}</div>
    ) : null;
    return (
      <div className="base-container" ref={this.props.containerRef}>
        {errorMessage}
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="" />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                placeholder="email"
                onChange={this.props.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={this.props.handleChange}
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <input
            type="button"
            className="btn"
            value="login"
            onClick={this.props.click}
          />
        </div>
      </div>
    );
  }
}
