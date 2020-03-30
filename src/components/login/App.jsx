import React from "react";
import "../../App.scss";
import { Login, Register } from "./index";
import fire from "../../config/Firebaseconfig";
import VideoBg from "reactjs-videobg";
import mp4 from "../../images/FormVideo.mp4";
import "../../App.scss";
import ButtonB from "../buttons/ButtonB";
import { LOCALES } from "../../i18n/locales";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true,
      fireErrors: null
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = e => {
    console.log("login");
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        // Handle Errors here.
        this.setState({ fireErrors: error.message });

        // ...
      });
  };

  register = e => {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        // Handle Errors here.
        this.setState({ fireErrors: error.message });
        // ...
      });
  };
  componentDidMount() {
    //Add .right by default
    this.rightSide.classList.add("right");
  }

  changeState() {
    const { isLogginActive } = this.state;

    if (isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }

  render() {
    let error = null;
    const { isLogginActive } = this.state;

    const current = isLogginActive ? "Register" : "Login";
    const currentActive = isLogginActive ? "login" : "register";
    if (this.state.fireErrors) {
      error = (
        <div style={{ color: "red", "text-align": "center" }}>
          {this.state.fireErrors}
        </div>
      );
    } else {
      error = null;
    }
    return (
      <div className="container">
        {error}
        <ButtonB language={LOCALES.ENGLISH} path="/explore" />

        <div className="login">
          <div className="container1" ref={ref => (this.container = ref)}>
            {isLogginActive && (
              <Login
                containerRef={ref => (this.current = ref)}
                handleChange={this.handleChange}
                click={this.login}
              />
            )}
            {!isLogginActive && (
              <Register
                containerRef={ref => (this.current = ref)}
                handleChange={this.handleChange}
                click={this.register}
              />
            )}
          </div>
          <RightSide
            current={current}
            currentActive={currentActive}
            containerRef={ref => (this.rightSide = ref)}
            onClick={this.changeState.bind(this)}
          />
        </div>
        <VideoBg>
          <VideoBg.Source src={mp4} type="video/mp4" />
        </VideoBg>
      </div>
    );
  }
}

const RightSide = props => {
  return (
    <div
      className="right-side "
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container ">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default App;
