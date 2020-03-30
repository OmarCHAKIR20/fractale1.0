import React from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";

const Navbar = props => {
  return (
    <div className="navbar ">
      <Link class="active" to="/">
        <i class="fa fa-fw fa-home"></i> JuliaGaston
      </Link>
      <Link to="/explore">
        <i class="fa fa-fw fa-home"></i> MendelBrot
      </Link>
      <Link to="/askUs">
        <i class="fa fa-fw fa-envelope"></i>Contact
      </Link>

      <div class="dropdown">
        <button class="dropbtn">
          {" "}
          more shapes
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <Link exact to="/fractal">
            Julia Fractal
          </Link>
          <Link exact to="/flower">
            Barnsley Fractal
          </Link>
          <Link exact to="/helbert">
            Hilbert Fractal
          </Link>
          <Link exact to="/mandelBrotSet">
            mandelBrotSet Fractal
          </Link>
          <Link exact to="/tree">
            Tree Fractal
          </Link>
        </div>
      </div>
      <Link onClick={props.logout}>
        <i class="fa fa-fw fa-user"></i> Logout
      </Link>
    </div>
  );
};

export default Navbar;
