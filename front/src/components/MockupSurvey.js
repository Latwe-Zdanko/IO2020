import React, {Component} from "react";
import {Button, Card, CardBody, Col, Row} from 'reactstrap';
import Fullscreen from "react-full-screen";
import "../App.css";
import AuthenticationService from "../service/AuthenticationService";
import {Redirect} from "react-router-dom";
import axios from 'axios'
import * as Survey from "survey-react";
import HighlightPopup from "./HighlightPopup";

class MockupSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serverUrl: process.env.REACT_APP_SERVER_URL,
            mockupId: "",
            mockup: "",
            surveyName: "",
            questions: [],
            iframeWidth: '125%',
            iframeHeight: window.innerHeight * 1.2 - 100,
            scale: 'scale(0.8)',
            isFullscreen: false,
            answers: [],
            id: "",
            survey: {questions: {}},
            redirect: false,
            showPopup: false
        };
        this.iframe = React.createRef();

        let headers = {headers: {authorization: AuthenticationService.getAuthToken()}};
        axios.get(this.state.serverUrl + '/surveys/' + this.props.match.params.id, headers)
            .then(response => {
                this.setState({
                    mockupId: response.data.mockupId,
                    surveyName: response.data.name,
                });
                this.setState({questions: response.data.questions});
                this.setMockup();
            }).catch(error => alert("Error occurred: " + error.message));
    }

    componentDidMount() {
        this.getSurveys();
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/surveys"/>
        }
    };

    getSurveys = () => {
        axios.get(this.state.serverUrl + '/surveys/all', {headers: {authorization: AuthenticationService.getAuthToken()}})
            .then((response) => {
                const data = response.data;
                const {id} = this.props.match.params;

                data.map((survey) => {
                    if (survey.id === id) {
                        const tmp = JSON.parse(survey.body);
                        this.setState({id: survey.id, survey: tmp})
                    }
                })
            })
            .catch(error => alert("Error occurred: " + error.message));
    };

    setMockup = () => {
        let headers = {
            headers: {
                authorization: AuthenticationService.getAuthToken()
            }
        };
        axios.get(this.state.serverUrl + '/mockups/id/' + this.state.mockupId, headers)
            .then(response => {
                this.setState({
                    mockup: response.data
                });
            }).catch(error => alert("Error occurred: " + error.message));
    };

    setFullscreen = () => {
        this.setState({
            isFullscreen: true,
            iframeWidth: window.screen.availWidth,
            iframeHeight: window.screen.availHeight,
            scale: 'scale(1)'
        });
    };

    setDefaultSize() {
        this.setState({
            iframeWidth: '125%',
            iframeHeight: window.innerHeight * 1.2,
            scale: 'scale(0.8)'
        })
    }

    handleFullscreenChange = (isFullscreen) => {
        this.setState({isFullscreen});
        if (!isFullscreen) this.setDefaultSize()
    };

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }


    render() {
        if (!AuthenticationService.isUserLoggedIn()) {
            return <Redirect to={"/"}/>
        }

        const survey = new Survey.Model(this.state.survey);
        const surveyId = this.state.id;
        const url = this.state.serverUrl;

        const redirect = this.setRedirect;

        survey.onComplete.add(function (results) {
            axios.post(url + '/surveys/addResponse', {
                id: surveyId,
                answers: results.data
            }, {headers: {authorization: AuthenticationService.getAuthToken()}})
                .then(function (response) {
                    redirect();
                })
                .catch(error => alert("Error occurred: " + error.message + "\nSurvey could not be subbmited"));
        });
        survey.showCompletedPage = false;

        return (
            <div className="bg-light">
                <nav className="navbar navbar-expand-lg navbar-light navbar-secondary">
                    <span className="float-left container">{this.state.surveyName}</span>
                    <span className="container float-right navbar-buttons ">
                        <button
                            onClick={() => this.togglePopup()}
                            className="btn btn-primary">Toggle Highlight
                        </button> {" "}
                        <button className="btn btn-primary"
                                onClick={this.setFullscreen}>FullScreen
                        </button>
                    </span>
                </nav>
                <Row>
                    <Col>
                        <div style={{width: "100%", padding: "5px"}}>
                            <Fullscreen enabled={this.state.isFullscreen} onChange={this.handleFullscreenChange}>
                                <iframe ref={this.iframe} title="content" frameBorder={0}
                                        width={this.state.iframeWidth} height={this.state.iframeHeight}
                                        style={{transform: this.state.scale, transformOrigin: '0 0'}}
                                        src={this.state.mockup.source} allowFullScreen={true}
                                />
                            </Fullscreen>
                        </div>
                    </Col>
                    <Col xs="12" md="4">
                        <Card style={{marginRight: "10px"}}>
                            <CardBody>
                                <div>
                                    {this.renderRedirect()}
                                    <Survey.Survey
                                        model={survey}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {this.state.showPopup ?
                    <HighlightPopup
                        surveyId={this.state.id}
                        closePopup={this.togglePopup.bind(this)}
                    />
                    : null
                }
            </div>
        );
    }
}

export default MockupSurvey;