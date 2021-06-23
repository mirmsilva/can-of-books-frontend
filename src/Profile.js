import React from 'react';

import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

class Profile extends React.Component {

  async componentDidMount() {
    // this is going to be the same, always, for making requests to the server including the token
    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;

    //setting the authorization token to a header value.
    const config = {
      headers: {"Authorization" : `Bearer ${jwt}`}
    };

    let url = process.env.REACT_APP_BACKEND_URL;
    //gets information from back end. For now just gets user info, later will get books.
    let books = await axios.get(`https://localhost:3001/books`, config);

    console.log(books.data);
    this.setState({serverResponse: books.data})
  }

  render() {
    const {user} = this.props.auth0;
    return (
      <>
      <Card style={{width: '20rem'}}>
        <Card.Img variant="top" src={user.picture}/>  
        <Card.Body>
          <Card.Title>User Profile</Card.Title>
          <Card.Text>{user.name}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Email: {user.email}</ListGroup.Item>
          <ListGroup.Item>Nickname: {user.nickname}</ListGroup.Item>
        </ListGroup>
      </Card>
      </>
    )
  }
}

export default withAuth0(Profile);