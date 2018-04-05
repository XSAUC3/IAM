const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const proxy = require('http-proxy-middleware');
const request = require('request');

// This is The Filter Based On Which The Proxy Will Either be done or not.
var filter = (pathname, req) => {
	//return (pathname.match('^/auth') && req.method === 'POST' && req.body.auth == '123');
	return (pathname.match('^/auth/*') && req.header("auth") != undefined && (req.method === 'GET' || req.method === 'POST'));
};

var authProxy = proxy(filter, {target: 'http://localhost:80/index.html', pathRewrite: {'^/auth/*': ''}});

const app = express();


// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/auth', authProxy);


// Index Route
app.get('/', (req, res) => {
	if(req.header("auth") == undefined){
		res.sendFile(path.join(__dirname + '/login.html'));
	}else{
  		res.send('Invalid Endpoint');

	}
});

app.get('/auth/*', (req, res) => {
	if(req.header("auth") == undefined){
		res.sendFile(path.join(__dirname + '/login.html'));
	}else{
  		res.send('Invalid Endpoint');
	}
});

app.post('/auth/*', (req, res) => {
	if(req.header("auth") == undefined){
		res.sendFile(path.join(__dirname + '/login.html'));
	}else{
  		res.send('Invalid Endpoint');
	}
});

app.post('/login/*', (req, res) => {
	
	if((req.body.username != null && req.body.username != undefined) &&
		(req.body.password != null && req.body.password != undefined) &&
		(req.body.username != '' && req.body.password != '')){
			
			// The Logic For Getting Authorization Based On Username Password Passed will come Here
			// This Authorization Key Value Pair will then be added to headers Below
			// For Now it Has Been Hardcoded for Demonstration

		request({method: 'POST', url: 'http://localhost:3000/auth/', headers: {'auth': '123'}}, (err, remoteResponse, remoteBody) => {
			if(err){
				return res.send(err);
			}else{
				return res.send(remoteBody);
			}
		})
	}else{
		res.sendFile(path.join(__dirname + '/re_login.html'));
	}

})
// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});
