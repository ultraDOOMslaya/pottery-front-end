 (function () {

  angular
    .module('maak-pottery')
    .controller('potteryCtrl', potteryCtrl);

  potteryCtrl.$inject = ['$scope'];
  function potteryCtrl ($scope) {
    
    var vm = this;
    vm.pageHeader = {
      title: 'My gallery'
    };

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

  }
console.log("load everything in pottery ctrl?");
})();
