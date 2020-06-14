import React, {Component} from "react";
import "../App.css";
import axios from 'axios';
import {Button, ListGroup, ListGroupItem} from 'reactstrap';
import AuthenticationService from "../service/AuthenticationService";
import ChangeNamePopup from "./ChangeNamePopup";

const serverUrl = process.env.REACT_APP_SERVER_URL;

class ViewProject extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projectId: this.props.match.params.id,
            projectName: "",
            mockups: []
        };

        let headers = {headers: {authorization: AuthenticationService.getAuthToken()}};
        axios.get(serverUrl + '/projects/id/' + this.state.projectId, headers)
            .then((response) => {
                const data = response.data;
                this.setState({projectName: data.name});
            })
            .catch(response => {
                console.log("Error: " + response);
            });

    }

    componentDidMount() {
        let headers = {headers: {authorization: AuthenticationService.getAuthToken()}};
        axios.get(serverUrl + '/mockups/byProjectId/' + this.state.projectId, headers)
            .then((response) => {
                const data = response.data;
                this.setState({mockups: data});
            })
            .catch(response => {
                console.log("Error: " + response);
            });
        axios.get(serverUrl + '/projects/id/' + this.state.projectId, headers)
            .then((response) => {
                this.setState({projectName: response.data.name});
            })
            .catch(response => {
                console.log("Error: " + response);
            });
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    handleRedirect(item, event) {
        if (event.target.id === "archive") return;
        window.location.href = "/mockup/view/" + item.id
    }

    archive(e) {
        e.preventDefault();
        const url = serverUrl + "/mockups/archive/" + e.target.value;
        axios.post(url, null, {params: this.state, headers: {authorization: AuthenticationService.getAuthToken()}})
            .then(r => window.location.reload(false))
            .catch(r => alert(r))
    }


    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light navbar-secondary">
                    <span className="container float-left navbar-breadcrumbs">
                        <a href="/project">Projects</a> &ensp; / &ensp;
                        {this.state.projectName}
                    </span>
                    <span className="container float-right navbar-buttons">
                        <button className="btn btn-primary"
                                onClick={this.togglePopup.bind(this)}>Change project name</button>
                        <button className="btn btn-primary"
                                onClick={(e) => window.location.href = "/mockup/add/" + this.state.projectId}>Add New Mockup</button>
                    </span>
                </nav>
                <div className="list-wrapper">
                    <h2>{this.state.projectName}</h2>
                    <br/>
                    {this.state.mockups.length === 0 ? "No mockups available" : ""}
                    <ListGroup>
                        {this.state.mockups.map((item) => {
                            return <ListGroupItem action
                                                  onClick={e => this.handleRedirect(item, e)}>
                                <a className="list-link">{item.name}</a>
                                <Button id="archive" className="btn btn-light float-right" onClick={this.archive}
                                        value={item.id}>Archive</Button>
                            </ListGroupItem>
                        })}
                        <ListGroupItem tag="button" action
                                       onClick={(e) => window.location.href = "/mockup/add/" + this.state.projectId}
                                       style={{textAlign: "center", fontSize: "125%"}}>+</ListGroupItem>
                    </ListGroup>

                    {this.state.showPopup ?
                        <ChangeNamePopup
                            id={this.state.projectId}
                            closePopup={this.togglePopup.bind(this)}
                        />
                        : null
                    }

                </div>
            </div>
        );
    }
}

export default ViewProject;