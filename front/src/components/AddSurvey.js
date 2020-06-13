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
            matrixInputs: {
                "inputsNumber": 1, "inputs": {
                    1: React.createRef(), 2: React.createRef(),
                    3: React.createRef(), 4: React.createRef(),
                    5: React.createRef(), 6: React.createRef(),
                    7: React.createRef(), 8: React.createRef()
                }
            },
            inputValues: {1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: ''},
            surveyName: '',
            isRequired: false,
            tmpQuestion: {"questions": []},
            serverUrl: process.env.REACT_APP_SERVER_URL,
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

    clearMatrix = (event, id) => {
        for (let i = 1; i < 9; i++) {
            this.state.inputValues[i] = '';
            if (this.state.matrixInputs.inputsNumber >= i) {
                this.state.matrixInputs.inputs[i].value = '';
            }
        }
        this.state.matrixInputs.inputsNumber = 1;

        const ref = this.refresh;
        setTimeout(function () {
            ref(event, id);
        }, 100);

    };

    updateInputValue = (event, inputId, questionId) => {

        this.setState({id: questionId});
        switch (inputId) {
            case "name":
                console.log(event.target.value);
                this.setState({
                    surveyName: event.target.value,
                });
                break;
            case "checkbox":
                this.setState({
                    isRequired: event.target.checked
                });
                break;
            default:
                this.state.inputValues[parseInt(inputId)] = event.target.value

        }

        const ref = this.refresh;
        setTimeout(function () {
            ref(event, questionId);
        }, 100);

    };

    refresh = (event, id) => {
        this.setState({id: id});

        switch (id) {
            case 1:
                this.addQuestionField();
                break;
            case 2:
                this.addMatrixQuestion();
                break;
            case 3:
                this.addRadiogroupField();
                break;
            case 4:
                this.addRatingField();
                break;
        }
    };

    addStatement = () => {
        this.state.matrixInputs.inputsNumber += 1;
        this.addMatrixQuestion()
    };

    addQuestionField = () => {

        const id = 1;
        if (id !== this.state.id) this.setState({
            inputValues: {
                1: '',
                2: '',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '',
                8: ''
            }
        });

        const commentField = {
            questions: [
                {
                    type: "comment",
                    name: this.state.inputValues[1],
                    title: this.state.inputValues[1],
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
                                       onChange={event => this.updateInputValue(event, "checkbox", id)}/>
                                <label className="custom-control-label" htmlFor="defaultUnchecked">Required</label>
                            </div>
                        </div>
                    </div>
                    <input type="text" className="form-control" placeholder="Question"
                           aria-label="Text input with radio button"
                           onChange={event => this.updateInputValue(event, 1, id)}/>
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

    addMatrixQuestion = () => {

        const id = 2;

        if (id !== this.state.id) {
            this.setState({
                inputValues: {1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: ''}
            });
        }

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
                            value: this.state.inputValues[1],
                            text: this.state.inputValues[1]
                        },
                        {
                            value: this.state.inputValues[2],
                            text: this.state.inputValues[2]
                        },
                        {
                            value: this.state.inputValues[3],
                            text: this.state.inputValues[3]
                        },
                        {
                            value: this.state.inputValues[4],
                            text: this.state.inputValues[4]
                        },
                        {
                            value: this.state.inputValues[5],
                            text: this.state.inputValues[5]
                        },
                        {
                            value: this.state.inputValues[6],
                            text: this.state.inputValues[6]
                        },
                        {
                            value: this.state.inputValues[7],
                            text: this.state.inputValues[7]
                        },
                        {
                            value: this.state.inputValues[8],
                            text: this.state.inputValues[8]
                        }]
                }
            ]
        };


        let inputFields = [];
        let inputs = this.state.matrixInputs.inputs;

        for (var [inputId,] in inputs) {
            if (inputId <= this.state.matrixInputs.inputsNumber) {
                const id2 = inputId;
                inputFields.push((
                    <input ref={ref => this.state.matrixInputs.inputs[id2] = ref} placeholder={"Statement " + id2}
                           className="form-control" onChange={event => this.updateInputValue(event, id2, id)}/>));
                inputFields.push((<br/>))
            }
        }
        const tmpSurvey = (
            <div>
                <div>
                    {inputFields}
                    <div className="input-group-text">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="defaultUnchecked"
                                   onChange={event => this.updateInputValue(event, "checkbox", id)}/>
                            <label className="custom-control-label" htmlFor="defaultUnchecked">Required</label>
                        </div>
                        <div style={{position: "relative", right: "-65%"}}>
                            <button type="button" className="btn btn-sm btn-secondary"
                                    onClick={event => this.addStatement(event)}>Add Statement
                            </button>
                        </div>
                        <div style={{position: "relative", right: "-66%"}}>
                            <button type="button" className="btn btn-sm btn-secondary"
                                    onClick={event => this.clearMatrix(event, id)}>Clear Matrix
                            </button>
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
        if (id !== this.state.id) {
            this.setState({
                inputValues: {1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: ''}
            });
        }
        const radioGroupField = {
            questions: [
                {
                    type: "radiogroup",
                    name: this.state.inputValues[1],
                    title: this.state.inputValues[1],
                    isRequired: this.state.isRequired,
                    enableIf: "false",
                    choices: [this.state.inputValues[2], this.state.inputValues[3], this.state.inputValues[4]]
                }
            ]
        };

        const tmpSurvey = (
            <div>
                <div>
                    <input placeholder="Question" className="form-control"
                           onChange={event => this.updateInputValue(event, 1, id)}/><br/>
                    <input placeholder="Option 1" className="form-control"
                           onChange={event => this.updateInputValue(event, 2, id)}/><br/>
                    <input placeholder="Option 2" className="form-control"
                           onChange={event => this.updateInputValue(event, 3, id)}/><br/>
                    <input placeholder="Option 3" className="form-control"
                           onChange={event => this.updateInputValue(event, 4, id)}/><br/>
                    <div className="input-group-text">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="defaultUnchecked"
                                   onChange={event => this.updateInputValue(event, "checkbox", id)}/>
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
        if (id !== this.state.id) this.setState({
            inputValues: {
                1: '',
                2: '',
                3: '',
                4: '',
                5: '',
                6: '',
                7: '',
                8: ''
            }
        });

        const ratingField = {
            questions: [
                {
                    type: "rating",
                    name: this.state.inputValues[1],
                    title: this.state.inputValues[1],
                    isRequired: this.state.isRequired,
                    enableIf: "false",
                    mininumRateDescription: this.state.inputValues[2],
                    maximumRateDescription: this.state.inputValues[3]
                }
            ]
        };

        const tmpSurvey = (
            <div>
                <div>
                    <input placeholder="Rating" className="form-control"
                           onChange={event => this.updateInputValue(event, 1, id)}/><br/>
                    <input placeholder="Minimum Rate Description" className="form-control"
                           onChange={event => this.updateInputValue(event, 2, id)}/><br/>
                    <input placeholder="Maximum Rate Description" className="form-control"
                           onChange={event => this.updateInputValue(event, 3, id)}/><br/>
                    <div className="input-group-text">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="defaultUnchecked"
                                   onChange={event => this.updateInputValue(event, "checkbox", id)}/>
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
            name: this.state.surveyName,
            body: this.state.current_survey
        }, {headers: {authorization: AuthenticationService.getAuthToken()}})
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {

        return (
            <div className="wrapper2">
                <div>
                    <input placeholder="Survey Name" className="form-control"
                           onChange={event => this.updateInputValue(event, "name", this.state.id)}/><br/>
                </div>
                <nav className="navbar navbar-dark bg-blue">
                    <button type="button" className="btn btn-lg btn-secondary btn-dark"
                            onClick={this.addMatrixQuestion}>Add
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
                    {this.state.tmpSurvey}
                </div>
                <div style={{float: "right"}}>
                    <button type="button" className="btn btn-lg btn-primary btn-dark" onClick={this.submitSurvey}>Submit
                    </button>
                </div>
                <br/>
            </div>
        );
    }
}

export default AddSurvey;