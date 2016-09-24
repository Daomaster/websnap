(function() {
  'use strict';

  angular
    .module('websnap')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(SocketFactory, ContactService, ChatService) {
    var vm = this;
    if(ContactService.getUserId() != ""){
      console.log("Listening WebSocket");
    	SocketFactory.on(ContactService.getUserId(), function(data) {
        ChatService.addChat(data.from, data.msg, data.time);
      })
    }
  }
})();
