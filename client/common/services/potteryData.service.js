(function() {

  angular
    .module('maak-pottery')
    .service('potteryData', potteryData);

  potteryData.$inject = ['$http'];
  function potteryData ($http) {

    var pottery = function() {
        return $http.get("/api/pottery");
    };

    return {
      pottery : pottery
    };
  }

})();
