(function() {
  'use strict';

  angular
    .module('websnap')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(SocketFactory) {
    var vm = this;
    SocketFactory.on('connect', function() {
    	console.log("Connected");
    });
  }
})();
