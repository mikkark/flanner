import React, {Component} from 'react';
import Relay from 'react-relay';
import classNames from 'classnames';
import Button from 'elemental/lib/components/Button';
import Row from 'elemental/lib/components/Row';
import Col from 'elemental/lib/components/Col';
import AddStapleMutation from '../../mutations/AddStapleMutation';
import DeleteStapleMutation from '../../mutations/DeleteStapleMutation';

class Staple extends Component {
  state = {
    isEditing: false,
  };

  handleCompleteChange = () => {
    // staple: handle complete
  };

  handleLabelDoubleClick = () => {
    this.setState({
      isEditing: true,
    });
  };

  handleDestroyClick = () => {
    Relay.Store.update(
      new DeleteStapleMutation({
        id: this.props.staple.id,
        user: this.props.user,
      }),
    );
  };

  handleInputSave = (text) => {
    // staple: handle text change
    this.setState({
      isEditing: false,
    });
  };

  handleInputCancel = () => {
    this.setState({
      isEditing: false,
    });
  };

  handleInputDelete = () => {
    this.setState({
      isEditing: false,
    });
  };

  makeInput() {
    if (this.state.isEditing) {
      return (
        <stapleInput className="edit"
                     saveOnBlur={true}
                     initialValue={this.props.staple.name}
                     onSave={this.handleInputSave}
                     onCancel={this.handleInputCancel}
                     onDelete={this.handleInputDelete}/>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <Row className={classNames({
        completed: this.props.staple.complete,
        editing: this.state.isEditing
      })}>
        <Col sm="1/4" onDoubleClick={this.handleLabelDoubleClick}>
          {this.props.staple.name}
        </Col>
        <Col sm="1/4">
          {this.props.staple.amount}
        </Col>
        <Col sm="1/4">
          {this.props.staple.effectDate}
        </Col>
        <Col sm="1/4">
          <Button onClick={this.handleDestroyClick}>Delete</Button>
        </Col>
        {this.makeInput()}
      </Row>
    );
  }
}

export default Relay.createContainer(Staple, {
  fragments: {
    staple: () => Relay.QL`
      fragment on Staple {
        id,
        name,
        type,
        amount,
        effectDate
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        ${DeleteStapleMutation.getFragment('user')}
      }
    `
  }
});