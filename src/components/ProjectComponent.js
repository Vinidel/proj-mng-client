import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ListComponent from './ListComponent';
import AddProjectComponent from './AddProjectComponent';
import EditProjectComponent from './EditProjectComponent';
import SpinnerComponent from './SpinnerComponent';
import {getProjects} from '../services';
import {deleteProject, getUsers, postProject, patchProject} from '../services';
import {ADMIN_ROLE} from '../constants';

import 'react-dropdown/style.css'

class ProjectComponent extends Component {

    constructor() {
        super();
        this.state = {
            showEdit: false,
            fetching: true,
            projects: [],
            users: [],
            project: {}
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
  
  deleteProject = (project) => {
    return deleteProject(project.id)
      .then(() => this.getMyProjects())
  }

  getMyProjects = () => {
    return getProjects()
      .then(projects => {
        return this.setState({projects, fetching: false})
      });
  }

  handlePostProject = (project) => {
    return postProject(project)
      .then((res) => console.log('Success'))
      .then(this.getMyProjects)
      .catch(e => console.log('Error', e))
  }

  handlePatchProject = (projectId, project) => {
    return patchProject(projectId, project)
      .then((res) => console.log('Success'))
      .then(this.getMyProjects)
      .catch(e => console.log('Error', e))
  }

  renderSpinner = () => (<SpinnerComponent />)

  handleEdit = (project) => {
    console.log('Clicked')
    this.setState({showEdit: true, project});
  }

  renderProjectList = () => {
    const projects = this.state.projects;
    return (<ListComponent items={projects} handleDelete={this.deleteProject} handleEdit={this.handleEdit}/>)
  }

  renderAddProjectComponent = () => {
    return (<AddProjectComponent handlePost={this.handlePostProject} users={this.state.users}/>)
  }

  renderEditProjectComponent = () => {
    return (<EditProjectComponent handlePatch={this.handlePatchProject} users={this.state.users} project={this.state.project}/>)
  }

  renderAdminSection = () => {
    console.log('Is Admin ', this.state.showEdit)
   return this.state.showEdit ?  this.renderEditProjectComponent() : this.renderAddProjectComponent();
  }

  
  render() {
    console.log('Rendered')
      return (
        <div className="App-tile">
          {this.props.role === ADMIN_ROLE ? this.renderAdminSection() : ''}
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