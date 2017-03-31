(function () {

  angular
    .module('maak-pottery')
    .directive('navmenu', navmenu);

  function navmenu () {
    return {
      restrict: 'EA',
      templateUrl: 'common/directives/navigation/navmenu.template.html',
      controller: 'navMenuCtrl as navvm'
    };
  }

})();
