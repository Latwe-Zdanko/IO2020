import React, {Component} from "react";
import {
    Button, ButtonDropdown, Card, CardBody, CardFooter, CardHeader, Col, DropdownItem, DropdownMenu,
    DropdownToggle, Form, FormGroup, Input, Label, Row
} from 'reactstrap';
import Fullscreen from "react-full-screen";
import "../App.css";
import AuthenticationService from "../service/AuthenticationService";
import {Redirect} from "react-router-dom";
import axios from 'axios'
import * as Survey from "survey-react";
import AddHighlightPopup from "./AddHighlightPopup";
import Tooltip from "reactstrap/es/Tooltip";

class AddMockupSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serverUrl: process.env.REACT_APP_SERVER_URL,
            mockupId: this.props.match.params.id,
            mockup: "",
            projectName: "",
            surveyName: "",
            questions: [],
            iframeWidth: '125%',
            iframeHeight: window.innerHeight * 1.2 - 140,
            scale: 'scale(0.80)',
            isFullscreen: false,
            isDropdownOpen: false,
            formDisplay: "block",
            previewDisplay: "none",
            buttonName: "Show Preview",
            showPopup: false,
            questionNumber: "",
            highlightList: [],
            isTooltipOpen: false
        };
        this.iframe = React.createRef();
        this.setMockup();
    }

    toggle = () => {
        const oldValue = this.state.isDropdownOpen;
        this.setState({isDropdownOpen: !oldValue})
    };

    toggleTooltip = () => {
        const oldValue = this.state.isTooltipOpen;
        this.setState({isTooltipOpen: !oldValue});
    };

    setMockup = () => {
        axios.get(this.state.serverUrl + '/mockups/id/' + this.state.mockupId, {
            headers: {authorization: AuthenticationService.getAuthToken()}
        })
            .then(response => {
                this.setState({
                    mockup: response.data
                });
                this.setProjectName();
            }).catch(error => alert("Error occurred: " + error.message));
    };

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
            iframeWidth: '110%',
            iframeHeight: window.innerHeight * 1.2 - 140,
            scale: 'scale(0.9)'
        })
    }

    handleFullscreenChange = (isFullscreen) => {
        this.setState({isFullscreen});
        if (!isFullscreen) this.setDefaultSize()
    };

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    handleQuestionChange = (event, index) => {
        const questions = this.state.questions;
        const name = event.target.name;
        questions[index][name] = event.target.value;
        this.setState({questions: questions});
    };

    handleStatementChange = (event, index, id) => {
        const questions = this.state.questions;
        questions[index].rows[id].value = event.target.value;
        this.setState({questions: questions});
    };

    handleChoiceChange = (event, index, id) => {
        const questions = this.state.questions;
        questions[index].choices[id] = event.target.value;
        this.setState({questions: questions});
    };

    handleRateDescriptionChange = (event, index, rate) => {
        const questions = this.state.questions;
        questions[index][rate] = event.target.value;
        this.setState({questions: questions});
    };

    submitSurvey = (e) => {
        e.preventDefault();
        axios.post(this.state.serverUrl + '/surveys/addMockupSurvey', {
            name: this.state.surveyName,
            mockupId: this.state.mockupId,
            body: {questions: this.state.questions}
        }, {headers: {authorization: AuthenticationService.getAuthToken()}})
            .then(response => {
                const url = this.state.serverUrl + "/highlights/add";
                this.state.highlightList.map(parameters => {
                        parameters["surveyId"] = response.data;
                        axios.post(url, null, {
                            params: parameters,
                            headers: {authorization: AuthenticationService.getAuthToken()}
                        })
                            .catch(r => alert(r));
                        alert("Survey has been added successfully");
                        window.location.href = "/mockupsurvey/" + response.data;
                    }
                );
            })
            .catch(error => alert("Error occurred: " + error.message + "\nSurvey could not be subbmited"));
    };

    addMatrixQuestion = (e) => {
        this.setState((previousState) => ({
            questions: [...previousState.questions, {
                isRequired: false,
                enableIf: true,
                columns: [{
                    value: 1, text: "Strongly Disagree"
                }, {
                    value: 2, text: "Disagree"
                }, {
                    value: 3, text: "Neutral"
                }, {
                    value: 4, text: "Agree"
                }, {
                    value: 5, text: "Strongly Agree"
                }],
                name: "",
                type: "matrix",
                title: "Please indicate if you agree or disagree with the following statements",
                rows: [{text: "", value: ""}]
            }]
        }))
    };

    addStatement = (e, index) => {
        const questions = this.state.questions;
        questions[index].rows.push({text: "", value: ""});
        this.setState({questions: questions});
    };

    addHighlight(e, index) {
        this.setState({
            questionNumber: index + 1,
            showPopup: !this.state.showPopup
        });
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }


    addOption = (e, index) => {
        const questions = this.state.questions;
        questions[index].choices.push("");
        this.setState({questions: questions});
    };

    addRatingQuestion = (e) => {
        this.setState((previousState) => ({
            questions: [...previousState.questions, {
                isRequired: false,
                enableIf: true,
                mininumRateDescription: "",
                maximumRateDescription: "",
                name: "",
                type: "rating",
                title: ""
            }]
        }))
    };

    addTextQuestion = (e) => {
        this.setState((previousState) => ({
            questions: [...previousState.questions, {
                isRequired: false,
                enableIf: true,
                name: "",
                title: "",
                type: "comment"
            }]
        }))
    };

    addRadiogroupQuestion = (e) => {
        this.setState((previousState) => ({
            questions: [...previousState.questions, {
                isRequired: false,
                enableIf: true,
                name: "",
                type: "radiogroup",
                title: "",
                choices: ["", ""]
            }]
        }))
    };

    deleteQuestion = (e, index) => {
        const questions = this.state.questions;
        questions.splice(index, 1);
        this.setState({questions: questions})
    };

    changePreviewVisibility = () => {
        if (this.state.previewDisplay === "none") {
            this.setState({previewDisplay: "block", formDisplay: "none", buttonName: "Hide Preview"})
        } else {
            this.setState({previewDisplay: "none", formDisplay: "block", buttonName: "Show Preview"})
        }
    };

    deleteQuestionButton = (index) => {
        return (<Col xs="12">
            <Button
                onClick={(event) => this.deleteQuestion(event, index)}
                className="btn btn-danger btn-margin-top">Delete Question
            </Button>
        </Col>)
    };

    getHighlightButtonComponent(index) {
        return (
            <Col>
                <Button
                    onClick={(event) => this.addHighlight(event, index)}
                    className="btn btn-survey btn-margin-top">Add Highlight
                </Button>
            </Col>
        )
    }


    render() {
        if (!AuthenticationService.isUserLoggedIn()) {
            return <Redirect to={"/"}/>
        }
        const survey = new Survey.Model({questions: this.state.questions});

        return (


            <div className="bg-light">

                <nav className="navbar navbar-expand-lg navbar-light navbar-secondary">
                    <span className="container float-left navbar-breadcrumbs">
                        <a href="/project">Projects</a> &ensp; / &ensp;
                        <a href={"/project/view/id/" + this.state.mockup.projectId}>{this.state.projectName}</a> &ensp; / &ensp;
                        <a href={"/mockup/view/" + this.state.mockup.id}>{this.state.mockup.name}</a> &ensp; / &ensp;
                        New survey
                    </span>
                    <span className="container float-right navbar-buttons">
                        <button className="btn btn-primary"
                                onClick={this.changePreviewVisibility}>{this.state.buttonName}</button>
                        <button className="btn btn-primary" onClick={this.setFullscreen}>Full Screen</button>
                        <button id="tooltipButton" className="btn btn-secondary"
                                onMouseOver={e => this.toggleTooltip()} onMouseOut={e => this.toggleTooltip()}>?</button>
                        <Tooltip placement="bottom" isOpen={this.state.isTooltipOpen} target="tooltipButton">
                            Add a highlight by marking two vertices of a rectangle and click 'Save'.
                            Highlights don't work with scrolling mockups.
                        </Tooltip>
                    </span>
                </nav>
                <Row>
                    <Col>
                        <div className="float-left" style={{width: "100%", padding: "5px"}}>
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
                        <Card style={{
                            display: this.state.previewDisplay,
                            marginRight: "10px",
                            overflow: "auto",
                            maxHeight: window.innerHeight - 140
                        }}>
                            <Survey.Survey
                                model={survey}
                            />
                        </Card>
                        <Card style={{
                            display: this.state.formDisplay,
                            marginRight: "10px",
                            overflow: "auto",
                            maxHeight: window.innerHeight - 140
                        }}>
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
                                        switch (value.type) {
                                            case "comment" : {
                                                return (
                                                    <FormGroup key={index}>
                                                        <Label for="question">Question {index + 1}.
                                                            <a className="text-secondary"> | Text Question </a>
                                                        </Label>
                                                        <Row form>
                                                            <Col xs="12">
                                                                <Input name="title"
                                                                       type="text"
                                                                       key={index}
                                                                       value={value.title}
                                                                       onChange={(e) => this.handleQuestionChange(e, index)}
                                                                >
                                                                </Input>
                                                            </Col>
                                                            {this.getHighlightButtonComponent(index)}
                                                            {this.deleteQuestionButton(index)}
                                                        </Row>
                                                        <hr></hr>
                                                    </FormGroup>
                                                )
                                            }
                                            case "matrix": {
                                                return (
                                                    <FormGroup key={index}>
                                                        <Label for="question">Question {index + 1}.
                                                            <a className="text-secondary"> | Matrix Question</a>
                                                        </Label>
                                                        <Row form>
                                                            <p>{value.title}</p>
                                                            {value.rows.map((row, id) => {
                                                                return (
                                                                    <Input name="statement"
                                                                           type="text"
                                                                           key={id}
                                                                           className="margin-top-5"
                                                                           value={row.value}
                                                                           placeholder={"Statement " + (id + 1)}
                                                                           onChange={(e) => this.handleStatementChange(e, index, id)}
                                                                    >
                                                                    </Input>
                                                                )
                                                            })}
                                                            <Col xs="12">
                                                                <Button
                                                                    onClick={(event) => this.addStatement(event, index)}
                                                                    className="btn btn-primary btn-margin-top">Add
                                                                    Statement
                                                                </Button>
                                                            </Col>
                                                            {this.getHighlightButtonComponent(index)}
                                                            {this.deleteQuestionButton(index)}
                                                        </Row>
                                                        <hr></hr>
                                                    </FormGroup>)
                                            }
                                            case "rating": {
                                                return (
                                                    <FormGroup key={index}>
                                                        <Label for="question">Question {index + 1}.
                                                            <a className="text-secondary"> | Rating Question </a>
                                                        </Label>
                                                        <Row form>
                                                            <Col xs="4">
                                                                <Label for="title">Question</Label>
                                                            </Col>
                                                            <Col xs="8">
                                                                <Input name="title"
                                                                       type="text"
                                                                       key={index}
                                                                       value={value.title}
                                                                       onChange={(e) => this.handleQuestionChange(e, index)}
                                                                >
                                                                </Input>
                                                            </Col>
                                                            <Col xs="4">
                                                                <Label for="minRateDesc">Minimum Rate</Label>
                                                            </Col>
                                                            <Col xs="8">
                                                                <Input name="minRateDesc"
                                                                       type="text"
                                                                       key={index}
                                                                       className="margin-top-5"
                                                                       value={value.mininumRateDescription}
                                                                       placeholder="Minimum Rate Description"
                                                                       onChange={(e) => this.handleRateDescriptionChange(e, index, "mininumRateDescription")}
                                                                >
                                                                </Input>
                                                            </Col>
                                                            <Col xs="4">
                                                                <Label for="maxRateDesc">Maximum Rate</Label>
                                                            </Col>
                                                            <Col xs="8">
                                                                <Input name="maxRateDesc"
                                                                       type="text"
                                                                       key={index}
                                                                       className="margin-top-5"
                                                                       value={value.maximumRateDescription}
                                                                       placeholder="Maximum Rate Description"
                                                                       onChange={(e) => this.handleRateDescriptionChange(e, index, "maximumRateDescription")}
                                                                >
                                                                </Input>
                                                            </Col>
                                                            {this.getHighlightButtonComponent(index)}
                                                            {this.deleteQuestionButton(index)}
                                                        </Row>
                                                        <hr/>
                                                    </FormGroup>
                                                )
                                            }
                                            case "radiogroup": {
                                                return (<FormGroup key={index}>
                                                    <Label for="question">Question {index + 1}.
                                                        <a className="text-secondary"> | RadioGroup Question </a>
                                                    </Label>
                                                    <Row form>
                                                        <Col xs="3">
                                                            <Label for="title">Question</Label>
                                                        </Col>
                                                        <Col xs="9">
                                                            <Input name="title"
                                                                   type="text"
                                                                   key={index}
                                                                   value={value.title}
                                                                   onChange={(e) => this.handleQuestionChange(e, index)}
                                                            >
                                                            </Input>
                                                        </Col>
                                                        <Col xs="3"><Label>Options</Label></Col>
                                                        <Col xs="9">
                                                            {value.choices.map((choice, id) => {
                                                                return (
                                                                    <Input name="choice"
                                                                           type="text"
                                                                           key={id}
                                                                           className="margin-top-5"
                                                                           value={choice}
                                                                           placeholder={"Option " + (id + 1)}
                                                                           onChange={(e) => this.handleChoiceChange(e, index, id)}
                                                                    >
                                                                    </Input>
                                                                )
                                                            })}
                                                        </Col>
                                                        <Col xs="12"><Button
                                                            onClick={(event) => this.addOption(event, index)}
                                                            className="btn btn-primary btn-margin-top">Add Option
                                                        </Button></Col>
                                                        {this.getHighlightButtonComponent(index)}
                                                    </Row>
                                                    {this.deleteQuestionButton(index)}
                                                    <hr/>
                                                </FormGroup>)
                                            }
                                        }
                                    })}
                                    <ButtonDropdown isOpen={this.state.isDropdownOpen} toggle={this.toggle}>
                                        <DropdownToggle caret>Add question</DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={(e) => this.addMatrixQuestion(e)}>Matrix
                                                question</DropdownItem>
                                            <DropdownItem onClick={(e) => this.addRatingQuestion(e)}>Rating
                                                question</DropdownItem>
                                            <DropdownItem onClick={(e) => this.addTextQuestion(e)}>Text
                                                question</DropdownItem>
                                            <DropdownItem onClick={(e) => this.addRadiogroupQuestion(e)}>Radiogroup
                                                question</DropdownItem>
                                        </DropdownMenu>
                                    </ButtonDropdown>
                                </CardBody>

                                <CardFooter>
                                    <Button className="btn btn-success"
                                            onClick={(e) => this.submitSurvey(e)}>Submit</Button>
                                </CardFooter>
                            </Form>
                        </Card>
                    </Col>
                </Row>
                {this.state.showPopup ?
                    <AddHighlightPopup
                        index={this.state.questionNumber}
                        mockupId={this.state.mockupId}
                        highlightList={this.state.highlightList}
                        closePopup={this.togglePopup.bind(this)}
                    />
                    : null
                }
            </div>

        );
    }
}

export default AddMockupSurvey;