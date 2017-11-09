'use strict';

/**
 * @ngdoc function
 * @name angularJsexamApp.controller:UserListCtrl
 * @description
 * # UserListCtrl
 * Controller of the angularJsexamApp
 */
angular.module('angularJsexamApp')
  .controller('SunapListCtrl', [ 
    "Data", "$scope", "$state", function (Data, $scope, $state) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.$on('$viewContentLoaded', function() {
        $scope.requestUserList();
    });

    $scope.userList = [];
    $scope.requestUserList = function() {
        var dataPromise = Data.getData(
            'http://192.168.35.31:52273/account');
        dataPromise.then(function(results) {
            $scope.userList = results.data;
        }, function(reason){},function(update){});

    }

    $scope.deleteUserInfo = function(id) {
        var dataPromise = Data.deleteData(
            'http://192.168.35.31:52273/account/'+id, '');
        dataPromise.then(function(results) {
            $scope.requestUserList();
        }, function(reason){},function(update){});
    }

    $scope.modifyUserInfo = function(id, bub_cd, name, amt, kubun) {
        var dataPromise = Data.modifyData(
            'http://192.168.35.31:52273/johoi/'+id, '&bub_cd='+bub_cd+
                                                       '&name='+name+
                                                       '&amt='+amt+
                                                       '&kubun='+kubun);
         dataPromise.then(function(results) {
            $scope.requestUserList();
        }, function(reason){},function(update){});
    }

    $scope.userInfo = {};
    $scope.getUserInfo = function(id) {
        var dataPromise = Data.getData(
            'http://192.168.35.31:52273/account/'+id);
        dataPromise.then(function(results) {
            $scope.userInfo = results.data;
        }, function(reason){},function(update){});
    }

  }]);
