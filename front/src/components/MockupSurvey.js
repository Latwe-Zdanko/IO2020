import React, {Component} from "react";
import {Button, Card, CardBody, FormGroup, Input, Label} from 'reactstrap';
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
            questions: "",
            iframeWidth: '110%',
            iframeHeight: window.innerHeight,
            scale: 'scale(0.9)',
            panelVisible: true,
            isFull: false
        };
        this.questions = '';
        this.iframe = React.createRef();

        let headers = {headers: {authorization: AuthenticationService.getAuthToken()}};

        axios.get(this.state.serverUrl + '/mockupsurvey/id/' + this.props.match.params.id, headers)
            .then(response => {
                this.setState({
                    mockupId: response.data.mockupId,
                    surveyName: response.data.name,
                });
                this.questions = response.data.questions;
                this.setMockup();
            }).catch(response =>
                console.log(response)
            // alert("Error: " + response)
        );


    }

    setMockup = () => {
        let headers = {headers: {authorization: AuthenticationService.getAuthToken()}};
        axios.get(this.state.serverUrl + '/mockups/id/' + this.state.mockupId, headers)
            .then(response => {
                console.log(response.data)
                this.setState({
                    mockup: response.data
                });
            }).catch(response =>
                console.log(response)
            // alert("Error: " + response)
        );
    };


    displayQuestions = (questions) => {
        let list = [];
        let i = 1;

        while (questions[i]) {
            list.push(
                <FormGroup>
                    <Label for="question">{i}. {questions[i]}</Label>
                    <Input name="question"
                           type="text"
                    />
                </FormGroup>)
            i++;
        }
        return list;
    };


    setFullscreen = () => {
        this.setState({
            isFull: true,
            iframeWidth: window.screen.availWidth,
            iframeHeight: window.screen.availHeight,
            scale: 'scale(1)'
        });
    };

    setDefaultSize(){
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

    showQuestions = () => {

    };
    hideQuestions = () => {

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
                        <Button style={{marginLeft: "5px"}} onClick={this.showQuestions}>Questions</Button>

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
                            {this.displayQuestions(this.questions)}
                        </CardBody>
                    </Card>
                </div>
            </div>
        );
    }
}

export default MockupSurvey;