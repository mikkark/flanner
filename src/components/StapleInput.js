import keycodes from 'keycodes';
import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';

export default class StapleInput extends Component {
  state = {
    name: this.props.initialValue || '',
  };

  handleBlur = () => {
    if (this.props.saveOnBlur) {
      this.save();
    }
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleAmountChange = (e) => {
    this.setState({
      amount: e.target.value,
    });
  };

  handleKeyDown = (e) => {
    if (e.keyCode === keycodes('esc')) {
      if (this.props.onCancel) {
        this.props.onCancel();
      }
    } else if (e.keyCode === keycodes('enter')) {
      this.save();
    }
  }

  save() {
    const name = this.state.name.trim();
    const amount = this.state.amount.trim();
    if (name === '') {
      if (this.props.onDelete) {
        this.props.onDelete();
      }
    } else if (name === this.props.initialValue) {
      if (this.props.onCancel) {
        this.props.onCancel();
      }
    } else {
      if (this.props.onSave) {
        this.props.onSave(name, amount);
      }
      this.setState({
        name: '',
        amount: ''
      });
    }
  }

  componentDidMount() {
    findDOMNode(this).focus();
  }

  render() {
    return (
      <div>
      <input className={this.props.className || ''}
             placeholder={this.props.placeholder || ''}
             value={this.state.name}
             onChange={this.handleNameChange}
             onKeyDown={this.handleKeyDown} />
      <input className={this.props.className || ''}
            placeholder={this.props.placeholder || ''}
            value={this.state.amount}
            onChange={this.handleAmountChange}
            onKeyDown={this.handleKeyDown} />
        </div>
    );
  }
}