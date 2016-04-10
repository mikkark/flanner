import React, {Component} from 'react';
import Relay from 'react-relay';
import Reindex from '../../Reindex';
import Graph from './Graph';
import Events from './Events';
require("./Calendar.less");

class CalendarApp extends Component {
  render() {
    return (
      <section className="calendarApp">
        <Events data={this.props.viewer.user.staples.edges} />

        {this.props.viewer.user.staples.count}
      </section>
    );
  }
}

export default Relay.createContainer(CalendarApp, {
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
          }
        }
      }
    `,
  },
});