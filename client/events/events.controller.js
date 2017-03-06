 (function () {

  angular
    .module('maak-pottery')
    .controller('eventsCtrl', eventsCtrl);

  eventsCtrl.$inject = ['$scope', 'eventsData'];
  function eventsCtrl ($scope, eventsData) {
    
    var vm = this;
    vm.eventsData = eventsData;
    vm.staticContent = true;
    vm.modifyContent = false;

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

    vm.editEvent = function(event) {
      switchContent();
      vm.formData = {event: event};
    }

    vm.cancel = function() {
      switchContent();
    }

    vm.newEvent = function() {
      vm.formData = $scope.initial;
      switchContent();
    }

    switchContent = function() {
      vm.staticContent = !vm.staticContent;
      vm.modifyContent = !vm.modifyContent;
    }


    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.formData.event.eventName || !vm.formData.event.eventDescription || !vm.formData.event.eventDate ||
          !vm.formData.event.eventTime) {
        vm.formError = "All fields are required Dad, please try again";
        return false;
      } else {  
        console.log("the form data for the event: {}", vm.formData);
        vm.updateEvent(vm.formData);
      }
    };

    vm.updateEvent = function (event) {
      eventsData.updateEvent({
        eventId : (typeof event.id === 'undefined') ? true : "",
        eventName : event.eventName,
        potteryDescription : event.eventDescription,
        potteryFileName : event.eventDate,
        eventTime : event.eventTime
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
  

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

  }

})();
