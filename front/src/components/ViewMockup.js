import React, {Component} from "react";
import {Container} from 'reactstrap';
import Fullscreen from "react-full-screen";
import "../App.css";

class ViewMockup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mockup: "",
            isFull: false,
            iframeWidth: '110%',
            iframeHeight: window.innerHeight,
            scale: 'scale(0.9)'
        };
        this.iframe = React.createRef();

        fetch('http://localhost:8080/mockups/name/' + this.props.match.params.name)
            .then(response => {
                response.body.getReader().read().then(val => {
                    const mockupString = new TextDecoder("utf-8").decode(val.value);
                    const mockupObject = JSON.parse(mockupString);
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
        return this.state.mockup.name""
    setFullscreen = () => {
        this.setState({
            isFull: true,
            iframeWidth: window.screen.availWidth,
            iframeHeight: window.screen.availHeight,
            scale: 'scale(1)'
        });
    };

    setDefaultSize() {
        this.setState({
            iframeWidth: '110%',
            iframeHeight: window.innerHeight,
            scale: 'scale(0.9)'
        })
    }

    handleFullscreenChange = (isFull) => {
        this.setState({isFull});
        if (!isFull) this.setDefaultSize()
    };

    render() {
        return (
            <Container style={{marginTop: '60px', overflowX: 'hidden'}}>
                <Fullscreen enabled={this.state.isFull} onChange={this.handleFullscreenChange}>
                    <iframe ref={this.iframe} title="content" frameBorder={0}
                            width={this.state.iframeWidth} height={this.state.iframeHeight}
                            style={{transform: this.state.scale, transformOrigin: '0 0'}}
                            src={this.getSourceLink()} allowFullScreen={true}/>
                </Fullscreen>
            </Container>
        );
    }
}

export default ViewMockup;