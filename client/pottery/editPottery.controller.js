(function () {

  angular
    .module('maak-pottery')
    .controller('editPotteryCtrl', editPotteryCtrl);

  editPotteryCtrl.$inject = ['potteryData', '$location', '$routeParams', 'Upload'];
  function editPotteryCtrl (potteryData, location, routeParams, Upload) {
    
    var vm = this;
    vm.potteryData = potteryData;
    vm.location = location;
    vm.routeParams = routeParams;
    vm.showFileInput = false;

    vm.pageHeader = {
      title: "Edit the current pottery.",
      strapline: ""
    };


    /**
     * Get the pottery data and prepend the file names server path so angular file upload can find it.
     */
    potteryData.getPottery(vm.routeParams.potteryId)
      .success(function(data) {
        vm.formData = { pottery : data };
        data.potteryFileName = "/images/uploads/" + data.potteryFileName;
      });

    
    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

    vm.onSubmit = function () {
      vm.formError = "";
      console.log("On submit for edit pottery page and obj is: {}", vm.formData );
      if (!vm.formData.pottery.potteryType || !vm.formData.pottery.potteryDescription || !vm.formData.pottery.potteryFileName) {
        console.log("formData error");
        vm.formError = "All fields are required Dad, please try again";
        return false;
      } else {  
        console.log("the form data for the pottery: {}", vm.formData);
        console.log("the form data photo for the pottery: {}", vm.formData.pottery.potteryFileName);
        vm.formData.pottery.potteryFileName.upload = Upload.upload({
          url: 'http://localhost:3000/api/pottery',
          method: 'POST',
          file: vm.formData.pottery.potteryFileName
        });
        vm.addPottery(vm.formData.pottery);
      }
    };

    vm.addPottery = function (formData) {
      potteryData.addPottery({
        potteryType : formData.potteryType,
        potteryDescription : formData.potteryDescription,
        potteryFileName : formData.potteryFileName.name
      })
        .success(function (data) {
          console.log("the data returned from the server is: {}", data);
          vm.location.path("/pottery");
        })
        .error(function (data) {
          vm.formError = "I couldn't save your event Dad, please try again";
        });
      return false;
    };
  }

})();
