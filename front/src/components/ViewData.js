import React, {Component} from "react";
import "../App.css";
import "survey-react/survey.css";
import axios from 'axios';
import AuthenticationService from "../service/AuthenticationService";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis,} from 'recharts';

class ViewData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            survey: {},
            answers: [],
            serverUrl: process.env.REACT_APP_SERVER_URL,
        };

        const headers = {headers: {authentication: AuthenticationService.getAuthToken()}};

        axios.get(this.state.serverUrl + '/surveys/' + this.props.match.params.id, headers)
            .then((response) => {
                const data = response.data;

                const answers = [];
                data.answers.map((answer) => {
                    answers.push(JSON.parse(answer));
                });
                this.setState({
                    answers: answers,
                    survey: JSON.parse(data.body)
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
                          barSize={40}
                >
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
            switch (question.type) {
                case "matrix":
                    answer["title"] = question.title;
                    answer["name"] = question.name;
                    answer["type"] = question.type;
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
                    answer["title"] = question.title;
                    answer["name"] = question.name;
                    answer["type"] = question.type;
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
                    answer["title"] = question.title;
                    answer["name"] = question.name;
                    answer["type"] = question.type;
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
                    answer["title"] = question.title;
                    answer["name"] = question.name;
                    answer["type"] = question.type;
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
        console.log(answers);
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
                <div style={{"background-color": "white"}}>
                    {this.displayAnswers(this.state.answers)}
                </div>
            )
        ) : null;

        return (
            <div className="wrapper" style={{"background-color": "white"}}>
                {displayAnswers}
            </div>
        );
    }
}

export default ViewData;