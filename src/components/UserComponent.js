import React, { Component } from 'react'
import ListComponent from './ListComponent';
import SpinnerComponent from './SpinnerComponent';
import {deleteUser, getUsers, postUser} from '../services';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

class UserComponent extends Component {

    constructor() {
        super();
        this.state = {
            fetching: true,
            users: [],
            name: '',
            password: '',
            email: '',
            role: '',
            selectedOption: {label: 'Select'},
            roles: [{name: 'Admin', value: 'ADMIN'}, {name: 'Project manager', value: 'PROJECT_MANAGER'}]
        }
    }

    componentWillMount() {
      this.getUsers();
    }

    getUsers = () => {
      return getUsers()
        .then((users) => this.setState({users, fetching: false}))
    }
    
    handleDeleteUser = (userId) => {
      return deleteUser(userId)
        .then(() => this.getUsers())
    }

    handleSubmit = (e) => {
      e.preventDefault();
      return postUser({name: this.state.name, email: this.state.email, password: this.state.password, role: this.state.role})
        .then((res) => console.log('Success'))
        .then(this.getUsers)
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

  renderSpinner = () => (<SpinnerComponent />)

  renderUserList = () => {
    const users = this.state.users;
    return (<ListComponent items={users} handleDelete={this.handleDeleteUser}/>)
  }

  renderDropdown = (roles) => {
    const options = roles.map((role) => ({value: role.value, label: role.name}))
    return (<Dropdown options={options} onChange={this.handleOnChangeRole}  value={this.state.selectedOption} />)
  }


  render() {
      return (
        <div className="App-tile">
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

          <br />
          {this.state.fetching ? this.renderSpinner() : ''}
          {this.state.users ?  this.renderUserList(): ''}
        </div>
      );
  }
}

export default UserComponent; 