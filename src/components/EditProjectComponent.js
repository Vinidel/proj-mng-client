import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const DEFAULT_SELECT = {label: 'Select'};
class EditProjectComponent extends Component {

    constructor() {
        super();
        this.state = {
            fetching: true,
            selectedOption: DEFAULT_SELECT
        }
    }

    componentDidMount() {
      const {users, project} = this.props;
      if(project.UserId) {
        const u = users.find((user) => user.id === project.UserId);
        this.handleOnChangeUser({value: u.id, label: u.name})
      }
    }

    componentDidUpdate(prevProps, prevState) {
      const {users, project} = this.props;
      if(project.id !== prevProps.project.id && project.UserId) {
        const u = users.find((user) => user.id === project.UserId);
        this.handleOnChangeUser({value: u.id, label: u.name})
      } else if (!this.state.selected && this.state.selectedOption.label !== DEFAULT_SELECT.label) {
        this.handleOnChangeUser(DEFAULT_SELECT)
      }
    }

  handleSubmit = (e) => {
    e.preventDefault();
    return this.props.handlePatch(this.props.project.id, {UserId: this.state.selectedOption.value})
      .then((res) => console.log('reset form'))
      .catch(e => console.log('Error', e))
  }

  handleOnChangeUser = (user) => {
    console.log('I am here', user)
    this.setState({selectedOption: user, selected: true});
  }

  renderDropdown = (users, selected) => {
    const options = users.map((user) => ({value: user.id, label: user.name}))
    return (<Dropdown options={options} onChange={this.handleOnChangeUser}  value={this.state.selectedOption} />)
  }
  
  render() {
    const {project} = this.props;
      return (
        <form>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" placeholder="Enter name" value={project.name} disabled/>
        </div>
        <div className="form-group">
        <div className="form-group">
          <label >Description</label>
          <input type="text" className="form-control" placeholder="Enter description" value={project.description || 'No description'} disabled/>
        </div>
        </div>
        <div className="form-group form-check">
        <label >User</label>
          {this.props.users.length ? this.renderDropdown(this.props.users) : ''}
        </div>
        <div className="btn-container">
        <button type="button" onClick={this.handleSubmit} className="btn btn-success">Update</button>
      </div>
      </form>
      );
  }
}

EditProjectComponent.propTypes = {
  handlePatch: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    })
  ).isRequired,
  project: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    UserId: PropTypes.number,
  }).isRequired
}

export default EditProjectComponent; 