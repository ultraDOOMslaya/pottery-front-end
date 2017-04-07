(function () {

  angular
    .module('maak-pottery')
    .controller('newEventCtrl', newEventCtrl);

  newEventCtrl.$inject = ['eventsData', '$location'];
  function newEventCtrl (eventsData, location) {
    
    var vm = this;
    vm.eventsData = eventsData;
    vm.location = location;
    vm.formError;

    vm.pageHeader = {
      title: "Add a new event.",
      strapline: ""
    };

    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.formData.name || !vm.formData.date || !vm.formData.description ||
          !vm.formData.time) {

        vm.formError = {
          message: "All fields are required Dad, please try again.",
          showError: true
        };
        return false;
      } else {
        vm.addEvent(vm.formData);
      }
    };

    vm.addEvent = function (formData) {
      eventsData.addEvent({
        eventName : formData.name,
        eventDate : formData.date,
        eventDescription : formData.description,
        eventTime : formData.time
      })
        .success(function (data) {
          vm.location.path("/events");
        })
        .error(function (data) {
          vm.formError = "I couldn't save your event Dad, please try again";
        });
      return false;
    };
  }

})();
