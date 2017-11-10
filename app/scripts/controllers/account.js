'use strict';

/**
 * @ngdoc function
 * @name angularJsexamApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the angularJsexamApp
 */
angular.module('angularJsexamApp')
  .controller('AccountCtrl', [ 
    "Data", "$scope", "$state",
    function (Data, $scope, $state) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.bub_cd  = "";
    $scope.bank_cd = "";
    $scope.name    = "";
    $scope.amt     = "";
    $scope.kubun   = "";
    $scope.issue_date = "";
    $scope.modifyUserInfo = function(bank_cd, bub_cd, name, amt, kubun, issue_date) {
      var dataPromise = Data.modifyData(
        'http://192.168.35.178:52273/account/'+bank_cd, '&bub_cd='+$scope.bub_cd+
                                                        '&name='+$scope.name+
                                                        '&amt='+$scope.amt+
                                                        '&kubun='+$scope.kubun+
                                                        '&issue_date='+$scope.issue_date);
    dataPromise.then(function(results) {
        $scope.requestUserList();
      }, function(reason){},function(update){});
            window.alert('가상계좌발급 성공');
    }


 }]);