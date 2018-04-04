var nssocket = require("nssocket");

var hashTable = require("./hashtable.js");

var client;

var master = 0;

var callback = [];


module.exports = function _client(_port, _host) {
 
    client = new nssocket.NsSocket();
    
    client.connect(_port, _host);
    
    client.data("ex", function (json) {
       
       //json = JSON.parse(json);
       
       if(callback[json._id]) {
            callback[json._id](json.data);
            callback[json._id] = null;
       }

    });
    
};

module.exports.master = function(bool) {
    master = bool;
};


/* Send func */
var retry = 0;
function send_ex(event, data) {
    
    if(client) {
        return client.send(event, data);
    }

    /* Client still offline retry */
    setTimeout(function() {
        if(retry++ == 10) throw new Error('Hashtable could not connect to exchange server.');
        
        send_ex(event, data);
    }, 100);
    
}

/* Dynamic */

var exchange = [];

function create_fnc(verb) {
    
    return function() {
        
        var args = [];
        var fnc = null;
        
        for (var i = 0; i < arguments.length; i++) {
            
            if(i == arguments.length - 1 && typeof arguments[ i ] === "function") {
                fnc = arguments[i];
            }
            else {
                args.push(arguments[i]);
            }
            
        }

        if(master) {
            
            var data = hashTable[verb].apply(undefined, args) || null;
            
            if(fnc) return fnc(data);
            
            return data;
            
        }
        
        var _id = Math.random() + new Date().getTime();
        
        var json = {};

        json[verb] = { _id: _id, args: args };

        callback[_id] = fnc;

        send_ex("ex", json);
        
    };
    
}

for(var i in hashTable) {
    
    exchange[i] = create_fnc(i);

}

module.exports.exchange = exchange;