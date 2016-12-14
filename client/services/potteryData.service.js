(function() {

  angular
    .module('maak-pottery')
    .service('potteryData', potteryData);

  potteryData.$inject = ['$http'];
  function potteryData ($http) {

    var pottery = function() {
        $http.get(/api/pottery).then(function(response) {
            return response.data;
        });
    }

    return {
      pottery : pottery
    };
  }

})();
