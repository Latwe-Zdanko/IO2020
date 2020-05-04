import React, {Component} from "react";
import "../App.css";
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
            serverUrl: "http://localhost:8080",
            templateId: "",
            current_survey: {"questions": []},
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

    updateInputValue(evt, inputId, questionId) {

        switch (inputId) {
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
            .catch(function (error) {
                console.log(error);
            });
    };

    addTemplate = () => {

        axios.post(this.state.serverUrl + '/surveys/addTemplate', {
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

    addQuestionField = () => {

        console.log("halo")
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
                                       onChange={evt => this.updateInputValue(evt, 6, 1)}/>
                                <label className="custom-control-label" htmlFor="defaultUnchecked">Required</label>
                            </div>
                        </div>
                    </div>
                    <input type="text" className="form-control" placeholder="Question"
                           aria-label="Text input with radio button"
                           onChange={evt => this.updateInputValue(evt, 1, 1)}/>
                </div>
                <Survey.Survey
                    json={commentField}
                    showCompletedPage={false}
                />
                <button type="button" className="btn-primary btn-lg btn-dark" onClick={this.submit}>Add Field</button>
            </div>

        );
        this.setState({tmpSurvey: tmpSurvey, tmpQuestion: commentField});
    };

    addMatrixSurvey = () => {
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
            <div>
                <div>
                    <input placeholder="Statement 1" className="form-control"
                           onChange={evt => this.updateInputValue(evt, 1, 2)}/><br/>
                    <input placeholder="Statement 2" className="form-control"
                           onChange={evt => this.updateInputValue(evt, 2, 2)}/><br/>
                    <input placeholder="Statement 3" className="form-control"
                           onChange={evt => this.updateInputValue(evt, 3, 2)}/><br/>
                    <input placeholder="Statement 4" className="form-control"
                           onChange={evt => this.updateInputValue(evt, 4, 2)}/><br/>
                    <div className="input-group-text">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="defaultUnchecked"
                                   onChange={evt => this.updateInputValue(evt, 6, 2)}/>
                            <label className="custom-control-label" htmlFor="defaultUnchecked">Required</label>
                        </div>
                    </div>
                </div>
                <Survey.Survey
                    json={matrixField}
                    showCompletedPage={false}
                />
                <button type="button" className="btn-primary btn-lg btn-dark" onClick={this.submit}>Add Field</button>
            </div>

        );
        this.setState({tmpSurvey: tmpSurvey, tmpQuestion: matrixField});
    };


    addRadiogroupField = () => {

        const ratingField = {
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
                           onChange={evt => this.updateInputValue(evt, 1, 3)}/><br/>
                    <input placeholder="Option 1" className="form-control"
                           onChange={evt => this.updateInputValue(evt, 2, 3)}/><br/>
                    <input placeholder="Option 2" className="form-control"
                           onChange={evt => this.updateInputValue(evt, 3, 3)}/><br/>
                    <input placeholder="Option 3" className="form-control"
                           onChange={evt => this.updateInputValue(evt, 4, 3)}/><br/>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox"
                           onChange={evt => this.updateInputValue(evt, 6, 3)}/>
                    <label className="form-check-label">isRequired</label>
                </div>
                <Survey.Survey
                    json={ratingField}
                    showCompletedPage={false}
                />
                <button type="button" className="btn-primary btn-lg btn-dark" onClick={this.submit}>Add Field</button>
            </div>

        );
        this.setState({tmpSurvey: tmpSurvey, tmpQuestion: ratingField});
    };

    addRatingField = () => {

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
            <div className="wrapper">
                <Survey.Survey
                    json={ratingField}
                    showCompletedPage={false}
                />
                <div>
                    <input placeholder="Rating" onChange={evt => this.updateInputValue(evt, 1, 4)}/><br/>
                    <input placeholder="Minimum Rate Description"
                           onChange={evt => this.updateInputValue(evt, 2, 4)}/><br/>
                    <input placeholder="Maximum Rate Description"
                           onChange={evt => this.updateInputValue(evt, 3, 4)}/><br/>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox"
                           onChange={evt => this.updateInputValue(evt, 6, 4)}/>
                    <label className="form-check-label">isRequired</label>
                </div>
                <button type="button" className="btn-primary btn-lg btn-dark" onClick={this.submit}>Add Field</button>
            </div>

        );
        this.setState({tmpSurvey: tmpSurvey, tmpQuestion: ratingField});
    };


    submit = () => {


        const test = this.state.current_survey;
        this.state.tmpQuestion.questions[0].enableIf = true;
        test.questions.push(this.state.tmpQuestion.questions[0]);
        this.setState({current_survey: test});

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
                    {tmpSurv}
                </div>

                <br/>
                <div>
                    <input placeholder="Survey Name" onChange={evt => this.updateInputValue(evt, 5)}/><br/>
                    {surveyRender}
                    {onSurveyCompletion}
                    <button type="button" className="btn btn-lg btn-primary btn-dark" onClick={this.submitSurvey}>SUBMIT
                    </button>
                </div>

            </div>
        );
    }
};

export default AddSurvey;