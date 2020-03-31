import React, {Component} from "react";
import "../App.css";
import { Button } from 'reactstrap';
import '../styles/home.css'

class NewSurvey extends Component{
    constructor(props) {
        super(props);

        this.questionId = 0;
        this.addQuestion = this.addQuestion.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getInput(){
        this.questionId++;
        const input = document.createElement("input");
        input.type = "text";
        input.onChange= this.handleChange;
        input.className="fadeIn second"
        input.placeholder="Enter your question"
        input.name = this.questionId;
        return input;
    }

    getSubmit(){
        const submit = document.createElement("input");
        submit.type = "submit";
        submit.value="Add Survey";
        submit.className="fadeIn fourth";
        return submit;
    }

    addQuestion(){
        const form = document.getElementById("form");
        form.removeChild(form.lastChild);
        form.appendChild(this.getInput());
        form.appendChild(this.getSubmit());
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render (){
        return (
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <form id="form" method="POST"  action="http://localhost:8080/addsurvey">
                        <input name = {this.questionId}
                               type="text"
                               onChange={this.handleChange}
                               className="fadeIn second"
                               placeholder="Enter your question"
                        />
                        <input
                            type="submit"
                            value="Add Survey"
                            className="fadeIn fourth"
                        />
                    </form>
                    <Button onClick={this.addQuestion}
                            onChange={this.handleChange}
                        className="fadeIn homeButton"
                        value="addquestion"
                    >+</Button>
                </div>
            </div>
        );
    }
}

export default NewSurvey;