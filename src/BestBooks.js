import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import './BestBooks.css';
import { Button } from 'react-bootstrap';

import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import BookFormModal from './BookFormModal';

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    books: [],
    showModal:false
    }
  }

  async componentDidMount() {
    // this is going to be the same, always, for making requests to the server including the token
    
    let config = await this.getConfig();

    const url = process.env.REACT_APP_BACKEND_URL;
    //Sending out a token to the front end to only get user info
    let books = await axios.get(`${url}/books`, config);

    this.setState({books: books.data});
  }

  getConfig = async() => {
    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;

    const config = {
      headers: {"Authorization" : `Bearer ${jwt}`}
    };
    return config;
  }

  onSubmit=async(e)=>{
    e.preventDefault();
    let bookData={
      title: e.target.title.value,
      description:e.target.description.value,
      status:e.target.status.value
    }
    console.log(bookData);

    let config = await this.getConfig();
    // send data to backend
    // the second arg to .post is data that will be request body.
    // third arg is config that includes the header.
    const returnedBook = await axios.post('http://localhost:3001/books', bookData, config);
    console.log(returnedBook);

    //creating a variable for the global component state
    let updatedArray = this.state.books;

    //pushing the new book into the array
    updatedArray.push(returnedBook.data);

    //setting the state with the new book included.
    this.setState({books: updatedArray});
  }

  showModal=()=>{
    console.log('button pressed');
    this.setState({
      shouldShowModal:true
    })
  }
  hideModal=()=>{
    this.setState({
      shouldShowModal:false
    })
  }

  render() {
    console.log(this.state.books);
    return(
      <>
<Carousel fade>
    {
      this.state.books ? this.state.books.map(book => 
    <Carousel.Item key={book._id}>
    <img
      className="d-block w-100"
      src={`https://via.placeholder.com/800x400/000000/FFFFFF/?text=${book.name}`}
      alt="First slide" />
    <Carousel.Caption>
      <h3>Pages read: {book.status}</h3>
      <p>{book.description}</p>
    </Carousel.Caption>
  </Carousel.Item>
    )
      : ''
    }
</Carousel>
<Button onClick={this.showModal}>Add Book </Button>
{this.state.shouldShowModal ? 
<BookFormModal hideModal={this.hideModal} onSubmit={this.onSubmit} /> : ''}
</>
    )} 
}

export default withAuth0(MyFavoriteBooks);
