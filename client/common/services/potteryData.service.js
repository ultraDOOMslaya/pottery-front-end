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

    var updatePottery = function(data) {
        console.log("The potteryData im trying to pass to the api is: {}", data);
        return $http.put("http://localhost:8080/pottery", data);
    };

    var getPottery = function(id) {
        return $http.get("http://localhost:8080/pottery/" + id);
    };

    var deletePottery = function(id) {
        return $http.delete("http://localhost:8080/pottery/" + id);
    };

    return {
      pottery : pottery,
      addPottery : addPottery,
      updatePottery : updatePottery,
      getPottery : getPottery,
      deletePottery : deletePottery
    };
  }

})();
