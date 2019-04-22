import React, { Component } from 'react'
import "../styles/chat.scss"

export default class Message extends Component {

    render() {
        // Checking to see if the ids of primary user and the msg match
        const { me, author, message } = this.props
        const fromMe = me === author ? 'me' : 'them';
        return (
            <div className={`from__${fromMe}`}>
                <div className='message__body'>
                    <p className="message__body--content">{message}</p>
                </div>
                <div className='message__details'>
                    <p className="message__details--content">{author}</p>
                </div>
            </div>
        );
    }

}