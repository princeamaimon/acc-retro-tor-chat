
const WebSocket = require('ws'); // https://github.com/websockets/ws

var channels = {};
var stringify = require('node-stringify');

var express = require("express"),
app = express();
app.use(express.static(__dirname + '/public'));
app.listen(2601);

var http = require('http').Server(app);
var WebSocketServer = WebSocket.Server;

var wss = new WebSocket.Server({
              port: 8081
           });


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

http.listen(2600, function() {
    console.log('listening on *:2600');
});

wss.reaper = function reaper() {

   console.log(""); 
   console.log("wss.reaper = function reaper(): ");

   var connections = 0;
   for(var channel in channels) {
        var clients = channels[channel];
        for(var i = clients.length - 1; i >= 0; i--) {
            if(clients[i].readyState === WebSocket.CLOSED) {
               clients.splice(i, 1);
            }
        }
        if(channels[channel].length === 0) {
            console.log("  - channel: " + channel + " has 0 connection(s) / deleting...");
            delete(channels[channel]);
        } else {
            console.log("  - channel: " + channel + ": " + channels[channel].length + " connection(s)");
            connections = connections + channels[channel].length;
        }
   }
   console.log("  - #channels: " + Object.keys(channels).length + " / #connections: " + connections); 
}


wss.broadcast = function broadcast(channel, data) {

    console.log(""); 
    console.log("wss.broadcast = function broadcast(channel, data):");
    console.log("  - channel: " + channel + " -> " + data); 

    if(channels[channel]) {
        channels[channel].forEach(function each(client) {
            if(client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    } else {
        console.log("no clients for channel: "+channel);
    }

};


wss.on('connection', function(ws) {

   console.log(""); 
   console.log("wss.on('connection', function(ws): "); 

    var channel = require('url').parse(ws.upgradeReq.url,true).query.channel;
    console.log("  - new connection on channel: "+channel);

    if(!channels[channel]) {
      channels[channel] = [];
    }
    channels[channel].push(ws); 

    ws.on('message', function(msg) {
        console.log("made it here!!!");
        var message = JSON.parse(msg);
        wss.broadcast(message.channel, msg);
    });

});


setInterval(function(){
  console.log('before');
  wss.reaper();
  console.log('after');
}, 5*1000); 
