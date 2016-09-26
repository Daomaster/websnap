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
    function ListMenuController($mdDialog, $document, Upload, ContactService) {
      var vm = this;
      
      vm.messageModal = function(ev) {
        $mdDialog.show({
          controller: function($mdDialog, $scope, $q, ApiService, ImageService) {

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

           var delayedQuerySearch = function (criteria) {
              cachedQuery = criteria;
              if ( !pendingSearch || !debounceSearch() )  {
                cancelSearch();

                return pendingSearch = $q(function(resolve, reject) {
                  cancelSearch = reject;
                  ApiService.getquery(criteria, function(response) {
                    ContactService.importContacts(response.data);
                    $scope.allContacts = ContactService.getContacts();
                    resolve( querySearch() );
                    refreshDebounce();
                  })
                });
              }

              return pendingSearch;
            }

            var refreshDebounce = function() {
              lastSearch = 0;
              pendingSearch = null;
              cancelSearch = angular.noop;
            }

            //Debounce if querying faster than 300ms
            var debounceSearch = function() {
              var now = new Date().getMilliseconds();
              lastSearch = lastSearch || now;

              return ((now - lastSearch) < 300);
            }

          var pendingSearch, cancelSearch = angular.noop;
          var cachedQuery, lastSearch;
          
          $scope.allContacts = ContactService.getContacts();
          $scope.tos = [];

          $scope.querySearch = delayedQuerySearch;

          $scope.$watch('tos', function (newVal) {
              if (newVal.length >= 2){
                newVal.shift();
              }
          }, true);

          $scope.$watch('imgFile', function (newVal) {
              if (newVal)
                ImageService.processImage(newVal, document.getElementById('display-canvas'));
          });

          $scope.cancel = function() {
            ImageService.resetData();
            $mdDialog.cancel();
          };

          $scope.send = function() {
            if ($scope.msg.length <= 140){
              ApiService.sendmsg($scope.tos,$scope.msg, ImageService.getDataURL());
              $mdDialog.hide();
            }
          };

          },
          templateUrl: 'app/components/listmenu/messageModal.html',
          parent: angular.element($document.body),
          targetEvent: ev,
          clickOutsideToClose:false,
          fullscreen: true
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
    }
  }

})();
