 (function () {

  angular
    .module('maak-pottery')
    .controller('viewPotteryCtrl', viewPotteryCtrl);

  viewPotteryCtrl.$inject = ['$scope', '$routeParams', 'potteryData'];
  function viewPotteryCtrl ($scope, routeParams, potteryData) {
    var vm = this;
    vm.potteryData = potteryData;
    vm.routeParams = routeParams;

    vm.pageHeader = {
      title: 'Pottery'
    };

    console.log("The id is: " + vm.routeParams.id);

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

  }

})();
