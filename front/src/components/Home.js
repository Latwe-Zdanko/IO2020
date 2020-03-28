import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import '../styles/home-login.css'

class Home extends Component {
    render() {
        return (
            <div className="wrapper fadeInDown">
             <div id="formContent">
                    <Link to="login">
                        <Button
                        className="fadeIn homeButton"
                        value="Login"
                        >Sign In</Button>
                    </Link>
                    <Link to='register'>
                        <Button
                            className="fadeIn homeButton"
                            value="Login"
                        >Sign Up</Button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Home;