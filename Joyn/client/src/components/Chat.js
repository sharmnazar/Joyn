import React, { Component } from 'react';

// Import in the client version of socket.io
import ioClient from 'socket.io-client';
import Message from './Message';
import "../styles/chat.scss"

export default class Chat extends Component {
  constructor() {
    super()
    // Either save to a variable or inside the constructor the imported socket.io-client.
    //  this has a connect method that we will pass the servers location
    this.socket = ioClient.connect('http://localhost:8080');
    this.form = React.createRef();
  }

  state = {
    loggedIn: false,
    name: '',
    message: '',
    messageList: []
  }

  componentDidMount() {
    // When our component mounts we are going to set up some listeners ( the on() method ) and one emit to get data
    this.socket.emit('start'); // This will hit the 'start' keyword on the server side which is going to emit some data back

    // A listener to the keyword 'receiveNewMessage' which is taking the data and setting it in state
    this.socket.on('receiveNewMessage', (data) => {
      this.setState({
        messageList: data
      })
      this.form.current.scrollIntoView({ behavior: "smooth", block: "end" })
    })
  }

  submitName = (e) => {
    e.preventDefault();
    !e.target.commentInput
      ? this.setState({
        loggedIn: true
      })
      // When the form is submitted it is taking the data from state and emitting it to the server
      : this.socket.emit('sendNewMessage', {
        author: this.state.name,
        message: this.state.message
      }, this.setState({
        message: ''
      })
      )
  }

  componentWillUnmount() {
    // When someone disconnects we letting the server side know
    this.socket.emit('disconnect');
  }

  render() {
    return (
      <>
        <div className="chat__box">
          <h2 className="chat__board">CHAT BOARD</h2>
          <div className="chat__messages">
            {
              this.state.messageList.map((each, index) => {
                return <Message author={each.author} message={each.message} me={this.state.name} key={index} />
              })
            }
          </div>
        </div>
        <form onSubmit={this.submitName} ref={this.form} className="chat__form">
          {
            !this.state.loggedIn
              ? <input type="text" className="chatInput" placeholder="Name" name="nameInput" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} required />
              : <input type="text" className="chatInput" placeholder="Comment" name="commentInput" value={this.state.message} onChange={(e) => { this.setState({ message: e.target.value }) }} required />
          }

        </form>
      </>
    )
  }
}