import * as React from "react";
import "./nav.css";

import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <section>
      <header>
        <a href="#" className="logo">
          Coffee LA
        </a>
        <ul className="navigation">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Menu</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </header>
    </section>
  );
};
export default Nav;
