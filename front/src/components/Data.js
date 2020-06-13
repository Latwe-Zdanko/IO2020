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
                <a href={"/data/" + survey.id + "/view"}>
                    <div className="list-group-item" style={{"height": "50px"}}>
                        <div style={{display: "inline", verticalAlign: "middle"}}>
                            <a>{survey.name}</a>
                        </div>
                    </div>
                </a>

            )))
    };

    render() {
        return (
            <div className="container" style={{marginTop: "100px"}}>
                <h1>Surveys</h1>
                <br/>
                <div className="list-group">
                    {this.displaySurveys(this.state.surveys)}
                </div>
            </div>
        );
    }
}

export default Data;