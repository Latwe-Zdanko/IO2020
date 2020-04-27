import React, {Component} from "react";
import "../App.css";
import '../styles/survey.css';
import "survey-react/survey.css";
import axios from 'axios';
import * as Survey from "survey-react";
import {Redirect} from "react-router-dom"

class Surveys extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: "",
            survey: {questions: {}},
            redirect: false,
            frontUrl: "http://localhost:3000",
            serverUrl: "http://localhost:8080"
        };
    }

    componentDidMount() {
        this.getSurveys();
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/surveys"/>
        }
    };

    getSurveys = () => {

        axios.get(this.state.serverUrl + '/surveys/all')
            .then((response) => {
                const data = response.data;
                const {id} = this.props.match.params;

                data.map((surv) => {
                    if (surv.id === id) {
                        const survey = JSON.parse(surv.body);
                        this.setState({id: surv.id, survey: survey})
                    }
                })
            })
            .catch(() => {
                console.log("Error");
            });
    };

    render() {

        const survey = new Survey.Model(this.state.survey);
        const surveyId = this.state.id;
        const url = this.state.serverUrl;

        const redirect = this.setRedirect;

        survey.onComplete.add(function (results) {
            axios.post(url + '/surveys/addResponse', {
                id: surveyId,
                answers: results.data
            })
                .then(function (response) {
                    console.log(response);
                    redirect();
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
        survey.showCompletedPage = false;

        return (
            <div className="wrapper">
                <div>
                    {this.renderRedirect()}
                    <Survey.Survey
                        model={survey}
                    />
                </div>
            </div>
        );
    }
}

export default Surveys;