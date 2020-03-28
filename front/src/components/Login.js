import React, {Component} from "react";
import '../styles/home-login.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.logIn = this.logIn.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        if (target.name === "password") {
            this.setState({password: event.target.value});
        }else{
            this.setState({username: event.target.value})
        }
    }

    logIn(event) {
        alert('Username: ' + this.state.username + ' Password: ' + this.state.password);
        event.preventDefault();
    }

    render (){
        return (
            <div className="wrapper fadeInDown">
            <div id="formContent">
                <form onSubmit={this.logIn}>
                        <input name="username"
                               type="text"
                               value={this.state.username}
                               onChange={this.handleChange}
                               className="fadeIn second"
                               placeholder="login"

                        />
                        <input
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            className="fadeIn third"
                            placeholder="password"
                        />
                        <input
                            type="submit"
                            value="Log in"
                            className="fadeIn fourth"
                        />
                </form>
            </div>
            </div>
        );
    }
}
export default Login;