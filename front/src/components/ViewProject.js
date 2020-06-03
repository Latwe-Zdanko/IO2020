import React, {Component} from "react";
import "../App.css";
import axios from 'axios';
import {Button, Container, ListGroup, ListGroupItem} from 'reactstrap';
import AuthenticationService from "../service/AuthenticationService";

class ViewProject extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projectId: this.props.match.params.id,
            projectName: "",
            mockups: [],
            serverUrl: "http://localhost:8080"
        }
    }

    componentDidMount() {
        let headers = {headers: {authorization: AuthenticationService.getAuthToken()}};
        axios.get(this.state.serverUrl + '/mockups/projectid/' + this.state.projectId, headers)
            .then((response) => {
                const data = response.data;
                this.setState({mockups: data});
            })
            .catch(response => {
                console.log("Error: " + response);
            });
        axios.get(this.state.serverUrl + '/projects/id/' + this.state.projectId, headers)
            .then((response) => {
                this.setState({projectName: response.data.name});
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
                        <a href="/project">Projects</a> &ensp; / &ensp;
                        {this.state.projectName}
                    </span>
                    <span className="container float-right" style={{textAlign: "right", display: "inline"}}>
                        <button className="btn btn-primary"
                                onClick={(e) => window.location.href="/mockup/add/" + this.state.projectId}>Add New Mockup</button>
                    </span>
                </nav>
                <div className="list-wrapper">
                        <h2>Mockups</h2>
                        <ListGroup>
                            {this.state.mockups.map((item) => {
                                return <ListGroupItem action
                                    onClick={e => window.location.href = "/mockup/view/" + item.id}>{item.name}</ListGroupItem>
                            })}
                            <ListGroupItem tag="button" action onClick={(e) => window.location.href="/mockup/add/" + this.state.projectId} style={{textAlign: "center", fontSize: "125%"}}>+</ListGroupItem>
                        </ListGroup>
                </div>
            </div>
        );
    }
}

export default ViewProject;