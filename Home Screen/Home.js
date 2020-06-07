import React, { Component } from 'react';

import './Home.css';
import { Options } from './Home_Components';

class Home extends Component {
    render () {
        return (
            <div className="Home">
            <Options />
            </div>
        );
    }
}

export default Home; 