import React, {Component} from "react";
import "../App.css";
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import '../styles/survey.css'

class Home extends Component {
    render() {
        return (
            <div className="wrapper">
                <div>
                    <Link to="/surveys/addsurvey">
                        <Button
                            className="homeButton"
                        >Add Survey</Button>
                    </Link>
                    <Link to="/surveys">
                        <Button
                            className="homeButton"
                        >Surveys</Button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Home;