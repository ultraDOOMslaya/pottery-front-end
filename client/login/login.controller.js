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
    
    $scope.setCurrentUser = function(user) {
      $scope.username = user.username;
    }
 
    $scope.login = function(data) {
      console.log("The login data is: {}", JSON.stringify(data));
      authService.login(data.username, data.password).then(function(authenticated) {
        console.log("creds are: {}", data.username, data.password);
        //$state.go('main.dash', {}, {reload: true});
        //$scope.setCurrentUsername(data.username);
        $scope.setCurrentUser({username: data.username});
        console.log("Set the current user to scope.username.");
      }, function(err) {
        alert("failed to login");
      }).then(function() {
        vm.location.path("/");
        route.reload();
      });
    
    };

    redirect = function() {
      if(vm.authStatus) {
        vm.location.path("/home");
      }
    }

    
  }
})();
