import React, {Component} from "react";
import "../App.css";
import '../styles/survey.css';
import "survey-react/survey.css";
import * as Survey from "survey-react";
import axios from 'axios';

class AddSurvey extends Component {

    constructor(props) {
        super(props);


        this.state = {
            id: 0,
            inputValue1: '',
            inputValue2: '',
            inputValue3: '',
            inputValue4: '',
            inputValue5: '',
            isRequired: false,
            tmpQuestion: {"questions": []},
            frontUrl: "http://localhost:3000",
            serverUrl: "http://localhost:8080",
            templateId: "",
            current_survey: {"questions": []},
            testSurvey: {
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
            tmpSurvey: <p></p>
        };
        this.onCompleteComponenet = this.onCompleteComponenet.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this)
        this.addTemplate();
    }


    onCompleteComponenet = () => {
        this.setState({
            isCompleted: true
        })
    };

    componentDidMount() {
        this.getTemplate();
    }

    updateIsRequired(evt) {
        this.setState({
            isRequired: evt.target.checked
        })
    }

    updateInputValue(evt, id) {
        switch (id) {
            case 1:
                this.setState({
                    inputValue1: evt.target.value
                });
                break;
            case 2:
                this.setState({
                    inputValue2: evt.target.value
                });
                break;
            case 3:
                this.setState({
                    inputValue3: evt.target.value
                });
                break;
            case 4:
                this.setState({
                    inputValue4: evt.target.value
                });
                break;
            case 5:
                this.setState({
                    inputValue5: evt.target.value
                });
                break;

        }
    };

    refresh = (evt, id) => {
        switch (id) {
            case 1:
                this.addQuestionField();
                break;
            case 2:
                this.addMatrixSurvey();
                break;
            case 3:
                this.addRatingField();
                break;
            case 4:
                this.addRadiogroupField();
                break;
        }
    };

    getTemplate = () => {

        axios.get(this.state.serverUrl + '/surveys/getTemplate')
            .then((response) => {
                const data = response.data;
                this.setState({templateId: data.id, current_survey: JSON.parse(data.body)})
            })
            .catch(() => {
                console.log("Error");
            });
    };

    addTemplate = () => {

        axios.post(this.state.serverUrl + '/surveys/addSurvey', {
            name: "template",
            body: {questions: []}
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    addSurvey = () => {

        axios.post(this.state.serverUrl + '/surveys/addSurvey', {
            name: "test",
            body: this.state.testSurvey
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    addQuestionField = () => {


        const commentField = {
            questions: [
                {
                    type: "comment",
                    name: "name" + this.state.id,
                    title: this.state.inputValue1,
                    isRequired: this.state.isRequired
                }
            ]
        };

        const tmpSurvey = (
            <div className="wrapper">
                <button type="button" className="btn btn-lg btn-primary btn-sm"
                        onClick={evt => this.refresh(evt, 1)}>Refresh
                </button>
                <Survey.Survey
                    json={commentField}
                    showCompletedPage={false}
                />
                <div>
                    <input placeholder="Question" onChange={evt => this.updateInputValue(evt, 1)}/><br/>

                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" onChange={evt => this.updateIsRequired(evt)}/>
                    <label className="form-check-label">isRequired</label>
                </div>
                <button type="button" className="btn btn-lg btn-primary btn-sm" onClick={this.submit}>Submit</button>
            </div>

        );
        this.state.id++;
        this.setState({tmpSurvey: tmpSurvey, tmpQuestion: commentField});
    };

    addMatrixSurvey = () => {
        const matrixField = {
            questions: [
                {
                    type: "matrix",
                    name: "name" + this.state.id,
                    title: "Please indicate if you agree or disagree with the following statements",
                    isRequired: this.state.isRequired,
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
                            text: this.state.inputValue1
                        }, {
                            text: this.state.inputValue2
                        }, {
                            text: this.state.inputValue3
                        }, {
                            text: this.state.inputValue4
                        }
                    ]
                }
            ]
        };

        const tmpSurvey = (
            <div className="wrapper">
                <button type="button" className="btn btn-lg btn-primary btn-sm"
                        onClick={evt => this.refresh(evt, 2)}>Refresh
                </button>
                <Survey.Survey
                    json={matrixField}
                    showCompletedPage={false}
                />
                <div>
                    <input placeholder="Statement 1" onChange={evt => this.updateInputValue(evt, 1)}/><br/>
                    <input placeholder="Statement 2" onChange={evt => this.updateInputValue(evt, 2)}/><br/>
                    <input placeholder="Statement 3" onChange={evt => this.updateInputValue(evt, 3)}/><br/>
                    <input placeholder="Statement 4" onChange={evt => this.updateInputValue(evt, 4)}/><br/>

                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" onChange={evt => this.updateIsRequired(evt)}/>
                    <label className="form-check-label">isRequired</label>
                </div>
                <button type="button" className="btn btn-lg btn-primary btn-sm" onClick={this.submit}>Submit</button>
            </div>

        );

        this.state.id++;
        this.setState({tmpSurvey: tmpSurvey, tmpQuestion: matrixField});
    };


    addRadiogroupField = () => {

        const ratingField = {
            questions: [
                {
                    type: "radiogroup",
                    name: "name" + this.state.id,
                    title: this.state.inputValue1,
                    isRequired: this.state.isRequired,
                    choices: [this.state.inputValue2, this.state.inputValue3, this.state.inputValue4]
                }
            ]
        };

        const tmpSurvey = (
            <div className="wrapper">
                <button type="button" className="btn btn-lg btn-primary btn-sm"
                        onClick={evt => this.refresh(evt, 4)}>Refresh
                </button>
                <Survey.Survey
                    json={ratingField}
                    showCompletedPage={false}
                />
                <div>
                    <input placeholder="Question" onChange={evt => this.updateInputValue(evt, 1)}/><br/>
                    <input placeholder="Option 1" onChange={evt => this.updateInputValue(evt, 2)}/><br/>
                    <input placeholder="Option 2" onChange={evt => this.updateInputValue(evt, 3)}/><br/>
                    <input placeholder="Option 3" onChange={evt => this.updateInputValue(evt, 4)}/><br/>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" onChange={evt => this.updateIsRequired(evt)}/>
                    <label className="form-check-label">isRequired</label>
                </div>
                <button type="button" className="btn btn-lg btn-primary btn-sm" onClick={this.submit}>Submit</button>
            </div>

        );
        this.state.id++;
        this.setState({tmpSurvey: tmpSurvey, tmpQuestion: ratingField});
    };

    addRatingField = () => {

        const ratingField = {
            questions: [
                {
                    type: "rating",
                    name: "name" + this.state.id,
                    title: this.state.inputValue1,
                    isRequired: this.state.isRequired,
                    mininumRateDescription: this.state.inputValue2,
                    maximumRateDescription: this.state.inputValue3
                }
            ]
        };

        const tmpSurvey = (
            <div className="wrapper">
                <button type="button" className="btn btn-lg btn-primary btn-sm"
                        onClick={evt => this.refresh(evt, 3)}>Refresh
                </button>
                <Survey.Survey
                    json={ratingField}
                    showCompletedPage={false}
                />
                <div>
                    <input placeholder="Rating" onChange={evt => this.updateInputValue(evt, 1)}/><br/>
                    <input placeholder="Minimum Rate Description" onChange={evt => this.updateInputValue(evt, 2)}/><br/>
                    <input placeholder="Maximum Rate Description" onChange={evt => this.updateInputValue(evt, 3)}/><br/>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" onChange={evt => this.updateIsRequired(evt)}/>
                    <label className="form-check-label">isRequired</label>
                </div>
                <button value="Submit" type="button" className="btn btn-lg btn-primary btn-sm"
                        onClick={this.submit}>Submit
                </button>
            </div>

        );
        this.state.id++;
        this.setState({tmpSurvey: tmpSurvey, tmpQuestion: ratingField});
    };


    submit = () => {

        const test = this.state.current_survey;
        test.questions.push(this.state.tmpQuestion.questions[0]);

        this.state.id++;
        this.setState({current_survey: test})

        console.log(this.state.current_survey)
    };

    submitSurvey = () => {
        axios.post(this.state.serverUrl + '/surveys/addSurvey', {
            name: this.state.inputValue5,
            body: this.state.current_survey
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        const tmpSurv = !this.state.isCompleted ? (
            this.state.tmpSurvey
        ) : null;

        const surveyRender = !this.state.isCompleted ? (
            <Survey.Survey
                json={this.state.current_survey}
                showCompletedPage={false}
                onComplete={this.onCompleteComponenet}
            />
        ) : null;

        const onSurveyCompletion = this.state.isCompleted ? (
            <div>
                Thanks
            </div>
        ) : null;

        return (

            <div className="wrapper2">
                <div>
                    {tmpSurv}
                </div>
                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                    <button type="button" className="btn btn-lg btn-primary btn-sm" onClick={this.addSurvey}>ADD
                        SURVEY
                    </button>
                    <button type="button" className="btn btn-lg btn-primary btn-sm" onClick={this.addMatrixSurvey}>ADD
                        MATRIX FIELD
                    </button>
                    <button type="button" className="btn btn-lg btn-primary btn-sm" onClick={this.addRatingField}>ADD
                        RATING FIELD
                    </button>
                    <button type="button" className="btn btn-lg btn-primary btn-sm" onClick={this.addQuestionField}>ADD
                        QUESTION FIELD
                    </button>
                    <button type="button" className="btn btn-lg btn-primary btn-sm"
                            onClick={this.addRadiogroupField}>ADD RADIOGROUP FIELD
                    </button>
                </div>
                <br/>
                <div>
                    <input placeholder="Survey Name" onChange={evt => this.updateInputValue(evt, 5)}/><br/>
                    {surveyRender}
                    {onSurveyCompletion}
                    <button type="button" className="btn btn-lg btn-primary btn-sm" onClick={this.submitSurvey}>SUBMIT
                    </button>
                </div>

            </div>
        );
    }
};

export default AddSurvey;