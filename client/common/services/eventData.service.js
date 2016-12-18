(function() {

  angular
    .module('maak-pottery')
    .service('eventData', eventData);

  eventData.$inject = ['$http'];
  function eventData ($http) {

    var event = function() {
        return $http.get("/api/events");
    };

    return {
      event : event
    };
  }

})();
