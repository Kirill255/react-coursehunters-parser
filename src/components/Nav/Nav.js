import React from "react";
import logo from "./logo.png";
import "./Nav.css";

const Nav = () => {
  return (
    <div className="nav">
      <a href="https://coursehunters.net" target="_blank" rel="noopener noreferrer">
        <img src={logo} className="App-logo" alt="logo" />
      </a>
      <h1>CourseHunters Parser</h1>
    </div>
  );
};

export default Nav;
