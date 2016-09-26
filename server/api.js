module.exports = function(io, config) {
	var express = require('express');
	var fs = require('fs');
	var Parse = require('parse/node');
	var router = express.Router();
	var ChatRecord = Parse.Object.extend("ChatHistory");

	//Init Parse Server
	Parse.initialize(config.appId)
	Parse.serverURL = config.serverURL;

	 router.get('/resource/:id', function(req, res) {
   	var chatId = req.params.id;
	  var path = 'msgTmp/'+req.params.id+'.png';
	  	fs.readFile(path, function(err, data){
	  		if (err)
	  			console.log(err);
	  		else
	  			res.send(data);
	  	});
  });

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
							  	//remove file from the node server
							  	var filePath = 'msgTmp/'+req.body.objectId+'.png';
							  	fs.unlinkSync(filePath);
							  	res.send({message: "Sucess"});
							  },
							  error: function(myObject, error) {
							     res.status(400).send({
							    	 code: error.code,
									   message: error.message
									});
							  }
							});
			    	}
			  	},
			  	error: function(myObject, error) {
							     res.status(400).send({
							    	 code: error.code,
									   message: error.message
									});
							  }
			  })
	  });

	 router.post('/querydata', function(req, res) {
	    var query = new Parse.Query(ChatRecord);
			query.equalTo("to", req.body.query);
			query.find({
			  success: function(matches) {
			    res.send(matches);
			  	},
		  	error: function(myObject, error) {
						     res.status(400).send({
						    	 code: error.code,
								   message: error.message
								});
						  }
			  })
	  });

	 	router.post('/sendmsg', function(req, res) {
	   //Test
	   var data = req.body.url.replace(/^data:image\/\w+;base64,/, "");
	   var bitmap = new Buffer(data, 'base64');
		  for (var i = req.body.tos.length - 1; i >= 0; i--) {
		  	var id = req.body.tos[i].userId;
	  		//Save the Object
			  var chatRecord = new ChatRecord();
				chatRecord.set("to", req.body.tos[i].userId);
				chatRecord.set("from", req.body.from);
				chatRecord.set("msg", req.body.msg);

				chatRecord.save(null, {
				  success: function(chat) {
				  	var path = "msgTmp/"+chat.id+".png";
				    //Send real time data through socket
				    io.emit(id, {
				    	chatId: chat.id,
				   	 	msg: req.body.msg,
				   	 	url: req.body.url,
				   	 	from: req.body.from,
				   	 	time: chat.createdAt
				   	 });
				    //save file on node.js
				    fs.writeFileSync(path, bitmap);	
				    res.send({message: "Sucess"});
				  },
				  error: function(error) {
				    res.status(400).send({
						    	 code: error.code,
								   message: "Save Object Error:"+error.message
								});
				  }
				});
		 }
	  });

	return router;
}

				