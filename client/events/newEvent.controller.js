(function () {

  angular
    .module('maak-pottery')
    .controller('newEventCtrl', newEventCtrl);

  newEventCtrl.$inject = ['eventsData'];
  function newEventCtrl (eventsData) {
    var vm = this;
    vm.eventsData = eventsData;

    vm.pageHeader = {
      title: "Add a new event.",
      strapline: ""
    };

    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.formData.name || !vm.formData.date || !vm.formData.description ||
          !vm.formData.time) {
        vm.formError = "All fields are required Dad, please try again";
        return false;
      } else {
        vm.addEvent(vm.formData);
      }
    };

    vm.addEvent = function (formData) {
      eventsData.addEvent({
        name : formData.name,
        date : formData.date,
        description : formData.description,
        time : formData.time
      })
        .success(function (data) {
          //location.path("/events");
        })
        .error(function (data) {
          vm.formError = "I couldn't save your event Dad, please try again";
        });
      return false;
    };
  }

})();
