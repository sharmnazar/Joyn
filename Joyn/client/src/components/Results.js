import React, { Component } from 'react'
import Event from './Event';
import MapContainer from "./MapContainer"

export default class Results extends Component {

  render() {
    //provide a list of events from the get request, otherwise print information that no locations could be found within the radius and type specified
    let eventMap;

    if (this.props.eventList) {
      eventMap = this.props.eventList.map((obj) => {
        return <Event name={obj.name}
                      place={obj.place_id}
                      id={obj.id}
                      key={obj.id}
                      vicinity={obj.vicinity}
                      phone={obj.formatted_phone_number}
                      price={obj.price_level}
                      rating={obj.rating}
        />
      })
    }
    else {
      eventMap = <h1>Sorry, no locations are available within the specified radius and selections. Please try again</h1>
    }

    return (
      <div>
        <MapContainer lat={this.props.lat} lng={this.props.lng} marks={this.props.eventList} />
        {eventMap}
      </div>
    )
  }
}
