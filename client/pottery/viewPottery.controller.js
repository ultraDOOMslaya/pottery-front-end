 (function () {

  angular
    .module('maak-pottery')
    .controller('viewPotteryCtrl', viewPotteryCtrl);

  viewPotteryCtrl.$inject = ['$scope', '$routeParams', '$location', 'potteryData', 'authentication'];
  function viewPotteryCtrl ($scope, routeParams, location, potteryData, authentication) {
    var vm = this;
    vm.location = location;
    vm.potteryData = potteryData;
    vm.routeParams = routeParams;
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.potteryDescription = "";

    vm.pageHeader = {
      title: 'Pottery'
    };

    console.log("Currently loading the viewPottery controller.");

    potteryData.getPottery(vm.routeParams.potteryId)
      .success(function(data) {
        vm.data = { pottery : data };
        console.log(vm.data.pottery.potteryFileName);
      });

    vm.editPottery = function(pottery) {
     
      var view = "/pottery/" + pottery.id + "/edit";
      console.log("hit the edit pottery function? url?" + view + " the pottery obj is? : " + JSON.stringify(pottery));
      vm.location.path(view);  
    }

    vm.deletePottery = function(pottery) {
      var deleteConfirmation = confirm("Are you sure you want to delete this item?");
      if(deleteConfirmation) {
        potteryData.deletePottery(pottery.id)
        .success(function() {
          vm.location.path('/pottery');
        });
      }
    }

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

  }

})();
