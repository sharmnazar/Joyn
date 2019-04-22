import React, { Component } from 'react';
import axios from 'axios';
import Hours from "./Hours";
import "../styles/selected.scss";
import Ratings from 'react-ratings-declarative';

export default class Selected extends Component {

    constructor() {
        super();
        this.secondForm = React.createRef();
        // this.thirdForm = React.createRef();
        this.state = {
            event: {},
            available: true,
            shown: false,
            rating: 0,
            addNewEvent: false,
            api: "",

        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&fields=name,rating,formatted_phone_number,opening_hours,website,photo,price_level,vicinity&key=${this.state.api}`)
            .then((res) => {
                this.setState({
                    event: res.data.result,
                    rating: res.data.result.rating
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    seconds_with_leading_zeros = (dt) => {
        return /\((.*)\)/.exec(new Date().toString())[1];
    }

    //adds event to user's calendar
    addToCalendar = (e) => {
        e.preventDefault();

        let eventName = e.target.eventName.value;
        let eventDateTimeStart = e.target.eventDateTimeStart.value;
        let eventDateTimeEnd = e.target.eventDateTimeEnd.value;
        let eventLocation = this.state.event.vicinity;
        let eventHost = this.state.event.name;

        let dt = new Date();
        let timeZone = this.seconds_with_leading_zeros(dt);

        const newItemObj = {
            summary: eventName,
            description: eventHost,
            location: eventLocation,
            dateTimeStart: eventDateTimeStart,
            timeZone: timeZone,
            dateTimeEnd: eventDateTimeEnd,
        };

        var post = {
            method: 'POST',
            url: 'http://localhost:8080/newEvent',
            data: newItemObj,
            headers: {
                'content-type': 'application/json'
            }
        }
        axios(post)
            .then((result) => {
                window.location = "http://localhost:3000/userprofile"
            })
            .catch((err) => {
                console.log(err);
            })
    }

    //collects the date and time the user wants to travel to the location
    //will respond with whether the location is available or not
    collectFormData = (e) => {
        e.preventDefault();

        let inputDate = e.target.inputDate.value;
        let inputTime = e.target.inputTime.value;
        let date = new Date(inputDate);
        let newDay = date.getDay();
        let newTime = inputTime.replace(":", "");

        newTime = Number(newTime);

        let periods = this.state.event.opening_hours.periods;
        let predictDay, closing, opening;

        if (periods) {
            if (periods[0].open.day === 0 && (periods[0].open.time === "0000")) {
                opening = 0;
                closing = 2400;
            }
            else {
                predictDay = periods.filter((each) => {
                    return (each.open.day === newDay)
                })
            }
        }
        if (predictDay) {
            closing = Number(predictDay[0].close.time);
            opening = Number(predictDay[0].open.time);
        }
        if (closing > newTime && newTime >= opening) {
            this.setState({
                available: true,
                shown: true,
                addNewEvent: true
            })
        }
        else {
            this.setState({
                available: false,
                addNewEvent: true
            })
        }
    }

    // collectThirdFormData = (e) => {
    //     e.preventDefault();

    //     let date = Date.now();
    //     let inputTime = date.toTimeString();
    //     let newDay = date.getDay();
    //     inputTime = inputTime.substring(0, 5)
    //     let newTime = inputTime.replace(":", "");

    //     newTime = Number(newTime);

    //     let periods = this.state.event.opening_hours.periods;
    //     let predictDay, closing, opening;

    //     if (periods) {
    //         if (periods[0].open.day === 0 && (periods[0].open.time === "0000")) {
    //             opening = 0;
    //             closing = 2400;
    //         }
    //         else {
    //             predictDay = periods.filter((each) => {
    //                 return (each.open.day === newDay)
    //             })
    //         }
    //     }
    //     if (predictDay) {
    //         closing = Number(predictDay[0].close.time);
    //         opening = Number(predictDay[0].open.time);
    //     }
    //     if (closing > newTime && newTime >= opening) {
    //         this.setState({
    //             available: true,
    //             shown: true,
    //             addNewEvent: true
    //         })
    //     }
    //     else {
    //         this.setState({
    //             available: false,
    //             addNewEvent: true
    //         })
    //     }
    // }

    render() {

        let hours = "";
        let hide = "hidden";
        let show = "hidden"

        //if hours are available, will map through the hours provided from the location
        if (this.state.event.opening_hours) {
            if (!this.state.available) {
                hide = "";
                hours = this.state.event.opening_hours.weekday_text.map((object) => {
                    return <Hours hours={object} key={object + indexedDB} />
                })
            } else {
                if (this.state.shown) {
                    show = ""
                }
            }
        }

        //price will represent each number as dollar signs
        let price = ""
        for (let i = 0; i <= this.state.event.price_level; i++) {
            if (i < this.state.event.price_level) {
                price = price + "$"
            }
        }

        //if price is available, the value will be shown, otherwise will be hidden
        let priceInfo = ""

        if (!this.state.event.price_level) {
            priceInfo = "hidden"
        }

        //if they have submitted data in the first form, 
        //they can now use a form to add the data in to their calendar
        let addEvent;
        if (this.state.addNewEvent) {
            addEvent = <form ref={this.secondForm} onSubmit={this.addToCalendar}>
                <label className="eventName" htmlFor="eventName">Event Name:</label>
                <input type="text" name="eventName" id="eventName" />
                <label className="eventDateTime" htmlFor="eventDateTimeStart">Date & Time Event Starts:</label>
                <input type="datetime-local" name="eventDateTimeStart" id="eventDateTimeStart" />
                <label className="eventDateTime" htmlFor="eventDateTimeEnd">Date & Time Event Ends:</label>
                <input type="datetime-local" name="eventDateTimeEnd" id="eventDateTimeEnd" />
                <button type="submit" className="submit__button">Add Event to Calendar</button>
            </form>
        }

        return (

            <div>
                <form ref={this.secondForm} onSubmit={this.collectFormData} id="newForm">
                    <label className="inputDate" htmlFor="inputDate">
                        <h4>Pick a Date:</h4>
                        <input type="date" name="inputDate" id="inputDate"></input>
                    </label>
                    <label className="inputTime" htmlFor="inputDate">
                        <h4>Pick a Time:</h4>
                        <input type="time" name="inputime" id="inputTime"></input>
                    </label>
                    <button type="submit" className="submit__button"><h2>SUBMIT</h2></button>
                </form>
                {/* <form ref={this.thirdForm} onSubmit={this.collectThirdFormData} id="otherForm">
                    <button type="submit" className="submit__button"><h2>CHECK IF AVAILABLE</h2></button>
                </form> */}
                <div className="selected">
                    <a href={this.state.event.website}><h1 className="locationName">{this.state.event.name}</h1></a>
                    <h3>Phone: {this.state.event.formatted_phone_number}</h3>
                    <h3>Location: {this.state.event.vicinity} </h3>
                    <h3 className={priceInfo}>Price: {price}</h3>
                    <h3>Rating:
                    <Ratings
                            rating={this.state.rating}
                            widgetDimensions="15px"
                            widgetSpacings="5px">
                            <Ratings.Widget widgetRatedColor="grey" />
                            <Ratings.Widget widgetRatedColor="grey" />
                            <Ratings.Widget widgetRatedColor="grey" />
                            <Ratings.Widget widgetRatedColor="grey" />
                            <Ratings.Widget widgetRatedColor="grey" />
                        </Ratings>
                    </h3>
                    <hr className="hidden"></hr>
                    <h4 className={show}>The location is available on that day and time</h4>
                    <h4 className={hide}>Sorry, the location is unavailable during that day/time. </h4>
                    <h4 className={hide}>Please review the following information:</h4>
                    <hr className="hidden"></hr>
                    <ul className={hide}>Hours: {hours}</ul>
                </div>
                {addEvent}
            </div>

        )
    }
}
