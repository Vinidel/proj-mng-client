import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {patchUser} from '../services';

class EditUserComponent extends Component {

    constructor() {
        super();
        this.state = {
            fetching: true,
            user: {
              password: '',
                email: '',
            }
        }
    }

    handleSubmit = (e) => {
      e.preventDefault();
      return this.props.handlePatch({email: this.state.email, password: this.state.password})
        .then((res) => console.log('reset form'))
        .catch(e => console.log('Error', e))
  }

  handleOnChangeEmail = (event) => {
    this.setState({email: event.target.value});
  }

  handleOnChangePassword = (event) => {
    this.setState({password: event.target.value});
  }
  
  render() {
      return (
          <form>
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" placeholder="Enter name" value={this.props.user.name} disabled/>
            </div>
            <div className="form-group">
            <div className="form-group">
              <label >Email</label>
              <input type="email" className="form-control" placeholder="Enter email" onChange={this.handleOnChangeEmail} name="email" placeholder={this.props.user.email}/>
            </div>
            <div className="form-group">
              <label >Password</label>
              <input type="password" className="form-control" placeholder="Enter password" onChange={this.handleOnChangePassword}  name="password" />              
            </div>
            </div>
            <div className="btn-container">
            <button type="button" onClick={this.handleSubmit} className="btn btn-success">Update</button>
          </div>
          </form>
      );
  }
}

EditUserComponent.propTypes = {
  handlePatch: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired
}

export default EditUserComponent; 