import React, {Component} from "react";
import "../App.css";
import axios from 'axios';
import {Button,Container} from 'reactstrap';
import AuthenticationService from "../service/AuthenticationService";

class Projects extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projects: [],
            serverUrl: process.env.REACT_APP_SERVER_URL
        }
    }

    componentDidMount() {
        let headers = {headers: {authorization: AuthenticationService.getAuthToken()}};
        axios.get(this.state.serverUrl + '/projects/all',headers)
            .then((response) => {
                const data = response.data;
                this.setState({projects: data});
            })
            .catch(response => {
                console.log("Error: " + response);
            });
    }



    render() {

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
                        <br/>
                        <Button href={"/project/add"}>Add Project</Button>
                    </div>
                </div>
            </Container>
        );
    }
}

export default Projects;