import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

class AddProjectComponent extends Component {

    constructor() {
        super();
        this.state = {
          fetching: true,
          name: '',
          description: '',
          userId: undefined,
          selectedOption: {label: 'Select'}
      }
    }

  handleSubmit = (e) => {
    e.preventDefault();
    return this.props.handlePost({name: this.state.name, description: this.state.description, UserId: this.state.userId})
      .then((res) => console.log('Success'))
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

  renderDropdown = (users) => {
    const options = users.map((user) => ({value: user.id, label: user.name}))
    return (<Dropdown options={options} onChange={this.handleOnChangeUser}  value={this.state.selectedOption} />)
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
        <label >Description</label>
        <input type="text" className="form-control" placeholder="Enter description" onChange={this.handleOnChangeDesc}/>
      </div>
      </div>
      <div className="form-group form-check">
      <label >User</label>
        {this.props.users.length ? this.renderDropdown(this.props.users) : ''}
      </div>
      <div className="btn-container">
      <button type="button" onClick={this.handleSubmit} className="btn btn-info">Save</button>
    </div>
    </form>
      );
  }
}

AddProjectComponent.propTypes = {
  handlePost: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    })
  ).isRequired,
}


export default AddProjectComponent; 