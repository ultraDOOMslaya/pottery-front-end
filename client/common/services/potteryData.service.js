(function() {

  angular
    .module('maak-pottery')
    .service('potteryData', potteryData);

  potteryData.$inject = ['$http', 'authentication', 'ENV_VARS'];
  function potteryData ($http, authentication, ENV_VARS) {

    var pottery = function() {
      return $http.get(ENV_VARS.apiUrl + "/pottery");
    };

    var getPottery = function(id) {
      return $http.get(ENV_VARS.apiUrl + "/pottery/" + id);
    };

    var addPottery = function(data) {
      return $http.post(ENV_VARS.apiUrl + "/pottery", data, {
        headers: {
          'X-Authorization' : 'Bearer ' + authentication.getToken()
        }
      });
    };

    var updatePottery = function(data) {
      return $http.put(ENV_VARS.apiUrl + "/pottery", data, {
        headers: {
          'X-Authorization' : 'Bearer ' + authentication.getToken()
        }
      });
    };

    var deletePottery = function(id) {
      return $http.delete(ENV_VARS.apiUrl + "/pottery/" + id, {
        headers: {
          'X-Authorization' : 'Bearer ' + authentication.getToken()
        }
      });
    };

    var potteryType = function() {
      return $http.get(ENV_VARS.apiUrl + "/potteryType", {
        headers: {
          'X-Authorization' : 'Bearer ' + authentication.getToken()
        }
      }); 
    }

    var putPotteryType = function(data) {
      return $http.put(ENV_VARS.apiUrl + "/potteryType", data, {
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
