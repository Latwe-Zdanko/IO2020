import React, {Component} from "react";
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import "../App.css";

class AddProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: "",
            serverUrl: "http://localhost:8080"
        };
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    submitForm = (e) => {
        e.preventDefault();
        const url = new URL(this.state.serverUrl + "/projects/add");
        const params = this.state;
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        fetch(url, {method: "POST"})
            .then(r => {
                if (r.status === 200) {
                    r.body.getReader().read().then(val => {
                        const id = new TextDecoder("utf-8").decode(val.value);
                        this.handleRedirect(id);
                    });
                }
            });

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
                        <Button className="btn btn-primary btn-block">Add Project</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AddProject;