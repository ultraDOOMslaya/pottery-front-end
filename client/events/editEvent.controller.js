(function () {

  angular
    .module('maak-pottery')
    .controller('editEventCtrl', editEventCtrl);

  editEventCtrl.$inject = ['$routeParams', 'eventsData'];
  function editEventCtrl ($routeParams, eventsData) {

    var vm = this;
    //vm.eventsData = eventsData;

    vm.eventId = $routeParams.eventId;

    vm.pageHeader = {
      title: "Edit this event.",
      strapline: ""
    };

    eventsData.eventById(vm.eventId)
      .success(function(data) {
        vm.data = { formData : data  }
      })
      .error(function(e) {
        console.log(e);
      });

    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.formData.name || !vm.formData.date || !vm.formData.description ||
          !vm.formData.time) {
        vm.formError = "All fields are required Dad, please try again";
        return false;
      } else {
        vm.editEvent(vm.formData);
      }
    };

    vm.editEvent = function (formData) {
      eventsData.addReview({
        name : formData.name,
        date : formData.date,
        description : formData.description,
        time : formData.time
      })
        .success(function (data) {
          
        })
        .error(function (data) {
          vm.formError = "I couldn't save your event Dad, please try again";
        });
      return false;
    };
  }

})();
