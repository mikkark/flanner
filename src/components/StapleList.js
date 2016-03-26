import React, {Component} from 'react';
import Relay from 'react-relay';

import Staple from './Staple';
import Row from 'elemental/lib/components/Row';
import Col from 'elemental/lib/components/Col';

class StapleList extends Component {
  handleToggleAllChange = () => {
    // TODO: handle toggle all
  };

  makeStaple = (edge) => {
    return (
      <Staple key={edge.node.id}
            staple={edge.node}
            viewer={this.props.viewer} />
    );
  };

  render() {
    const staples = this.props.staples.edges;
    const stapleListMinus = staples.filter((staple) => staple.node.type === 'minus').map(this.makeStaple);
    const stapleListPlus = staples.filter((staple) => staple.node.type === 'plus').map(this.makeStaple);
    return (
      <Row className="main">
        <Col sm="1/2" className="staple-list">
          {stapleListPlus}
        </Col>
        <Col sm="1/2" className="staple-list">
          {stapleListMinus}
        </Col>
      </Row>
    );
  }
}

export default Relay.createContainer(StapleList, {
  fragments: {
    staples: () => Relay.QL`
      fragment on _StapleConnection {
        count,
        edges {
          node {
            type,
            ${Staple.getFragment('staple')}
          }
        }
      }
    `
  },
});