 (function () {

  angular
    .module('maak-pottery')
    .controller('potteryCtrl', potteryCtrl);

  potteryCtrl.$inject = ['$scope', '$location', 'potteryData'];
  function potteryCtrl ($scope, location, potteryData) {
    
    var vm = this;
    vm.location = location;
    vm.reserve;
    vm.selectedPotteryType;
    const all = {
          id: '0',
          potteryType: 'all'
        };
    vm.pageHeader = {
      title: 'My gallery'
    };

    vm.viewPottery = function(pottery) {
      var view = '/pottery/' + pottery.id;
      vm.location.path(view);
    }

    /**
     * On select change, filter against the reserved pottery data or restore all pottery data.
     */
    vm.filterState = function () {
      if(vm.selectedPotteryType === all) {
        const allPotteries = vm.reserve.allPotteryData;
        vm.data = {
            potteries : allPotteries
        };
      } else {
        console.log(vm.selectedPotteryType);
        const filteredPotteries = vm.reserve.allPotteryData.filter((pottery) => pottery.potteryType.potteryType === vm.selectedPotteryType.potteryType);
        vm.data = {
          potteries : filteredPotteries
        };
      } 
    }

    potteryData.pottery()
      .success(function(data) {
        console.log("The data I get back from server: {}", data);
        vm.data = { potteries: data };
        vm.reserve = {
            allPotteryData : vm.data.potteries
        }
        console.log("The data Im binding: {}", vm.data.potteries);
      });

     
    potteryData.potteryType()
      .success(function(data) {
        vm.potteryTypes = data;
        vm.potteryTypes.push(all);
      });

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

  }
})();
