
(function() {
  'use strict';

  angular
    .module('websnap')
    .service('ChatService', function(){
      //Data Structure
      // {
      //     from: "Mike",
      //     content: [
      //     {
      //       msg: "Mike said Hey what's up 1",
      //       time: "10/17/2016",
      //       progress: 0
      //     },
      //     {
      //       msg: "Mike said Hey what's up 2",
      //       time: "10/16/2016",
      //       progress: 0
      //     },
      //     {
      //       msg: "Mike said Hey what's up 3",
      //       time: "10/15/2016",
      //       progress: 0
      //     }
      //     ]
      //   }
      var chats = [];

      this.addChat = function(from, msg, time, imageURL) {
        var exist = false;
        for (var i = chats.length - 1; i >= 0; i--) {
          if (chats[i].from == from){
            exist = true;
            chats[i].content.unshift({
              msg: msg,
              time: time,
              url: imageURL,
              progress: 0
            });
          }
        }
        if (!exist)
          chats.push({
              from: from,
              content: 
              [
                {
                  msg: msg,
                  time: time,
                  url: imageURL,
                  progress: 0
                }
              ]
          })
      };

      this.deleteChatByIndex = function(name, index) {
        for (var i = chats.length - 1; i >= 0; i--) {
          if (chats[i].from == name)
            {
              //console.log("Start Deleting until:",chats[i].content[index].msg);
              chats[i].content.splice(0, index);
              if (chats[i].content.length == 0)
                 chats.splice(i, 1);
            }
        }
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
