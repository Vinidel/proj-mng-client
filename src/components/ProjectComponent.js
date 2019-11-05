import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ListComponent from './ListComponent';
import SpinnerComponent from './SpinnerComponent';
import {getProjects} from '../services';
import {deleteProject, getUsers, postProject} from '../services';
import Dropdown from 'react-dropdown'
import {ADMIN_ROLE} from '../constants';

import 'react-dropdown/style.css'

class ProjectComponent extends Component {

    constructor() {
        super();
        this.state = {
            fetching: true,
            projects: [],
            users: [],
            name: '',
            description: '',
            userId: 0,
            selectedOption: {label: 'Select'}
        }
    }

    componentWillMount() {
      this.getMyProjects()
      this.props.role === ADMIN_ROLE && this.getUsers();
    }

    getUsers = () => {
      return getUsers()
        .then((users) => this.setState({users}))
    }
    
    deleteProject = (projectId) => {
      return deleteProject(projectId)
        .then(() => this.getMyProjects())
    }

    getMyProjects = () => {
      return getProjects()
        .then(projects => {
          return this.setState({projects, fetching: false})
        });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      return postProject({name: this.state.name, description: this.state.description, UserId: this.state.userId})
        .then((res) => console.log('Success'))
        .then(this.getMyProjects)
        .catch(e => console.log('Error', e))
  }

  handleOnChangeDesc = (event) => {
    this.setState({description: event.target.value});
  }

  handleOnChangeName = (event) => {
    this.setState({name: event.target.value});
  }

  handleOnChangeUser = (user) => {
    this.setState({userId: user.value, selectedOption: user});
  }

  renderSpinner = () => (<SpinnerComponent />)

  renderProjectList = () => {
    const projects = this.state.projects;
    return (<ListComponent items={projects} handleDelete={this.deleteProject}/>)
  }

  renderDropdown = (users) => {
    const options = users.map((user) => ({value: user.id, label: user.name}))
    return (<Dropdown options={options} onChange={this.handleOnChangeUser}  value={this.state.selectedOption} />)
  }

  renderForm = () => {
    return (
      <form>
      <div className="form-group">
        <label>Name</label>
        <input type="text" className="form-control" placeholder="Enter name" onChange={this.handleOnChangeName}/>
      </div>
      <div className="form-group">
      <div className="form-group">
        <label >Description</label>
        <input type="text" className="form-control" placeholder="Enter description" onChange={this.handleOnChangeDesc}/>
      </div>
      </div>
      <div className="form-group form-check">
      <label >User</label>
        {this.state.users.length ? this.renderDropdown(this.state.users) : ''}
      </div>
      <div className="btn-container">
      <button type="button" onClick={this.handleSubmit} className="btn btn-info">Save</button>
    </div>
    </form>
    )
  }


  render() {
      return (
        <div className="App-tile">
         
          {this.props.role === ADMIN_ROLE ? this.renderForm() : ''}
          <br />
          {this.state.fetching ? this.renderSpinner() : ''}
          {this.state.projects?  this.renderProjectList(): ''}
        </div>
      );
  }
}

ProjectComponent.propTypes = {
  role: PropTypes.string
}

export default ProjectComponent; 