(function() {
  'use strict';

  angular
    .module('websnap')
    .directive('listmenu', listmenu);

  /** @ngInject */
  function listmenu() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/listmenu/listmenu.html',
      scope: {
          creationDate: '='
      },
      controller: ListMenuController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ListMenuController() {
      var vm = this;
    }
  }

})();
