var net = require("net");
var cluster = require("cluster");

var port = 0;
var host = "localhost";

var hashTable = require('./hashtable.js');

var client = require("./client.js");

var server = require("./server.js");


module.exports = client.exchange;


if (cluster.isMaster) {
        /* If he is master, dont need to access throught data throught socket */
        client.master(1);
        
        /* Connect workers client to server */
        cluster.on('online', function(worker) {
            (function wait_exchange_server() {
                if(server.port() !== 0) {
                    worker.send({
                        hashtable_msg: 1,
                        port: server.port(),
                        host: server.host()
                    });
                }
                else {
                    setTimeout(function() { wait_exchange_server() }, 100);
                }
            })();
        });
}
else if (cluster.isWorker) {
    process.on('message', function(data) {
        if(data && data.hashtable_msg) {
            client(data.port, data.host);
        }
    })
}