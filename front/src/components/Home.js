import React, {Component} from "react";
import "../App.css";
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import '../styles/survey.css'

class Home extends Component {
    render() {
        return (
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <Link to="/addsurvey">
                        <Button
                            className="fadeIn homeButton"
                            value="addsurvey"
                        >Add Survey</Button>
                    </Link>
                    <Link to="/surveys">
                        <Button
                            className="fadeIn homeButton"
                            value="surveys"
                        >Surveys</Button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Home;