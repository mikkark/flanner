import Relay from 'react-relay';

export default class AccountRoute extends Relay.Route {
  static queries = {
    viewer: () => Relay.QL`query { viewer }`,
  };
  static routeName = 'AccountRoute';
}