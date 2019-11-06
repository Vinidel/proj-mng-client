import axios from 'axios';
import {BASE_API_URL} from '../config';


export async function login(email, password) {
  return axios.post(`${BASE_API_URL}/api/login`, {email, password})
    .then((res) => (res.data.token))
    .catch(e => console.log('Error', e))
}

export async function getProjects() {
  return axios.get(`${BASE_API_URL}/api/projects`, {headers: {authorization: localStorage.getItem('token')}})
  .then((response) => {
      console.log('Got data', response.data)
          return response.data;
  })
  .catch(function (error) {
      console.log('hey', error);
  });
}

export async function deleteProject(projectId) {
  return axios.delete(`${BASE_API_URL}/api/projects/${projectId}`, {headers: {authorization: localStorage.getItem('token')}})
  .then((response) => {
      console.log('Got data', response.data)
          return response.data;
  })
  .catch(function (error) {
      console.log('hey', error);
  });
}

export async function postProject(project) {
  return axios.post(`${BASE_API_URL}/api/projects`, project, {headers: {authorization: localStorage.getItem('token')}})
  .then((response) => {
      console.log('Got data', response.data)
          return response.data;
  })
  .catch(function (error) {
      console.log('hey', error);
  });
}

export async function patchProject(projectId, project) {
  return axios.patch(`${BASE_API_URL}/api/projects/${projectId}`, project, {headers: {authorization: localStorage.getItem('token')}})
  .then((response) => {
      console.log('Got data', response.data)
          return response.data;
  })
  .catch(function (error) {
      console.log('hey', error);
  });
}

export async function getUsers() {
  return axios.get(`${BASE_API_URL}/api/users`, {headers: {authorization: localStorage.getItem('token')}})
  .then((response) => {
      console.log('Got data', response.data)
          return response.data;
  })
  .catch(function (error) {
      console.log('hey', error);
  });
}

export async function postUser(user) {
  return axios.post(`${BASE_API_URL}/api/users`, user, {headers: {authorization: localStorage.getItem('token')}})
  .then((response) => {
      console.log('Got data', response.data)
          return response.data;
  })
  .catch(function (error) {
      console.log('hey', error);
  });
}

export async function deleteUser(userId) {
  return axios.delete(`${BASE_API_URL}/api/users/${userId}`, {headers: {authorization: localStorage.getItem('token')}})
  .then((response) => {
      console.log('Got data', response.data)
          return response.data;
  })
  .catch(function (error) {
      console.log('hey', error);
  });
}

export async function patchUser(userId, user) {
  return axios.patch(`${BASE_API_URL}/api/users/${userId}`, user, {headers: {authorization: localStorage.getItem('token')}})
  .then((response) => {
      console.log('Got data', response.data)
          return response.data;
  })
  .catch(function (error) {
      console.log('hey', error);
  });
}