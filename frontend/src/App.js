import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/Navbar';
import Home from './components/Home';
import AddProfile from './components/AddProfile';
import EditProfile from './components/EditProfile';

import './App.css';

class App extends Component{
  render(){
    return(
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/addprofile" component={AddProfile} />
            <Route exact path="/editprofile/:id" component={EditProfile} />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App;