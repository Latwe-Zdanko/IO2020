import React, {Component} from "react";

import AuthenticationService from "../service/AuthenticationService";
import axios from "axios";
import {Layer, Stage, Rect} from "react-konva";




class AddHighlightPopup extends Component {

    constructor(props) {

        super(props);
        this.state = {
            serverUrl: process.env.REACT_APP_SERVER_URL,
            index: this.props.index,
            mockupId: this.props.mockupId,
            showPopup: false,
            isDrawing: false,
            posX: 0,
            posY: 0,
            hght: 0,
            wdth: 0,
            highlights: []
        };



    }

    componentDidMount() {
        let headers = {headers: {authorization: AuthenticationService.getAuthToken()}};
        axios.get(this.state.serverUrl + '/highlights/byMockupId/' + this.state.mockupId + "/byQuestionNumber/" + this.state.index, headers)
            .then((response) => {
                const data = response.data;
                this.setState({highlights: data});
            })
            .catch(response => {
                console.log("Error: " + response);
            });

    }


    handleClick = (e) => {
        if(this.state.isDrawing) {
            this.setState({
                isDrawing: !this.state.isDrawing,
            })
            return;
        }



        this.setState({
            posX: e.evt.layerX,
            posY: e.evt.layerY,
            wdth: 0,
            hght: 0,
            isDrawing: true
        });

    }

    handleClose = (e) => {


        e.preventDefault();
        const url = this.state.serverUrl + "/highlights/add";
        const parameters =
            {
                mockupId: this.state.mockupId,
                questionNumber: this.state.index,
                width: this.state.wdth,
                height: this.state.hght,
                posX: this.state.posX,
                posY: this.state.posY

            };
        axios.post(url, null, {params: parameters, headers: {authorization: AuthenticationService.getAuthToken()}})
            .catch(r => alert(r));

        this.props.closePopup();

    }

    handleMouseMove= (e) => {



        const mouseX = e.evt.layerX;
        const mouseY = e.evt.layerY;

        if (this.state.isDrawing) {
            this.setState({
                wdth: mouseX - this.state.posX,
                hght: mouseY - this.state.posY,
            });
        }
    }

    render(){
        return (
            <div className='highlight'>
                <div className='highlight_inner'>
                    <button className="btn btn-secondary" onClick={this.handleClose}>Save</button>
                    <button className="btn btn-secondary" onClick={this.props.closePopup}>Cancel</button>
                </div>

                <Stage width={window.innerWidth-480} height={window.innerHeight}  onClick={this.handleClick}
                      onContentMousemove={this.handleMouseMove}>
                    <Layer>
                                <Rect
                                    x={this.state.posX}
                                    y={this.state.posY}
                                    width={this.state.wdth}
                                    height={this.state.hght}
                                    fill={"rgba(0,0,0,0)"}
                                    stroke={"lightblue"}
                                    strokeWidth={4}
                                />
                        {this.state.highlights.map(highlight => {
                            return (
                                <Rect
                                    x={highlight.posX}
                                    y={highlight.posY}
                                    width={highlight.width}
                                    height={highlight.height}
                                    fill={"rgba(0,0,0,0)"}
                                    stroke={"lightblue"}
                                    strokeWidth={4}
                                />
                            );
                        })}
                    </Layer>
                </Stage>

            </div>


        );


    }

}

export default AddHighlightPopup;