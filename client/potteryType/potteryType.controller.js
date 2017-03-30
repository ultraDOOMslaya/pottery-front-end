(function () {

  angular
    .module('maak-pottery')
    .controller('potteryTypeCtrl', potteryTypeCtrl);

  potteryTypeCtrl.$inject = ['$scope', '$route', '$location', 'potteryData'];
  function potteryTypeCtrl ($scope, $route, location, potteryData) {
    
    var vm = this;
    vm.location = location;
    vm.editPanel = false;

    vm.pageHeader = {
      title: 'Edit or add pottery types.'
    };

    vm.editPotteryType = function(potteryType) {
      vm.editPanel = true;
      vm.formData = {potteryType : potteryType};
    }

    potteryData.potteryType()
      .success(function(data) {
        console.log("The data I get back from server: {}", data);
        vm.data = { potteryTypes: data };
        console.log("The data Im binding: {}", vm.data.potteryTypes);
      });


    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.formData.potteryType.potteryType) {
        vm.formError = "All fields are required Dad, please try again";
        return false;
      } else {  
        vm.updatePotteryType(vm.formData.potteryType);
      }
    };

    //TODO: the method name and data call should have a uniform name
    vm.updatePotteryType = function (potteryType) {
      potteryData.putPotteryType({
        id : potteryType.id,
        potteryType : potteryType.potteryType
      })
        .success(function (data) {
          console.log("the data returned from the server is: {}", data);
          $route.reload();
        })
        .error(function (data) {
          vm.formError = "I couldn't save your event Dad, please try again";
        });
      return false;
    };

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

  }
})();
