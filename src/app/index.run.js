(function() {
  'use strict';

  angular
    .module('websnap')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {
    $log.debug('runBlock end');
  }

})();
