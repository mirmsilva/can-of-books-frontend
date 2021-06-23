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
import Profile from './Profile';

class App extends React.Component {

  render() {
    //we are importing these props from Auth0
    const { isAuthenticated }= this.props.auth0;
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
                '' 
              }
              </Route >
              <Route exact path = "/profile"> 
                <Profile/>
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
