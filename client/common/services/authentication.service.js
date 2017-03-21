(function () {

  angular
    .module('maak-pottery')
    .service('authentication', authentication);

  authentication.$inject = ['$window', '$http', '$timeout'];
  function authentication ($window, $http, $timeout) {
    
    var saveToken = function (token) {
      $window.localStorage['maak-pottery-token'] = token;
    };

    var getToken = function () {
      return $window.localStorage['maak-pottery-token'];
    };

    register = function () {
      return $http.post('http://localhost:8080/register', user).success(function(data) {
        saveToken(data.token);
      });
    };

    login = function (user) {
      return $http({
               method: 'POST',
               url: 'http://localhost:8080/api/auth/login',
               data: user,
               headers: { 
                 'X-Requested-With' : 'XMLHttpRequest'
               }
             }).success(function(data) {
               saveToken(data.token);
             });
    };

    logout = function () {
      $window.localStorage.removeItem('maak-pottery-token');
    };

    var isLoggedIn = function() {
      var token = getToken();

      if(token) {
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    /**
     * This method returns a promise which the routeProvider can use to check if the user
     * is authenticated before accessing a route.
     */
    isAuthenticated = function() {
      return $timeout(function(){
        return isLoggedIn();
      }, 1000);
    };

    var currentUser = function() {
      if(isLoggedIn()) {
        var token = getToken();
        console.log("The token is: {}", token);
        console.log("atobified token is: {}", ($window.atob(token.split('.')[1])));
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        console.log("The username is: {}", payload);
        return {
          username : payload.sub,
          authorities : payload.scopes
        };
      }
    };

    return {
      currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      register : register,
      login : login,
      logout : logout,
      isLoggedIn : isLoggedIn,
      isAuthenticated : isAuthenticated
    };
  }
})();
