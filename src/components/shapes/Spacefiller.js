import React, { Component } from "react";
import p5 from "p5";
import fire from "../../config/Firebaseconfig";
import Navbar from "../navbar/Navbar";
import VideoBg from "reactjs-videobg";
import mp4 from "../../images/FractalVideo.mp4";
import '../../App.scss'
import Chat from '../chatbot/App'

class Spacefiller extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);
   
  }

  Sketch = p => {

    
    let orderSlider;
    let orderSpan;
    let seedInput;
    let gridCheckbox;
    let gridSpan;
    let order = 1;
    let grid = 2;
    let seedPoints;
    let seedPointsOrdered;
    let seed = [2, 0, 1, 3];
    let w;
    let rotation = [0, 0, 7, 6];

    p.setup = () => {
        p.createCanvas(1000, 450);
        p.colorMode(p.HSB);
        
        seedPoints = [
            p.createVector(100, 100),
          p.createVector(300, 100),
          p.createVector(100, 300),
          p.createVector(300, 300),
        ];
        
        seedPointsOrdered = [
          p.createVector(100, 300),
          p.createVector(100, 100),
          p.createVector(300, 100),
          p.createVector(300, 300),
        ];
        
        w = 400 / grid;
        
        const orderP = p.createP('Order: ');
        orderP.style("color","white")
        orderSlider = p.createSlider(1, 9, 1, 1);
        orderSlider.parent(orderP);
        orderSpan = p.createSpan('1');
        orderSpan.parent(orderP);
        orderSlider.input(() => {
            order = orderSlider.value();
          orderSpan.html(order);
        });
        
        const seedP = p.createP('Seed: ');
        seedP.style("color","white" ,"padding","3px")
        seedInput = p.createInput('3124');
        seedInput.style("padding" , "1px")
        seedInput.parent(seedP);
        seedInput.input(() => {
            seed.splice(0);
          const seedStr = seedInput.value();
          for (let i = 0; i < seedStr.length; i++) {
            seed.push(+seedStr.charAt(i) - 1);
          }
          seedPointsOrdered.splice(0);
          for (let i = 0; i < seed.length; i++) {
            seedPointsOrdered.push(seedPoints[seed[i]]);
          }
        });
        
         //p.gridP=()=> {p.createP('Grid Size: ');}
        gridCheckbox = p.createCheckbox();
        //gridCheckbox.parent(p.gridP);
        gridSpan = p.createSpan('2');
        gridSpan.style("color" , "white")
        //gridSpan.parent(p.gridP);
        gridCheckbox.input(() => {
            grid = gridCheckbox.checked() ? 3 : 2;
          w = 400 / grid;
          if (grid === 2) {
            rotation = [0, 0, 7, 6];
            seed = [2, 0, 1, 3];
            seedInput.value('3124');
          } else if (grid === 3) {
            rotation = [0, 5, 0, 4, 2, 4, 0, 5, 0];
            seed = [6, 3, 0, 1, 4, 7, 8, 5, 2];
            seedInput.value('741258963');
          }
          seedPoints.splice(0);
          for (let j = 0; j < grid; j++) {
            for (let i = 0; i < grid; i++) {
              seedPoints.push(p.createVector(i*w + w/2, j*(w) + w/2));
            }
          }
          seedPointsOrdered.splice(0);
          for (let i = 0; i < seed.length; i++) {
            seedPointsOrdered.push(seedPoints[seed[i]]);
          }
          gridSpan.html(grid);
        });
      }
      
       p.mousePressed=()=> {
        if (p.mouseX > 400 && p.mouseX <= p.width && p.mouseY > 0 && p.mouseY <= p.height) {
          let i = p.floor(p.mouseX / w) - grid;
          let j = p.floor(p.mouseY / w);
          rotation[i + j * grid] = (rotation[i + j * grid] + 1) % 8;
        }
    };

   

     p.drawSymbol=(x, y, type)=> {
        p.strokeWeight(24);
        p.stroke(0, 0, 86);
        if (type === 0) {
            p.point(x + w/2, y + w/2);
        } else if (type === 1) {
            p.arc(x + w/2, y + w/2, 320 / grid, 320 / grid, 3*p.PI/2, 0);
        } else if (p.type === 2) {
            p.arc(x + w/2, y + w/2, 320 / grid, 320 / grid, 3*p.PI/2, p.PI/2);
        } else if (type === 3) {
            p.arc(x + w/2, y + w/2, 320 / grid, 320 / grid, 3*p.PI/2, p.PI);
        } else {
            p.strokeWeight(12);
          if (type === 4) {
            p.line(x + w/2, y + 6, x +w/2, y+w - 6);
          } else if (type === 5) {
            p.line(x + 6, y + w/2, x+w - 6, y + w/2);
          } else if (type === 6) {
            p.line(x + 6, y + 6, x+w - 6, y+w - 6);
          } else if (type === 7) {
            p.line(x+w - 6, y + 6, x + 6, y+w - 6);
          }
        }
      }
      
       p.draw=()=> {
        p.background(0, 0, 100);
        p.strokeWeight(1);
        
        const curve = p.fillSpace(order);
        const points = curve.length;
        let hu = 0;
        let prev = null;
        p.noFill();
        for (const v of curve) {
            p.stroke(hu, 100, 100);
          if (prev) {
            p.line(prev.x, prev.y, v.x, v.y);
          }
          hu += 360/points;
          prev = v;
        }
        
        p.noStroke();
        p.fill(0, 0, 94);
        p.rect(400, 0, 400, 400);
        
        p.translate(400, 0);
        
        for (let j = 0; j < grid; j++) {
          for (let i = 0; i < grid; i++) {
            p.strokeWeight(1);
            p.stroke(0, 0, 50);
            p.noFill();
            p.rect(i*w, j*w, w, w);
            p.drawSymbol(i*w, j*w, rotation[i + j * grid]);
          }
        }
        
        p.strokeWeight(1);
        p.stroke(0, 0, 0);
        p.beginShape();
        for (const v of seedPointsOrdered) {
            p.vertex(v.x, v.y);
        }
        p.endShape();
      }
      
       p.fillSpace=(order)=> {
        if (order === 1) {
          return seedPointsOrdered;
        }
        
        const prevOrder = p.fillSpace(order-1);
        let copies = []; 
        
        for (let j = 0; j < grid; j++) {
          for (let i = 0; i < grid; i++) {
            copies.push(prevOrder.map(v => p.createVector(v.x / grid + i*w, v.y / grid + j*w)));
          }
        }
        
        for (let j = 0; j < grid; j++) {
          for (let i = 0; i < grid; i++) {
            const refX = i*w +w/2;
            const refY = j*w + w/2;
            if (rotation[i+j*grid] === 1) {
              copies[i+j*grid] = copies[i+j*grid].map(v => p.createVector(refY-v.y+refX, v.x-refX+refY));
            } else if (rotation[i+j*p.grid] === 2) {
              copies[i+j*grid] = copies[i+j*grid].map(v => p.createVector(2*refX - v.x, 2*refY - v.y));
            } else if (rotation[i+j*grid] === 3) {
              copies[i+j*grid] = copies[i+j*grid].map(v => p.createVector(v.y-refY+refX, refX-v.x+refY));
            } else if (rotation[i+j*grid] === 4) {
              copies[i+j*grid] = copies[i+j*grid].map(v => p.createVector(2*refX - v.x, v.y));
            } else if (rotation[i+j*grid] === 5) {
              copies[i+j*grid] = copies[i+j*grid].map(v => p.createVector(v.x, 2*refY - v.y));
            } else if (rotation[i+j*grid] === 6) {
              copies[i+j*grid] = copies[i+j*grid].map(v => p.createVector(v.y-refY+refX, v.x-refX+refY));
            } else if (rotation[i+j*grid] === 7) {
              copies[i+j*grid] = copies[i+j*grid].map(v => p.createVector(refY-v.y+refX, refX-v.x+refY));
            }
          }
        }
        
        const res = [];
        for (let i = 0; i < seed.length; i++) {
          res.push(...copies[seed[i]]);
        }
        return res;
      }
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

export default Spacefiller;
