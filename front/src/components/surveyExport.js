import axios from 'axios'
import React, {Component} from "react";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";

class SurveyExport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            survey: -1,
            frontUrl: "http://localhost:3000",
            serverUrl: "http://localhost:8080"
        }
    }

    componentDidMount() {
        let survey_id = window.location.href
        survey_id = survey_id.replace(this.state.frontUrl + "/surveyexport/", "")
        axios.get(this.state.serverUrl + "/surveys/" + survey_id)
            .then((response) => {
                this.setState({survey: response.data})
            })
    }

    render() {
        return (
            <div className="container">
                <br/>
                <br/>
                <br/> {/*TODO: To nie powinno być w ten sposób, ale póki co działa - poprawię później*/}
                <div id="survey_id" style={{display: "none"}}>{this.state.survey.id}</div>
                <Link to="/surveyexport">
                    <Button className="homeButton">
                        Back to survey list
                    </Button>
                </Link>
                <h1>Survey {this.getSurveyName()}</h1>
                <Button onClick={this.downloadJSON}>Download in JSON</Button>
            </div>
        )
    }

    getSurveyName() {
        return this.state.survey.name
    }

    downloadJSON() {
        axios.get("http://localhost:8080/surveys/" + document.getElementById("survey_id").innerText)
            .then((response) => {
                let result = response.data.answers
                let JSONResult = JSON.stringify(result)
                let blob = new Blob([JSONResult])
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'export.json';
                a.click();
            })
    }
}

export default SurveyExport;
