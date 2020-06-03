import React, {Component} from "react";
import "../App.css";
import axios from 'axios';
import {Button, Container, ListGroupItem} from 'reactstrap';
import AuthenticationService from "../service/AuthenticationService";

class Mockups extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mockups: [],
            serverUrl: "http://localhost:8080"
        }
    }

    componentDidMount() {
        let headers = {headers: {authorization: AuthenticationService.getAuthToken()}};
        axios.get(this.state.serverUrl + '/mockups/all',headers)
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
                                return <ListGroupItem tag="button" action onClick={(e) => window.location.href = "/mockup/view/" + item.id}>
                                    {item.name}</ListGroupItem>
                            })}
                        </div>
                    </div>
            </div>
        );
    }
}


export default Mockups;