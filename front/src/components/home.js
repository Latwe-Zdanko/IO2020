import React, {Component} from "react";
import AuthenticationService from "../service/AuthenticationService";
import {Redirect} from "react-router-dom";

export default class Home extends Component {

    render() {
        if (!AuthenticationService.isUserLoggedIn()) {
            return <Redirect to="/sign-in"/>
        }
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h1>Home page</h1>
                </div>
            </div>
        );
    }
}