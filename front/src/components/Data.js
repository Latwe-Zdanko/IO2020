import React, {Component} from "react";
import "../App.css";
import "survey-react/survey.css";
import axios from 'axios';
import AuthenticationService from "../service/AuthenticationService";

class Data extends Component {

    constructor(props) {
        super(props);

        this.state = {
            surveys: [],
            copied: false,
            serverUrl: process.env.REACT_APP_SERVER_URL
        };
        let headers = {headers: {authorization: AuthenticationService.getAuthToken()}};

        axios.get(this.state.serverUrl + '/surveys/all', headers)
            .then((response) => {
                this.setState({surveys: response.data});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    displaySurveys = (surveys) => {

        if (!surveys.length) return;

        return (
            surveys.map((survey) => (
                <div style={{"margin": "auto"}}>
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <a className="list-group-item" href={"/data/" + survey.id + "/view"}
                               style={{color: "#2D1457", textAlign: "left", width: "500px"}}>{survey.name}</a>
                        </div>
                    </div>
                    <br/>
                </div>

            )))
    };

    render() {
        return (
                <div className="container">
                    <h1 style={{"color": "#231F20", "borderColor": "black", "margin-top": "100px"}}>Surveys</h1>
                    <div className="list-group" style={{marginTop: "50px"}}>
                        {this.displaySurveys(this.state.surveys)}
                    </div>
                </div>
        );
    }
}

export default Data;