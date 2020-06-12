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
                <nav className="navbar navbar-expand-lg navbar-light "
                     style={{position: "float-top", marginTop: "55px", marginBottom: "10px"}}>
                    <span className="container float-left"
                          style={{textAlign: "left", display: "inline", justifyContent: "start"}}>
                        <a>Mockups</a>
                    </span>
                </nav>
                <div className="list-wrapper">
                    <h2>Mockups</h2>
                    <div className="list-group">
                        {this.state.mockups.map((item) => {
                            return <ListGroupItem tag="button" action
                                                  onClick={(e) => window.location.href = "/mockup/view/" + item.id}>
                                {item.name} &ensp;
                                {item.archived &&
                                <Badge pill style={{backgroundColor: "rgba(28,125,232,0.85)"}}>archived</Badge>}
                            </ListGroupItem>
                        })}
                    </div>
                </div>
            </div>
        );
    }
}


export default Mockups;