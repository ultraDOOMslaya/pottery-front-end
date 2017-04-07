 (function () {

  angular
    .module('maak-pottery')
    .directive('formError', formError);

  function formError () {
    return {
      restrict: 'EA',
      scope: {
        content : '=content'
      },
      templateUrl: '/common/directives/formError/formError.template.html'
    };
  }

})();
