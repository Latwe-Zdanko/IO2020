import React, {Component} from "react";
import AuthenticationService from "../service/AuthenticationService";
import axios from "axios";
import {Button, Form, FormGroup, Input} from "reactstrap";

class ChangeNamePopup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            serverUrl: process.env.REACT_APP_SERVER_URL,
            projectId: this.props.id,
            projectName: "",
            showPopup: false
        }

        this.handleChange = this.handleChange.bind(this);

        let headers = {headers: {authorization: AuthenticationService.getAuthToken()}};
        axios.get(this.state.serverUrl + '/projects/id/' + this.state.projectId,headers)
            .then((response) => {
                const data = response.data;
                this.setState({projectName: data.name});
            })
            .catch(response => alert(response));
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    submitForm = (e) => {
        e.preventDefault();
        const url = this.state.serverUrl + "/projects/change-name/" + this.state.projectId;
        axios.post(url, null, {params: this.state.projectName, headers: {authorization: AuthenticationService.getAuthToken()}})
            .then(response => this.handleRedirect(response.data))
            .catch(response => alert(r))
    };


    handleRedirect(id) {
        window.location.href = '/project/view/' + id;
    }



    render() {
        return(
            <div className='popup'>
                <div className='popup_inner'>
                    <Form onSubmit={this.submitForm}>
                        <FormGroup>
                            <h2 for="projectName">Change Name</h2>
                            <Input name="projectName"
                                   type="text"
                                   value={this.state.projectName}
                                   onChange={this.handleChange}
                                   placeholder="Enter project name"
                            />
                        </FormGroup>
                        <Button className="btn btn-primary" >Confirm</Button>
                        <button className="btn btn-primary" onClick={this.props.closePopup}>Close</button>
                    </Form>
                </div>
            </div>
        );

    }

}

export default ChangeNamePopup;