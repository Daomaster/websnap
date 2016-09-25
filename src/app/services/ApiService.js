
(function() {
  'use strict';

  angular
    .module('websnap')
    .service('ApiService', function($http, $log, ContactService){
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

       this.getquery = function(query, sCallback) {
        var apiCall = generateRoute('getquery');
        return $http.post(apiCall, {
          query: query
        }).then(
          function success(response) {
            sCallback(response);
          },
          function error(response) {
            var msg = 'Unable to retrive query data...';
            httpError(msg);
          }
        );
      };

      this.sendmsg = function(tos, msg, imageUrl) {
        var apiCall = generateRoute('sendmsg');
        return $http.post(apiCall, {
          from: ContactService.getUserName(),
          tos: tos,
          msg: msg,
          url: imageUrl
        }).then(
          function success(response) {
            var msg = 'Message sent!';
            httpSuccess(msg);
          },
          function error(response) {
            var msg = 'Unable to send message...';
            httpError(msg);
          }
        );
      };

      });
})();
