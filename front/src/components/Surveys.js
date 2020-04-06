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

        return surveys.map((survey, index) => (
            <div key={index}>
                <li>
                    <a href={"/surveys/"+survey.id}>{survey.name}</a>
                </li>
            </div>
        ))
    };

    render() {

        console.log(this.state.surveys);

        return (
            <div className="wrapper fadeInDown">
                <div className="surveys">
                    <ul>
                        {this.displaySurveys(this.state.surveys)}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Surveys;