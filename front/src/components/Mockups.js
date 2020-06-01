import React, {Component} from "react";
import "../App.css";
import axios from 'axios';
import {Container} from 'reactstrap';
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
            <Container style={{marginTop: '60px', overflowX: 'hidden'}}>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <h1>Mockups</h1>
                        <div className="list-group">
                            {this.state.mockups.map((item) => {
                                return <div><a href={"/mockup/view/" + item.id}>{item.name} </a>{item.archived && <text>archived</text>}</div>
                            })}
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}


export default Mockups;