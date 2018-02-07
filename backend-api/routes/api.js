const express = require('express');
const router = express.Router();

// bring in models
const Resource = require('../models/res_schema');
const ResourceType = require('../models/res_type_schema');

// fetch Resource Types
router.get('/res_types', (req, res, next) => {
  ResourceType.find({}, function(err, restype) {
    if (err) return handleError(err);
    res.json(restype);  
  });
});

//fetch generated resources
router.get('/generated_resources', (req, res, next) => {
  Resource.find({}, function(err, reso) {
    if (err) return handleError(err);
    res.json(reso);  
  });
});

//fetch resource by ID
router.get('/ResourceById', (req,res,next) =>{
  Resource.findById( req.query.id, (err, eres) => {  
    if (err) {res.status(500).send(err);} 
    else { res.json(eres); }
  });
});

// Add Resource
router.post('/addResource', (req, res, next) => {
  let newResource = new Resource({
    restype_id      :req.body.restype_id,
    res_name        :req.body.res_name,
    res_displayname :req.body.res_displayname,
    res_description :req.body.res_description
  });
  Resource.addResource(newResource ,(err, resource) =>{
    if(err) { res.sendStatus(403); }
    else    { res.sendStatus(200); }
  });
});

//edit resources
router.put('/updateResource' , (req,res,next) => {
  Resource.findOneAndUpdate({_id: req.body._id },{$set:req.body }  ,(err , edres) => {
    if(err) {res.status(500).send(err);} 
    else    {res.send(edres);  }
  });

})

//Delete Resource
router.delete('/delResource' , (req,res,next) => {
  Resource.findByIdAndRemove({_id: req.body.id}, 
    function(err, docs){
   if(err) { res.sendStatus(403); }
   else    { res.sendStatus(200); }
 });
});

module.exports = router;
