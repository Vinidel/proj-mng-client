import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

class AddUserComponent extends Component {

    constructor() {
        super();
        this.state = {
            fetching: true,
            name: '',
            password: '',
            email: '',
            role: '',
            selectedOption: {label: 'Select'},
            roles: [{name: 'Admin', value: 'ADMIN'}, {name: 'Project manager', value: 'PROJECT_MANAGER'}]
        }
    }

  handleSubmit = (e) => {
    e.preventDefault();
    return this.props.handlePost({name: this.state.name, email: this.state.email, password: this.state.password, role: this.state.role})
      .then((res) => console.log('Success'))
      .catch(e => console.log('Error', e))
  }

  handleOnChangeName = (event) => {
    this.setState({name: event.target.value});
  }

  handleOnChangeEmail = (event) => {
    this.setState({email: event.target.value});
  }

  handleOnChangePassword = (event) => {
    this.setState({password: event.target.value});
  }

  handleOnChangeRole = (role) => {
    this.setState({role: role.value});
  }

  renderDropdown = (roles) => {
    const options = roles.map((role) => ({value: role.value, label: role.name}))
    return (<Dropdown options={options} onChange={this.handleOnChangeRole}  value={this.state.selectedOption} />)
  }


  render() {
      return (
          <form>
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" placeholder="Enter name" onChange={this.handleOnChangeName}/>
            </div>
            <div className="form-group">
            <div className="form-group">
              <label >Email</label>
              <input type="email" className="form-control" placeholder="Enter email" onChange={this.handleOnChangeEmail}  name="email"/>
            </div>
            <div className="form-group">
              <label >Password</label>
              <input type="password" className="form-control" placeholder="Enter password"onChange={this.handleOnChangePassword}  name="password" />              
            </div>
            </div>
            <div className="form-group form-check">
            <label >Role</label>
              {this.state.roles.length ? this.renderDropdown(this.state.roles) : ''}
            </div>
            <div className="btn-container">
            <button type="button" onClick={this.handleSubmit} className="btn btn-info">Save</button>
          </div>
          </form>
      );
  }
}

AddUserComponent.propTypes = {
  handlePost: PropTypes.func.isRequired,
}


export default AddUserComponent; 