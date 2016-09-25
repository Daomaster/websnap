
(function() {
  'use strict';

  angular
    .module('websnap')
    .service('ContactService', function($q){
        //User info
        var username = "",
        firstname = "",
        lastname = "",
        userId = "",
        loggedIn = false;

        var contacts = [];

        this.authenticate  = function() {
          if(loggedIn){
                //If authenticated, return anything you want, probably a user object
                return true;
            } else {
                //Else send a rejection
                return $q.reject('Not Authenticated');
            }
        };

        this.resetUserInfo = function() {
          username = "";
          firstname = "";
          lastname = "";
          userId = "";
          loggedIn = false;
        };

        this.registerUserInfo = function(obj) {
          username = obj.username;
          firstname = obj.fname;
          lastname = obj.lname;
          userId = obj.objectId;
          loggedIn = true;
        };

        this.importContacts = function(array) {
          contacts = array;
        };

        this.getUserName = function() {
          return username;
        };

        this.getFirstName = function() {
          return firstname;
        };

        this.getLastName = function() {
          return lastname;
        };

        this.getUserId = function() {
          return userId;
        };

        this.getContacts = function() {
          return contacts.map(function (c) {
              var contact = {
                name: c.username,
                userId: c.objectId,
                _lowername: c.username.toLowerCase()
              };
              return contact;
            });
        };
     
    });

})();
