import React, {Component} from "react";
import "../App.css";
import axios from 'axios';
import {ListGroup, ListGroupItem} from 'reactstrap';
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
        axios.get(this.state.serverUrl + '/projects/all', headers)
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
            <div>
                <nav className="navbar navbar-expand-lg navbar-light "
                     style={{position: "float-top", marginTop: "55px", marginBottom: "10px"}}>
                    <span className="container float-left"
                          style={{textAlign: "left", display: "inline", justifyContent: "start"}}>
                        <a>Projects</a>
                    </span>
                    <span className="container float-right" style={{textAlign: "right", display: "inline"}}>
                        <button className="btn btn-primary" onClick={(e) => window.location.href = "/project/add"}>Add New Project</button>
                    </span>
                </nav>
                <div className="list-wrapper">
                    <h2>Projects</h2>
                    <ListGroup>
                        {this.state.projects.map((item) => {
                            return <ListGroupItem tag="button" action onClick={e => {
                                window.location.href = "/project/view/" + item.id
                            }}>
                                {item.name}
                            </ListGroupItem>
                        })}
                        <ListGroupItem tag="button" action onClick={(e) => window.location.href = "/project/add"}
                                       style={{textAlign: "center", fontSize: "125%"}}>+</ListGroupItem>
                    </ListGroup>
                </div>
            </div>
        );
    }
}

export default Projects;