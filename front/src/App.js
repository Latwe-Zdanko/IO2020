import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import "./App.css";
import Home from "./components/Home"
import NewSurvey from "./components/NewSurvey";
import Surveys from "./components/Surveys";
import Survey from "./components/Survey";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact={true} component={Home}/>
                    <Route path="/addsurvey" exact={true} component={NewSurvey}/>
                    <Route path="/surveys/" exact={true} component={Surveys}/>
                    <Route path="/surveys/:id" exact={true} component={Survey}/>
                </Switch>
            </Router>
        )
    }
}

export default App;