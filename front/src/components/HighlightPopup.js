import React, {Component} from "react";
import AuthenticationService from "../service/AuthenticationService";
import axios from "axios";
import {Group, Layer, Rect, Stage, Text} from "react-konva";

class HighlightPopup extends Component {

    constructor(props) {

        super(props);
        this.state = {
            serverUrl: process.env.REACT_APP_SERVER_URL,
            surveyId: this.props.surveyId,
            showPopup: false,
            highlights: []
        };
    }

    componentDidMount() {
        let headers = {headers: {authorization: AuthenticationService.getAuthToken()}};
        axios.get(this.state.serverUrl + '/highlights/bySurveyId/' + this.state.surveyId, headers)
            .then((response) => {
                const data = response.data;
                this.setState({highlights: data});
            })
            .catch(response => {
                console.log("Error: " + response);
            });
    }


    render() {
        return (
            <div className='highlight'>
                <Stage width={window.innerWidth - 480} height={window.innerHeight} onClick={this.handleClick}
                       onContentMousemove={this.handleMouseMove}>
                    <Layer>
                        {this.state.highlights.map(highlight => {
                            return (
                                <Group>
                                    <Rect
                                        x={highlight.posX}
                                        y={highlight.posY}
                                        width={highlight.width}
                                        height={highlight.height}
                                        fill={"rgba(0,0,0,0)"}
                                        stroke={"rgba(116,207,230,0.7)"}
                                        strokeWidth={4}
                                    />
                                    <Text
                                        x={highlight.posX}
                                        y={highlight.posY}
                                        width={highlight.width}
                                        height={highlight.height}
                                        text={highlight.questionNumber}
                                        fontSize={20}
                                        fill={"rgb(131,201,85)"}
                                    />
                                </Group>
                            );
                        })}
                    </Layer>
                </Stage>
            </div>
        );
    }
}

export default HighlightPopup;