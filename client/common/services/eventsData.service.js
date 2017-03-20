(function() {
  
  angular
    .module('maak-pottery')
    .service('eventsData', eventsData);

  eventsData.$inject = ['$http', 'authentication'];
  function eventsData ($http, authentication) { 

    //headers: {'Content-Type': 'application/json; charset=utf-8'}

    var event = function () {
      return $http.get("http://localhost:8080/events");
    };

    var eventById = function (eventId) {
      return $http.get("http://localhost:8080/events/" + eventId);
    };

    var updateEvent = function (data) {
      return $http.put("http://localhost:8080/events", data, {
        headers: {
          'X-Authorization' : 'Bearer ' + authentication.getToken()
        }
      });
    };

    var deleteEvent = function (eventId) {
      return $http.delete("http://localhost:8080/events/" + eventId, {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        } 
      });
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
