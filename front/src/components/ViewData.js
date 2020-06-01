import React, {Component} from "react";
import "../App.css";
import "survey-react/survey.css";
import axios from 'axios';
import AuthenticationService from "../service/AuthenticationService";

class ViewData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            survey: {},
            answers: [],
            serverUrl: process.env.REACT_APP_SERVER_URL
        };

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
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
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getDataFromJson = () => {
        const questions = this.state.survey.questions;
        if (questions === undefined) return;

        console.log(questions, this.state.answers);
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
                    question.rows.map((row) => {
                        results = [];
                        this.state.answers.map((ans) => {
                            if (ans[question.name] !== undefined) {
                                results.push(ans[question.name][row.value]);
                            }
                        });
                        answer["questions"].push([row.value, results]);
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
                    answer["questions"] = [question.title, results];
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
                    answer["questions"] = [question.title, results];
                    answers.push(answer);
                    break;
            }
        });
        console.log(answers);
    };

    render() {
        return (
            <div className="wrapper">
                <div>
                    {this.getDataFromJson()}
                </div>
            </div>
        );
    }
}

export default ViewData;