import React, {Component} from 'react';
import Relay from 'react-relay';
import {Router, Route} from 'react-router';
import Reindex from '../Reindex';
import Welcome from '../components/Welcome';
import Login from './Login';
import Container from './Container';

// A wrapper to create a Relay container
function createRelayContainer(Component, props) {
  console.log(props);
  if (Relay.isContainer(Component)) {
    // Construct the RelayQueryConfig from the route and the router props.
    var {name, queries} = props.route;
    var {params} = props;
    return (
      <Relay.RootContainer
        Component={Component}
        renderFetched={(data) => <Component {...props} {...data} />}
        route={{name, params, queries}}
        renderLoading={
          function () {
            return <Spinner size="lg" />;
          }
        }
      />
    );
  } else {
    return <Component {...props}/>;
  }
}

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
              name="home" // added a name to the route
              path="/"
              component={Welcome}
            />
            <Route
              name="StapleRoute"
              path="/staples"
              component={Container}
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