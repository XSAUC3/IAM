const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user_schema');

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    console.log(username + " - " + password);
    
  
    User.getUserByUsername(username, (err, user) => {
      if(err) throw err;
      if(!user) {
        return res.json({success: false, msg: 'Invalid Username & Password...!'});
      }
  
      User.comparePassword(password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch) {
          const token = jwt.sign({data: user}, config.secret, {
            expiresIn: 604800 // 1 week
          });
          res.json({
            success: true,
            token: 'JWT '+token,
            user: {
              id: user._id,
              name: user.name,
              username: user.username,
              email: user.email
            }
          })
        } else {
          return res.json({success: false, msg: 'Invalid Username & Password...!'});
        }
      });
    });
  });

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});
  
  module.exports = router;