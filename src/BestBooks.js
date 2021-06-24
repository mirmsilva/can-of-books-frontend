import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BestBooks.css';

import Carousel from 'react-bootstrap/Carousel';
import { Button } from 'react-bootstrap';

import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

import BookFormModal from './BookFormModal';
//import UpdateBookForm from './UpdateBookForm';

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    books: [],
    showModal:false,
    updateModal: false
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
      name: e.target.name.value,
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
  //Delete Book request
  deleteBook=async(id)=>{
    let config = await this.getConfig();
    //let the back end know what book you would like to delete
    let response = await axios.delete(`http://localhost:3001/books/${id}`, config);
    console.log(response.data);
    //set the array with the new book list (minus the deleted book)
    let updatedArray= this.state.books.filter(book=>book._id !==id);
    this.setState({books:updatedArray});

  }

  render() {
    console.log(this.state.books);
    return(
      <>
    {
      this.state.books ? 
      <Carousel className="carousel" fade>
      {this.state.books.map(book => 
    <Carousel.Item key={book._id}>
    <img
      className="d-block w-100"
      src={`https://via.placeholder.com/800x400/000000/FFFFFF/?text=${book.name}`}
      alt="First slide" />
    <Carousel.Caption>
      <h3>Pages read: {book.status}</h3>
      <p>{book.description}</p>
    </Carousel.Caption>
    <div className="button-container">
    <Button className="button" variant="info" onClick={()=>this.deleteBook(book._id)}>Delete Book</Button>
    <Button className="button" variant="warning" onClick={()=>this.updateBook(book._id)}>Update Book</Button>
    </div>
  </Carousel.Item>
    )}
    </Carousel>
      : ''
    }
<div className="addBookContainer">
  <Button className="button" onClick={this.showModal} variant="info">Add Book </Button>
  {this.state.shouldShowModal ? 
  <BookFormModal hideModal={this.hideModal} onSubmit={this.onSubmit} /> : ''}
</div>

    </>
    )} 
}

      //<UpdateBookForm updateModal={this.state.updateModal} />
export default withAuth0(MyFavoriteBooks);
