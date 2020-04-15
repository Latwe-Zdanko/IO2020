import React, {Component} from "react";
import AuthenticationService from '../service/AuthenticationService.js';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.email ? props.email : '',
            password: props.password ? props.password : '',
            error: false
        }
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    login(event) {
        console.log("Trying to log in: " + this.state.email + " : " + this.state.password);
        event.preventDefault();
        AuthenticationService
            .executeAuthenticationService(this.state.email, this.state.password)
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(this.state.email, this.state.password);
                alert("Successfully logged in")
            }).catch(() => {
                this.setState({ error: true });
                alert("Something went wrong")
        });

    }

    render() {
        return (
            <form onSubmit={this.login}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input name="email" onChange={this.handleChange}  className="form-control"
                           placeholder="Enter email"/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input name="password" onChange={this.handleChange} type="password" className="form-control"
                           placeholder="Enter password"/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <button className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}

