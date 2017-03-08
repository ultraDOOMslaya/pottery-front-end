(function () {

  angular
    .module('maak-pottery')
    .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['authService', '$location', '$route', '$scope'];
  function loginCtrl (authService, location, route, $scope) {
   
    console.log("Load the login controller?");
    var vm = this;
    vm.authService = authService;
    $scope.data = {};
    vm.location = location; 
 
    $scope.login = function(data) {
      authService.login(data.username, data.password).then(function(authenticated) {
        //$state.go('main.dash', {}, {reload: true});
        vm.location.path("/home");
        $scope.setCurrentUsername(data.username);
      }, function(err) {
        alert("failed to login");
      });
    };
  }
})();
