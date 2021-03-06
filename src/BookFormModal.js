import React from 'react';
import {Modal, Form, Button} from 'react-bootstrap';

class BookFormModal extends React.Component {

  render () {

    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Book Form</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={this.props.onSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Title" />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter Description" />
            </Form.Group>

            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control type="number" placeholder="Enter page number" />
            </Form.Group>
            <Button type ="submit" variant="success" >Add Book</Button>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={this.props.hideModal}>Close</Button>

        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}

export default BookFormModal;
