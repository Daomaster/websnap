var express = require('express');
var Parse = require('parse/node');
var config = require('./config');
var router = express.Router();

//Init Parse Server
Parse.initialize(config.appId)
Parse.serverURL = config.serverURL;

 router.post('/signup', function(req, res) {
    if (req.body.fname && req.body.lname && req.body.username && req.body.password)
    	{
    		var user = new Parse.User();
				user.set("username", req.body.username);
				user.set("password", req.body.password);
				user.set("fname", req.body.fname);
				user.set("lname", req.body.lname);

				user.signUp(null, {
				  success: function(user) {
				    res.send(user);
				  },
				  error: function(user, error) {
				    res.status(400).send({
				    	 code: error.code,
						   message: error.message
						});
				  }
				});
    	}
    else
    		res.status(400).send({
				   message: 'Missing Information'
				});
  });

 router.post('/login', function(req, res) {
    if (req.body.username && req.body.password)
    	{
    		Parse.User.logIn(req.body.username, req.body.password, {
				  success: function(user) {
				    res.send(user);
				  },
				  error: function(user, error) {
				    res.status(400).send({
				    	 code: error.code,
						   message: error.message
						});
				  }
				});
    	}
    else
    		res.status(400).send({
				   message: 'Missing Information'
				});
  });


module.exports = router;