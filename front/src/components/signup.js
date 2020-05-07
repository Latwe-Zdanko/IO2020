import React, {Component} from "react";
import AuthenticationService from "../service/AuthenticationService";
import {Redirect} from "react-router-dom";
import axios from 'axios';
import bcryptjs from 'bcryptjs'

const API_URL = 'http://localhost:8080';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            hashed: false
        };

        this.signUp = this.signUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
        if(name === "password"){
            this.state.hashed = false;
        }
    }

    signUp(event) {
        event.preventDefault();
        const url = API_URL + "/add-user";
        this.hashPassword();
        axios.get(url, {params: this.state})
            .then(r => {
                this.redirect();
                this.props.history.push("/");
            }).catch(r => alert(r))
    }

    redirect(){
        let form = document.getElementById("sign-form");
        form.hidden = true;
        let cont = document.getElementById("main-cont");
    }

    hashPassword() {
        if(!this.state.hashed) {
            this.state.password = bcryptjs.hashSync(this.state.password, 10);
            this.state.hashed = true;
        }
    }

    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            return <Redirect to={"/"}/>
        }
        return (
            <div className="auth-wrapper">
                <div id="main-cont" className="auth-inner">
                    <form id="sign-form" onSubmit={this.signUp}>
                        <h3>Sign Up</h3>
                        <div className="form-group">
                            <label>First name</label>
                            <input name="firstName" onChange={this.handleChange} type="text" className="form-control"
                                   placeholder="First name" required="required"/>
                        </div>

                        <div className="form-group">
                            <label>Last name</label>
                            <input name="lastName" onChange={this.handleChange} type="text" className="form-control"
                                   placeholder="Last name" required="required"/>
                        </div>

                        <div className="form-group">
                            <label>Email address</label>
                            <input name="email" onChange={this.handleChange} type="email" className="form-control"
                                   placeholder="Enter email" required="required"/>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" onChange={this.handleChange} type="password" className="form-control"
                                   placeholder="Enter password" required="required"/>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                        <p className="forgot-password text-right">
                            Already registered <a href="/sign-in">sign in?</a>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}
