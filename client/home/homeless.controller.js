angular
.module('loc8rApp')
.controller('homelessCtrl', homelessCtrl);

function homelessCtrl ($scope) {
    $scope.pageHeader = {
        title: 'Loc8r',
        strapline: 'Find places to work with wifi near you!'
    };
    $scope.sidebar = {
        content: "Looking for wifi and a seat etc etc"
    };
} 
