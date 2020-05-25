import axios from 'axios'
import React, {Component} from "react";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";

class SurveyExport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            survey: -1,
            frontUrl: "http://localhost:3000",
            serverUrl: "http://localhost:8080"
        }
    }

    componentDidMount() {
        let survey_id = window.location.href
        survey_id = survey_id.replace(this.state.frontUrl + "/surveyexport/", "")
        axios.get(this.state.serverUrl + "/surveys/" + survey_id)
            .then((response) => {
                this.setState({survey: response.data})
            })
    }

    render() {
        return (
            <div className="container">
                <br/>
                <br/>
                <br/> {/*TODO: To nie powinno być w ten sposób, ale póki co działa - poprawię później*/}
                <div id="survey_id" style={{display: "none"}}>{this.state.survey.id}</div>
                <Link to="/surveyexport">
                    <Button className="homeButton">
                        Back to survey list
                    </Button>
                </Link>
                <h1>Survey {this.getSurveyName()}</h1>
                <Button onClick={this.downloadJSON}>Download in JSON</Button>
                <Button onClick={this.downloadCSV}>Download in CSV</Button>
            </div>
        )
    }

    getSurveyName() {
        return this.state.survey.name
    }

    downloadJSON() {
        axios.get("http://localhost:8080/surveys/" + document.getElementById("survey_id").innerText)
            .then((response) => {
                let result = response.data.answers
                let JSONResult = JSON.stringify(result)
                let blob = new Blob([JSONResult])
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'export.json';
                a.click();
            })
    }

    downloadCSV() {
        axios.get("http://localhost:8080/surveys/" + document.getElementById("survey_id").innerText)
            .then((response) => {
                let answers = response.data.answers
                let questions = response.data.body
                let result = ""
                questions = JSON.parse(questions)
                questions = questions.questions
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
                for (let i = 0; i < questionsArray.length; i++) {
                    result += questionsArray[i] + ','
                }
                result = result.slice(0, -1) + '\n'
                for (let i = 0; i < answers.length; i++) {
                    let answer = JSON.parse(answers[i])
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
                        result += questionAnswer + ','
                    }
                    result = result.slice(0, -1) + '\n'
                }
                let blob = new Blob([result])
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'export.csv';
                a.click();
            })
    }
}

export default SurveyExport;
