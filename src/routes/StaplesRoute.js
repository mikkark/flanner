import Relay from 'react-relay';

export default class StaplesRoute extends Relay.Route {
  static queries = {
    viewer: () => Relay.QL`query { viewer }`,
  };
  static routeName = 'StaplesRoute';
}