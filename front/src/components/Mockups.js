import React, {Component} from "react";
import "../App.css";
import axios from 'axios';
import {Container} from 'reactstrap';

class Mockups extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mockups: [],
            serverUrl: "http://localhost:8080"
        }
    }

    componentDidMount() {
        axios.get(this.state.serverUrl + '/mockups/all')
            .then((response) => {
                const data = response.data;
                this.setState({mockups: data});
            })
            .catch(() => {
                console.log("Error while loading mockups by axios");
            });
    }



    render() {

        console.log(this.state.mockups);

        return (
            <Container style={{marginTop: '60px', overflowX: 'hidden'}}>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <h1>Mockups</h1>
                        <div className="list-group">
                            {this.state.mockups.map((item) => {
                                return <a href={"/mockup/view/" + item.id}>{item.name}</a>
                            })}
                        </div>
                    </div>
                </div>
            </Container>
    );
    }
}

export default Mockups;