import React, {Component} from 'react';
import Relay from 'react-relay';
import Reindex from '../../Reindex';

import StapleList from './StapleList';
import StapleInput from './StapleInput';
import Row from 'elemental/lib/components/Row';
import AddStapleMutation from '../../mutations/AddStapleMutation';
import AccountList from '../Accounts/AccountList';
import AddAccountMutation from '../Accounts/mutations/AddAccountMutation';

class StapleApp extends Component {
  state = {
    loggedIn: Reindex.isLoggedIn()
  };

  handleInputSave = (name, amount, effectDate) => {
    Relay.Store.update(
      new AddStapleMutation({
        name,
        amount,
        user: this.props.viewer.user,
        effectDate: effectDate
      }),
    );
  };

  handleAccountInputSave = (name) => {
    Relay.Store.update(
      new AddAccountMutation({
        name,
        user: this.props.viewer.user
      }),
    );
  };

  makeHeader() {
    return (
      <header className="header">
        <h1>Staples</h1>
        <StapleInput className="new-staple"
                     placeholder="add new staple"
                     onSave={this.handleInputSave}/>
      </header>
    );
  }

  makeFooter() {
    const stapleListMinuses = this.props.viewer.user.staples.edges.filter((staple) => staple.node.type === 'minus');
    const stapleListPluses = this.props.viewer.user.staples.edges.filter((staple) => staple.node.type === 'plus');
    const reducer = (next, edge) => next + edge.node.amount;
    const plusAmount = stapleListPluses.reduce(reducer, 0);
    const minusAmount = stapleListMinuses.reduce(reducer, 0);

    const net = plusAmount - Math.abs(minusAmount);

    return (
      <footer className="footer">
        <Row>
          <span>Net {net}.</span>
        </Row>
      </footer>
    );
  }

  render() {
    return (
      <section className="stapleapp">
        {this.makeHeader()}
        <StapleList staples={this.props.viewer.user.staples}
                    filter={this.state.selectedFilter}
                    user={this.props.viewer.user}/>
        {this.makeFooter()}
        <AccountList accounts={this.props.viewer.user.accounts} user={this.props.viewer.user} onSave={this.handleAccountInputSave}/>
      </section>
    );
  }
}

export default Relay.createContainer(StapleApp, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on ReindexViewer {
        user {
          id,
          staples(first: 1000000) {
            count,
            edges {
              node {
                id,
                name,
                type,
                amount,
                effectDate
              }
            }
            ${StapleList.getFragment('staples')}
          },
          accounts(first: 1000000) {
            count,
            edges {
              node {
                id,
                name
              }
            }
            ${AccountList.getFragment('accounts')}
          }
          ${AccountList.getFragment('user')}
          ${StapleList.getFragment('user')}
          ${AddAccountMutation.getFragment('user')}
          ${AddStapleMutation.getFragment('user')}
        }
      }
    `,
  },
});