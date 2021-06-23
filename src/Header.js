import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import './Header.css';
import LogoutButton from './LogoutButton';
import Login from './Login';


class Header extends React.Component {

  render() {

    return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <Link to="/">Home</Link>
        {this.props.auth ? 
          <>
          <Link to="/profile">Profile</Link> 
          <LogoutButton />
          </>
          : <Login/>}
      </Navbar>
    );
  }
}

export default Header;
