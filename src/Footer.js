import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import './Footer.css';

class Footer extends React.Component {
  render() {
    return(
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="footer">
        <Navbar.Brand> Best Books &copy; by Jona & Miriam</Navbar.Brand>
      </Navbar>
    );
  }
}

export default Footer;
