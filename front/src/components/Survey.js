import React, {Component} from "react";
import "../App.css";
import '../styles/survey.css';
import "survey-react/survey.css";
import axios from 'axios';
import * as Survey from "survey-react";


class Surveys extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: "",
            survey: {questions: {}}
        };
    }

    componentDidMount() {
        this.getSurveys();
    }

    getSurveys = () => {

        axios.get('http://localhost:8080/surveys/all')
            .then((response) => {
                const data = response.data;
                const {id} = this.props.match.params;
                fetch(`http://localhost:3000/surveys/${id}`)
                    .then(() => {
                        data.map((surv) => {
                            if (surv.id === id) {
                                const survey = JSON.parse(surv.body);
                                this.setState({id: surv.id, survey: survey})
                            }
                        })
                    })

            })
            .catch(() => {
                console.log("Error");
            });
    };

    render() {

        const survey = new Survey.Model(this.state.survey);
        const surveyId = this.state.id;

        survey.onComplete.add(function (results) {
            axios.post('http://localhost:8080/surveys/addanswers', {
                id: surveyId,
                answers: results.data
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
        survey.showCompletedPage = true;

        return (
            <div className="wrapper">
                <div className="surveys">
                    <Survey.Survey
                        model={survey}
                    />
                </div>
            </div>
        );
    }
}

export default Surveys;