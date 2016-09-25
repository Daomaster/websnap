(function() {
  'use strict';

  angular
    .module('websnap')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $location) {
  	$rootScope.$on('$routeChangeError', function(event, current, previous, rejection)
  	 {
        if(rejection === 'Not Authenticated'){
            $location.path('/login');
        }
      })
  }

})();
