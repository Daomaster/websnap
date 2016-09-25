module.exports = function(io, config) {
	var express = require('express');
	var Parse = require('parse/node');
	var router = express.Router();
	var ChatRecord = Parse.Object.extend("ChatMessage");

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

	 router.post('/getquery', function(req, res) {
	    var query = new Parse.Query(Parse.User);
			query.startsWith("username", req.body.query);
			query.find({
			  success: function(matches) {
			    res.send(matches);
			  	}
			  })
	  });

	 router.post('/removechat', function(req, res) {
	    var query = new Parse.Query(ChatRecord);
			query.equalTo("objectId", req.body.objectId);
			query.find({
			  success: function(matches) {
			    	for (var i = matches.length - 1; i >= 0; i--) {
			    			matches[i].destroy({
							  success: function(myObject) {
							  	res.send("Deleted Object "+ matches[i].objectId);
							  },
							  error: function(myObject, error) {
							     res.status(400).send({
							    	 code: error.code,
									   message: error.message
									});
							  }
							});
			    	}
			  	}
			  })
	  });

	 router.post('/querydata', function(req, res) {
	    var query = new Parse.Query(ChatRecord);
			query.equalTo("to", req.body.query);
			query.find({
			  success: function(matches) {
			  	var profilePhoto = matches[0].get("file");
			  	console.log(profilePhoto.url());
			    res.send(matches);
			  	}
			  })
	  });

	 	router.post('/sendmsg', function(req, res) {
	   //Save file first
	   var imageFile = new Parse.File("image.png", { base64: req.body.url });
	   
	   imageFile.save().then(function() {
			  for (var i = req.body.tos.length - 1; i >= 0; i--) {
			  	console.log("Iteration",i);
		  		//Save the Object
				  var chatRecord = new ChatRecord();
					chatRecord.set("to", req.body.tos[i].userId);
					chatRecord.set("from", req.body.from);
					chatRecord.set("msg", req.body.msg);
					chatRecord.set("file", imageFile);

					chatRecord.save(null, {
					  success: function(chat) {
					    //Send real time data through socket
					    io.emit(req.body.tos[i].userId, {
					    	chatId: chat.objectId,
					   	 	msg: req.body.msg,
					   	 	url: req.body.url,
					   	 	from: req.body.from,
					   	 	time: "9/23/2016"
					   	 });
					    res.send("sucess");
					  },
					  error: function(error) {
					    res.status(400).send({
							    	 code: error.code,
									   message: "Save Object Error:"+error.message
									});
					  }
					});
	  	 }
			}, function(error) {
			   res.status(400).send({
			    	 code: error.code,
					   message: "Save File Error:"+error.message
					});
			});
	  });

	return router;
}

				