(function() {
  
  angular
    .module('maak-pottery')
    .service('eventsData', eventsData);

  eventsData.$inject = ['$http'];
  function eventsData ($http) { 

    //headers: {'Content-Type': 'application/json; charset=utf-8'}

    var event = function () {
      return $http.get("http://localhost:8080/events");
    };

    var eventById = function (eventId) {
      return $http.get("http://localhost:8080/events/" + eventId);
    };

    var addEvent = function (data) {
      return $http.post("http://localhost:8080/events", data);
    };

    return {
      event : event,
      addEvent : addEvent,
      eventById : eventById
    };
  }

})();
