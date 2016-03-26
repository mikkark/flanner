import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Welcome extends Component {

  render() {
    return (
      <div>
        <h1>Welcome to my app!</h1>

        <Link to={`/staples`}>
          See your monthly staples
        </Link>
      </div>
    );
  }
}