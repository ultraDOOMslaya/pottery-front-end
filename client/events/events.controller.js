 (function () {

  angular
    .module('maak-pottery')
    .controller('eventsCtrl', eventsCtrl);

  homeCtrl.$inject = ['$scope', 'eventsData'];
  function eventsCtrl ($scope, eventsData) {
    
    var vm = this;
    vm.pageHeader = {
      title: 'Upcoming Events',
      strapline: 'Come visit my booth.'
    };

    potteryData.pottery()
        .success(function(data) {
          vm.data = { events : data };
    });

    vm.sidebar = {
      content: "Jon Maakestad hails from a long line of artists. Jon began his humble beginnings at Luther Collage were he majored in art with a focus on pottery. The student body and facualty found his craftsmanship beautiful and he has been making artisan pottery ever since. "
    };

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

  }

})();
