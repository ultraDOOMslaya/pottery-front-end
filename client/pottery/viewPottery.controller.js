 (function () {

  angular
    .module('maak-pottery')
    .controller('viewPotteryCtrl', viewPotteryCtrl);

  viewPotteryCtrl.$inject = ['$scope', '$routeParams', '$location', 'potteryData'];
  function viewPotteryCtrl ($scope, routeParams, location, potteryData) {
    var vm = this;
    vm.potteryData = potteryData;
    vm.routeParams = routeParams;

    vm.pageHeader = {
      title: 'Pottery'
    };

    potteryData.getPottery(vm.routeParams.potteryId)
      .success(function(data) {
        vm.data = { pottery : data };
        console.log(vm.data.pottery.potteryFileName);
      });

    vm.editPottery = function(pottery) {
      var view = "/pottery/" + pottery.potteryId + "/edit";
      vm.location.path(view);  
    }

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

  }

})();
