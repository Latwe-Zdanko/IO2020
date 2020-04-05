import React, {Component} from "react";
import {Container, Breadcrumb} from 'reactstrap';
import "../App.css";
import "../styles/home.css"

class ViewMockup extends Component {
    constructor(props) {
        super(props);
        this.state = {mockup: ""};

        fetch('http://localhost:8080/mockups/name/' + this.props.match.params.name)
            .then(response => {
                response.body.getReader().read().then(val => {
                    const mockupString = new TextDecoder("utf-8").decode(val.value);
                    const mockupObject = JSON.parse(mockupString);
                    console.log(mockupObject);
                    this.setState({
                        mockup: mockupObject
                    });
                });
            });

    }

    getSourceLink() {
        return this.state.mockup.source;
    }

    getMockupName() {
        return this.state.mockup.name;
    }

    render() {
        return (
            <div>
                <Container>
                    <Breadcrumb>
                        {this.getMockupName()}</Breadcrumb>
                    <iframe width={window.innerWidth*0.9} height={window.innerHeight*0.9}
                            title="content" src={this.getSourceLink()}/>
                </Container>

            </div>
        );
    }
}

export default ViewMockup;