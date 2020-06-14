import React, {Component} from "react";
import "../App.css";
import "survey-react/survey.css";
import axios from 'axios';
import AuthenticationService from "../service/AuthenticationService";
import {ListGroup, ListGroupItem} from "reactstrap";

const API_URL = process.env.REACT_APP_SERVER_URL;

class Surveys extends Component {

    constructor(props) {
        super(props);

        this.state = {
            surveys: [],
        };

        let headers = {headers: {authorization: AuthenticationService.getAuthToken()}};

        axios.get(API_URL + '/surveys/all', headers)
            .then((response) => {
                this.setState({surveys: response.data});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleRedirect = (event, survey) => {
        event.stopPropagation();
        if (event.target.id === "export") return;
        if (survey.type === "mockup") {
            window.location.href = "/mockupsurvey/" + survey.id
        } else {
            window.location.href = "/surveys/" + survey.id + "/addResponse"
        }
    };

    displaySurveys = (surveys) => {

        if (!surveys.length) return;
        return (
            surveys.map((survey) => (
                <ListGroupItem tag="button" action onClick={e => this.handleRedirect(e, survey)}>
                    <a className="list-link">{survey.name}</a>
                </ListGroupItem>
            )))
    };

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light navbar-secondary">
                    <span className="container float-left navbar-breadcrumbs">
                        Surveys
                    </span>
                </nav>
                <div className="auth-wrapper">
                    <div className="auth-inner" style={{width: window.screen.width * 0.5}}>
                        <h2>Surveys</h2>
                        <br/>
                        <ListGroup>
                            {this.displaySurveys(this.state.surveys)}
                        </ListGroup>
                    </div>
                </div>
            </div>
        );
    }
}

export default Surveys;