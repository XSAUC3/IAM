/* Simple hashtable manager, dont use it for PRODUCTION!!! */
var crypto = require("crypto");

var hashes = [];

module.exports = {
    
    set: function _set(key, data) {
        hashes[key] = data;
        return;
    },
    
    add: function _add(key, data) {
        if(! hashes[key]) {
            hashes[key] = [];
        }
        
        hashes[key].push(data);
        return;
    },
    
    get: function _get(key) {
        return hashes[key];
    },
    
    update: function _update(key, data) {
        for(var i in data) {
               hashes[key][i] = data[i];
        }
        return;
    },
    
    delete: function _delete(key) {
        hashes[key] = null;
        return;
    },
    
    clear: function _clear() {
        for(var key in hashes) {
            hashes[key] = null;
        }
        return;
    },
    
    createKey: function createKey(data) {
        var timestamp = new Date().getTime();
        var random = Math.random();
        var secret = timestamp + random;
        var string = "";
        
        if(data) {
            string = JSON.stringify(data) + secret;
        }
        else {
            string = secret.toString();
        }
        
        return crypto.createHash('sha256').update(string).digest('base64');
    },
    
    createHash: function createHash(data) {
        var string = JSON.stringify(data);
        
        return crypto.createHash('sha256').update(string).digest('base64');
    },
    
    indexes: function indexes() {
        var keys = [];
        
        for(var i in hashes) {
            keys.push(i);
        }
        
        return keys;
    }
    
}