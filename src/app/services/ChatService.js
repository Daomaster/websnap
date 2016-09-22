
(function() {
  'use strict';

  angular
    .module('websnap')
    .service('ChatService', function(){
      //Mark up data for new
      var chats = [
        {
          from: "Mike",
          content: [
          {
            msg: "Mike said Hey what's up 1",
            time: "10/17/2016",
            progress: 0
          },
          {
            msg: "Mike said Hey what's up 2",
            time: "10/16/2016",
            progress: 0
          },
          {
            msg: "Mike said Hey what's up 3",
            time: "10/15/2016",
            progress: 0
          }
          ]
        },
        {
          from: "John",
          content: [
          {
            msg: "John said Hey what's up 1",
            time: "10/17/2016",
            progress: 0
          },
          {
            msg: "John said Hey what's up 2",
            time: "10/16/2016",
            progress: 0
          },
          {
            msg: "John said Hey what's up 3",
            time: "10/15/2016",
            progress: 0
          }
          ]
        },
        {
          from: "Stan",
          content: [
          {
            msg: "Stan said Hey what's up 1",
            time: "10/17/2016",
            progress: 0
          },
          {
            msg: "Stan said Hey what's up 2",
            time: "10/16/2016",
            progress: 0
          },
          {
            msg: "Stan said Hey what's up 3",
            time: "10/15/2016",
            progress: 0
          }
          ]
        }
      ]

      this.addChat = function(chat) {
        chats.push(chat);
      };

      this.getChatsByName = function(name) {
        for (var i = chats.length - 1; i >= 0; i--) {
          if (chats[i].from == name)
            return chats[i]
        }
      };

      this.getChats = function() {
        return chats;
      };
     
    });

})();
