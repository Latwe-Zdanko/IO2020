import React, {Component} from "react";
import "../App.css";
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import '../styles/home.css'
class Home extends Component{
    render() {
        return(
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <Link to="/addsurvey">
                        <Button
                            className="fadeIn homeButton"
                            value="addsurvey"
                        >Add Survey</Button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Home;