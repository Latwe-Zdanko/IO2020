import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/signup";
import Home from "./components/home";
import Surveys from "./components/surveys";
import AddSurvey from "./components/addSurvey";
import Survey from "./components/addResponse";

function App() {

    return (<Router>
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to={"/sign-in"}>LZ - Model Testing</Link>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/sign-in"}>Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div>
                    <div>
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route exact path="/surveys/" component={Surveys}/>
                            <Route exact path="/surveys/addSurvey" component={AddSurvey}/>
                            <Route exact path="/surveys/:id/addResponse" component={Survey}/>
                            <Route path="/sign-in" component={Login}/>
                            <Route path="/sign-up" component={SignUp}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;