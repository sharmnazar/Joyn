import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/event.scss'
import Ratings from 'react-ratings-declarative';
import logo from '../logo_transparent.png';

export default class Event extends Component {

  render() {

    //hide rating if not available
    let rateHide = "";

    if (!this.props.rating) {
      rateHide = "hidden"
    }

    return (

      <div>
        <div className={`location`}>
          <Link to={`/results/${this.props.place}`} className="location__link">
            <div className="location__image">
              <img src={logo} alt="logo" />
            </div>
          </Link>
          <div className="location__text">
            <Link to={`/results/${this.props.place}`}>
              <h3 className="location__text--title">{this.props.name}</h3>
            </Link>
            <h4 className="location__text--location">Location: {this.props.vicinity}</h4>
            <h4 id={rateHide} className="location__text--location">Rating:
                    <Ratings
                rating={this.props.rating}
                widgetDimensions="10px"
                widgetSpacings="2px">
                <Ratings.Widget widgetRatedColor="grey" />
                <Ratings.Widget widgetRatedColor="grey" />
                <Ratings.Widget widgetRatedColor="grey" />
                <Ratings.Widget widgetRatedColor="grey" />
                <Ratings.Widget widgetRatedColor="grey" />
              </Ratings></h4>
          </div>
        </div>
      </div>
    )
  }
}

