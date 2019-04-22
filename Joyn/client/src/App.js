import React, { Component } from 'react';
import './App.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Selected from './components/Selected';
import Chat from "./components/Chat"
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import LogIn from './components/LogIn';
import UserEvents from './components/UserEvents';

class App extends Component {

  render() {

    return (

      <Router>

        <div className="App">

        <NavBar/>
        
          <Switch>
            <Route path="/" exact component={LogIn}></Route>
            <Route path="/home" component={Home}></Route>
            <Route path="/results/:id" component={Selected}></Route>
            <Route path="/chat" component={Chat}></Route>
            <Route path="/aboutus" component={AboutUs}></Route>
            <Route path="/contactus" component={ContactUs}></Route>
            <Route path="/userProfile" component={UserEvents}></Route>
          </Switch>

        </div>

      </Router>
    );
  }
}

export default App;
