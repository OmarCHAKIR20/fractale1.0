import React, { Component } from "react";
import Fire from "../../config/Firebaseconfig";
import Fractal from "../shapes/Fractal";
import App from "./App";

export class LoginLogic extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    Fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    return <div>{this.state.user ? <Fractal /> : <App />}</div>;
  }
}

export default LoginLogic;
