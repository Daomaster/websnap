
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

        var contacts = [
              'John Smith',
              'Mike Bay',
              'Stan Zeng',
              'James Bond',
              'Chris Prat'
            ];

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
              var cParts = c.split(' ');
              var contact = {
                name: c,
                email: cParts[0][0].toLowerCase() + '.' + cParts[1].toLowerCase() + '@example.com'
              };
              contact._lowername = contact.name.toLowerCase();
              return contact;
            });
        };
     
    });

})();
