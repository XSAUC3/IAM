const express = require('express');
var validator = require('validator');

const router = express.Router();

//blacklisted characters [RegularExpression] that cannot go in the database
const blacklistedExp = '^[^<>{}\"/|;:.,~!?@#$%^=&*\\]\\\\()\\[¿§«»ω⊙¤°℃℉€¥£¢¡®©0-9_+]*$';

// bring in the model
const App = require('../models/app_schema');

//fetch All Apps
router.get('/Applications', (req, res, next) => {
  App.find({}, function(err, apps) {
    if (err) res.json(err) ;
    res.json(apps);  
  });
});

//fetch single app by id:
router.get('/:id', (req,res,next) =>{
  App.findById( req.params.id, (err, app) => {  
    if (err) {res.json(err);} 
    res.json(app);
  });
});

//Add App
router.post('/addApp', (req, res, next) => {
  // let newApp = new App({
  //   app_name        : validator.blacklist(req.body.app_name,        blacklistedExp ) ,
  //   app_displayname : validator.blacklist(req.body.app_displayname, blacklistedExp ) ,
  //   app_description : validator.blacklist(req.body.app_description, blacklistedExp )
  // });
  let newApp = new App({
    app_name        : req.body.app_name, 
    app_displayname : req.body.app_displayname, 
    app_description : req.body.app_description,
  });
  newApp.save( (err,createdObj ) => {
    if(err)  res.status(500);  
    else     res.status(200).send(createdObj); 
  })
});

//edit App
router.put('/updateApp/:id' , (req,res,next) => {
  var id = req.params.id;
    let editedApp = new App({
      app_name        : validator.blacklist(req.body.app_name,        blacklistedExp ) ,
      app_displayname : validator.blacklist(req.body.app_displayname, blacklistedExp ) ,
      app_description : validator.blacklist(req.body.app_description, blacklistedExp )
    });
    App.update({_id : id  },{$set:req.body },(err , result) => {
      if(err) res.status(500).send(err); 
      else    res.status(200).send(result);
    });
})

//Delete App
router.delete('/delApp/:id' , (req,res,next) => {
  App.findByIdAndRemove({_id: req.params.id}, 
    function(err, docs){
   if(err) { res.sendStatus(403); }
   else    { res.sendStatus(200); }
 });
});

module.exports = router;
