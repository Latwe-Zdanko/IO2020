import React, {Component} from "react";

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
        alert(this.state.email + "\n"
            + this.state.password
        );

        event.preventDefault();
    }

    render() {
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={this.login}>
                        <h3>Sign In</h3>

                        <div className="form-group">
                            <label>Email address</label>
                            <input name="email" onChange={this.handleChange} type="email" className="form-control"
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
                            Forgot <a href>password?</a>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}