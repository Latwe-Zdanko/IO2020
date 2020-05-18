import React, {Component} from "react";
import "../App.css";
import axios from 'axios';
import {Button, Container} from 'reactstrap';
import AuthenticationService from "../service/AuthenticationService";

class ViewProject extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projectId: this.props.match.params.id,
            mockups: [],
            serverUrl: "http://localhost:8080"
        }
    }

    componentDidMount() {
        let headers = {headers: {authorization: AuthenticationService.getAuthToken()}};
        axios.get(this.state.serverUrl + '/mockups/projectid/' + this.state.projectId,headers)
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
                                return <a href={"/mockup/view/" + item.id}>{item.name}</a>
                            })}
                        </div>
                        <br/>
                        <Button href={"/mockup/add/" + this.state.projectId}>Add Mockup</Button>
                    </div>
                </div>
            </Container>
        );
    }
}

export default ViewProject;