(function() {
  'use strict';

  angular
    .module('websnap')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(SocketFactory, ContactService, ChatService, ApiService) {
    var vm = this;
    
    var sucessHandler = function(res) {
      if (res.data.length > 0)
        for (var i = res.data.length - 1; i >= 0; i--) {
          ChatService.addChat(res.data[i].from, res.data[i].msg, res.data[i].time, res.data[i].file.url, res.data[i].objectId);
        }
    }

    if(ContactService.getUserId() != ""){
      ApiService.getUnreadMessage(sucessHandler);
      console.log("Listening WebSocket");
    	SocketFactory.on(ContactService.getUserId(), function(data) {
        ChatService.addChat(data.from, data.msg, data.time, data.url, data.chatId);
      })
    }
  }
})();
