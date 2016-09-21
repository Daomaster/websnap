(function() {
  'use strict';

  angular
    .module('websnap')
    .directive('chatbox', chatbox);

  /** @ngInject */
  function chatbox() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/chatbox/chatbox.html',
      scope: {
          creationDate: '='
      },
      controller: ChatBoxController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ChatBoxController() {
      var vm = this;
      vm.options = [
        {
          from: "Mike",
          content: "Hey what's up"
        },
        {
          from: "John",
          content: "Hello World"
        },
        {
          from: "Stan",
          content: "Testing"
        }
      ]
    }
  }

})();
