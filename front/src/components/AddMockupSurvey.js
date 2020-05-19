import React, {Component} from "react";
import {Button, Card, CardBody, CardFooter, CardHeader, Form, FormGroup, Input, Label} from 'reactstrap';
import Fullscreen from "react-full-screen";
import "../App.css";
import AuthenticationService from "../service/AuthenticationService";
import {Redirect} from "react-router-dom";
import axios from 'axios'
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";

class AddMockupSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serverUrl: "http://localhost:8080",
            mockupId: this.props.match.params.id,
            mockup: "",
            surveyName: "",
            questions: [],
            iframeWidth: '125%',
            iframeHeight: window.innerHeight,
            scale: 'scale(0.80)',
            panelVisible: true,
            isFull: false
        };
        this.iframe = React.createRef();
        this.setMockup();
    }

    setMockup = () => {
        let headers = {
            headers: {
                authorization: AuthenticationService.getAuthToken(),
                authentication: AuthenticationService.getAuthToken()
            }
        };
        axios.get(this.state.serverUrl + '/mockups/id/' + this.state.mockupId, headers)
            .then(response => {
                console.log(response.data);
                this.setState({
                    mockup: response.data
                });
            }).catch(response =>
            console.log(response)
        );
    };

    setFullscreen = () => {
        this.setState({
            isFull: true,
            iframeWidth: window.screen.availWidth,
            iframeHeight: window.screen.availHeight,
            scale: 'scale(1)'
        });
    };

    setDefaultSize() {
        this.setState({
            iframeWidth: '110%',
            iframeHeight: window.innerHeight,
            scale: 'scale(0.9)'
        })
    }

    handleFullscreenChange = (isFull) => {
        this.setState({isFull});
        if (!isFull) this.setDefaultSize()
    };

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    handleQuestionChange = (event, index) => {
        const questions = this.state.questions;
        questions[index] = event.target.value;
        this.setState({questions: questions});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const url = this.state.serverUrl + "/mockupsurvey/add";
        const name = this.state.surveyName;
        const q = this.state.questions.toString();
        let config = {
            params: {surveyName: name, questions: q, mockupId: this.state.mockupId},
            headers: {
                authorization: AuthenticationService.getAuthToken(),
                authentication: AuthenticationService.getAuthToken()
            }
        };
        axios.post(url, null, config)
            .then(alert("Survey has been added successfully"))
            .then(response => this.handleRedirect(response))
            .catch(r => alert(r))
    };


    handleRedirect = (response) => {
        const id = response.data;
        window.location.href = '/mockupsurvey/' + id;
        // window.location.href = '/surveys/';
    };

    addQuestion = (e) => {
        this.setState((previousState) => ({
            questions: [...previousState.questions, ""]
        }))
    };

    deleteQuestion = (e, index) => {
        let questionsList = [];
        const currentQuestions = this.state.questions;
        for (let i = 0; i < currentQuestions.length; i++) {
            if (i != index) questionsList.push(currentQuestions[i]);
        }
        this.setState({questions: questionsList})
    };

    render() {
        if (!AuthenticationService.isUserLoggedIn()) {
            return <Redirect to={"/"}/>
        }

        return (
            <div style={{background: "rgb(205,205,205)", overflowX: "hidden"}}>
                <nav className="navbar navbar-expand-lg navbar-light"
                     style={{position: "float-top", marginTop: "55px", marginBottom: "10px", height: "50px"}}>

                    <div className="container" style={{textAlign: "left", display: "inline-block"}}>
                        <a href="/surveys">Surveys</a>
                        <a>&ensp; / &ensp;New Survey</a>
                    </div>

                    <div className="container float-right" style={{textAlign: "right", display: "inline-block"}}>
                        <Button className="btn-secondary" onClick={this.setFullscreen}>FullScreen</Button>
                    </div>
                </nav>
                <Row>
                    <Col>
                        <div className="float-left" style={{width: "100%", padding: "5px"}}>
                            <Fullscreen enabled={this.state.isFull} onChange={this.handleFullscreenChange}>
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
                            <Form>
                                <CardHeader>
                                    <FormGroup>
                                        <Label for="surveyName">Survey name: </Label>
                                        <Input name="surveyName" type="text"
                                               value={this.state.surveyName}
                                               onChange={this.handleChange}>
                                        </Input>
                                    </FormGroup>
                                </CardHeader>
                                <CardBody>
                                    {this.state.questions.map((value, index) => {
                                        return (
                                            <FormGroup>
                                                <Label for="question">Question {index + 1}.</Label>
                                                <Row form>
                                                    <Col>
                                                        <Input name="question"
                                                               type="text"
                                                               key={index}
                                                               value={value}
                                                               onChange={(e) => this.handleQuestionChange(e, index)}>
                                                        </Input>
                                                    </Col>
                                                    <Col xs="3">
                                                        <Button onClick={(event) => this.deleteQuestion(event, index)}
                                                                className="btn btn-danger">Delete
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </FormGroup>
                                        )
                                    })}
                                    <Button onClick={(e) => this.addQuestion(e)}>Add question</Button>
                                </CardBody>

                                <CardFooter>
                                    <Button className="btn-success"
                                            onClick={(e) => this.handleSubmit(e)}>Submit</Button>
                                </CardFooter>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AddMockupSurvey;