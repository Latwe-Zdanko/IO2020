import React, {Component} from "react";
import "../App.css";
import "survey-react/survey.css";
import axios from 'axios';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import AuthenticationService from "../service/AuthenticationService";
import {Button} from "reactstrap";

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
        };

        let headers = {headers: {authorization: AuthenticationService.getAuthToken()}};

        axios.get(API_URL + '/surveys/all', headers)
            .then((response) => {
                this.setState({surveys: response.data});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    displaySurveys = (surveys) => {

        if (!surveys.length) return <p>No surveys</p>;
        return (
            surveys.map((survey) => (
                <div className="list-group-item">
                    <div style={{display: "inline", verticalAlign: "middle"}}>
                        <a href={"/surveys/" + survey.id + "/addResponse"}>{survey.name}</a>
                    </div>
                    <div style={{display: "inline", float: "right"}}>
                        <Button onClick={this.downloadJSON} value={survey.id} style={{marginRight: "10px"}}>Download in
                            JSON</Button>
                        <Button onClick={this.downloadCSV} value={survey.id}>Download in CSV</Button>
                    </div>
                </div>
            )))

    };

    render() {
        return (
            <div className="container" style={{marginTop: "60px"}}>
                <h1>Surveys</h1>
                <br/>
                <div className="list-group">
                    {this.displaySurveys(this.state.surveys)}
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