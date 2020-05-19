import React, {Component} from "react";
import {Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import Fullscreen from "react-full-screen";
import "../App.css";
import AuthenticationService from "../service/AuthenticationService";
import {Redirect} from "react-router-dom";
import axios from 'axios'

class MockupSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serverUrl: "http://localhost:8080",
            mockupId: "",
            mockup: "",
            surveyName: "",
            questions: [],
            iframeWidth: '125%',
            iframeHeight: window.innerHeight,
            scale: 'scale(0.8)',
            panelVisible: true,
            isFull: false,
            answers: []
        };
        this.iframe = React.createRef();

        let headers = {headers: {authorization: AuthenticationService.getAuthToken()}};

        axios.get(this.state.serverUrl + '/mockupsurvey/id/' + this.props.match.params.id, headers)
            .then(response => {
                console.log(response)
                this.setState({
                    mockupId: response.data.mockupId,
                    surveyName: response.data.name,
                });
                this.setState({questions: response.data.questions});
                for (let i = 0; i < response.data.questions.length; i++) {
                    this.state.answers.push('');
                }
                this.setMockup();
            }).catch(response =>
            console.log(response)
        );
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
            iframeWidth: '125%',
            iframeHeight: window.innerHeight,
            scale: 'scale(0.8)'
        })
    }

    handleFullscreenChange = (isFull) => {
        this.setState({isFull});
        if (!isFull) this.setDefaultSize()
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const url = this.state.serverUrl + "/mockupsurvey/addAnswer";
        let configuration = {
            params: {surveyId: this.props.match.params.id, answers: this.state.answers.toString()},
            headers: {
                authentication: AuthenticationService.getAuthToken(),
                authorization: AuthenticationService.getAuthToken()
            }
        };
        axios.post(url, {
            surveyId: this.props.match.params.id,
            answers: this.state.answers.toString()
        }, configuration).then(r => console.log(r.statusText));
    };

    handleAnswerChange(e, index) {
        this.state.answers[index] = e.target.value;
        this.setState({answers: this.state.answers});
    }

    render() {
        if (!AuthenticationService.isUserLoggedIn()) {
            return <Redirect to={"/"}/>
        }

        return (
            <div style={{background: "rgb(205,205,205)", overflowX: "hidden"}}>
                <nav className="navbar navbar-expand-lg navbar-light"
                     style={{position: "float-top", marginTop: "55px", marginBottom: "10px", height: "50px"}}>
                    <div className="float-left container">{this.state.surveyName}</div>
                    <Button className="btn-secondary" style={{marginLeft: "5px"}}
                            onClick={this.setFullscreen}>FullScreen</Button>
                </nav>
                <Row>
                    <Col>
                        <div style={{width: "100%", padding: "5px"}}>
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
                            <CardBody>
                                <Form onSubmit={this.handleSubmit}>
                                    {this.state.answers.map((value, index) => (
                                        <FormGroup>
                                            <Label for="question">{this.state.questions[index]}</Label>
                                            <Input name="question"
                                                   type="text"
                                                   key={index}
                                                   value={value}
                                                   onChange={(e) => this.handleAnswerChange(e, index)}
                                            />
                                        </FormGroup>
                                    ))}
                                    <Button>Submit</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default MockupSurvey;