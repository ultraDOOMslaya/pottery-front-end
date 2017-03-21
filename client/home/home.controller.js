(function () {

  angular
    .module('maak-pottery')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', 'potteryData'];
  function homeCtrl ($scope, potteryData) {
    
    var vm = this;
    vm.pageHeader = {
      title: 'Maakestad Pottery',
      strapline: 'Explore the work of artisan potter, Jon P. Maakestad'
    };

    $scope.links = [
      { src:"/images/potteryFountain.jpg", alt:"", caption:"" },
      { src:"/images/potteryFountain.jpg", alt:"", caption:"" },
    ];

    potteryData.pottery()
        .success(function(data) {
          console.log("What data do i get back?: {}", data);
          vm.data = { potteries : data };
          console.log(JSON.stringify(vm.data));
    });

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
