//webSocket = new WebSocket("ws://sirilogistic.ibsx.net/Documents/demo/socket.php", "sck");
console.log("start websocket");
webSocket = new WebSocket("aed.ibsx.net:1234", "sck");
webSocket.onopen = function (event) 
{ 
	$("#log").append("connect detected.");
	webSocket.send("connected to server."); 
}; 
webSocket.onmessage = function (msg)
{
	console.log(msg.data);
	$("#log").append(msg.data);
}
webSocket.onerror = function(err)
{
	$("#log").append("error detected.");
	console.log(err);
}
function sendChat(txt)
{
	console.log("sendChat");
	$("#log").append(txt);
	webSocket.send(txt);
}