import React from "react";
import {Button, Chip, List, ListItem, ListItemText, Paper, TextField, Typography} from "@material-ui/core";
import AuthenticationService from "../service/AuthenticationService";
import {makeStyles} from "@material-ui/core/styles";
import io from "socket.io-client";

const styles = makeStyles (theme => (
{
  root :
  {
    margin : "50px",
    padding : theme.spacing (3, 2),
    backgroundColor : "lightblue"
  },
  flex :
  {
    display : "flex",
    alignItems : "center"
  },
  topicsWindow :
  {
    width : "30%",
    height : "300px",
    backgroundColor : "grey",
    borderRight : "3px solid black"
  },
  chatWindow :
  {
    width : "70%",
    height : "300px",
    backgroundColor : "darkgrey",
    padding : "20px"
  },
  chatBox :
  {
    width : "90%",
  },
  button :
  {
    width : "10%",
  },
  greenChip :
  {
    backgroundColor : "lightgreen",
    marginRight : "5px"
  },
  blueChip :
  {
    backgroundColor : "lightblue",
    marginRight : "5px"
  }
}
));
const initState =
{
  General : [],
};
let socket;

function reduce (allChats, newMessage)
{
  const from = newMessage.from;
  const message = newMessage.message;
  const topic = newMessage.topic;
  return { ...allChats, [topic]: [ ...allChats[topic], { from, message } ] };
}
function addNewUser (allChats, user)
{
	if (allChats[user] === undefined) return { ...allChats, [user]: [] };
	else return allChats;
}
function sendChatAction (value)
{
  socket.emit ("CHAT_MESSAGE", value);
}
export default function Chat ()
{
  const classes = styles ();
  socket = io (":3010");
	const user = AuthenticationService.getUserName ();
  initState[user] = [];
  let [allChats, changeAllChats] = React.useState (initState);
  const topics = Object.keys (allChats);
  let [activeTopic, changeActiveTopic] = React.useState (topics[0]);
  let [textValue, changeTextValue] = React.useState ("");
	socket.on ("CHAT_MESSAGE", message => changeAllChats (reduce (allChats, message)));
	socket.on ("NEW_USER", user => changeAllChats (addNewUser (allChats, user)));
	return (
  <div>
    <Paper className={classes.root}>
      <Typography variant="h4" component="h2">Chat</Typography>
      <Typography component="p">{activeTopic}</Typography>
      <div className={classes.flex}>
        <div className={classes.topicsWindow}>
          <List component="nav">{
            topics.map (name =>
            <ListItem onClick={event => changeActiveTopic (event.target.innerText)} key={name} button><ListItemText primary={name}></ListItemText></ListItem>)
          }</List>
        </div>
        <div className={classes.chatWindow}>
          {
            allChats[activeTopic].map ((chat, I) =>
            (<div className={classes.flex} key={I}>
              <Chip label={chat.from} className={chat.from === user ? classes.greenChip : classes.blueChip}/>
              <Typography component="p">{chat.message}</Typography>
            </div>))
          }
        </div>
      </div>
      <div className={classes.flex}>
        <TextField className={classes.chatBox} label="Text" value={textValue} onChange={event => changeTextValue (event.target.value)}/>
        <Button variant="contained" color="primary" className={classes.button}
                onClick={() => { sendChatAction ({ from : user, message : textValue, topic : activeTopic }); changeTextValue (""); }}>Send</Button>
      </div>
    </Paper>
  </div>
  );
}