(function () {

  angular.module('maak-pottery', ['ngRoute', 'ngSanitize', 'ui.bootstrap', 'ngFileUpload']);

  function config ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: '/auth/login/login.view.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .when('/pottery', {
        templateUrl: '/pottery/pottery.view.html',
        controller: 'potteryCtrl',
        controllerAs: 'vm'
      })
      .when('/pottery/new', {
        templateUrl: '/pottery/newPottery.view.html',
        controller: 'newPotteryCtrl',
        controllerAs: 'vm',
        resolve: {
          authorize: ['authentication', '$location', function(authentication, $location) {
            return authentication.isAuthenticated()
                                 .then(function(loggedIn) {
                                   if(!loggedIn) {
                                     $location.path("/");
                                   }
                                   return loggedIn;
                                 });
          }]
        }
      })
      .when('/pottery/:potteryId', {
        templateUrl: '/pottery/viewPottery.view.html',
        controller: 'viewPotteryCtrl',
        controllerAs: 'vm'
      })
      .when('/pottery/:potteryId/edit', {
        templateUrl: '/pottery/editPottery.view.html',
        controller: 'editPotteryCtrl',
        controllerAs: 'vm',
        resolve: {
          authorize: ['authentication', '$location', function(authentication, $location) {
            return authentication.isAuthenticated()
                                 .then(function(loggedIn) {
                                   if(!loggedIn) {
                                     $location.path("/");
                                   }
                                   return loggedIn;
                                 });
          }]
        }
      })
      .when('/events', {
        templateUrl: '/events/events.view.html',
        controller: 'eventsCtrl',
        controllerAs: 'vm'
      })
      .when('/events/:eventId', {
        templateUrl: '/events/editEvent.view.html',
        controller: 'editEventCtrl',
        controllerAs: 'vm'
      })
      .when('/potteryType', {
        templateUrl: '/potteryType/potteryType.view.html',
        controller: 'potteryTypeCtrl',
        controllerAs: 'vm',
        resolve: {
          authorize: ['authentication', '$location', function(authentication, $location) {
            return authentication.isAuthenticated()
                                 .then(function(loggedIn) {
                                   if(!loggedIn) {
                                     $location.path("/");
                                   }
                                   return loggedIn;
                                 });
          }]
        }       
      })
      .when('/about', {
        templateUrl: '/common/views/genericText.view.html',
        controller: 'aboutCtrl',
        controllerAs: 'vm'
      })
      .when('/register', {
        templateUrl: '/auth/register/register.view.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }

  angular
    .module('maak-pottery')
    .config(['$routeProvider', '$locationProvider', config]);

})();
