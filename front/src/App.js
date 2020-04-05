import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import "./App.css";
import "./styles/home.css"
import AddMockup from "./components/AddMockup";
import ViewMockup from "./components/ViewMockup";

class App extends Component{
  render(){
    return (
        <Router>
          <Switch>
            <Route path="/mockup/add" exact={true} component={AddMockup}/>
            <Route path="/mockup/view/:name" component={ViewMockup}/>
          </Switch>
        </Router>
    )
  }
}

export default App;