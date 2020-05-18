import React, {Component} from "react";
import "../App.css";
import axios from 'axios';
import {Container} from 'reactstrap';

class Projects extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            serverUrl: "http://localhost:8080"
        }
    }

    componentDidMount() {
        axios.get(this.state.serverUrl + '/projects/all')
            .then((response) => {
                const data = response.data;
                this.setState({projects: data});
            })
            .catch(() => {
                console.log("Error");
            });
    }



    render() {

        console.log(this.state.projects);

        return (
            <Container style={{marginTop: '60px', overflowX: 'hidden'}}>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <h1>Projects</h1>
                        <div className="list-group">
                            {this.state.projects.map((item) => {
                                return <a href={"/project/view/" + item.id}>{item.name}</a>
                            })}
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}

export default Projects;