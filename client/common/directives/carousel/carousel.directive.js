(function () {
  
  angular
    .module('maak-pottery')
    .directive('carousel', carousel)
    
  function carousel($timeout) {
   return {
      restrict: 'E',
      scope: {
        links: '=' 
      },
      templateUrl: 'carousel.template.html',
      link: function(scope, element) {
        $timeout(function() {
          $('.carousel-indicators li',element).first().addClass('active');
          $('.carousel-inner .item',element).first().addClass('active');
        });
      }
   }
  }

})();
  
