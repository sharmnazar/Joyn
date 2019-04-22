import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './CurrentLocation';

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  newMarkClick = (placeId) => {
    window.location.href = `http://localhost:3000/results/${placeId}`;
  }

  render() {

    let newMarker = this.props.marks.map((obj) => {
      return <Marker name={obj.name}
        onClick={() => this.newMarkClick(obj.place_id)}
        position={{ lat: obj.geometry.location.lat, lng: obj.geometry.location.lng }}
        id={obj.place_id}
        label={{
          text: obj.name,
          color: "#D607B5",
          textAlign: "center",
          fontSize: "9pt",
          fontWeight: "bold"
        }}
        key={obj.id}

        icon={{
            url: `${obj.icon}`,
            size: { width: 20, height: 25 },
            scaledSize: { width: 25, height: 25 }
          }} />
    })

    return (
      <CurrentLocation centerAroundCurrentLocation
        google={this.props.google}
        style={{ height: "100%" }}>
        <Marker
          onClick={this.onMarkerClick}
          name={'Your Current Location'} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}>
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
        {newMarker}
      </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: '',
})(MapContainer);

