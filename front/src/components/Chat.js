import React from "react";
import {Button} from "reactstrap";
import {Chip, List, Paper, TextField, Typography} from "@material-ui/core";
import AuthenticationService from "../service/AuthenticationService";
import {makeStyles} from "@material-ui/core/styles";
import io from "socket.io-client";

const styles = makeStyles(theme => (
    {
        root:
            {
                margin: "50px",
                padding: theme.spacing(3, 2),
                backgroundColor: "white"
            },
        flex:
            {
                display: "flex",
                alignItems: "center"
            },
        topicsWindow:
            {
                width: "30%",
                height: "300px",
                backgroundColor: "#DDDDDD",
                borderRight: "3px solid black"
            },
        chatWindow:
            {
                width: "70%",
                height: "300px",
                backgroundColor: "#EEEEEE",
                padding: "20px"
            },
        greenChip:
            {
                backgroundColor: "lightgreen",
                marginRight: "5px"
            },
        blueChip:
            {
                backgroundColor: "lightblue",
                marginRight: "5px"
            }
    }
));
const initState =
    {
        General: [],
    };
let socket;

function reduce(allChats, newMessage) {
    const from = newMessage.from;
    const message = newMessage.message;
    const topic = newMessage.topic;
    return {...allChats, [topic]: [...allChats[topic], {from, message}]};
}

function addNewUser(allChats, user) {
    if (allChats[user] === undefined) return {...allChats, [user]: []};
    else return allChats;
}

function sendChatAction(value) {
    socket.emit("CHAT_MESSAGE", value);
}

export default function Chat() {
    const classes = styles();
    socket = io(":3010");
    const user = AuthenticationService.getUserName();
    initState[user] = [];
    let [allChats, changeAllChats] = React.useState(initState);
    const topics = Object.keys(allChats);
    let [activeTopic, changeActiveTopic] = React.useState(topics[0]);
    let [textValue, changeTextValue] = React.useState("");
    socket.on("CHAT_MESSAGE", message => changeAllChats(reduce(allChats, message)));
    socket.on("NEW_USER", user => changeAllChats(addNewUser(allChats, user)));
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light navbar-secondary">
        <span className="container float-left navbar-breadcrumbs">
          Chat
        </span>
            </nav>
            <Paper className={classes.root}>
                <h2>{activeTopic}</h2>
                <div className={classes.flex}>
                    <div className={classes.topicsWindow}>
                        <List component="nav">
                            {
                                topics.map(name =>
                                    (
                                        <>
                                            <Button onClick={event => changeActiveTopic(event.target.innerText)}
                                                    variant="contained" color="primary"
                                                    className="btn btn-primary btn-success"
                                                    style={{marginBottom: "5px", width: "70%"}}>{name}</Button>
                                            <br/>
                                        </>
                                    ))
                            }
                        </List>
                    </div>
                    <div className={classes.chatWindow}>
                        {
                            allChats[activeTopic].map((chat, I) =>
                                (<div className={classes.flex} key={I}>
                                    <Chip label={chat.from}
                                          className={chat.from === user ? classes.greenChip : classes.blueChip}/>
                                    <Typography component="p">{chat.message}</Typography>
                                </div>))
                        }
                    </div>
                </div>
                <div className={classes.flex}>
                    <TextField style={{width: "90%"}} label="Text"
                               value={textValue} onChange={event => changeTextValue(event.target.value)}/>
                    <Button variant="contained" color="primary" className="btn btn-lg btn-primary"
                            style={{width: "10%", marginTop: "5px"}}
                            onClick={() => {
                                sendChatAction({from: user, message: textValue, topic: activeTopic});
                                changeTextValue("");
                            }}>Send</Button>
                </div>
            </Paper>
        </div>
    );
}