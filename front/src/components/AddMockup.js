import React, {Component} from "react";
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import "../App.css";

class AddMockup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mockupName: "",
            sourceLink: "",
            projectId: this.props.match.params.id,
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
        const url = new URL(this.state.serverUrl + "/mockups/add");
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
        window.location.href = '/mockup/view/' + id;
    }

    render() {
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
                        <Button className="btn btn-primary btn-block">Add Mockup</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AddMockup;