(function () {
  angular
   .module('maak-pottery')
   .controller('navMenuCtrl', navMenuCtrl);

  navMenuCtrl.$inject = ['$location', 'authentication'];
  function navMenuCtrl($location, authentication) {
    var vm = this;

    vm.currentPath = $location.path();

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();

    vm.logout = function() {
      authentication.logout();
      $location.path('/');
    };
  }
})();
