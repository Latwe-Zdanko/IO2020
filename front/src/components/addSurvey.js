import React, {Component} from "react";
import "../App.css";
import "survey-react/survey.css";
import * as Survey from "survey-react";
import axios from 'axios';
import AuthenticationService from "../service/AuthenticationService";

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
            serverUrl: "http://localhost:8080",
            current_survey: {"questions": []},
            currentSurvey: <p></p>,
            tmpSurvey: <p></p>
        };

        this.onCompleteComponenet = this.onCompleteComponenet.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
    }

    onCompleteComponenet = () => {
        this.setState({
            isCompleted: true
        })
    };

    updateInputValue = (evt, inputId, questionId) => {

        switch (inputId) {
            case 1:
                this.setState({
                    inputValue1: evt.target.value,
                    id: 1
                });
                break;
            case 2:
                this.setState({
                    inputValue2: evt.target.value,
                    id: 2
                });
                break;
            case 3:
                this.setState({
                    inputValue3: evt.target.value,
                    id: 3
                });
                break;
            case 4:
                this.setState({
                    inputValue4: evt.target.value,
                    id: 4
                });
                break;
            case 5:
                this.setState({
                    inputValue5: evt.target.value
                });
                break;
            case 6:
                this.setState({
                    isRequired: evt.target.checked
                });

        }

        const ref = this.refresh;
        setTimeout(function () {
            ref(evt, questionId);
        }, 100);
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
                this.addRadiogroupField();
                break;
            case 4:
                this.addRatingField();
                break;
        }
    };

    addQuestionField = () => {

        const id = 1;
        const commentField = {
            questions: [
                {
                    type: "comment",
                    name: this.state.inputValue1,
                    title: this.state.inputValue1,
                    isRequired: this.state.isRequired,
                    enableIf: "false"
                }
            ]
        };

        const tmpSurvey = (
            <div>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="defaultUnchecked"
                                       onChange={evt => this.updateInputValue(evt, 6, id)}/>
                                <label className="custom-control-label" htmlFor="defaultUnchecked">Required</label>
                            </div>
                        </div>
                    </div>
                    <input type="text" className="form-control" placeholder="Question"
                           aria-label="Text input with radio button"
                           onChange={evt => this.updateInputValue(evt, 1, id)}/>
                </div>
                <Survey.Survey
                    json={commentField}
                    showCompletedPage={false}
                />
                <button type="button" className="btn-primary btn-lg btn-dark" onClick={this.submitQuestion}>Add Field
                </button>
            </div>

        );
        this.setState({tmpSurvey: tmpSurvey, tmpQuestion: commentField});
    };

    addMatrixSurvey = () => {

        const id = 2;
        const matrixField = {
            questions: [
                {
                    type: "matrix",
                    name: "Please indicate if you agree or disagree with the following statements",
                    title: "Please indicate if you agree or disagree with the following statements",
                    isRequired: this.state.isRequired,
                    enableIf: "false",
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
                            value: this.state.inputValue1,
                            text: this.state.inputValue1
                        }, {
                            value: this.state.inputValue2,
                            text: this.state.inputValue2
                        }, {
                            value: this.state.inputValue3,
                            text: this.state.inputValue3
                        }, {
                            value: this.state.inputValue4,
                            text: this.state.inputValue4
                        }
                    ]
                }
            ]
        };

        const tmpSurvey = (
            <div>
                <div>
                    <input placeholder="Statement 1" className="form-control"
                           onChange={evt => this.updateInputValue(evt, 1, id)}/><br/>
                    <input placeholder="Statement 2" className="form-control"
                           onChange={evt => this.updateInputValue(evt, 2, id)}/><br/>
                    <input placeholder="Statement 3" className="form-control"
                           onChange={evt => this.updateInputValue(evt, 3, id)}/><br/>
                    <input placeholder="Statement 4" className="form-control"
                           onChange={evt => this.updateInputValue(evt, 4, id)}/><br/>
                    <div className="input-group-text">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="defaultUnchecked"
                                   onChange={evt => this.updateInputValue(evt, 6, id)}/>
                            <label className="custom-control-label" htmlFor="defaultUnchecked">Required</label>
                        </div>
                    </div>
                </div>
                <Survey.Survey
                    json={matrixField}
                    showCompletedPage={false}
                />
                <button type="button" className="btn-primary btn-lg btn-dark" onClick={this.submitQuestion}>Add Field
                </button>
            </div>

        );
        this.setState({tmpSurvey: tmpSurvey, tmpQuestion: matrixField});
    };


    addRadiogroupField = () => {

        const id = 3;
        const radioGroupField = {
            questions: [
                {
                    type: "radiogroup",
                    name: this.state.inputValue1,
                    title: this.state.inputValue1,
                    isRequired: this.state.isRequired,
                    enableIf: "false",
                    choices: [this.state.inputValue2, this.state.inputValue3, this.state.inputValue4]
                }
            ]
        };

        const tmpSurvey = (
            <div>
                <div>
                    <input placeholder="Question" className="form-control"
                           onChange={evt => this.updateInputValue(evt, 1, id)}/><br/>
                    <input placeholder="Option 1" className="form-control"
                           onChange={evt => this.updateInputValue(evt, 2, id)}/><br/>
                    <input placeholder="Option 2" className="form-control"
                           onChange={evt => this.updateInputValue(evt, 3, id)}/><br/>
                    <input placeholder="Option 3" className="form-control"
                           onChange={evt => this.updateInputValue(evt, 4, id)}/><br/>
                    <div className="input-group-text">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="defaultUnchecked"
                                   onChange={evt => this.updateInputValue(evt, 6, id)}/>
                            <label className="custom-control-label" htmlFor="defaultUnchecked">Required</label>
                        </div>
                    </div>
                </div>
                <Survey.Survey
                    json={radioGroupField}
                    showCompletedPage={false}
                />
                <button type="button" className="btn-primary btn-lg btn-dark" onClick={this.submitQuestion}>Add Field
                </button>
            </div>

        );
        this.setState({tmpSurvey: tmpSurvey, tmpQuestion: radioGroupField});
    };

    addRatingField = () => {

        const id = 4;
        const ratingField = {
            questions: [
                {
                    type: "rating",
                    name: this.state.inputValue1,
                    title: this.state.inputValue1,
                    isRequired: this.state.isRequired,
                    enableIf: "false",
                    mininumRateDescription: this.state.inputValue2,
                    maximumRateDescription: this.state.inputValue3
                }
            ]
        };

        const tmpSurvey = (
            <div>
                <div>
                    <input placeholder="Rating" className="form-control"
                           onChange={evt => this.updateInputValue(evt, 1, id)}/><br/>
                    <input placeholder="Minimum Rate Description" className="form-control"
                           onChange={evt => this.updateInputValue(evt, 2, id)}/><br/>
                    <input placeholder="Maximum Rate Description" className="form-control"
                           onChange={evt => this.updateInputValue(evt, 3, id)}/><br/>
                    <div className="input-group-text">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="defaultUnchecked"
                                   onChange={evt => this.updateInputValue(evt, 6, id)}/>
                            <label className="custom-control-label" htmlFor="defaultUnchecked">Required</label>
                        </div>
                    </div>
                </div>
                <Survey.Survey
                    json={ratingField}
                    showCompletedPage={false}
                    theme="modern"
                />
                <button type="button" className="btn-primary btn-lg btn-dark" onClick={this.submitQuestion}>Add Field
                </button>
            </div>

        );
        this.setState({tmpSurvey: tmpSurvey, tmpQuestion: ratingField});
    };


    submitQuestion = () => {

        const tmp = this.state.current_survey;
        this.state.tmpQuestion.questions[0].enableIf = true;
        tmp.questions.push(this.state.tmpQuestion.questions[0]);
        this.setState({
            current_survey: tmp
        });


    };

    submitSurvey = (e) => {
        e.preventDefault();
        axios.post(this.state.serverUrl + '/surveys/addSurvey', {
            name: this.state.inputValue5,
            body: this.state.current_survey
        }, {headers: {authentication: AuthenticationService.getAuthToken()}})
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {

        const tmpSurvey = !this.state.isCompleted ? (
            this.state.tmpSurvey
        ) : null;

        return (

            <div className="wrapper2">
                <nav className="navbar navbar-dark bg-blue">
                    <button type="button" className="btn btn-lg btn-primary btn-dark" onClick={this.addMatrixSurvey}>Add
                        matrix field
                    </button>
                    <button type="button" className="btn btn-lg btn-primary btn-dark" onClick={this.addRatingField}>Add
                        rating field
                    </button>
                    <button type="button" className="btn btn-lg btn-primary btn-dark"
                            onClick={this.addQuestionField}>Add question field
                    </button>
                    <button type="button" className="btn btn-lg btn-primary btn-dark"
                            onClick={this.addRadiogroupField}>Add radiogroup field
                    </button>
                </nav>
                <div>
                    {tmpSurvey}
                </div>
                <br/>
                <div>
                    <input placeholder="Survey Name" className="form-control"
                           onChange={evt => this.updateInputValue(evt, 5, this.state.id)}/><br/>
                    <button type="button" className="btn btn-lg btn-primary btn-dark" onClick={this.submitSurvey}>Submit
                    </button>
                </div>

            </div>
        );
    }
}

export default AddSurvey;