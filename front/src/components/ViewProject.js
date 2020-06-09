import React, {Component} from "react";
import "../App.css";
import axios from 'axios';
import {Button, Container} from 'reactstrap';
import AuthenticationService from "../service/AuthenticationService";
import ChangeNamePopup from "./ChangeNamePopup";

const serverUrl = process.env.REACT_APP_SERVER_URL;

class ViewProject extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projectId: this.props.match.params.id,
            mockups: [],
            projectName: ""
        }

        let headers = {headers: {authorization: AuthenticationService.getAuthToken()}};
        axios.get(serverUrl + '/projects/id/' + this.state.projectId,headers)
            .then((response) => {
                const data = response.data;
                this.setState({projectName: data.name});
            })
            .catch(response => {
                console.log("Error: " + response);
            });

    }

    componentDidMount() {
        let headers = {headers: {authorization: AuthenticationService.getAuthToken()}};
        axios.get(serverUrl + '/mockups/byProjectId/' + this.state.projectId,headers)
            .then((response) => {
                const data = response.data;
                this.setState({mockups: data});
            })
            .catch(response => {
                console.log("Error: " + response);
            });
    }

    togglePopup(){
        this.setState({
            showPopup: !this.state.showPopup
        });
    }


    archive(e){
        e.preventDefault();
        const url = API_URL + "/mockups/archive/" + e.target.value;
        axios.post(url, null, {params: this.state, headers: {authorization: AuthenticationService.getAuthToken()}})
            .then(r => window.location.reload(false))
            .catch(r => alert(r))
    }


    render() {

        return (
            <Container style={{marginTop: '60px', overflowX: 'hidden'}}>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <h2>{this.state.projectName}<button className="btn btn-primary" onClick={this.togglePopup.bind(this)}>change name</button></h2>
                        <br/>
                        <div className="list-group">
                            {this.state.mockups.map((item) => {
                                return <div><a className="link" href={"/mockup/view/" + item.id}>{item.name}</a>
                                    <Button className="btn-archive"  onClick={this.archive} value={item.id}>archive</Button></div>
                            })}
                        </div>
                        {this.state.showPopup ?
                            <ChangeNamePopup
                                id={this.state.projectId}
                                closePopup={this.togglePopup.bind(this)}
                            />
                            : null
                        }
                        <br/><br/>
                        <Button className="btn btn-primary" href={"/mockup/add/" + this.state.projectId}>Add Mockup</Button>
                    </div>
                </div>
            </Container>
        );
    }
}

export default ViewProject;


