import React, {Component} from 'react';
import Relay from 'react-relay';
import Button from 'elemental/lib/components/Button';
import Row from 'elemental/lib/components/Row';
import Col from 'elemental/lib/components/Col';
import DeleteAccountMutation from './mutations/DeleteAccountMutation';

class Account extends Component {
  handleDestroyClick = () => {
    Relay.Store.update(
      new DeleteAccountMutation({
        id: this.props.account.id,
        user: this.props.user
      }),
    );
  };

  render() {
    return (
      <Row>
        <Col sm="1/2">
          {this.props.account.name}
        </Col>
        <Col sm="1/2">
          <Button onClick={this.handleDestroyClick}>Delete</Button>
        </Col>
      </Row>
    );
  }
}

export default Relay.createContainer(Account, {
  fragments: {
    account: () => Relay.QL`
      fragment on Account {
        id,
        name
      }
    `,
    user: () => Relay.QL`fragment on User {
        ${DeleteAccountMutation.getFragment('user')}
      }`
  }
});