import React, {Component} from "react";
import "../App.css";
import '../styles/survey.css';
import "survey-react/survey.css";
import axios from 'axios';


class Surveys extends Component {

    constructor(props) {
        super(props);

        this.state = {
            surveys: []
        }
    }

    componentDidMount() {
        this.getSurveys();
    }

    getSurveys = () => {

        axios.get('http://localhost:8080/surveys/all')
            .then((response) => {
                const data = response.data;
                this.setState({surveys: data});
            })
            .catch(() => {
                console.log("Error");
            });
    };

    displaySurveys = (surveys) => {

        if (!surveys.length) return;

        return (
            surveys.map((survey) => (
                <a className="list-group-item" href={"/surveys/" + survey.id}>{survey.name}</a>
            )))
    };

    render() {

        console.log(this.state.surveys);

        return (
            <div className="container">
                <h1>Surveys</h1>
                <br/>
                <div className="list-group">
                    {this.displaySurveys(this.state.surveys)}
                </div>
            </div>
        );
    }
}

export default Surveys;