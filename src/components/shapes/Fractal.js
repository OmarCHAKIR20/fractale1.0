import React, { Component } from "react";
import p5 from "p5";
import fire from "../../config/Firebaseconfig";
import Navbar from "../navbar/Navbar";
import VideoBg from "reactjs-videobg";
import mp4 from "../../images/FractalVideo.mp4";
import "../../App.scss";
import Chat from "../chatbot/App";

class Fractal extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  x = 50;
  y = 50;
  fr = 1;

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);
    console.log("mount");
  }

  Sketch = p => {
    let input,
      input1,
      button,
      aint = 0,
      bint = 0,
      text,
      textInput,
      textInput1;

    p.setup = () => {
      p.createCanvas(1090, 900);
      p.colorMode(p.HSB, 1);
      //p.pixelDensity(1);
      // p.createCanvas(900, 800);
      text = p.createP("Insert Your parametres");
      text.position(1120, 40);
      text.style("color", "white");

      textInput = p.createP("Rational number");
      textInput.position(1100, 100);
      textInput.style("color", "white");
      input = p.createInput("");
      input.position(1090, 150);
      input.style("width", "250px", "padding", "90px");

      textInput1 = p.createP("Complexe number");
      textInput1.position(1100, 170);
      textInput1.style("color", "white");
      input1 = p.createInput("");
      input1.style("width", "250px");
      input1.position(1090, 210);

      button = p.createButton("Entrer");
      button.position(1190, 250);
      button.mousePressed(p.Logic);
      input.input(p.myInputEvent);
      input1.input(p.myInputEvent);
      p.noLoop();
    };

    p.myInputEvent = () => {
      var test = p.float(input.value());
      var test1 = p.float(input1.value());
      if (!isNaN(test) && !isNaN(test1)) {
        aint = test;
        bint = test1;
        // p.fill(p.random(127, 200), p.random(127, 200), p.random(127, 200));
      } else {
        console.log("number type is required !!");
      }
    };

    p.Logic = () => {
      var maxRange = 1000;
      var x, y;
      p.loadPixels();
      p.pixelDensity(1);
      console.log("draw fired");

      for (x = 0; x < p.width; x++) {
        for (y = 0; y < p.height; y++) {
          var a = p.map(x, 0, p.width, -2, 2);
          var b = p.map(y, 0, p.width, -2, 2);

          var cb = bint;
          var ca = aint;
          var n = 0;

          while (n < maxRange) {
            var a2_b2 = a * a - b * b;
            var abi2 = 2 * a * b;
            a = a2_b2 + ca;
            b = abi2 + cb;
            if (p.abs(a + b) > 16) {
              break;
            }
            n++;
          }

          var bright = p.map(n, 0, 100, 0, 255);

          var pix = (x + y * p.width) * 4;
          p.pixels[pix + 0] = bright; //R
          p.pixels[pix + 1] = bright; //G
          p.pixels[pix + 2] = bright; //B
          p.pixels[pix + 3] = 255; //A
        }
      }

      p.updatePixels();
    };

    /*p.keyPressed = () => {
      if (p.key === "s") {
        p.save("FractalShape.png");
      }
    };*/
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
        <div ref={this.myRef}></div>
        <Chat />
      </div>
    );
  }
}

export default Fractal;
