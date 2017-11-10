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
            'http://172.16.2.1:52273/account');
        dataPromise.then(function(results) {
            $scope.userList = results.data;
            for (var i = 0; i < $scope.userList.length; i++) {
              var obj = $scope.userList[i];
              obj.real_date = new Date(obj.sunap_date);

            }

        }, function(reason){},function(update){});

    }

    $scope.deleteUserInfo = function(id) {
        var dataPromise = Data.deleteData(
            'http://172.16.2.1:52273/account/'+id, '');
        dataPromise.then(function(results) {
            $scope.requestUserList();
        }, function(reason){},function(update){});
    }

    $scope.modifyUserInfo = function(id, bub_cd, name, amt, kubun) {
        var dataPromise = Data.modifyData(
            'http://172.16.2.1:52273/johoi/'+id, '&bub_cd='+bub_cd+
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
            'http://172.16.2.1:52273/account/'+id);
        dataPromise.then(function(results) {
            $scope.userInfo = results.data;
        }, function(reason){},function(update){});
    }

   $scope.userInfo = {};
    $scope.getUserInfo = function(napbu_no) {
        var dataPromise = Data.getData(
            'http://172.16.2.1:52273/account/'+napbu_no);
        dataPromise.then(function(results) {
            $scope.userInfo = results.data;
        }, function(reason){},function(update){});
    }

  }]);

 