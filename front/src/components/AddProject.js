import React, {Component} from "react";
import {Form, FormGroup, Input, Label} from 'reactstrap';
import "../App.css";
import AuthenticationService from "../service/AuthenticationService";
import axios from 'axios';


class AddProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: "",
            serverUrl: process.env.REACT_APP_SERVER_URL
        };
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    submitForm = (e) => {
        e.preventDefault();
        const url = this.state.serverUrl + "/projects/add";
        axios.post(url, null, {params: this.state, headers: {authorization: AuthenticationService.getAuthToken()}})
            .then(r => this.handleRedirect(r.data))
            .catch(r => alert(r))
    };

    handleRedirect(id) {
        window.location.href = '/project/view/' + id;
    }

    render() {
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <Form onSubmit={this.submitForm}>
                        <FormGroup>
                            <Label for="projectName">Project name</Label>
                            <Input name="projectName"
                                   type="text"
                                   value={this.state.projectName}
                                   onChange={this.handleChange}
                                   placeholder="Enter project name"
                            />
                        </FormGroup>
                        <button className="btn btn-block btn-primary">Add project</button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AddProject;