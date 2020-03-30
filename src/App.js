import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/landingPages/Home';
import Explore from './components/landingPages/Explore';
import LoginLogic from './components/login/LoginLogic';
import Hilbert from './components/shapes/Spacefiller';
import Flower from './components/shapes/Flower';
import MandelBrotSet from './components/shapes/Mendelbrotset'
import Tree from './components/shapes/Tree'

export class App extends Component {
  render() {
    
    return (
      <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/explore" component={Explore} />
          <Route path="/fractal" component={LoginLogic} />
          <Route  path="/flower" component={Flower} />
          <Route path="/helbert" component={Hilbert} />
          <Route path="/tree" component={Tree} />
          <Route path="/mandelBrotSet" component={MandelBrotSet} />
        </Switch>
       
      </div>
    </Router>
    );
  }
}

export default App;  
