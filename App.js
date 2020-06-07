import React, { Component } from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Home from './additional_src/containers/Home Screen/Home';
import Cars from './additional_src/containers/cars/cars';
import Calculator from './additional_src/containers/calculator/Calculator';
import Layout from './additional_src/hoc/Layout/Layout';
import NewAccount from './additional_src/containers/New Account/NewAccount';
import UpdateAccount from './additional_src/containers/Update Account/UpdateAccount';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Route path="/" exact component={Home}/>        
          <Route path="/newaccount" component={NewAccount}/>
          <Route path="/calculator" component={Calculator}/>
          <Route path="/update" component={UpdateAccount}/>
        </Layout>
      </div>
    );
  }
}

export default App;
