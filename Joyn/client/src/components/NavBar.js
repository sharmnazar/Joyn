import React, { Component } from 'react'
import '../styles/navbar.scss'
import { Link } from 'react-router-dom';
import logo from '../logo_transparent.png';
import chat from '../icons/chat.svg';
import info from "../icons/info.svg";
import contact from "../icons/phone.svg";

export default class NavBar extends Component {
  render() {
    return (
      <div className="nav">
        <Link to="/home" className="nav__link">
          <img src={logo} alt="JOY/N LOGO" className="nav__logo" />
          <h1 className="nav__title">oy/n</h1>
        </Link>
        <div className="navigate">
          <Link to="/chat" className="navigate__link">
            <img src={chat} alt="Chat" className="navigate__link--icon" />
            <h2 className="remMobile">Chat</h2>
          </Link>
          <h3 className="navigate__pipe">|</h3>
          <Link to="/aboutus" className="navigate__link">
            <img src={info} alt="About Us" className="navigate__link--icon" />
            <h2 className="remMobile">About Us</h2>
          </Link>
          <h3 className="navigate__pipe">|</h3>
          <Link to="/contactus" className="navigate__link">
            <img src={contact} alt="Contact Us" className="navigate__link--icon" />
            <h2 className="remMobile">Contact Us</h2>
          </Link>
        </div>
      </div>
    )
  }
}
