import React, {Component} from "react";
import AuthenticationService from "../service/AuthenticationService";
import axios from "axios";
import {Layer, Rect, Stage} from "react-konva";


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
            height: 0,
            width: 0
        };
    }


    handleClick = (e) => {
        if (this.state.isDrawing) {
            this.setState({
                isDrawing: !this.state.isDrawing,
            })
            return;
        }

        this.setState({
            posX: e.evt.layerX,
            posY: e.evt.layerY,
            width: 0,
            height: 0,
            isDrawing: true
        });
    }

    handleClose = (e) => {
        e.preventDefault();
        const parameters =
            {
                mockupId: this.state.mockupId,
                questionNumber: this.state.index,
                width: this.state.width,
                height: this.state.height,
                posX: this.state.posX,
                posY: this.state.posY
            };

        this.props.highlightList.push(parameters);

        this.props.closePopup();
    }

    handleMouseMove = (e) => {
        const mouseX = e.evt.layerX;
        const mouseY = e.evt.layerY;

        if (this.state.isDrawing) {
            this.setState({
                width: mouseX - this.state.posX,
                height: mouseY - this.state.posY,
            });
        }
    }

    render() {
        return (
            <div className='highlight'>
                <div className='highlight_inner'>
                    <button className="btn btn-primary" onClick={this.handleClose}>Save</button>
                </div>
                <div className='highlight_inner2'>
                    <button className="btn btn-secondary" onClick={this.props.closePopup}>Cancel</button>
                </div>
                <Stage width={window.innerWidth - 480} height={window.innerHeight} onClick={this.handleClick}
                       onContentMousemove={this.handleMouseMove}>
                    <Layer>
                        <Rect
                            x={this.state.posX}
                            y={this.state.posY}
                            width={this.state.width}
                            height={this.state.height}
                            fill={"rgba(0,0,0,0)"}
                            stroke={"rgba(116,207,230,0.7)"}
                            strokeWidth={4}
                        />
                    </Layer>
                </Stage>
            </div>
        );
    }
}

export default AddHighlightPopup;