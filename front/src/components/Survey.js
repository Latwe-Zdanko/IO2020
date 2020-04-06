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
            survey: {questions:{}}
        }
    }

    componentDidMount() {
        this.getSurveys();
    }

    onCompleteComponenet = () => {
        this.setState({
            isCompleted: true
        })
    };

    getSurveys = () => {

        axios.get('http://localhost:8080/surveys/all')
            .then((response) => {
                const data = response.data;
                const { id } = this.props.match.params;
                fetch(`http://localhost:3000/surveys/${id}`)
                    .then(() => {
                        data.map((surv)=>{
                            if (surv.id === id){

                                // var survey = JSON.parse(surv.body);
                                var json ={questions:[ {
                                    type: "rating",
                                    name: "satisfaction",
                                    title: "How satisfied are you with the Product?",
                                    isRequired: true,
                                    mininumRateDescription: "Not Satisfied",
                                    maximumRateDescription: "Completely satisfied"
                                }]};

                                this.setState( {survey:json})
                            }
                        })
                    })

            })
            .catch(() => {
                console.log("Error");
            });
    };

    displaySurvey = (survey) => {

        return (
            <Survey.Survey
                json={survey}
                showCompletedPage={false}
                onComplete={this.onCompleteComponenet}
            />
        )
    };

    render() {

        console.log(this.state.survey);

        return (
            <div className="wrapper fadeInDown">
                <div className="surveys">
                    {this.displaySurvey(this.state.survey)}
                </div>
            </div>
        );
    }
}

export default Surveys;