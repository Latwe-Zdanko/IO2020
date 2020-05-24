let app = require ("express")();
let http = require ("http").createServer (app);
let io = require ("socket.io")(http);

let users = [];

io.on ("connection", function (socket)
{
	socket.on ("NEW_USER", function (name)
	{
		users.push (name);
		console.log (`New user: ${name}`);
	});

  socket.on ("CHAT_MESSAGE", function (message)
  {
    console.log (JSON.stringify (message));
    io.emit ("CHAT_MESSAGE", message);
  });
});

http.listen (3010);