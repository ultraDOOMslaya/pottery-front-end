 (function () {

  angular
    .module('maak-pottery')
    .controller('potteryCtrl', potteryCtrl);

  potteryCtrl.$inject = ['$scope', '$location', 'potteryData'];
  function potteryCtrl ($scope, location, potteryData) {
    
    var vm = this;
    vm.location = location;
    vm.pageHeader = {
      title: 'My gallery'
    };

    vm.viewPottery = function(pottery) {
      var view = '/pottery/' + pottery.id;
      vm.location.path(view);
    }

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
})();
