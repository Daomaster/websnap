'use strict';

angular
  .module('websnap')
  .factory('SocketFactory', function($rootScope) {
    var url = 'http://localhost:3005';

    var socket = io.connect(url);
    return {
      id: 0,
      on: function(eventName, callback) {
        socket.on(eventName, function() {
          var args = arguments;
          $rootScope.$apply(function() {
            callback.apply(socket, args);
          });
        });
      },
      emit: function(eventName, data, callback) {
        socket.emit(eventName, data, function() {
          var args = arguments;
          $rootScope.$apply(function() {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        });
      }
    };
  });