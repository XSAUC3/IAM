const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const randtoken = require('rand-token');
const config = require('../config/database');
const User = require('../models/user_schema');
const Token = require('../models/Token_Schema');

require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    console.log('addr: '+add);
  })

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
      if(err) throw err;
      if(!user) {
        return res.json({success: false, msg: 'Invalid Username & Password...!'});
      }
  
      User.comparePassword(password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch) {
          const token = jwt.sign({data: user}, config.secret, {
            expiresIn: 86400 // 1 Day
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
router.post('/ForgotPassword', (req, res, next) => {
  let email = req.body.mail;
User.findOne({email : email}, (err, user) => {
    if(err) res.send(err);
    if(user) {
        // Generate a 16 character alpha-numeric token:
        var token = randtoken.generate(16);
        var user_id = user._id;
        let link = "http://localhost:4200/$" + user_id + "&" + token;

        //res.send(link);

        let tk = new Token({
            "uid"   :   user_id,
            "email"   :   email,
            "token"   :   token
        });

        // console.log(tk);

        Token.findOneAndRemove({email : email}, (err) => {
            if(err) throw err;
        });

        tk.save((err, tkdetail) => {
            if(err) throw err;
            if(tkdetail){
            }
        });



        // NodeMailer

        const output = `
            <p>Dear User, <br>As you have requseted us for changing the password for Your Accout.<br>
            Here is the Link to Change the Password. link : ${link}</p>
            `;
        
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
        host: 'smtp.live.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'kala_dhruvesh@hotmail.com', // generated ethereal user
            pass: 'Dhruvesh@21031998'  // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
        });
        
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Kavalus Inc." <kala_dhruvesh@hotmail.com>', // sender address
            to: email, // list of receivers
            subject: 'KIAM(Change Password)', // Subject line
            text: 'Hello world?', // plain text body
            html: output // html body
        };
        
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
                res.json({success: false, msg: 'Something went Wrong..!'});
            }
            console.log('Message sent: %s', info.messageId);   
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            res.json({success: true, msg: 'Successfully Added..!'});
        });

        // Deleting Token After 10 Minutes
        function delToken() {
          Token.remove({ email: email}, function(err, deldata) {
              if (err) throw err;
              if(deldata){
                  console.log("Token has been deleted successfully..!");
              }
          });
        }
            
        setTimeout(delToken, 300000);
    }
    else{
        console.log("Invalid Email...!");
        return res.json({success: false, msg: 'Invalid Email...!'});
    }
});


});

router.get('/ForgotPassword/:id/:token', (req, res) => {
    let R_id = req.params.id;
    let R_token = req.params.token;

    Token.findOne({uid : R_id , token : R_token} ,(err, tkdetail) => {
        if(err) throw err;
        if(tkdetail){
            res.json({success : true});
        }
        else{
            res.json({success : false});
        }
    });
});

router.put('/ChangePassword', (req, res) => {
    let R_id = req.body.id;
    let pass = req.body.password;

    let obj = {
        id : R_id,
        password : pass
    };

    User.changePassword(obj, (err, user) => {
        if(err) res.json({success: false});
        if(user){
            res.json({success: true});
        }
        Token.remove({ uid: R_id}, function(err, deldata) {
            if (err) throw err;
            if(deldata){
                console.log("Token has been deleted successfully..!");
            }
        });
    });
});
  
  module.exports = router;