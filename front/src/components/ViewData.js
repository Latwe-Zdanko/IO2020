import React, {Component} from "react";
import "../App.css";
import "survey-react/survey.css";
import axios from 'axios';
import AuthenticationService from "../service/AuthenticationService";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis,} from 'recharts';

const API_URL = process.env.REACT_APP_SERVER_URL;

class ViewData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            surveyName: "",
            survey: {},
            answers: [],
        };

        const headers = {headers: {authorization: AuthenticationService.getAuthToken()}};

        axios.get(API_URL + '/surveys/' + this.props.match.params.id, headers)
            .then((response) => {
                const data = response.data;

                const answers = [];
                data.answers.map((answer) => {
                    answers.push(JSON.parse(answer));
                });
                this.setState({
                    answers: answers,
                    survey: JSON.parse(data.body),
                    surveyName: data.name
                });
                this.getDataFromJson()
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    createChart = (title, answers, output) => {
        let counts = {};
        let data = [];
        answers[1].forEach(function (x) {
            counts[x] = (counts[x] || 0) + 1;
        });
        answers[2].forEach((option) => {
            data.push({name: option, answers: counts[option]});
        });
        output.push(
            <div className="chart-div">
                <h3>{title}</h3>
                <BarChart className="chart"
                          width={600}
                          height={300}
                          data={data}
                          margin={{
                              top: 5, right: 30, left: 20, bottom: 5,
                          }}
                          barSize={40}>
                    <XAxis dataKey="name" scale="point" padding={{left: 20, right: 10}}/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Bar dataKey="answers" fill="#1ab394" background={{fill: '#eee'}}/>
                </BarChart>
            </div>
        )
    };

    createAnswerList = (question, output) => {

        let answers = [];
        question.questions[1].forEach((answer) => {
            answers.push(
                <div className="answer">
                    <p>{answer}</p>
                </div>
            )
        });
        output.push(
            <div className="answer-list-div">
                <h2 className="answer-list-title">{question.title}</h2>
                <div className="answer-list">
                    {answers}
                </div>
            </div>
        )
    };

    getDataFromJson = () => {
        const questions = this.state.survey.questions;

        if (questions === undefined) return;
        this.setState({
            questions: questions
        });
        const answers = [];
        let results = [];
        questions.map((question) => {
            const answer = {};
            answer["title"] = question.title;
            answer["name"] = question.name;
            answer["type"] = question.type;
            switch (question.type) {
                case "matrix":
                    answer["questions"] = [];
                    let choices = [];
                    question.columns.map((col) => {
                        choices.push(col.text);
                    });
                    question.rows.map((row) => {
                        results = [];
                        if (row.text !== "") {
                            this.state.answers.map((ans) => {
                                if (ans[question.name] !== undefined) {
                                    results.push(choices[ans[question.name][row.value]]);
                                }
                            });
                            answer["questions"].push([row.value, results, choices]);
                        }
                    });

                    answers.push(answer);
                    break;
                case "rating":
                    answer["min"] = question.mininumRateDescription;
                    answer["max"] = question.maximumRateDescription;
                    results = [];

                    this.state.answers.map((ans) => {
                        if (ans[question.name] !== undefined) {
                            results.push(ans[question.name]);
                        }
                    });
                    answer["questions"] = [question.title, results, [1, 2, 3, 4, 5]];
                    answers.push(answer);
                    break;
                case "comment":
                    results = [];
                    this.state.answers.map((ans) => {
                        if (ans[question.name] !== undefined) {
                            results.push(ans[question.name]);
                        }
                    });
                    answer["questions"] = [question.title, results];
                    answers.push(answer);

                    break;
                case "radiogroup":
                    results = [];
                    this.state.answers.map((ans) => {
                        if (ans[question.name] !== undefined) {
                            results.push(ans[question.name]);
                        }
                    });
                    answer["questions"] = [question.title, results, question.choices];
                    answers.push(answer);
                    break;
            }
        });

        this.setState({
            answers: answers
        });
    };

    displayAnswers = (answers) => {
        let output = [];
        answers.forEach((answer) => {
            switch (answer.type) {
                case "radiogroup":
                    this.createChart(answer.title, answer.questions, output);
                    break;
                case "rating":
                    this.createChart(answer.title, answer.questions, output);
                    break;
                case "matrix":
                    output.push(<h2>{answer.title}</h2>);
                    answer.questions.forEach((question) => {
                        this.createChart(question[0], question, output);
                    });
                    break;
                case "comment":
                    this.createAnswerList(answer, output);

            }
        });
        return output;
    };

    render() {
        const displayAnswers = (this.state.questions !== undefined) ? (
            (
                <div className="answer-div">
                    {this.displayAnswers(this.state.answers)}
                </div>
            )
        ) : null;

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light navbar-secondary">
                    <span className="container navbar-breadcrumbs">
                        {this.state.surveyName}
                    </span>
                </nav>
                {displayAnswers}
            </div>
        );
    }
}

export default ViewData;