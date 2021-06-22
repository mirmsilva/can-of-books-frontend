import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Login';
import BestBooks from './BestBooks';
import { Button } from 'react-bootstrap';

class App extends React.Component {
  makeRequest = async () => {
    // this is going to be the same, always, for making requests to the server including the token
    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;

    const config = {
      headers: {"Authorization" : `Bearer ${jwt}`}
    };

    const serverResponse = await axios.get('http://localhost:3001/test-login', config);

    console.log(serverResponse);
  }

  render() {
    console.log(this.props.auth0);
    //we are importing these props from Auth0
    const { isAuthenticated }= this.props.auth0;
    console.log('app', this.props);
    return(
      <>
        <Router>
          <IsLoadingAndError>
            <Header auth = {isAuthenticated}/>
            <Switch>
              <Route exact path="/"> 
              {isAuthenticated ? 
              <BestBooks /> 
              : 
              <Login />}
              </Route >
              <Route exact path = "/profile"> 
              <h1>My Profile</h1>
              <Button onClick ={this.makeRequest}> Click Here to Auth to Server</Button>
              </Route>
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
