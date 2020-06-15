import React, {Component} from "react";
import {Container} from 'reactstrap';
import "../App.css";
import AuthenticationService from "../service/AuthenticationService";
import {Redirect} from "react-router-dom";
import axios from 'axios'

function startRecording(stream) {
    let recorder = new MediaRecorder(stream)
    let data = []

    recorder.ondataavailable = event => data.push(event.data)
    recorder.start()

    let stopped = new Promise((resolve, reject) => {
        recorder.onstop = resolve
        recorder.onerror = event => reject(event.name)
    })

    return stopped.then(() => data)
}

class ViewMockup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serverUrl: process.env.REACT_APP_SERVER_URL,
            mockup: "",
            projectName: "",
            iframeWidth: '110%',
            iframeHeight: window.innerHeight,
            scale: 'scale(0.9)'
        };
        this.iframe = React.createRef();

        let headers = {headers: {authorization: AuthenticationService.getAuthToken()}};
        axios.get(this.state.serverUrl + '/mockups/id/' + this.props.match.params.id, headers)
            .then(response => {
                this.setState({
                    mockup: response.data
                });
                this.setProjectName();
            }).catch(response =>
            alert("Error: " + response)
        );
    }

    setProjectName() {
        let headers = {headers: {authorization: AuthenticationService.getAuthToken()}};
        axios.get(this.state.serverUrl + '/projects/id/' + this.state.mockup.projectId, headers)
            .then((response) => {
                this.setState({projectName: response.data.name});
            })
            .catch(response => {
                console.log("Error: " + response);
            });
    }

    getSourceLink() {
        return this.state.mockup.source;
    }

    createSurvey = () => {
        window.location.href = "/mockupsurvey/add/" + this.state.mockup.id
    };

    startButton() {
        let displayMediaOptions = {
            video: {
                cursor: "always"
            },
            audio: false
        }
        let video = document.getElementById("video")
        navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
            .then(stream => {
                video.srcObject = stream
                return new Promise(resolve => video.onplaying = resolve)
            })
            .then(() => {
                let startButton = document.getElementById("startButton")
                let stopButton = document.getElementById("stopButton")
                startButton.hidden = true;
                stopButton.hidden = false;
                return startRecording(video.captureStream())
            })
            .then(recordedChunks => {
                let a = document.createElement('a');
                a.href = window.URL.createObjectURL(new Blob(recordedChunks, {type: "video/webm"}));
                a.download = "Recording.webm";
                a.click();
            })
    }

    stopButton() {
        let video = document.getElementById("video")
        video.srcObject.getTracks().forEach(track => track.stop())
        let startButton = document.getElementById("startButton")
        let stopButton = document.getElementById("stopButton")
        startButton.hidden = false;
        stopButton.hidden = true;
    }

    render() {
        if (!AuthenticationService.isUserLoggedIn()) {
            return <Redirect to={"/"}/>
        }
        return (
            <div className="bg-light">
                <video id="video" hidden autoPlay/>
                <nav className="navbar navbar-expand-lg navbar-light navbar-secondary">
                    <span className="container float-left navbar-breadcrumbs">
                        <a href="/project">Projects</a> &ensp; / &ensp;
                        <a href={"/project/view/" + this.state.mockup.projectId}>{this.state.projectName}</a> &ensp; / &ensp;
                        {this.state.mockup.name}
                    </span>
                    <span className="container float-right navbar-buttons">
                        <button className="btn btn-primary" id="startButton"
                                onClick={this.startButton}>Start recording</button>
                        <button className="btn btn-primary" hidden id="stopButton"
                                onClick={this.stopButton}>Stop recording and download</button>
                        <button className="btn btn-primary"
                                onClick={this.createSurvey}>Create Survey</button>
                    </span>
                </nav>
                <Container style={{overflowX: 'hidden'}}>
                    <iframe ref={this.iframe} title="content" frameBorder={0}
                            width={this.state.iframeWidth} height={this.state.iframeHeight}
                            style={{transform: this.state.scale, transformOrigin: '0 0'}}
                            src={this.getSourceLink()} allowFullScreen={true}/>
                </Container>
            </div>
        );
    }
}

export default ViewMockup;