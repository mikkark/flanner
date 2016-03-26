import Relay from 'react-relay';

export default class AddStapleMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`fragment on ReindexViewer {
      id
      allStaples {
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
      type: this.props.amount < 0 ? 'minus' : 'plus'
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on _StaplePayload {
        changedStapleEdge,
        viewer {
          id,
          allStaples {
            count
          }
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentID: this.props.viewer.id,
      connectionName: 'allStaples',
      edgeName: 'changedStapleEdge',
      rangeBehaviors: {
        '': 'prepend',
      },
    }, {
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        viewer: this.props.viewer.id,
      },
    }];
  }

  getOptimisticResponse() {
    return {
      changedStapleEdge: {
        node: {
          name: this.props.name,
          amount: this.props.amount,
          type: this.props.amount < 0 ? 'minus' : 'plus'
        },
      },
      viewer: {
        id: this.props.viewer.id,
        allStaples: {
          count: this.props.viewer.allStaples.count + 1,
        },
      },
    };
  }
}