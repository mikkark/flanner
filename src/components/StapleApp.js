import React, {Component} from 'react';
import Relay from 'react-relay';
import classNames from 'classnames';
import Reindex from '../Reindex';


import StapleList from './StapleList';
import StapleInput from './StapleInput';
import Row from 'elemental/lib/components/Row';
import AddStapleMutation from '../mutations/AddStapleMutation';
import Profile from './Profile';

class StapleApp extends Component {
  state = {
    selectedFilter: 'all',
    loggedIn: Reindex.isLoggedIn()
  }
;

handleFilterChange = (filter) => {
  this.setState({
    selectedFilter: filter,
  });
};

handleInputSave = (name, amount) => {
  Relay.Store.update(
    new AddStapleMutation({
      name,
      amount,
      viewer: this.props.viewer,
    }),
  );
};

handleClearCompleted = () => {
  // TODO: handle clear completed
};

makeHeader()
{
  const yeah = this.state.isLoggedIn;
  
  return (
    <header className="header">
      <h1>Staples and {yeah} </h1>
      <StapleInput className="new-staple"
                   placeholder="add new staple"
                   onSave={this.handleInputSave}/>
    </header>
  );
}

makeFooter()
{
  const stapleListMinuses = this.props.viewer.allStaples.edges.filter((staple) => staple.node.type === 'minus');
  const stapleListPluses = this.props.viewer.allStaples.edges.filter((staple) => staple.node.type === 'plus');
  const reducer = (next, edge) => next + edge.node.amount;
  const plusAmount = stapleListPluses.reduce(reducer, 0);
  const minusAmount = stapleListMinuses.reduce(reducer, 0);

  const net = plusAmount - minusAmount;

  return (
    <footer className="footer">
      <Row>
        Net {net}.
      </Row>
    </footer>
  );
}

render()
{
  return (
    <section className="stapleapp">
      {this.makeHeader()}
      <StapleList staples={this.props.viewer.allStaples}
                  filter={this.state.selectedFilter}
                  viewer={this.props.viewer}/>
      {this.makeFooter()}
    </section>
  );
}
}

export default Relay.createContainer(StapleApp, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on ReindexViewer {
        allStaples(first: 1000000) {
          count,
          edges {
            node {
              id,
              name,
              type,
              amount
            }
          }
          ${StapleList.getFragment('staples')}
        },
        ${AddStapleMutation.getFragment('viewer')}
      }
    `,
  },
});