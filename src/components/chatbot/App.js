import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { sendMessage } from "./Chat";
import "./chat.scss";

class App extends Component {
  constructor() {
    super();

    this.state = {
      toggle: false
    };
  }

  toggleHandler = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  render() {
    const { feed, sendMessage } = this.props;
    const form = this.state.toggle ? (
      <div className="chat-popup">
        <div className="form-container">
          <h4>Ask me</h4>
          <ul>
            {feed.map(entry => (
              <li>{entry.text}</li>
            ))}
          </ul>

          <input
            type="text"
            className="btn"
            onKeyDown={e =>
              e.keyCode === 13 ? sendMessage(e.target.value) : null
            }
          ></input>
          <button
            type="button"
            className="btn cancel"
            onClick={this.toggleHandler}
          >
            Close
          </button>
        </div>
      </div>
    ) : null;

    return (
      <div>
        <button className="open-button" onClick={this.toggleHandler}>
          Ask us
        </button>
        {form}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  feed: state
});

export default connect(mapStateToProps, { sendMessage })(App);
