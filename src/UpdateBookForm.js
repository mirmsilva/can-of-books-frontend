import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class UpdateBookForm extends React.Component {

  render(){
    return (
    <Modal show={this.props.udpateModal} onHide={this.props.hideUpdateModal}>
    <Modal.Header closeButton>
    <Modal.Title></Modal.Title>
    </Modal.Header>

    <Modal.Body>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary" onClick={this.props.hideUpdateModal}>Close</Button>
    </Modal.Footer>
  </Modal>
    )
  }
}
export default UpdateBookForm;
