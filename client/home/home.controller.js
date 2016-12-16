(function () {

  angular
    .module('maak-pottery')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', 'potteryData'];
  function homeCtrl ($scope, potteryData) {
    console.log("Checking if the home controller js component is ever loaded");
    // Nasty IE9 redirect hack (not recommended)
    if (window.location.pathname !== '/') {
      window.location.href = '/#' + window.location.pathname;
    }
    var vm = this;
    console.log(window.location);
    vm.pageHeader = {
      title: 'Maakestad Pottery',
      strapline: 'Explore the work of artisan potter, Jon P. Maakestad'
    };

    vm.getData = function () {
        console.log("requesting pottery data from home controller");
        potteryData.pottery().success(function(data) {
            vm.data = { potteries : data };
            console.log(vm.data);
        });
    };

    vm.sidebar = {
      content: "Jon Maakestad hails from a long line of artists. Jon began his humble beginnings at Luther Collage were he majored in art with a focus on pottery. The student body and facualty found his craftsmanship beautiful and he has been making artisan pottery ever since. "
    };

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

  }

})();
