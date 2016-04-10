import Relay from 'react-relay';

export default class AddStapleMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`fragment on User {
      id
      staples {
        count,
      }
    }`
  };

  getMutation() {
    return Relay.QL`mutation{ createStaple }`;
  }

  getVariables() {
    return {
      name: this.props.name,
      amount: this.props.amount,
      type: this.props.amount < 0 ? 'minus' : 'plus',
      effectDate: this.props.effectDate,
      user: this.props.user.id
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on _StaplePayload {
        changedStapleEdge,
        user {
          id,
          staples {
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
      connectionName: 'staples',
      edgeName: 'changedStapleEdge',
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
      changedStapleEdge: {
        node: {
          name: this.props.name,
          amount: this.props.amount,
          type: this.props.amount < 0 ? 'minus' : 'plus',
          effectDate: this.props.effectDate
        },
      },
      user: {
        id: this.props.user.id,
        staples: {
          count: this.props.user.staples.count + 1,
        },
      },
    };
  }
}