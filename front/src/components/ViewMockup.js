import React, {Component} from "react";
import {Container} from 'reactstrap';
import "../App.css";
import AuthenticationService from "../service/AuthenticationService";
import {Redirect} from "react-router-dom";
import axios from 'axios'

class ViewMockup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serverUrl: "http://localhost:8080",
            mockup: "",
            iframeWidth: '110%',
            iframeHeight: window.innerHeight,
            scale: 'scale(0.9)'
        };
        this.iframe = React.createRef();

        let headers = {headers: {authorization: AuthenticationService.getAuthToken()}};
        axios.get(this.state.serverUrl + '/mockups/id/' + this.props.match.params.id, headers)
            .then(response => {
                this.setState({
                    mockup: response.data
                });
            }).catch(response =>
            alert("Error: " + response)
        );
    }

    getSourceLink() {
        return this.state.mockup.source;
    }

    render() {
        if (!AuthenticationService.isUserLoggedIn()) {
            return <Redirect to={"/"}/>
        }
        return (
            <Container style={{marginTop: '60px', overflowX: 'hidden'}}>
                <iframe ref={this.iframe} title="content" frameBorder={0}
                        width={this.state.iframeWidth} height={this.state.iframeHeight}
                        style={{transform: this.state.scale, transformOrigin: '0 0'}}
                        src={this.getSourceLink()} allowFullScreen={true}/>
            </Container>
        );
    }
}

export default ViewMockup;