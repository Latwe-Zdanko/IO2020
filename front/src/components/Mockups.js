import React, {Component} from "react";
import "../App.css";
import axios from 'axios';

import {Badge, ListGroupItem} from 'reactstrap';
import AuthenticationService from "../service/AuthenticationService";

class Mockups extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mockups: [],
            serverUrl: process.env.REACT_APP_SERVER_URL
        }
    }

    componentDidMount() {
        let headers = {headers: {authorization: AuthenticationService.getAuthToken()}};
        axios.get(this.state.serverUrl + '/mockups/all', headers)
            .then((response) => {
                const data = response.data;
                this.setState({mockups: data});
            })
            .catch(response => {
                console.log("Error: " + response);
            });
    }


    render() {

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light navbar-secondary">
                    <span className="container float-left navbar-breadcrumbs">
                        <a>Mockups</a>
                    </span>
                </nav>
                <div className="list-wrapper">
                    <h2>Mockups</h2>
                    <div className="list-group">
                        {this.state.mockups.map((item) => {
                            return <ListGroupItem tag="button" action
                                                  onClick={(e) => window.location.href = "/mockup/view/" + item.id}>
                                <a className="list-link">{item.name}</a> &ensp;
                                {item.archived &&
                                <Badge pill className="badge-pill">archived</Badge>}
                            </ListGroupItem>
                        })}
                    </div>
                </div>
            </div>
        );
    }
}


export default Mockups;