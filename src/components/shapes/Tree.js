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

    var root;
    var tree =[];
    var count=0 ;
    var leaves=[]
   

    p.setup = () => {
        p.createCanvas(1000, 500);
        var a = p.createVector(p.width/2 , p.height );
        var b = p.createVector(p.width/2 , p.height-100 );
         root = new Branch(a , b);
    
         tree[0] = root;
    };

     p.mousePressed=()=>{
		for (let i = tree.length-1; i >=0; i--) {
			if (!tree[i].finished) {
				tree.push(tree[i].branchA()) ;
				tree.push(tree[i].branchB());
			}
			tree[i].finished = true;
		}
		count++;
		console.log(count)
		if (count === 6) {
			for (var i = 0; i < tree.length; i++) {
				if (!tree[i].finished) {
					var leaf = tree[i].end.copy();
                 leaves.push(leaf);
				}
			}			
		}
    }
    function Branch(begin , end){
		this.begin = begin;
		 this.end = end;
		 this.finished = false;
	 
	 
	 this.show = function(){
        p.stroke(255);
		 p.line(this.begin.x , this.begin.y , this.end.x , this.end.y);
	 }
		 this.branchA = function(){
			
			 var direction = p5.Vector.sub(this.end , this.begin);
			 direction.rotate(p.PI/4);
			 direction.mult(0.67);
			 var newEnd = p5.Vector.add(this.end , direction); // the new end
			 var b = new Branch(this.end , newEnd );
			 return b;
		 }
	 
		 this.branchB = function(){
			 var direction = p5.Vector.sub(this.end , this.begin);
			 direction.rotate((-p.PI)/4);
			 direction.mult(0.67);
			 var newEnd = p5.Vector.add(this.end , direction); // the new end
			 var b = new Branch(this.end , newEnd );
			 return b;
		 }
	 
	 }

   

     
       p.draw=()=> {
        p.background(51);
        for (var index = 0; index < tree.length; index++) {
               tree[index].show();
        }
        for (var index = 0; index < leaves.length; index++) {
            p.fill(255,0,100);
             p.ellipse(leaves[index].x ,leaves[index].y , 8,8 );
            
     }
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
