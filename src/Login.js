import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import LoginButton from './LoginButton';

class Login extends React.Component {
  render() {
    return(
      <LoginButton makeRequest = {this.props.makeRequest}/>
    )
  }
}

export default Login;
