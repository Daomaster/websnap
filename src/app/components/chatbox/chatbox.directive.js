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
    function ChatBoxController($mdDialog, $document, ChatService) {
      var vm = this;
      vm.options = ChatService.getChats();
        vm.expand = function(from) {
          $mdDialog.show({
            controller: function($mdDialog, $scope, $interval, ChatService) {
              $scope.from = from;
              $scope.index = 0;
              $scope.chats = ChatService.getChatsByName(from).content;
              $scope.progress = 0; 
              
              $scope.cancel = function() {
               //TODO: should delete the stuff from the back end here
               for (var i = $scope.chats.length - 1; i >= 0; i--) {
                 $scope.chats[i].progress = 0;
               }
               if (angular.isDefined(promise)) {
                  $interval.cancel(promise);
                  promise = undefined;
                }
               $mdDialog.cancel();
              };

              $scope.next = function() {
               $scope.index++;
              };

              var promise = $interval(function() {
                $scope.chats[$scope.index].progress += 0.67;
                  if ($scope.chats[$scope.index].progress >= 100)
                    $scope.next();
              }, 100, $scope.chats.length*150, true);
            },
            templateUrl: 'app/components/chatbox/viewModal.html',
            parent: angular.element($document.body),
            clickOutsideToClose:false,
            fullscreen: true
          })
          .then(function(msg) {
            //Here is to call the api send message
          }, function() {
            //Exit part of the modal
          });
        };
      }
    }
})();
