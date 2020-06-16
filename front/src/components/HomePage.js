import React, {Component} from "react";
import AuthenticationService from "../service/AuthenticationService";
import {Redirect} from "react-router-dom";
import axios from "axios";
import {Col, ListGroup, ListGroupItem, Row, Toast, ToastBody, ToastHeader} from "reactstrap";

export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            serverUrl: process.env.REACT_APP_SERVER_URL,
            mockups: [],
            surveys: []
        };

        let headers = {headers: {authorization: AuthenticationService.getAuthToken()}};
        axios.get(this.state.serverUrl + '/mockups/recent', headers)
            .then((response) => {
                const data = response.data;
                this.setState({mockups: data});
            })
            .catch(response => {
                console.log("Error: " + response);
            });

        axios.get(this.state.serverUrl + '/surveys/recent', headers)
            .then((response) => {
                const data = response.data;
                this.setState({surveys: data});
                console.log(response.data)
            })
            .catch(response => {
                console.log("Error: " + response);
            });
    }

    getSurveyLink = (survey) => {
        if (survey.type === "mockup") {
            return "/mockupsurvey/" + survey.id
        } else return "/surveys/" + survey.id + "/addResponse"
    };

    render() {
        if (!AuthenticationService.isUserLoggedIn()) {
            return <Redirect to="/sign-in"/>
        }
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light navbar-secondary">
                    <span className="container float-left navbar-breadcrumbs"> Home
                    </span>
                </nav>
                <div style={{margin: "50px"}}>
                    <Row>
                        <Col xs="6" style={{display: "flex", flexDirection: "row-reverse"}}>
                            <Toast className="toast-list">
                                <ToastHeader>Recently Added Mockups</ToastHeader>
                                <ToastBody>
                                    <ListGroup flush>
                                        {this.state.mockups.map(mockup => {
                                            return <ListGroupItem tag="a" href={"/mockups/id/" + mockup.id}
                                                                  style={{backgroundColor: "rgba(255,255,255,0)"}}>{mockup.name}</ListGroupItem>
                                        })}
                                    </ListGroup><br/>
                                    <button className="btn btn-block btn-primary"
                                            onClick={(e) => window.location.href = "/mockup"}>View more
                                    </button>
                                </ToastBody>
                            </Toast>
                        </Col>
                        <Col xs="6" style={{display: "flex", flexDirection: "row"}}>
                            <Toast className="toast-list">
                                <ToastHeader>Recently Added Surveys</ToastHeader>
                                <ToastBody>
                                    <ListGroup flush>
                                        {this.state.surveys.map(survey => {
                                            return <ListGroupItem tag="a" href={this.getSurveyLink(survey)}
                                                                  style={{backgroundColor: "rgba(255,255,255,0)"}}>{survey.name}</ListGroupItem>
                                        })}
                                    </ListGroup><br/>
                                    <button className="btn btn-block btn-primary"
                                            onClick={(e) => window.location.href = "/surveys"}>View more
                                    </button>
                                </ToastBody>
                            </Toast>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}