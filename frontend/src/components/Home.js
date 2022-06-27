import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Home.css";
import Coffee from "./coffee.png";

export default class Home extends Component {
  render() {
    return (
      <div className="contentone">
        <div className="boxone">
          <h2>Home of the Best Brew</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores
            reprehenderit ut, at, laudantium voluptas dolore rem eligendi
            placeat molestias, beatae fugit soluta blanditiis? Cum officiis
            tempore odit voluptatibus qui et vitae ea, quos dolorum maxime eius
            recusandae laudantium labore voluptatem, laboriosam reprehenderit.
            Debitis corrupti dicta nemo officiis repudiandae ipsa ratione!
          </p>

          <div className="cta">
            <Link to="/login">Login</Link> <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    );
  }
}
