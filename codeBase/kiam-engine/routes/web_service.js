const express = require('express');
const router = express.Router();

// bring in the function
const IdentifyingAttributes = require('./functions/identifyingAttributes');


//-----------------------------------------------Web-Service-------------------------------------------------

router.get('/PIP/', (req, res, next) => {

    // "href": "http://servername/server/ent_davita/getusersecuritycontextfull/views/getusersecuritycontextfull?application_info=CWOW&facilityid=12345&adusername=AMUNSHI&access_token=TestHToken1"

    var application_info = req.query['application_info'] || 'default';
    var facilityid = req.query['facilityid'] || 'default';
    var adusername = req.query['adusername'] || 'default';
    var access_token = req.query['access_token'] || 'default';
    
    
    if (err) res.json(err) ;
    res.json(IdentifyingAttributes(application_info,facilityid,adusername,access_token)); 
 });
  

  module.exports = router;