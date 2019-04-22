import React, { Component } from 'react'
import '../styles/contactus.scss'

export default class ContactUs extends Component {
  render() {
    return (
      <div className="contact">
        <div className="email">
          <h1 className="email__title">CONTACT US</h1>
          <h3>Sharmaine Nazar</h3>
          <h4>Web Developer Candidate</h4>
          <h4>BrainStation Class of Winter 2019</h4>
          <a href="mailto: sharmnazar@gmail.com"><h4 className="email__link">sharmnazar@gmail.com</h4></a>
        </div>
        <div className="call">
          <h1 className="email__title">CALL US</h1>
          <h3>Customer Relations Center</h3>
          <h4>Hours: 08:30 AM - 05:30 PM (M-F)</h4>
          <h4>Toll Free 1-800-123-4567</h4>
          <h4>Fax : 905-123-4567</h4>
        </div>
        <div className="write">
          <h1 className="email__title">WRITE US</h1>
          <h3>JOY/N Limited</h3>
          <h4>460 King St West</h4>
          <h4>Toronto, Ontario</h4>
          <h4>Attention: JOY/N Customer Relations Centre</h4>
        </div>
      </div>
    )
  }
}
