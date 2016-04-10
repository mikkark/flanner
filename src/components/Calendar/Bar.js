import React, {Component}  from 'react';

export default class Bar extends Component {
  render() {
    var barStyle = {
      marginTop: 100 - this.props.height
    };

    return (
      <div className="bar" style={barStyle}>
        <span>{this.props.amount}</span>
      </div>
    )
  }
}