import Relay from 'react-relay';

export default class AddAccountMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`fragment on User {
      id
      accounts {
        count,
      }
    }`
  };

  getMutation() {
    return Relay.QL`mutation{ createAccount }`;
  }

  getVariables() {
    return {
      name: this.props.name,
      user: this.props.user.id
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on _AccountPayload {
        changedAccountEdge,
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
      type: 'RANGE_ADD',
      parentID: this.props.user.id,
      connectionName: 'accounts',
      edgeName: 'changedAccountEdge',
      rangeBehaviors: {
        '': 'prepend',
      },
    }, {
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        user: this.props.user.id,
      },
    }];
  }

  getOptimisticResponse() {
    return {
      changedAccountEdge: {
        node: {
          name: this.props.name,
        },
      },
      user: {
        id: this.props.user.id,
        accounts: {
          count: this.props.user.accounts.count + 1,
        },
      },
    };
  }
}