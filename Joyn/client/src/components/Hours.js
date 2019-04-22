import React, { Component } from 'react'

export default class Hours extends Component {
  render() {
    return (
      <div>
        <li>{this.props.hours}</li>
      </div>
    )
  }
}
