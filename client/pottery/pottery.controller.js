 (function () {

  angular
    .module('maak-pottery')
    .controller('potteryCtrl', potteryCtrl);

  potteryCtrl.$inject = ['$scope', 'potteryData'];
  function potteryCtrl ($scope, potteryData) {
    
    var vm = this;
    vm.pageHeader = {
      title: 'My gallery'
    };

    potteryData.pottery()
      .success(function(data) {
        console.log("The data I get back from server: {}", data);
        vm.data = { potteries: data };
        console.log("The data Im binding: {}", vm.data.potteries);
      });

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

  }
console.log("load everything in pottery ctrl?");
})();
