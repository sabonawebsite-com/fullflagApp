import React from "react";
import "./Navbar.css";
import {assets} from '../../assets/assets'
const Navbar = () => {
  return <div className="navbar">
    <img className="logo" src={assets.icon_group} alt="" />
    <a className="campany-employe" href="http://127.0.0.1:5000/registrants">Employees</a>
    <img className="profile" src={assets.creator} alt="" />
  </div>;
};

export default Navbar;
