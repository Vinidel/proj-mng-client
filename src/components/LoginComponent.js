import React, { Component } from 'react'
import {login} from '../services';

class LoginComponent extends Component {

  constructor() {
    super();
    this.state = {
        fetching: true,
        email: '',
        password: ''
    }
}


handleEmailChange = (event) => {
  this.setState({email: event.target.value});
}

handlePasswordChange = (event) => {
  this.setState({password: event.target.value});
}

handleSubmit = (e) => {
  e.preventDefault();
  return login(this.state.email, this.state.password)
    .then((token) => this.props.setToken(token));
}

    render() {
      return (
        <div className="App-tile">
          <form className="form-group row">
              <label className="col-sm-2 col-form-label">
                Email:
              </label>
              <div className="col-sm-10">
                <input type="email" className="form-control" onChange={this.handleEmailChange}  name="email"/>
              </div>
              <label className="col-sm-2 col-form-label">
                Password:
              </label>
              <div className="col-sm-10">
                <input type="password" className="form-control" onChange={this.handlePasswordChange}  name="password" />
              </div>
          </form>
          <div className="btn-container">
            <button type="button" onClick={this.handleSubmit} className="btn btn-success">Login</button>
          </div>
          <br />
        </div>
      );
    }
}

export default LoginComponent; 