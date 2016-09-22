
(function() {
  'use strict';

  angular
    .module('websnap')
    .service('ContactService', function(){
        var contacts = [
              'John Smith',
              'Mike Bay',
              'Stan Zeng',
              'James Bond',
              'Chris Prat'
            ];

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
