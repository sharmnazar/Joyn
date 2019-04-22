import React, { Component } from 'react'
import "../styles/login.scss"

export default class LogIn extends Component {
  constructor() {
    super();
    this.login = React.createRef();
    this.state = {
      email: "",
      showAddnew: true
    }
  }

  showAddnew = (e) => {
    this.setState({ showAddnew: true })
  }

  closeAddnew = (e) => {
    this.setState({ showAddnew: false })
  }

  //collects login information
  //NOTE: login is not authenticated so no passwords are actually collected
  collectLogin = (e) => {
    e.preventDefault();

    let emailInput = e.target.emailInput.value;

    this.setState({
      email: emailInput,
      showAddnew: false
    })

    window.location = "http://localhost:3000/home"
  }

  render() {
    return (

      <div>
        <div className="bg--modal">
          <div className="modal">
            <div className="modal__title">
              <h1>Log In</h1>
            </div>
            <form onSubmit={this.collectLogin} className="loginForm">
              <div className="modal__flex">
                <div className="modal__flex__item">
                  <label htmlFor="emailInput" className="modal__flex__item__label">Email:</label>
                  <input type="email" name="emailInput" id="emailInput" className="modal__flex__item__input" />                            </div>
                <div className="modal__flex__item">
                  <label htmlFor="pwInput" className="modal__flex__item__label">Password:</label>
                  <input type="password" name="pwInput" id="pwInput" className="modal__flex__item__input" />
                </div>
              </div>
              <div className="modal__btn">
                <button onClick={this.closeAddnew} className="modal__btn__Sbtn">
                  <p>SAVE</p>
                </button>
                <button onClick={this.closeAddnew} className="modal__btn__Cbtn">
                  <p>CANCEL</p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
