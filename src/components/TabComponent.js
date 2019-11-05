import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {ADMIN_ROLE} from '../constants';

class TabComponent extends Component {

  constructor() {
    super();
    this.state = {
      tabActive: true
    }
  }
  
  selectProjectsTab = () => {
    this.setState({tabActive: true})
    return this.props.handleSelectTab('projects');
  }

  selectUsersTab = () => {
    this.setState({tabActive: false})
    return this.props.handleSelectTab('users');
  }

  renderUsersTab = () => {
    return (
      <li className="nav-item">
        <a className={`nav-link ${!this.state.tabActive ? 'active': ''}`} onClick={this.selectUsersTab} href="#">Users</a>
      </li>
    )
  }

  renderProjectsTab = () => {
    return (
      <li className="nav-item">
        <a className={`nav-link ${this.state.tabActive ? 'active': ''}`} onClick={this.selectProjectsTab} href="#">Projects</a>
      </li>
    )
  }

  render() {
    return (
      <div className="Nav-container">
        <ul className="nav nav-tabs">
          {this.renderProjectsTab()}
          {this.props.role === ADMIN_ROLE ? this.renderUsersTab() : ''}
        </ul>
      </div>
        
    );
  }
}

TabComponent.defaultProps = {
  handleSelectTab: () => console.log('Project tab'),
}

TabComponent.propTypes = {
  handleSelectTab: PropTypes.func,
  role: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }))
}

export default TabComponent;
