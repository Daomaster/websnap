(function() {
  'use strict';

  angular
    .module('websnap')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($location, $scope, ApiService, ContactService) {
    var vm = this;
    vm.toggle = false;
    vm.error = false;
    vm.errMsg = "";

    var sucessHandler = function(res) {
      ContactService.registerUserInfo(res.data);
      $location.path('inbox');
    };
    var errorHandler = function(res) {
      vm.errMsg = res.data.message || "Server is down at the moment...";
      vm.error = true;
    }
    vm.resetError = function() {
      vm.error = false;
      vm.errMsg = "";
    }
    vm.login = function() {
      if($scope.loginForm.$valid)
        {
          var form = {
            username: vm.username,
            password: vm.password
          }
          ApiService.login(form, sucessHandler, errorHandler);
        }
      else
        console.log("Not valid");
    }
    vm.signup = function() {
      if($scope.signupForm.$valid)
        {
          var form = {
            username: vm.rUsername,
            password: vm.rPassword,
            fname: vm.fname,
            lname: vm.lname
          }
          ApiService.signup(form, sucessHandler, errorHandler);
        }
      else
        console.log("Not valid");
    }
    vm.toggleSignUp = function() {
      vm.toggle = !vm.toggle;
    }
  }
})();
