(function() {

  angular
    .module('maak-pottery')
    .service('potteryData', potteryData);

  potteryData.$inject = ['$http', 'authentication'];
  function potteryData ($http, authentication) {

    var pottery = function() {
      return $http.get("http://localhost:8080/pottery");
    };

    var getPottery = function(id) {
      return $http.get("http://localhost:8080/pottery/" + id);
    };

    var addPottery = function(data) {
      return $http.post("http://localhost:8080/pottery", data, {
        headers: {
          'X-Authorization' : 'Bearer ' + authentication.getToken()
        }
      });
    };

    var updatePottery = function(data) {
      return $http.put("http://localhost:8080/pottery", data, {
        headers: {
          'X-Authorization' : 'Bearer ' + authentication.getToken()
        }
      });
    };

    var deletePottery = function(id) {
      return $http.delete("http://localhost:8080/pottery/" + id, {
        headers: {
          'X-Authorization' : 'Bearer ' + authentication.getToken()
        }
      });
    };

    var potteryType = function() {
      return $http.get("http://localhost:8080/potteryType", {
        headers: {
          'X-Authorization' : 'Bearer ' + authentication.getToken()
        }
      }); 
    }

    var putPotteryType = function(data) {
      return $http.put("http://localhost:8080/potteryType", data, {
        headers: {
          'X-Authorization' : 'Bearer ' + authentication.getToken()
        }
      }); 
    }

    return {
      pottery : pottery,
      addPottery : addPottery,
      updatePottery : updatePottery,
      getPottery : getPottery,
      deletePottery : deletePottery,
      potteryType : potteryType,
      putPotteryType : putPotteryType
    };
  }

})();
