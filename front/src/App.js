import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"


class App extends Component {
   render (){
      return (
          <Router>
             <Switch>
                <Route path="/" exact={true} component={Home}/>
                <Route path="/login" exact={true} component={Login}/>
             </Switch>
          </Router>
      )
   }
}

export default App;