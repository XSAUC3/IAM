var nssocket = require("nssocket");

var cluster = require("cluster");

var hashTable = require('./hashtable.js');

var client = require("./client.js");


var port = 0;

var host = "localhost";


module.exports.port = function() {
    return port;  
};
module.exports.host = function() {
    return host;  
};


/* Create the exchange server */
var server = nssocket.createServer(function(socket) {
    
    socket.data("ex", function(data){
        
        for(var prop in data) {
            
            var json = {
                _id: data[prop]._id,
                data: hashTable[prop].apply(undefined, data[prop].args) || null
            }

            socket.send("ex", json);

        }
        
    });
    
});

server.on("listening", function() {
    
    port = server.address().port;

});
        
server.listen(port, host);