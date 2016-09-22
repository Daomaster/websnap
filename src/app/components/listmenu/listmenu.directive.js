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
    function ListMenuController($mdDialog, $document, ContactService) {
      var vm = this;
      
      vm.messageModal = function(ev) {
        $mdDialog.show({
          controller: function($mdDialog, $scope, $document) {

          var querySearch = function(criteria) {
            cachedQuery = cachedQuery || criteria;
            return cachedQuery ? $scope.allContacts.filter(createFilterFor(cachedQuery)) : [];
          }

          var createFilterFor = function(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(contact) {
              return (contact._lowername.indexOf(lowercaseQuery) != -1);
            };

          }

          var cachedQuery;
          var canvas = $document.find('#display-canvas');

          $scope.allContacts = ContactService.getContacts();
          $scope.contacts = [];
          $scope.filterSelected = true;

          $scope.querySearch = querySearch;

          $scope.cancel = function() {
           $mdDialog.cancel();
          };

          $scope.send = function() {
           $mdDialog.hide($scope.msg);
          };
          },
          templateUrl: 'app/components/listmenu/messageModal.html',
          parent: angular.element($document.body),
          targetEvent: ev,
          clickOutsideToClose:false,
          fullscreen: true
        })
        .then(function(msg) {
          //Here is to call the api send message
        }, function() {
          //Exit part of the modal
        });
      };

      vm.hover = function() {
        vm.isOpen = true;
      };
      vm.notHover = function() {
        vm.isOpen = false;
      };
      
      vm.isOpen = false;
      vm.mode = 'md-scale';
      vm.options = [
        {
          name: "Contacts",
          iconURL: "assets/images/contact.svg"
        },
        {
          name: "Profile",
          iconURL: "assets/images/profile.svg"
        }
      ];
    }
  }

})();
