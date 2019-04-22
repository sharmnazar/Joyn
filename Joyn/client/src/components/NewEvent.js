import React, { Component } from 'react'
import '../styles/newevent.scss'

export default class NewEvent extends Component {

  render() {

    //set variables for the day of the week and time of the event in calendar
    let endTime = new Date(this.props.endTime);
    let startTime = new Date(this.props.startTime);

    let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let startDay = daysOfWeek[startTime.getDay()];
    let eventDay = startTime.getDate();

    startTime = startTime.toLocaleString(undefined, {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    endTime = endTime.toLocaleString(undefined, {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    return (
      <div className="new">
        <div className="newEvent">
          <div className="newEvent__link">
            <div className="newEvent__image">
              <button className="newEvent__image__button">
                <h1 className="newEvent__image__button--weekday">{startDay}</h1>
                <h2 className="newEvent__image__button--day">{eventDay}</h2>
              </button>
            </div>
          </div>
          <div className="newEvent__text">
            <h3>{this.props.name}</h3>
            <h4>Location: {this.props.location}</h4>
            <h4>Description: {this.props.description}</h4>
            <h4>Start: {startTime}</h4>
            <h4>End: {endTime}</h4>
          </div>
        </div>
      </div>
    )
  }
}
