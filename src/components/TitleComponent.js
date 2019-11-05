import React, { Component } from 'react'
import axios from 'axios';
import {BASE_API_URL} from '../config';
class TitleComponent extends Component {
  componentWillMount() {
    axios.get(`${BASE_API_URL}/api/sup`)
        .catch(function (error) {
            console.log('Cannot connect to server', error);
        });

}

    render() {
        return <h1>My.ProjMgn</h1>;
    }
}

export default TitleComponent; 