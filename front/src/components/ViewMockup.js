import React, {Component} from "react";
import {Container} from 'reactstrap';
import "../App.css";

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

        fetch(this.state.serverUrl + '/mockups/id/' + this.props.match.params.id)
            .then(response => {
                if (response.status === 200) {
                    response.body.getReader().read().then(val => {
                        const mockupString = new TextDecoder("utf-8").decode(val.value);
                        const mockupObject = JSON.parse(mockupString);
                        this.setState({
                            mockup: mockupObject
                        });
                    });
                } else {
                    alert("Error: " + response.status);
                }
            });
    }

    getSourceLink() {
        return this.state.mockup.source;
    }

    render() {
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