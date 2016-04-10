import Relay from 'react-relay';

export default class DeleteAccountMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`fragment on User {
      id
      accounts(first: 1000000) {
        count,
      }
    }`
  };

  getMutation() {
    return Relay.QL`mutation{ deleteAccount }`;
  }

  getVariables() {
    return {
      id: this.props.id,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on _AccountPayload {
        id,
        user {
          id,
          accounts {
            count
          }
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'user',
      parentID: this.props.user.id,
      connectionName: 'accounts',
      deletedIDFieldName: 'id',
    }, {
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        user: this.props.user.id,
      },
    }];
  }

  getOptimisticResponse() {
    return {
      id: this.props.id,
      user: {
        id: this.props.user.id,
        staples: {
          count: this.props.user.accounts.count - 1,
        },
      },
    };
  }
}