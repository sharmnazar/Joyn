import React, { Component } from 'react'

export default class SecondForm extends Component {

  render() {
    return (
      <div>
        <label className="inputDate" htmlFor="inputDate">
          <h4>Pick a Date:</h4>
          <input type="date" name="inputDate" id="inputDate"></input>
        </label>
        <label className="inputTime" htmlFor="inputDate">
          <h4>Pick a Time:</h4>
          <input type="time" name="inputime" id="inputTime"></input>
        </label>
        <div>
          <h4>Pick a Type of Activity:</h4>
        </div>
      </div>
    )
  }
}
