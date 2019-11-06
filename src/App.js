import React, { Component } from 'react';
import jwt from 'jsonwebtoken';
import './App.css';
import TitleComponent from './components/TitleComponent';
import LoginComponent from './components/LoginComponent';
import ProjectComponent from './components/ProjectComponent';
import UserComponent from './components/UserComponent';
import TabComponent from './components/TabComponent';

class App extends Component {

  constructor() {
    super();
    this.state = {
        fetching: true,
        token: '',
        showProjects: true,
        role: ''
    }
}

  componentDidMount() {
    const token = window.localStorage.getItem('token');
    const decoded = jwt.decode(token);
    if (token) {
      this.setState({token, role: decoded.role});
    }
  }

  handleToken = (token) => {
    window.localStorage.setItem('token', token);
    const decoded = jwt.decode(token);
    this.setState({token, role: decoded.role});
  }

  handleTabChange = (tab) => {
    const setTab = tab === 'projects';
    this.setState({showProjects: setTab})
  }

  handleLogout = (tab) => {
    window.localStorage.removeItem('token');
    this.setState({token: '', role: ''});
  }

  renderLogin = () => (<LoginComponent setToken={this.handleToken}/>)
  renderProjects = () => (<ProjectComponent role={this.state.role}/>)
  renderUsers = () => (<UserComponent />)
  renderNavTab = () => (<TabComponent handleSelectTab={this.handleTabChange} role={this.state.role}/>)
  renderSelectedSection = () => {
    return this.state.showProjects ? this.renderProjects() : this.renderUsers()
  }
  render() {
    return (
      <div className="App">
      <TitleComponent />
      {this.state.token ? this.renderNavTab() : ''}
      <div className="App-content">
      {this.state.token ? this.renderSelectedSection() : this.renderLogin()}
      </div>
    </div>
    );
  }
}

export default App;
