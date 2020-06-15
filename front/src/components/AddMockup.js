import React, {Component} from "react";
import {Form, FormGroup, Input, Label} from 'reactstrap';
import "../App.css";
import AuthenticationService from "../service/AuthenticationService";
import {Redirect} from "react-router-dom";
import axios from 'axios';

class AddMockup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mockupName: "",
            sourceLink: "",
            projectId: this.props.match.params.id,
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
        const url = this.state.serverUrl + "/mockups/add";
        axios.post(url, null, {params: this.state, headers: {authorization: AuthenticationService.getAuthToken()}})
            .then(r => this.handleRedirect(r.data))
            .catch(r => alert(r))
    };

    handleRedirect(id) {
        window.location.href = '/mockup/view/' + id;
    }

    render() {
        if (!AuthenticationService.isUserLoggedIn()) {
            return <Redirect to="/sign-in"/>
        }
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <Form onSubmit={this.submitForm}>
                        <FormGroup>
                            <Label for="mockupName">Mockup name</Label>
                            <Input name="mockupName"
                                   type="text"
                                   value={this.state.mockupName}
                                   onChange={this.handleChange}
                                   placeholder="Enter mockup name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="sourceLink">Link to mockup prototype</Label>
                            <Input name="sourceLink"
                                   type="text"
                                   value={this.state.sourceLink}
                                   onChange={this.handleChange}
                                   placeholder="Enter link"
                            />
                        </FormGroup>
                        <button className="btn btn-block btn-primary">Add mockup</button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AddMockup;