import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/signup";
import Home from "./components/home";
import Data from "./components/Data";
import ViewData from "./components/ViewData";
import Surveys from "./components/Surveys";
import AddSurvey from "./components/AddSurvey";
import Survey from "./components/AddResponse";
import AuthenticationService from "./service/AuthenticationService";
import ViewMockup from "./components/ViewMockup";
import AddMockup from "./components/AddMockup";
import MockupSurvey from "./components/MockupSurvey";
import AddMockupSurvey from "./components/AddMockupSurvey";
import Mockups from "./components/Mockups";
import AddProject from "./components/AddProject";
import Projects from "./components/Projects";
import ViewProject from "./components/ViewProject";
import Chat from "./components/Chat";

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
                                    <Link className="nav-link" to={"/project"}>Projects</Link>
                                </li>
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
                                    <Link className="nav-link" to={"/surveys/addSurvey"}>Add survey</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/surveys"}>Surveys</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/data"}>Data from surveys</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/project/add"}>Add project</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/project/"}>Projects</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/surveys"}>Surveys</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/mockup/"}>Mockups</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/chat"}>Chat</Link>
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
                    <Route exact path='/' component={Home}/>
                    <Route exact path="/surveys" component={Surveys}/>
                    <Route exact path="/surveys/addSurvey" component={AddSurvey}/>
                    <Route exact path="/surveys/:id/addResponse" component={Survey}/>
                    <Route exact path="/data/" component={Data}/>
                    <Route exact path="/data/:id/view" component={ViewData}/>
                    <Route path="/sign-in" component={Login}/>
                    <Route path="/sign-up" component={SignUp}/>
                    <Route path="/project/add" component={AddProject}/>
                    <Route path="/project/view/:id" component={ViewProject}/>
                    <Route path="/mockup/add/:id" component={AddMockup}/>
                    <Route path="/mockup/view/:id" component={ViewMockup}/>
                    <Route path="/mockupsurvey/add/:id" component={AddMockupSurvey}/>
                    <Route path="/mockupsurvey/:id" component={MockupSurvey}/>
                    <Route path="/mockup" component={Mockups}/>
                    <Route path="/project" component={Projects}/>
                    <Route path="/chat" component={Chat}/>

                </Switch>
            </div>
        </Router>
    );
}

export default App;
