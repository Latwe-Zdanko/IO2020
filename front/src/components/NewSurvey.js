import React, {Component} from "react";
import "../App.css";
import '../styles/survey.css';
import "survey-react/survey.css";
import * as Survey from "survey-react";
import axios from 'axios';

class NewSurvey extends Component {

    constructor(props) {
        super(props);

        this.state = {
            msg: "halo",
            current_survey: {
                questions: [
                    {
                        type: "matrix",
                        name: "Quality",
                        title: "Please indicate if you agree or disagree with the following statements",
                        columns: [
                            {
                                value: 1,
                                text: "Strongly Disagree"
                            }, {
                                value: 2,
                                text: "Disagree"
                            }, {
                                value: 3,
                                text: "Neutral"
                            }, {
                                value: 4,
                                text: "Agree"
                            }, {
                                value: 5,
                                text: "Strongly Agree"
                            }
                        ],
                        rows: [
                            {
                                value: "affordable",
                                text: "Product is affordable"
                            }, {
                                value: "does what it claims",
                                text: "Product does what it claims"
                            }, {
                                value: "better then others",
                                text: "Product is better than other products on the market"
                            }, {
                                value: "easy to use",
                                text: "Product is easy to use"
                            }
                        ]
                    }, {
                        type: "rating",
                        name: "satisfaction",
                        title: "How satisfied are you with the Product?",
                        isRequired: true,
                        mininumRateDescription: "Not Satisfied",
                        maximumRateDescription: "Completely satisfied"
                    }, {
                        type: "rating",
                        name: "recommend friends",
                        visibleIf: "{satisfaction} > 3",
                        title: "How likely are you to recommend the Product to a friend or co-worker?",
                        mininumRateDescription: "Will not recommend",
                        maximumRateDescription: "I will recommend"
                    }, {
                        type: "comment",
                        name: "suggestions",
                        title: "What would make you more satisfied with the Product?"
                    },
                    {
                        type: "radiogroup",
                        name: "price to competitors",
                        title: "Compared to our competitors, do you feel the Product is",
                        choices: ["Less expensive", "Priced about the same", "More expensive", "Not sure"]
                    }, {
                        type: "radiogroup",
                        name: "price",
                        title: "Do you feel our current price is merited by our product?",
                        choices: ["correct|Yes, the price is about right", "low|No, the price is too low for your product", "high|No, the price is too high for your product"]
                    }, {
                        type: "multipletext",
                        name: "pricelimit",
                        title: "What is the... ",
                        items: [
                            {
                                name: "mostamount",
                                title: "Most amount you would every pay for a product like ours"
                            }, {
                                name: "leastamount",
                                title: "The least amount you would feel comfortable paying"
                            }
                        ]
                    }
                ]
            },
            tmpQuestion: {
                questions: [
                    {
                        type: "rating",
                        name: "satisfaction",
                        title: "How satisfied are you with the Product?",
                        isRequired: true,
                        mininumRateDescription: "Not Satisfied",
                        maximumRateDescription: "Completely satisfied"
                    }
                ]
            }
        };
        this.addMatrix = this.addMatrix.bind(this);
        this.onCompleteComponenet = this.onCompleteComponenet.bind(this);
    }

    onCompleteComponenet = () => {
        this.setState({
            isCompleted: true
        })
    };

    save = () => {

    };

    componentDidMount() {
        this.getSurveys();
    }

    getSurveys = () => {

        axios.get('http://localhost:8080/surveys/all')
            .then((response) => {
                const data = response.data;
                // this.state.current_survey = data;
            })
            .catch(() => {
                console.log("Error");
            });
    };

    addSurvey = () => {

    }
    addMatrix = () => {

        var currSurvey = this.state.current_survey;
        currSurvey['questions'].push({
            type: "matrix",
            name: "Quality",
            title: "Please indicate if you agree or disagree with the following statements",
            columns: [
                {
                    value: 1,
                    text: "Strongly Disagree"
                }, {
                    value: 2,
                    text: "Disagree"
                }, {
                    value: 3,
                    text: "Neutral"
                }, {
                    value: 4,
                    text: "Agree"
                }, {
                    value: 5,
                    text: "Strongly Agree"
                }
            ],
            rows: [
                {
                    value: "affordable",
                    text: "Product is affordable"
                }, {
                    value: "does what it claims",
                    text: "Product does what it claims"
                }, {
                    value: "better then others",
                    text: "Product is better than other products on the market"
                }, {
                    value: "easy to use",
                    text: "Product is easy to use"
                }
            ]
        });
        this.setState({tmpQuestion: currSurvey})
    };

    addQuestionField = () => {

    };

    render() {

        var temporaryQuestion = !this.state.isCompleted ? (
            <Survey.Survey
                json={this.state.tmpQuestion}
                showCompletedPage={true}
                onComplete={this.onCompleteComponenet}
            />
        ) : null
        console.log(this.state.current_survey, this.state.tmpQuestion)
        var surveyRender = !this.state.isCompleted ? (
            <Survey.Survey
                json={this.state.current_survey}
                showCompletedPage={false}
                onComplete={this.onCompleteComponenet}
            />
        ) : null;

        var onSurveyCompletion = this.state.isCompleted ? (
            <div>
                Thanks
            </div>
        ) : null;

        return (

            <div className="wrapper fadeInDown">
                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                    <button type="button" className="btn btn-lg btn-primary btn-sm" onClick={this.addMatrix}>ADD
                        MATRIX
                    </button>
                    <button type="button" className="btn btn-lg btn-primary btn-sm">ADD AGREEMENT DEGREE</button>
                    <button type="button" className="btn btn-lg btn-primary btn-sm" onClick={this.addQuestionField}>ADD
                        QUESTION FIELD
                    </button>
                    <button type="button" className="btn btn-lg btn-primary btn-sm">ADD AGREEMENT DEGREE</button>
                </div>
                <br></br>
                <div>
                    {temporaryQuestion}
                    {surveyRender}
                    {onSurveyCompletion}
                </div>
            </div>
        );
    }
};

export default NewSurvey;