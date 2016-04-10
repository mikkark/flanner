import React, {Component} from 'react';
import Bar from './Bar';
import Row from 'elemental/lib/components/Row';

export default class Events extends Component {

  makeBar = (heightPercentage, amount) => {
    return (
      <Bar height={heightPercentage} amount={amount}></Bar>
    );
  };

  prepareData() {

    var staplesInOrder = this.props.data.sort((staple1, staple2) => {
      if (staple1.node.effectDate > staple2.node.effectDate) {
        return 1;
      }
      else if (staple2.node.effectDate > staple1.node.effectDate) {
        return -1;
      }
      else {
        return 0;
      }
    });
    var amount = 1040;
    var initialAmount = amount;
    var lowestPoint = amount;
    var highestPoint = amount;
    var points = [];

    var bars = [];

    for (var i = 0; i < staplesInOrder.length; i++) {
      var staple = staplesInOrder[i].node;
      amount = amount + staple.amount;

      points.push([staple.effectDate, amount]);
    }

    lowestPoint = staplesInOrder.map((staple) => staple.node).reduce((prev, curr) => {
      if (curr.amount < prev.amount) {
        return curr;
      }

      return prev;
    }, { 'amount': initialAmount }).amount;

    highestPoint = staplesInOrder.map((staple) => staple.node).reduce((prev, curr) => {
      if (curr.amount > prev.amount) {
        return curr;
      }

      return prev;
    }, { 'amount': initialAmount }).amount;

    points.push([31, points[points.length - 1][1]]);

    var toHighest = (initialAmount / highestPoint) * 100;

    bars.push(this.makeBar(toHighest, initialAmount));

    points.map((point) => point[1]).reduce((previousValue, currentValue) => {
      let diff = (currentValue / highestPoint) * 100;

      bars.push(this.makeBar(diff, currentValue));

      return previousValue;
    }, initialAmount);

    return bars;
  }

  render() {
    var d = this.prepareData();

    return (
      <Row className="events" style={{height: 300}}>
        {d}
      </Row>
    )
  }
}