node-hashtable
=========

A simple hashtable written in node (not meant for production).
It will help you share data over your node clusters or modules.


Installation
----------
```
npm install node-hashtable
```


Example
----------

**With cluster:**
```javascript
var hashTable = require("node-hashtable");

var cluster = require("cluster");

var numCPUs = require('os').cpus().length;


if(cluster.isMaster) {
  hashTable.set("test", "Hello World");

  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
      cluster.fork();
  }
}
else if(cluster.isWorker) {
  hashTable.get("test", function(data) { //Callback is required!
    console.log(data); //output -> "Hello World"
  });
}
```

**Without cluster:**
```javascript
var hashTable = require("node-hashtable");


hashTable.set("test", "Hello World");

var data = hashTable.get("test"); //In this case, callback is not required.

console.log(data); //output -> "Hello World"

```

Verbs
----------

### hashTable.set("key", data, [callback])
This function will set data to a key. If your using a cluster, you should create the callback function!
```
hashTable.set("key", data, function(){
  //Do stuff
});
```

### hashTable.get("key", [callback])
This function will return data. In this case, if using with a cluster, you NEED to create the callback!
```
hashTable.get("key", function(data){
  //Do stuff
});
```

### hashTable.add("key", data, [callback])
Diferent from .set, this will append data to the key. Be carefull when appending objects.
```
hashTable.add("key", "more stuff", function(){
  //Do stuff
});
```

### hashTable.update("key", data, [callback])
This will find the property you want to update inside the key, and update it.
```
hashTable.update("key", {prop: 'new'}, function(){
  //Do stuff
});
```

### hashTable.delete("key", [callback])
No explanations needed...
```
hashTable.delete("key", function(){
  //Do stuff
});
```

### hashTable.createHash(data, [callback])
It will return a hash for your data.
```
hashTable.createHash(data, function(hash){

  hashTable.set(hash, data, function(){
    //Do stuff
  });

});
```

### hashTable.createKey(data, [callback])
It will return a random hash key.
```
hashTable.createKey(data, function(key){

  hashTable.set(key, data, function(){
    //Memo your key!
  });

});
```

### hashTable.clear([callback])
This function will clear the entire hash table.
```
hashTable.createKey(function(){
  //Do stuff
});
```

Thank you 
----------
- Nodejistu/nssocket for providing the socket middleware