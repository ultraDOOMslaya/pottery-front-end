(function () {

  angular
    .module('maak-pottery')
    .controller('newPotteryCtrl', newPotteryCtrl);

  newPotteryCtrl.$inject = ['potteryData', '$location', 'Upload'];
  function newPotteryCtrl (potteryData, location, Upload) {
    
    var vm = this;
    vm.potteryData = potteryData;
    vm.location = location;
    vm.formError = false;

    vm.pageHeader = {
      title: "Add a new pottery.",
      strapline: ""
    };

    
    /**
     * Get the pottery type data.
     */
    potteryData.potteryType()
      .success(function(data) {
        vm.formData = {
          potteryTypes : data
       };
       console.log("pottery type is: {}", vm.formData.potteryTypes);
    });


    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.formData.type || !vm.formData.description) {
        //TODO: put this in a directive.
        vm.formError = {
            message: "All fields are required Dad, please try again.",
            showError: true
        };
        console.log("The status of the error msg is: {}", vm.formError.showError);
//        vm.message = ;"All fields are required Dad, please try again"
        return false;
      } else {  
        console.log("the form data for the pottery: {}", vm.formData);
        console.log("the form data photo for the pottery: {}", vm.formData.potteryFile);
        vm.formData.potteryFile.upload = Upload.upload({
          url: 'http://localhost:80/api/pottery',
          method: 'POST',
          file: vm.formData.potteryFile
        });
        console.log("is there a response?: {}", JSON.stringify(vm.formData.potteryFile.upload));
        vm.addPottery(vm.formData);
      }
    };

    vm.addPottery = function (formData) {
      potteryData.addPottery({
        potteryType : formData.type,
        potteryDescription : formData.description,
        potteryFileName : formData.potteryFile.name
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
