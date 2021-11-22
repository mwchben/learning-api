import * as React from "react";
import logo from '../logo.png';


const NavBar = () => {
  return (
    <div className="nav">
      <img src={logo} alt="Logo" className="logo" />
    </div>
  );
};

export default NavBar;