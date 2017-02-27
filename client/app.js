(function () {

  angular.module('maak-pottery', ['ngRoute', 'ngSanitize', 'ui.bootstrap', 'ngFileUpload']);

  function config ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/home/home.view.html',
        controller: 'homeCtrl',
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
        controllerAs: 'vm'       
      })
      .when('/pottery/:potteryId', {
        templateUrl: '/pottery/viewPottery.view.html',
        controller: 'viewPotteryCtrl',
        controllerAs: 'vm'
      })
      .when('/pottery/:potteryId/edit', {
        templateUrl: '/pottery/editPottery.view.html',
        controller: 'editPotteryCtrl',
        controllerAs: 'vm'
      })
      .when('/events', {
        templateUrl: '/events/events.view.html',
        controller: 'eventsCtrl',
        controllerAs: 'vm'
      })
      .when('/events/new', {
        templateUrl: '/events/newEvent.view.html',
        controller: 'newEventCtrl',
        controllerAs: 'vm'
      })
      .when('/events/:eventId', {
        templateUrl: '/events/editEvent.view.html',
        controller: 'editEventCtrl',
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
      //.otherwise({redirectTo: '/'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }

  angular
    .module('maak-pottery')
    .config(['$routeProvider', '$locationProvider', config]);

})();
