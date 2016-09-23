
(function() {
  'use strict';

  angular
    .module('websnap')
    .service('ApiService', function($http, $log){
        var apiBase = "http://localhost/api/"
        var generateRoute = function(route) {
          return apiBase+route;
        }
        var httpSuccess = function(msg) {
          $log.info('API call success: ' + msg);
        };

        var httpError = function(msg) {
          $log.info('API call error: ' + msg + '\nAPI unavailable\nPlease check the network connection');
        };

         this.signup = function(signUpForm, sCallback, eCallback) {
          var apiCall = generateRoute('signup');
          return $http.post(apiCall, signUpForm).then(
            function success(response) {
              var msg = 'Sign Up Sucsess!';
              httpSuccess(msg);
              sCallback(response);
            },
            function error(response) {
              var msg = 'Unable to Sign Up...';
              httpError(msg);
              eCallback(response);
            }
          );
        };

       this.login = function(loginForm, sCallback, eCallback) {
        var apiCall = generateRoute('login');
        return $http.post(apiCall, loginForm).then(
          function success(response) {
            var msg = 'Log in Sucsess!';
            httpSuccess(msg);
            sCallback(response);
          },
          function error(response) {
            var msg = 'Unable to Log in...';
            httpError(msg);
            eCallback(response);
          }
        );
      };
      });
})();
