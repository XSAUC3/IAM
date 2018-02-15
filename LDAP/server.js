var express = require('express');
var ldap = require('ldapjs');
var bodyParser = require('body-parser');
var Routes = require('./Routes/Routes');

var client = ldap.createClient({
    url: 'ldap://localhost:10389/ou=ITdept,o=kavalus'
});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/login', Routes);

app.get('/', (req, res, next) => {
    res.json({Error: 'Invalid Request..!'});
});

app.listen(2000);
console.log("Server is running on port 2000!");
