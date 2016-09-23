(function() {
  'use strict';

  angular
    .module('websnap')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($location) {
    var vm = this;
    vm.toggle = false;
    vm.login = function() {
      $location.path('inbox');
    }
    vm.signup = function() {
      $location.path('inbox');
    }
    vm.toggleSignUp = function() {
      vm.toggle = !vm.toggle;
    }
  }
})();
