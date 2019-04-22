import React, { Component } from 'react'
import axios from 'axios';
import NewEvent from "./NewEvent"

export default class UserEvents extends Component {

  state = {
    events: []
  }

  //grabs the list of events from server
  componentDidMount() {
    axios.get("http://localhost:8080/events")
      .then((res) => {
        this.setState({
          events: res.data
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {

    let eventList;
    if (this.state.events) {
      eventList = this.state.events.map((obj) => {
        return <NewEvent name={obj.summary}
          key={obj.id}
          description={obj.description}
          location={obj.location}
          startTime={obj.start.dateTime}
          endTime={obj.end.dateTime} />
      })
    }

    return (
      <div>
        {eventList}
      </div>
    )
  }
}
