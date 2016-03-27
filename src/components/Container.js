import React, {Component} from 'react';
import ProfileRoute from '../routes/ProfileRoute';
import StaplesRoute from '../routes/StaplesRoute';
import Profile from './Profile';
import StapleApp from './StapleApp';
import Relay from 'react-relay';
import Spinner from 'elemental/lib/components/Spinner';
import Reindex from '../Reindex';

export default class Container extends React.Component {
  handleLogout = () => {
    Reindex.logout();
  };

  render() {
    return (
      <div>
        <div className="profile">
          <Relay.RootContainer
            Component={Profile}
            route={new ProfileRoute}
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
            Component={StapleApp}
            route={new StaplesRoute}
            renderLoading={
                function () {
                  return <Spinner size="lg" />;
                }
              }
            renderFetched={(data) => {
              return (
                <StapleApp {...data} />
              );
              }
             }
          />
        </div>
      </div>
    )
  }
}

