(function() {
  
  angular
    .module('maak-pottery')
    .service('eventsData', eventsData);

  eventsData.$inject = ['$http'];
  function eventsData ($http) {

    var event = function () {
      return $http.get("/api/events");
    };

    var addEvent = function (data) {
      return $http.post("/api/events");
    };

    var eventById = function (eventId) {
      return $http.get("/api/events/" + eventId);
    };

    return {
      event : event,
      addEvent : addEvent,
      eventById : eventById
    };
  }

})();
