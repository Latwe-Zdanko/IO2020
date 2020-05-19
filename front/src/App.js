import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/signup";
import Home from "./components/home"
import AuthenticationService from "./service/AuthenticationService";
import ViewMockup from "./components/ViewMockup";
import AddMockup from "./components/AddMockup";
import MockupSurvey from "./components/MockupSurvey";
import AddMockupSurvey from "./components/AddMockupSurvey";

function App() {
    return (<Router>
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to={"/sign-in"}>LZ - Model Testing</Link>
                        <div className="collapse navbar-collapse">
                            <ul id="logged-out" hidden={AuthenticationService.isUserLoggedIn()}
                                className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link id="sign-in" className="nav-link" to={"/sign-up"}>Sign up</Link>
                                </li>
                                <li className="nav-item">
                                    <Link id="login" className="nav-link" to={"/sign-in"}>Login</Link>
                                </li>
                            </ul>
                            <ul id="logged-in" hidden={!AuthenticationService.isUserLoggedIn()}
                                className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/mockup/add"}>Add mockup</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={AuthenticationService.logout} to={"/"}>Log
                                        out</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/sign-in" component={Login}/>
                    <Route path="/sign-up" component={SignUp}/>
                    <Route path="/mockup/add" component={AddMockup}/>
                    <Route path="/mockup/view/:id" component={ViewMockup}/>
                    <Route path="/mockupsurvey/add/:id" component={AddMockupSurvey}/>
                    <Route path="/mockupsurvey/:id" component={MockupSurvey}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;