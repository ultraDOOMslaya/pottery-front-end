(function() {

  angular
    .module('maak-pottery')
    .service('potteryData', potteryData);

  potteryData.$inject = ['$http'];
  function potteryData ($http) {

    var pottery = function() {
        return $http.get("http://localhost:8080/pottery");
    };

    var addPottery = function(data) {
        return $http.post("http://localhost:8080/pottery", data);
    };

    return {
      pottery : pottery,
      addPottery : addPottery
    };
  }

})();
