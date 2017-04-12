(function() {
  
  angular
    .module('maak-pottery')
    .service('eventsData', eventsData);

  eventsData.$inject = ['$http', 'authentication', 'ENV_VARS'];
  function eventsData ($http, authentication, ENV_VARS) { 

    //headers: {'Content-Type': 'application/json; charset=utf-8'}

    var event = function () {
      return $http.get(ENV_VARS.apiUrl + "/events");
    };

    var eventById = function (eventId) {
      return $http.get(ENV_VARS.apiUrl + "/events/" + eventId);
    };

    var updateEvent = function (data) {
      return $http.put(ENV_VARS.apiUrl + "/events", data, {
        headers: {
          'X-Authorization' : 'Bearer ' + authentication.getToken()
        }
      });
    };

    var deleteEvent = function (eventId) {
      return $http.delete(ENV_VARS.apiUrl + "/events/" + eventId, {
        headers: {
          'X-Authorization' : 'Bearer ' + authentication.getToken()
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
