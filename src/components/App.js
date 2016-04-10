import React, {Component} from 'react';
import {Router, Route} from 'react-router';
import Reindex from '../Reindex';
import Welcome from '../components/Welcome';
import Login from './Login';
import Container from './Container';
import StapleApp from './Staples/StapleApp';
import StaplesRoute from '../routes/StaplesRoute';
import CalendarRoute from '../routes/CalendarRoute';
import CalendarApp from './Calendar/CalendarApp';

export default class App extends Component {
  state = {isLoggedIn: Reindex.isLoggedIn()};

  handleLogin = (type) => {
    Reindex.login(type).catch((error) => {
      alert(error.message);
    });
  };

  handleTokenChange = () => {
    console.log('jiihaa');
    this.setState({isLoggedIn: Reindex.isLoggedIn()});
  };

  componentDidMount() {
    Reindex.addListener('tokenChange', this.handleTokenChange);
  }

  componentWillUnmount() {
    Reindex.removeListener('tokenChange', this.handleTokenChange);
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <Router>
          <Route>
            <Route
              name="home"
              path="/"
              component={Welcome}
            />
            <Route
              name="StapleRoute"
              path="/staples"
              component={Container}
              main={StapleApp}
              relayRoute = {new StaplesRoute}
            />
            <Route
              name="CalendarRoute"
              path="/calendar"
              component={Container}
              main={CalendarApp}
              relayRoute={new CalendarRoute}
            />
          </Route>
        </Router>
      );
    }
    else {
      return (
        <Login onLogin={this.handleLogin}/>
      )
    }
  }
}