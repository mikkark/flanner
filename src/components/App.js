import React, {Component} from 'react';
import Relay from 'react-relay';
import {Router, Route} from 'react-router'; 
import Reindex from '../Reindex';
import StapleApp from './StapleApp';
import AppRoute from '../routes/AppRoute';
import Welcome from '../components/Welcome';

// A wrapper to create a Relay container
function createRelayContainer(Component, props) {
  if (Relay.isContainer(Component)) {
    // Construct the RelayQueryConfig from the route and the router props.
    var {name, queries} = props.route;
    var {params} = props;
    return (
      <Relay.RootContainer
        Component={Component}
        renderFetched={(data) => <Component {...props} {...data} />}
        route={{name, params, queries}}
      />
    );
  } else {
    return <Component {...props}/>;
  }
}

var stapleQueries = {
  viewer: () => Relay.QL`query { viewer }`,
};

export default class App extends Component {
  render() {
    return (
      <Router
        createElement={createRelayContainer}>
        <Route>
          <Route
            name="home" // added a name to the route
            path="/"
            component={Welcome}
          />
          <Route
            name="StapleRoute"
            path="/staples"
            component={StapleApp}
            queries={stapleQueries}
          />
        </Route>
      </Router>
    );
  }
}