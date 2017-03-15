(function () {

  angular
    .module('maak-pottery')
    .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location','authentication'];
  function loginCtrl($location, authentication) {
    var vm = this;

    vm.pageHeader = {
      title: 'Sign in to Maakestad Pottery'
    };

    vm.credentials = {
      username : "",
      password : ""
    };

    vm.returnPage = $location.search().page || '/';

    vm.onSubmit = function () {
      console.log("The credentials on submit are: {}", JSON.stringify(vm.credentials));
      vm.formError = "";
      if (!vm.credentials.username || !vm.credentials.password) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.doLogin();
      }
    };

    vm.doLogin = function() {
      vm.formError = "";
      console.log("what does auth look like: ? {}", JSON.stringify(authentication));
      authentication
        .login(vm.credentials)
        .error(function(err){
          vm.formError = err;
        })
        .then(function(){
          $location.search('page', null); 
          $location.path(vm.returnPage);
        });
    };

  }

})();
