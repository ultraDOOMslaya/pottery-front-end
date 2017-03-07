 (function () {

  angular
    .module('maak-pottery')
    .controller('eventsCtrl', eventsCtrl);

  eventsCtrl.$inject = ['$scope', '$route', '$location', 'eventsData'];
  function eventsCtrl ($scope, route, location, eventsData) {
    
    var vm = this;
    vm.eventsData = eventsData;
    vm.location = location;
    vm.route = route;
    vm.staticContent = true;
    vm.modifyContent = false;

    vm.pageHeader = {
      title: 'Upcoming Events',
      strapline: 'Come visit my booth.'
    };

    eventsData.event()
        .success(function(data) {
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
        vm.updateEvent(vm.formData.event);
      }
    };

    vm.updateEvent = function (event) {
      eventsData.updateEvent({
        id : event.id,
        eventName : event.eventName,
        eventDescription : event.eventDescription,
        eventDate : event.eventDate,
        eventTime : event.eventTime
      })
        .success(function (data) {
          console.log("the data returned from the server is: {}", data);
          route.reload();
        })
        .error(function (data) {
          vm.formError = "I couldn't save your event Dad, please try again";
        });
      return false;
    };
  
    vm.deleteEvent = function (event) {
      var deleteConfirmation = confirm("Are you sure you want to delete the " + event.eventName + " event?");
      if(deleteConfirmation) {
        eventsData.deleteEvent(event.id)
        .success(function() {
          route.reload();
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
