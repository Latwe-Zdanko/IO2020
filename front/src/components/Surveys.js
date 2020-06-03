import React, {Component} from "react";
import "../App.css";
import "survey-react/survey.css";
import axios from 'axios';
import AuthenticationService from "../service/AuthenticationService";
import {Badge, Button, Col, ListGroup, ListGroupItem, Row, Table} from "reactstrap";
import {SurveyQuestionBoolean} from "survey-react";

class Surveys extends Component {

    constructor(props) {
        super(props);

        this.state = {
            surveys: [],
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

    handleRedirect = (event, survey) => {
        event.stopPropagation();
        if (event.target.id === "export") return;
        if (survey.type === "mockup") {
            window.location.href = "/mockupsurvey/" + survey.id
        } else {
            window.location.href = "/surveys/" + survey.id + "/addResponse"
        }
    };

    mockupSurveyBadge = (survey) => {
        if (survey.type == "mockup") {
            return <Badge pill style={{backgroundColor: "rgba(28,125,232,0.85)"}}>mockup survey</Badge>
        }
    };

    displaySurveys = (surveys) => {

        if (!surveys.length) return;

        return (
            surveys.map((survey) => (
                <ListGroupItem tag="button" action onClick={e => this.handleRedirect(e, survey)}>
                    {survey.name}
                    <Button id="export" className="btn-light float-right">Export results</Button><br/>
                    {this.mockupSurveyBadge(survey)}
                </ListGroupItem>
            )))
    };

    addSurvey = (e) => {
        window.location.href = "/surveys/addSurvey"
    };

    render() {

        console.log(this.state.surveys);

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light "
                     style={{position: "float-top", marginTop: "55px", marginBottom: "10px"}}>
                    <span className="container float-left"
                          style={{textAlign: "left", display: "inline", justifyContent: "start"}}>
                        Surveys
                    </span>
                    <span className="container float-right" style={{textAlign: "right", display: "inline"}}>
                        <button className="btn btn-primary" onClick={e => this.addSurvey(e)}> Add New Survey</button>
                    </span>
                </nav>
            <div className="auth-wrapper">
                <div className="auth-inner" style={{width: window.screen.width * 0.5}}>
                    <h2>Surveys</h2>
                    <br/>
                    <ListGroup>
                        {this.displaySurveys(this.state.surveys)}
                        <ListGroupItem tag="button" action onClick={e => this.addSurvey(e)} style={{textAlign: "center", fontSize: "144%"}}>+</ListGroupItem>
                    </ListGroup>
                    {/*<Button className="btn-block" style={{marginTop: "10px"}} onClick={e => this.addSurvey(e)}>*/}
                    {/*    Add Survey</Button>*/}
                </div>
            </div>
            </div>
        );
    }
}

export default Surveys;