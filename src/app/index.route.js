(function() {
  'use strict';

  angular
    .module('websnap')
    .config(routeConfig);

  function routeConfig($routeProvider, $locationProvider) {
    $routeProvider
      .when('/inbox', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm',
         resolve: {
            'auth' : function(ContactService){
                return ContactService.authenticate();
            }
        }
      })
      .when('/login', {
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/login'
      });

    $locationProvider.html5Mode({
       enabled: true,
       requireBase: false
      });
  }

})();
