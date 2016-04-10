import React, {Component} from 'react';
import ProfileRoute from '../routes/ProfileRoute';
import Profile from './Profile';
import Relay from 'react-relay';
import Spinner from 'elemental/lib/components/Spinner';
import Reindex from '../Reindex';

export default class Container extends React.Component {
  handleLogout = () => {
    Reindex.logout();
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <div className="profile">
          <Relay.RootContainer
            Component={Profile}
            route={new ProfileRoute}
            forceFetch={true}
            renderLoading={
              function () {
                return <Spinner size="lg" />;
              }
            }
            renderFetched={(data) => {
              return (
                <Profile {...data} onLogout={this.handleLogout} />
              );
          }
        }
          />
        </div>
        <div className="main">

          <Relay.RootContainer
            Component={this.props.route.main}
            route={this.props.route.relayRoute}
            forceFetch={true}
            renderLoading={
                function () {
                  return <Spinner size="lg" />;
                }
              }
            renderFetched={(data) => {
              return (
                <this.props.route.main {...data }/>
              );
              }
             }
          />
        </div>
      </div>
    )
  }
}

