import React, {Component} from "react";
import "../App.css";
import "survey-react/survey.css";
import axios from 'axios';
import AuthenticationService from "../service/AuthenticationService";

class Surveys extends Component {

    constructor(props) {
        super(props);

        this.state = {
            surveys: [],
            frontUrl: "http://localhost:3000",
            serverUrl: "http://localhost:8080"
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

        if (!surveys.length) return <p>No surveys</p>;
        if (window.location.href === this.state.frontUrl + "/surveys") {
            return (
                surveys.map((survey) => (
                    <a className="list-group-item" href={"/surveys/" + survey.id + "/addResponse"}>{survey.name}</a>
                )))
        } else {
            return (
                surveys.map((survey) => (
                    <a className="list-group-item" href={"/surveyexport/" + survey.id}>{survey.name}</a>
                )))
        }

    };

    render() {
        return (
            <div className="container" style={{marginTop: "60px"}}>
                <h1>Surveys</h1>
                <br/>
                <div className="list-group">
                    {this.displaySurveys(this.state.surveys)}
                </div>
            </div>
        );
    }
}

export default Surveys;
