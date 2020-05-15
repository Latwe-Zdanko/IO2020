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
        }
    }

    componentDidMount() {
        this.getSurveys();
    }

    getSurveys = () => {

        axios.get(this.state.serverUrl + '/surveys/all', {headers: {authentication: AuthenticationService.getAuthToken()}})
            .then((response) => {
                const data = response.data;
                this.setState({surveys: data});
            })
            .catch(() => {
                console.log("Error");
            });
    };

    displaySurveys = (surveys) => {

        if (!surveys.length) return;

        return (
            surveys.map((survey) => (
                <a className="list-group-item" href={"/surveys/" + survey.id + "/addResponse"}>{survey.name}</a>
            )))
    };

    render() {

        console.log(this.state.surveys);

        return (
            <div className="container">
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