import React from 'react';
import {Modal, Form, Button} from 'react-bootstrap';

class BookFormModal extends React.Component {

  onSubmit=async(e)=>{
    e.preventDefault();
    let bookData={
      title: e.target.title.value,
      description:e.target.description.value,
      status:e.target.status.value
    }
    console.log(bookData);
  }

  render () {

    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Book Form</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={this.onSubmit}>
            <Form.Group controlId="title">
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
