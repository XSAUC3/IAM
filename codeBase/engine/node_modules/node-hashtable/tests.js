var hashtable = require("./index.js");

var cluster = require("cluster");

var numCPUs = require('os').cpus().length;




if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < 1; i++) {
        cluster.fork();
    }
    
    hashtable.set("key", ["Yello"]);
    hashtable.add("key", "Blu");
    hashtable.add("key", "Blac");
    
    console.log( hashtable.createHash({test:1}) );

}

if (cluster.isWorker) {
    
    hashtable.createKey(function(data) {
        console.log(data);
    });
    
    hashtable.get("key", function(data) {
        console.log(data)
    });
    
}
