import React, { Component } from "react";
import p5 from "p5";
import fire from "../../config/Firebaseconfig";
import Navbar from "../navbar/Navbar";
import VideoBg from "reactjs-videobg";
import mp4 from "../../images/FractalVideo.mp4";
import '../../App.scss'
import Chat from '../chatbot/App'

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

    

    p.setup = () => {
        p.createCanvas(1000, 800);
        p.noLoop()      
    };

   

    p.draw = () => {
        var maxRange = 1000 ;
        p.loadPixels();
        p.pixelDensity(1);
        
        
        for (var x = 0; x < p.width; x++) {
        
            for (var y = 0; y < p.height; y++) {
        
        
              var a = p.map(x,0,p.width , -2 , 2);
            var b =p.map(y,0,p.width , -2 , 2);
            
                 var ca = a ;
                 var cb = b;
    
              var n=0;
              while (n < maxRange) {
                  var a2_b2 = a*a - b*b ;
                  var abi2 = 2*a*b;
                     a = a2_b2 + ca;
                     b= abi2 + cb;
                     if (p.abs(a+b) > 4) {
                         break;
                     }
                     n++;
                     
              }
        
                 var bright = p.map(n , 0 , 100 , 0 , 255 );
        
                 var pix = (x+y*p.width)*4;
                 p.pixels[pix+0] = bright; //R
                 p.pixels[pix+1] = bright; //G
                 p.pixels[pix+2] = bright; //B
                 p.pixels[pix+3] = 255; //A
                
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
        <VideoBg >
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
