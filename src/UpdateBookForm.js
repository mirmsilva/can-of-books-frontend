import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class UpdateBookForm extends React.Component {

  render(){
    return (
    <Modal show={this.props.shouldShowUpdateModal} onHide={this.props.hideUpdateModal}>
    <Modal.Header>
    <Modal.Title>Update {this.props.book.name}</Modal.Title>
    </Modal.Header>

    <Modal.Body>
          <Form onSubmit={this.props.sendUpdatedBook}>
            <Form.Group controlId="name">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" defaultValue={this.props.book.name} />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" defaultValue={this.props.book.description}/>
            </Form.Group>

            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control type="number" defaultValue={this.props.book.status}/>
            </Form.Group>
            <Button type ="submit" variant="success">Update Book</Button>
          </Form>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary" onClick={this.props.hideUpdateForm}>Close</Button>
    </Modal.Footer>
  </Modal>
    )
  }
}
export default UpdateBookForm;
