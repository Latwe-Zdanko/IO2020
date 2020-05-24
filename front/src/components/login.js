import React, {Component} from "react";
import AuthenticationService from '../service/AuthenticationService.js';
import {Redirect} from "react-router-dom"

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.email ? props.email : '',
            password: props.password ? props.password : '',
            error: false
        };
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    login(event) {
        event.preventDefault();
        AuthenticationService
            .executeAuthenticationService(this.state.email, this.state.password)
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(this.state.email, this.state.password);
                this.props.history.push("/");
            })
            .catch(error => {
                this.setState({error: true});
                AuthenticationService.handleLoginError(error)
            });
    }

    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            return <Redirect to={"/"}/>
        }
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={this.login}>
                        <h3>Sign In</h3>
                        <div className="form-group">
                            <label>Email address</label>
                            <input name="email" type="email" onChange={this.handleChange} className="form-control"
                                   placeholder="Enter email"/>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" onChange={this.handleChange} type="password" className="form-control"
                                   placeholder="Enter password"/>
                        </div>

                        <button className="btn btn-primary btn-block">Submit</button>
                        <p className="forgot-password text-right">
                            { /* eslint-disable-next-line */}
                            Forgot <a href="#">password?</a>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

