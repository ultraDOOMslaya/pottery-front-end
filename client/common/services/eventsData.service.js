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

    var updateEvent = function (data) {
      return $http.put("http://localhost:8080/events", data);
    };

    var deleteEvent = function (eventId) {
      return $http.delete("http://localhost:8080/events/" + eventId);
    }

    return {
      event : event,
      addEvent : addEvent,
      eventById : eventById,
      updateEvent : updateEvent,
      deleteEvent : deleteEvent
    };
  }

})();
