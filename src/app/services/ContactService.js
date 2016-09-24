
(function() {
  'use strict';

  angular
    .module('websnap')
    .service('ContactService', function(){
        //User info
        var username = "",
        firstname = "",
        lastname = "",
        userId = "";

        var contacts = [];

        this.resetUserInfo = function() {
          username = "";
          firstname = "";
          lastname = "";
          userId = "";
        };

        this.registerUserInfo = function(obj) {
          username = obj.username;
          firstname = obj.fname;
          lastname = obj.lname;
          userId = obj.objectId;
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
                userId: c.userId,
                _lowername: c.username.toLowerCase()
              };
              return contact;
            });
        };
     
    });

})();
