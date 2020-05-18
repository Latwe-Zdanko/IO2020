import React, {Component} from "react";
import "../App.css";
import axios from 'axios';
import {Button, Container} from 'reactstrap';

class ViewProject extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projectId: this.props.match.params.id,
            mockups: [],
            serverUrl: "http://localhost:8080"
        }
    }

    componentDidMount() {
        axios.get(this.state.serverUrl + '/mockups/projectid/' + this.state.projectId)
            .then((response) => {
                const data = response.data;
                this.setState({mockups: data});
            })
            .catch(() => {
                console.log("Error");
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
                        <Button href={"/mockup/add/" + this.state.projectId}>Add Mockup</Button>
                    </div>
                </div>
            </Container>
        );
    }
}

export default ViewProject;