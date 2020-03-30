import React, { Component } from "react";
import p5 from "p5";
import fire from "../../config/Firebaseconfig";
import Navbar from "../navbar/Navbar";
import VideoBg from "reactjs-videobg";
import mp4 from "../../images/FractalVideo.mp4";
import Chat from "../chatbot/App";
import "../../App.scss";

class Flower extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  Sketch = p => {
    let x = 0;
    let y = 0;

    p.setup = () => {
      p.createCanvas(1300, 600);
      p.background(0);
    };

    p.drawPoint = () => {
      p.stroke(34, 139, 34);
      p.strokeWeight(1);
      let px = p.map(x, -2.182, 2.6558, 0, p.width);
      let py = p.map(y, 0, 9.9983, p.height, 0);
      p.point(px, py);
    };

    p.nextPoint = () => {
      let nextX, nextY;
      let r = p.random(1);
      if (r < 0.01) {
        nextX = 0;
        nextY = 0.16 * y;
      } else if (r < 0.86) {
        nextX = 0.85 * x + 0.04 * y;
        nextY = -0.04 * x + 0.85 * y + 1.6;
      } else if (r < 0.93) {
        nextX = 0.2 * x - 0.26 * y;
        nextY = 0.23 * x + 0.22 * y + 1.6;
      } else {
        nextX = -0.15 * x + 0.28 * y;
        nextY = 0.26 * x + 0.24 * y + 0.44;
      }
      x = nextX;
      y = nextY;
    };

    p.draw = () => {
      for (let i = 0; i < 1000; i++) {
        p.drawPoint();
        p.nextPoint();
      }
    };
  };

  logout = () => {
    fire.auth().signOut();
  };

  render() {
    return (
      <div>
        <VideoBg>
          <VideoBg.Source src={mp4} type="video/mp4" />
        </VideoBg>
        <Navbar logout={this.logout} />
        <div ref={this.myRef}>
          {" "}
          <Chat />
        </div>
      </div>
    );
  }
}

export default Flower;
