import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

class EditProjectComponent extends Component {

    constructor() {
        super();
        this.state = {
            fetching: true,
            userId: undefined,
            selectedOption: {label: 'Select'}
        }
    }

  handleSubmit = (e) => {
    e.preventDefault();
    return this.props.handlePatch(this.props.project.id, {UserId: this.state.userId})
      .then((res) => console.log('reset form'))
      .catch(e => console.log('Error', e))
  }

  handleOnChangeUser = (user) => {
    // const {project} = this.props;
    // if (project.UserId && !this.state.userId) {
    //   const selectedUser = users.find((user) => user.id === project.UserId);
    //   selectedOption =  {value: selectedUser.id, label: selectedUser.name}
    // }
    this.setState({userId: user.value, selectedOption: user});
  }

  renderDropdown = (users, alreadySelectedUser) => {
    let selectedUser;
    let localSelectedOption = this.state.selectedOption;
    if (alreadySelectedUser) {
      selectedUser = users.find((user) => user.id === alreadySelectedUser);
      localSelectedOption =  {value: selectedUser.id, label: selectedUser.name}
    }
    const options = users.map((user) => ({value: user.id, label: user.name}))
    return (<Dropdown options={options} onChange={this.handleOnChangeUser}  value={localSelectedOption} />)
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
          {this.props.users.length ? this.renderDropdown(this.props.users, project.UserId) : ''}
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