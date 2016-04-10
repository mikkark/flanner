import React, {Component} from 'react';
import Relay from 'react-relay';

import Account from './Account';
import Row from 'elemental/lib/components/Row';
import Col from 'elemental/lib/components/Col';
import AccountInput from './AccountInput';

class AccountList extends Component {
  makeAccount = (edge) => {
    return (
      <Account key={edge.node.id}
               account={edge.node}
               user={this.props.user}/>
    );
  };

  render() {
    const accounts = this.props.accounts.edges;
    const accountComponents = accounts.map(this.makeAccount);
    return (
      <Row className="main">
        <Col>
          <AccountInput onSave={this.props.onSave}/>
          {accountComponents}
        </Col>
      </Row>
    );
  }
}

export default Relay.createContainer(AccountList, {
  fragments: {
    accounts: () => Relay.QL`
      fragment on _AccountConnection {
        count,
        edges {
          node {
            ${Account.getFragment('account')}
          }
        }
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        ${Account.getFragment('user')}
      }
    `
  }
});