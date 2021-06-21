import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import { withAuth0 } from '@auth0/auth0-react';
// import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Login';
import BestBooks from './BestBooks';

class App extends React.Component {

  render() {
    console.log(this.props.auth0);
    //we are importing these props from Auth0
    const { user, isAuthenticated, isLoading}= this.props.auth0;
    console.log('app', this.props);
    return(
      <>
        <Router>
          <IsLoadingAndError>
            <Header />
            <Switch>
              <Route exact path="/"> 
              {isAuthenticated ? <BestBooks /> : <Login />}
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              </Route >
              <Route exact path = "/profile"> <h1>testing</h1></Route>
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
