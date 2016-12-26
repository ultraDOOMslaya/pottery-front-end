 (function () {

  angular
    .module('maak-pottery')
    .controller('eventsCtrl', eventsCtrl);

  eventsCtrl.$inject = ['$scope', 'eventsData'];
  function eventsCtrl ($scope, eventsData) {
    
    var vm = this;
    vm.pageHeader = {
      title: 'Upcoming Events',
      strapline: 'Come visit my booth.'
    };

    console.log("load eventsCtrl in the client?");
    eventsData.event()
        .success(function(data) {
          console.log("Data returned from ext api: " + JSON.stringify(data));
          vm.data = { events : data };
    });

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

  }

})();
