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
    vm.selectedOption = '';
    vm.formError = false;

    vm.pageHeader = {
      title: "Edit the current pottery.",
      strapline: ""
    };


    /**
     * Get the pottery data and prepend the file names server path so angular file upload can find it.
     * Also get the pottery type data.
     */
    potteryData.getPottery(vm.routeParams.potteryId)
      .success(function(data) {
        data.potteryFileName = "/images/uploads/" + data.potteryFileName;

        potteryData.potteryType()
          .success(function(dataPottery) {
            vm.formData = {
              potteryTypes : dataPottery,
              pottery : data
            };
          });
      });

    //The api needs the fileName but not the file path... remove the file path. 
    fileInstanceParse = function (file) {
      if (file.name) {
        return file.name;
      }
      return pathParse(file);
    }

    pathParse = function (path) {
      var fileName = path.split("/");
      return fileName[fileName.length-1];
    }

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

        vm.formError = {
          message: "All fields are required Dad, please try again.",
          showError: true
        };
        return false;
      } else {  
        console.log("the form data for the pottery: {}", vm.formData);
        console.log("the form data photo for the pottery: {}", vm.formData.pottery.potteryFileName);
       
        //TDOD (Boilerplate) externalize this since the newPottery controller also uses this.
        if (vm.showFileInput === true) {
          vm.formData.pottery.potteryFileName.upload = Upload.upload({
            url: 'http://localhost:80/api/pottery',
            method: 'POST',
            file: vm.formData.pottery.potteryFileName
          });
        } 
        vm.addPottery(vm.formData.pottery);
      }
    };

    //TODO (Boilerplate) standardize these field names with the newPottery controller...
    vm.addPottery = function (formData) {
      console.log("Before sending information to the client api... here is the pottery data: {}", formData);
      potteryData.updatePottery({
        id : formData.id,
        potteryType : formData.potteryType,
        potteryDescription : formData.potteryDescription,
        potteryFileName : fileInstanceParse(formData.potteryFileName)
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
