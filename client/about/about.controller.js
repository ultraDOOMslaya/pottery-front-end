(function () {

  angular
    .module('maak-pottery')
    .controller('aboutCtrl', aboutCtrl);

  function aboutCtrl() {
    var vm = this;

    vm.pageHeader = {
      title: 'About Jon'
    };
    vm.main = {
      content: 'Insert about Jon Maakestad and his pots here.'
    };
  }

})();
