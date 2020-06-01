import React, {Component} from "react";
import "../App.css";
import "survey-react/survey.css";
import axios from 'axios';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import AuthenticationService from "../service/AuthenticationService";

class Surveys extends Component {

    constructor(props) {
        super(props);

        this.state = {
            surveys: [],
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
                <p>
                    <div className="input-group-prepend" style={{marginLeft: "250px"}}>
                        <div className="input-group-text">
                            <a className="list-group-item" href={"/surveys/" + survey.id + "/addResponse"}
                               style={{color: "#2D1457", textAlign: "left", width: "500px"}}>{survey.name}</a>
                            <CopyToClipboard text={window.location.href + survey.id + "/addResponse"}
                                             onCopy={() => this.setState({copied: true})}>
                                <button type="button" className="btn-primary btn-lg btn-dark">Copy</button>
                            </CopyToClipboard>
                        </div>
                    </div>
                </p>
            )))
    };

    render() {

        console.log(this.state.surveys);

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

export default Surveys;