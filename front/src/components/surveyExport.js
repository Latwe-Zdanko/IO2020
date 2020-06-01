import axios from 'axios'
import React, {Component} from "react";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import AuthenticationService from "../service/AuthenticationService";

function fileDownloadFromData(filename, data) {
    let a = document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([data]));
    a.download = filename;
    a.click();
}

class SurveyExport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            survey: "",
            frontUrl: "http://localhost:3000",
            serverUrl: "http://localhost:8080"
        }
    }

    componentDidMount() {
        axios.get(this.state.serverUrl + "/surveys/" + this.props.match.params.id,
            {headers: {authorization: AuthenticationService.getAuthToken()}})
            .then((response) => {
                this.setState({survey: response.data})
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="container" style={{marginTop: "60px"}}>
                <div id="survey_id" style={{display: "none"}}>{this.state.survey.id}</div>
                <Link to="/surveyexport">
                    <Button className="homeButton">
                        Back to survey list
                    </Button>
                </Link>
                <h1>Survey {this.state.survey.name}</h1>
                <Button onClick={this.downloadJSON}>Download in JSON</Button>
                <Button onClick={this.downloadCSV}>Download in CSV</Button>
            </div>
        )
    }

    downloadJSON() {
        axios.get("http://localhost:8080/surveys/" + document.getElementById("survey_id").innerText,
            {headers: {authorization: AuthenticationService.getAuthToken()}})
            .then((response) => {
                let result = response.data.answers
                let JSONResult = JSON.stringify(result)
                fileDownloadFromData('export.json', JSONResult)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    downloadCSV() {
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

        axios.get("http://localhost:8080/surveys/" + document.getElementById("survey_id").innerText,
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

export default SurveyExport;
