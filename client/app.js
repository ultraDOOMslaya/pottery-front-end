(function () {

  angular.module('maak-pottery', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

  function config ($routeProvider, $locationProvider) {
    console.log("About to load the page...");
    $routeProvider
      .when('/', {
        templateUrl: '/home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/pottery', {
        templateUrl: '/common/views/potteryIndex.view.html',
        controller: 'potteryCtrl',
        controllerAs: 'vm'
      })
      .when('/events', {
        templateUrl: '/common/views/eventsIndex.view.html',
        controller: 'eventsCtrl',
        controllerAs: 'vm'
      })
      .when('/about', {
        templateUrl: '/common/views/genericText.view.html',
        controller: 'aboutCtrl',
        controllerAs: 'vm'
      })
      //.when('/location/:locationid', {
      //  templateUrl: '/locationDetail/locationDetail.view.html',
      //  controller: 'locationDetailCtrl',
      //  controllerAs: 'vm'
      //})
      .otherwise({redirectTo: '/'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }

  angular
    .module('maak-pottery')
    .config(['$routeProvider', '$locationProvider', config]);

})();
