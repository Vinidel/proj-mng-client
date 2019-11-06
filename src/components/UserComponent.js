import React, { Component } from 'react'
import Dropdown from 'react-dropdown'
import ListComponent from './ListComponent';
import AddUserComponent from './AddUserComponent';
import EditUserComponent from './EditUserComponent';
import SpinnerComponent from './SpinnerComponent';
import {deleteUser, getUsers, postUser, patchUser} from '../services';
import {ADMIN_ROLE} from '../constants';

import 'react-dropdown/style.css'

class UserComponent extends Component {

    constructor() {
        super();
        this.state = {
            showEdit: false,
            fetching: true,
            users: [],
            user: {},
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
    
    handleDeleteUser = (user) => {
      return deleteUser(user.id)
        .then(() => this.getUsers())
    }

  handlePostUser = (user) => {
    return postUser(user)
      .then((res) => console.log('Success'))
      .then(this.getUsers)
      .catch(e => console.log('Error', e))
  }

  handlePatchUser = (user) => {
    return patchUser(user)
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

  handleEdit = (user) => {
    this.setState({showEdit: true, user});
  }

  renderSpinner = () => (<SpinnerComponent />)

  renderUserList = () => {
    const users = this.state.users;
    return (<ListComponent items={users} handleDelete={this.handleDeleteUser} handleEdit={this.handleEdit} role={ADMIN_ROLE}/>)
  }

  renderDropdown = (roles) => {
    const options = roles.map((role) => ({value: role.value, label: role.name}))
    return (<Dropdown options={options} onChange={this.handleOnChangeRole}  value={this.state.selectedOption} />)
  }

  renderAddUserComponent = () => {
    return (<AddUserComponent handlePost={this.handlePostUser}/>)
  }

  renderEditUserComponent = () => {
    return (<EditUserComponent handlePatch={this.handlePatchUser} user={this.state.user}/>)
  }

  render() {
      return (
        <div className="App-tile">
          {this.state.showEdit ? this.renderEditUserComponent() : this.renderAddUserComponent()}
          <br />
          {this.state.fetching ? this.renderSpinner() : ''}
          {this.state.users ?  this.renderUserList(): ''}
        </div>
      );
  }
}

export default UserComponent; 