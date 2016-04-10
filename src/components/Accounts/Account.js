import React, {Component} from 'react';
import Relay from 'react-relay';
import Button from 'elemental/lib/components/Button';
import Row from 'elemental/lib/components/Row';
import Col from 'elemental/lib/components/Col';

class Account extends Component {
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
      id
      accounts(first: 1000000) {
        count,
      }
    }`
  }
});