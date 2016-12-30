(function() {

  angular
    .module('maak-pottery')
    .service('potteryData', potteryData);

  potteryData.$inject = ['$http'];
  function potteryData ($http) {

    var pottery = function() {
        return $http.get("http://localhost:8080/pottery");
    };

    return {
      pottery : pottery
    };
  }

})();
