(function () {

  angular
    .module('maak-pottery')
    .directive('navigation', navigation);

  function navigation () {
    return {
      restrict: 'EA',
      templateUrl: 'common/directives/navigation/navigation.template.html'
    };
  }

})();
