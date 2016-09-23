(function() {
  'use strict';

  angular
    .module('websnap')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(SocketFactory, ContactService) {
    var vm = this;
    if(ContactService.getUserId() != ""){
      console.log("Listening WebSocket");
    	SocketFactory.on(ContactService.getUserId(), function(data) {
        console.log(data);
      })
    }
  }
})();
