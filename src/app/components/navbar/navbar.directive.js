(function() {
  'use strict';

  angular
    .module('websnap')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($location, ContactService) {
      var vm = this;
      vm.name = ContactService.getUserName();
      vm.logout = function() {
        ContactService.resetUserInfo();
        $location.path('login');
      }
    }
  }

})();
