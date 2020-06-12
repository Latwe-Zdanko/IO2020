import React, {Component} from "react";
import "../App.css";
import "survey-react/survey.css";
import axios from 'axios';
import AuthenticationService from "../service/AuthenticationService";
import {Badge, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, ListGroup, ListGroupItem} from "reactstrap";

function fileDownloadFromData(filename, data) {
    let a = document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([data]));
    a.download = filename;
    a.click();
}

const API_URL = process.env.REACT_APP_SERVER_URL;

class Surveys extends Component {

    constructor(props) {
        super(props);

        this.state = {
            surveys: [],
            isDropdownOpen: []
        };

        let headers = {headers: {authorization: AuthenticationService.getAuthToken()}};

        axios.get(API_URL + '/surveys/all', headers)
            .then((response) => {
                this.setState({surveys: response.data});
                let list = [];
                for (let i = 0; i < this.state.surveys.length; i++) list.push(false);
                this.setState({isDropdownOpen: list})
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

    toggle = (index) => {
        const list = this.state.isDropdownOpen;
        list[index] = !list[index]
        this.setState({isDropdownOpen: list})
    };

    displaySurveys = (surveys) => {

        if (!surveys.length) return <p>No surveys</p>;

        return (
            surveys.map((survey, index) => (
                <ListGroupItem tag="button" action onClick={e => this.handleRedirect(e, survey)}>
                    {survey.name}

                    <ButtonDropdown className="float-right"
                                    isOpen={this.state.isDropdownOpen[index]} toggle={e => this.toggle(index)}>
                        <DropdownToggle id="export" caret className="btn btn-light">Export Results</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem id="export" value={survey.id}
                                          onClick={(e) => this.downloadCSV(e)}>CSV</DropdownItem>
                            <DropdownItem id="export" value={survey.id}
                                          onClick={(e) => this.downloadJSON(e)}>JSON</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>

                    &ensp;{this.mockupSurveyBadge(survey)}
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
                            <ListGroupItem tag="button" action onClick={e => this.addSurvey(e)}
                                           style={{textAlign: "center", fontSize: "144%"}}>+</ListGroupItem>
                        </ListGroup>
                    </div>
                </div>
            </div>
        );
    }


    downloadJSON(event) {
        let survey_id = event.target.value;
        axios.get(API_URL + "/surveys/" + survey_id,
            {headers: {authorization: AuthenticationService.getAuthToken()}})
            .then((response) => {
                let result = response.data.answers;
                let JSONResult = JSON.stringify(result);
                fileDownloadFromData('export.json', JSONResult)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    downloadCSV(event) {
        function getQuestionsFromJSON(questions) {
            let questionsArray = []
            for (let i = 0; i < questions.length; i++) {
                if (questions[i].type === "matrix") {
                    for (let j = 0; j < questions[i].rows.length; j++) {
                        questionsArray.push(questions[i].rows[j].value)
                    }
                } else {
                    questionsArray.push(questions[i].name)
                }
            }
            for (let i = questionsArray.length - 1; i >= 0; i--) {
                if (questionsArray[i] === "") {
                    questionsArray.splice(i, 1)
                }
            }
            return questionsArray;
        }

        function convertAnswerToCSV(questionsArray, answer) {
            let csvAnswer = ""
            for (let j = 0; j < questionsArray.length; j++) {
                let question = questionsArray[j]
                let questionAnswer = answer[question]
                if (typeof questionAnswer === 'undefined') {
                    for (let key in answer) {
                        if (typeof questionAnswer === 'undefined' && answer.hasOwnProperty(key)) {
                            questionAnswer = answer[key][question]
                        }
                    }
                }
                if (typeof questionAnswer === 'undefined') {
                    questionAnswer = ""
                }
                csvAnswer += questionAnswer + ','
            }
            csvAnswer = csvAnswer.slice(0, -1) + '\n'
            return csvAnswer
        }

        function convertQuestionsToCSV(questionsArray) {
            let csvQuestions = ""
            for (let i = 0; i < questionsArray.length; i++) {
                csvQuestions += questionsArray[i] + ','
            }
            csvQuestions = csvQuestions.slice(0, -1) + '\n'
            return csvQuestions;
        }

        let survey_id = event.target.value
        axios.get(API_URL + "/surveys/" + survey_id,
            {headers: {authorization: AuthenticationService.getAuthToken()}})
            .then((response) => {
                let answers = response.data.answers
                let questions = (JSON.parse(response.data.body)).questions
                let csvResult = ""
                let questionsArray = getQuestionsFromJSON(questions);
                csvResult += convertQuestionsToCSV(questionsArray);
                for (let i = 0; i < answers.length; i++) {
                    let answer = JSON.parse(answers[i])
                    csvResult += convertAnswerToCSV(questionsArray, answer);
                }
                fileDownloadFromData('export.csv', csvResult)
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export default Surveys;