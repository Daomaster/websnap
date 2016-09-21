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
      vm.options = [
        {
          name: "Chats",
          iconURL: "assets/images/inbox.svg"
        },
        {
          name: "Contacts",
          iconURL: "assets/images/contact.svg"
        },
        {
          name: "Profile",
          iconURL: "assets/images/profile.svg"
        }
      ]
    }
  }

})();
