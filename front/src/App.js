import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/signup";
import ViewMockup from "./components/ViewMockup";
import AddMockup from "./components/AddMockup";
import Mockups from "./components/Mockups";

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

                <Switch>
                    <Route exact path='/' component={Login}/>
                    <Route path="/sign-in" component={Login}/>
                    <Route path="/sign-up" component={SignUp}/>
                    <Route path="/mockup/add" component={AddMockup}/>
                    <Route path="/mockup/view/:id" component={ViewMockup}/>
                    <Route path="/mockup" component={Mockups}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;