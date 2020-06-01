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
        console.log("hal");
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
                <p>
                    <div className="input-group-prepend" style={{marginLeft: "250px"}}>
                        <div className="input-group-text">
                            <a className="list-group-item" href={"/data/" + survey.id + "/view"}
                               style={{color: "#2D1457", textAlign: "left", width: "500px"}}>{survey.name}</a>
                        </div>
                    </div>
                </p>
            )))
    };

    render() {
        console.log(this.state.serverUrl);
        return (
            <div className="marg">
                <div className="container">
                    <h1 style={{color: "#231F20", borderColor: "black"}}>Surveys</h1>
                    <div className="list-group" style={{marginTop: "150px"}}>
                        {this.displaySurveys(this.state.surveys)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Data;