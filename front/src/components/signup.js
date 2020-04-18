import React, {Component} from "react";

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
        this.signUp = this.signUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    signUp(event) {
        alert(this.state.firstName + "\n"
            + this.state.lastName + "\n"
            + this.state.email + "\n"
            + this.state.password
        );

        event.preventDefault();
    }

    render() {
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={this.signUp}>
                        <h3>Sign Up</h3>

                        <div className="form-group">
                            <label>First name</label>
                            <input name="firstName" onChange={this.handleChange} type="text" className="form-control"
                                   placeholder="First name"/>
                        </div>

                        <div className="form-group">
                            <label>Last name</label>
                            <input name="lastName" onChange={this.handleChange} type="text" className="form-control"
                                   placeholder="Last name"/>
                        </div>

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
