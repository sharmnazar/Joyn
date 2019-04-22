import React, { Component } from 'react';
import "../styles/home.scss"
import MainForm from "./MainForm";
import Results from './Results';
import axios from "axios";

export default class Home extends Component {

  state = {
    latitude: 43.3806,
    longitude: -79.8860,
    radius: 1000,
    eventList: [],
    api: "",
    showResults: false,
    dontShow: "hidden"
  }

  //use function to grab current location
  getLocation = (e) => {

    let options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    let success = (pos) => {
      let crd = pos.coords;
      this.setState({
        latitude: crd.latitude,
        longitude: crd.longitude,
      })
      console.log(crd)
    }

    let error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    window.navigator.geolocation.getCurrentPosition(success, error, options);
  }

  submitHandler = (eventObject) => {
    axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.latitude},${this.state.longitude}&radius=${eventObject.radius}&type=${eventObject.type}&key=${this.state.api}`)
      .then(res => {
        this.setState({
          eventList: res.data.results,
          showResults: true,
          dontShow: ""
        })
      }).catch(err => {
        this.setState({
          showResults: true,
          dontShow: ""
        })
      })
  }

  render() {

    //only show results component if data was actually submitted
    let showRes;
    if (this.state.showResults) {
      showRes = <Results eventList={this.state.eventList} />
    }
    //when get request from api returns no information, 
    //provide a statement that illustrated that 
    //there is no information available for the specified solution
    if (this.state.eventList.length === 0) {
      showRes = <h3 className={this.state.dontShow}>Sorry, no locations are available within the specified radius and selections. Please try again.</h3>
    }

    return (
      <div className="main">
        <button onClick={this.getLocation} className="location__button">
        <h2>GET MY LOCATION</h2>
        </button>
        <MainForm submitHandler={this.submitHandler} />
        {showRes}
        <div className="hidden"><h1>HIDDEN</h1></div>
      </div>
    )
  }
}

