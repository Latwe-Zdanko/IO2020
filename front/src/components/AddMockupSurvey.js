import React, {Component} from "react";
import {Button, Card, CardBody, Form, FormGroup, Input, Label} from 'reactstrap';
import Fullscreen from "react-full-screen";
import "../App.css";
import AuthenticationService from "../service/AuthenticationService";
import {Redirect} from "react-router-dom";
import axios from 'axios'

class AddMockupSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serverUrl: "http://localhost:8080",
            mockupId: this.props.match.params.id,
            mockup: "",
            surveyName: "",
            questions: [],
            iframeWidth: '110%',
            iframeHeight: window.innerHeight,
            scale: 'scale(0.9)',
            panelVisible: true,
            isFull: false
        };
        this.iframe = React.createRef();
        this.setMockup();
    }

    setMockup = () => {
        let headers = {headers: {authorization: AuthenticationService.getAuthToken(), authentication: AuthenticationService.getAuthToken()}};
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

    handleSubmit = (e) =>{
        e.preventDefault();
        //TODO
    };

    addQuestion = () => {
        this.setState((previousState) => ({
            questions: [...previousState.questions, ""]
        }))
    };


    render() {
        if (!AuthenticationService.isUserLoggedIn()) {
            return <Redirect to={"/"}/>
        }

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light"
                     style={{position: "float-top", marginTop: "55px", marginBottom: "10px", height: "50px"}}>
                    <div className="float-left container">{this.state.surveyName}</div>

                    <Button style={{marginLeft: "5px"}} onClick={this.setFullscreen}>FullScreen</Button>

                </nav>
                <div className="container float-left" style={{width: window.screen.availWidth * 0.7}}>
                    <Fullscreen enabled={this.state.isFull} onChange={this.handleFullscreenChange}>
                        <iframe ref={this.iframe} title="content" frameBorder={0}
                                width={this.state.iframeWidth} height={this.state.iframeHeight}
                                style={{transform: this.state.scale, transformOrigin: '0 0'}}
                                src={this.state.mockup.source} allowFullScreen={true}
                        />
                    </Fullscreen>
                </div>
                <div className="container float-right" style={{width: window.screen.availWidth * 0.28}}>
                    <Card>
                        <CardBody>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label for="surveyName">Survey name: </Label>
                                    <Input name="surveyName"
                                           type="text"
                                           value={this.state.surveyName}
                                           onChange={this.handleChange}
                                    />
                                </FormGroup>
                                {this.state.questions.map((value, index) => {
                                    return(
                                        <FormGroup>
                                            <Label for="question">Question {index+1}.</Label>
                                            <Input name="question"
                                                   type="text"
                                                   key={index}
                                                   value={value}
                                                   onChange={(e) => this.handleQuestionChange(e, index)}
                                            />

                                        </FormGroup>
                                    )
                                })}

                                <FormGroup>
                                    <button className="btn btn-primary" onClick={this.addQuestion}>Add question</button>
                                </FormGroup>
                                <FormGroup>
                                    <Button onClick={this.handleSubmit}>Submit</Button>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        );
    }
}

export default AddMockupSurvey;