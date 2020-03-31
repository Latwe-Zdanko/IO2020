import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import "./App.css";
import Home from "./components/Home"
import NewSurvey from "./components/NewSurvey";

class App extends Component{
  render(){
    return (
        <Router>
          <Switch>
            <Route path="/" exact={true} component={Home}/>
              <Route path="/addsurvey" exact={true} component={NewSurvey}/>
          </Switch>
        </Router>
    )
  }
}

export default App;