import React, {Component} from "react";
import { Form, Input, Label, Button, FormGroup } from 'reactstrap';
import "../App.css";
import "../styles/home.css"

class AddMockup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mockupName: "",
            sourceLink: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    submitForm = (e) => {
        e.preventDefault();
        console.log(this.state);
        console.log(this.props);
        const url = new URL("http://localhost:8080/mockups/add"),
            params = this.state;
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        fetch(url, {method: "POST"})
            .then(r => {
                console.log(r);
                if (r.status === 200) {
                    this.handleRedirect();
                }
            });
    }

    handleRedirect() {
        window.location.href = 'http://localhost:3000/mockup/view/' + this.state.mockupName;
    }

    render() {
        return (
            <div className='wrapper'>
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
                               placeholder="Enter link to your mockup"
                        />
                    </FormGroup>
                        <Button>Add Mockup</Button>
                </Form>
            </div>
        );
    }
}

export default AddMockup;