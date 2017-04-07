(function () {

  angular
    .module('maak-pottery')
    .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$scope', 'potteryData'];
  function homeCtrl ($scope, potteryData) {
    
    var vm = this;
    vm.imageThumbnails = [];
    vm.maxThumbnails = 5;
    vm.homeSelectedImage = '';

    vm.pageHeader = {
      title: 'Maakestad Pottery',
      strapline: 'Explore the work of artisan potter, Jon P. Maakestad'
    };

    potteryData.pottery()
        .success(function(data) {
          vm.data = { potteries : data };
          console.log(JSON.stringify(vm.data));
          vm.displayPottery(data);
    });

    //TODO: make this a directive
    vm.selectImage = function (image) {
      vm.homeSelectedImage = image;
    }

    /**
     * If the maximum amount of pottery is less than five, grab the maximum amount of pottery images.
     * Otherwise, grab at most 5 pottery images.
     * @param data: represents a getALL on the pottery entity.
     */
    vm.displayPottery = function (data) {
      if (data.length < vm.maxThumbnails) {
        vm.maxThumbnails = data.length;
      }
      while(vm.maxThumbnails > 0) {
        var position = Math.floor((Math.random() * data.length));
        var image = data[position].potteryFileName;
        vm.imageThumbnails.push(image);
        vm.maxThumbnails--;
        data.splice(position, 1);
      }
      vm.homeSelectedImage = vm.imageThumbnails[0];
    };

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

  }

})();
