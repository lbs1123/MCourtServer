'use strict';

/**
 * @ngdoc function
 * @name angularJsexamApp.controller:UserListCtrl
 * @description
 * # UserListCtrl
 * Controller of the angularJsexamApp
 */
angular.module('angularJsexamApp')
  .controller('JohoiListCtrl', [ 
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
              obj.real_date = new Date(obj.issue_date);
              obj.real_date 
              = obj.real_date.getFullYear()+"."+(obj.real_date.getMonth() + 1)+"."+obj.real_date.getDate()
              +" ("+obj.real_date.getHours()+":"+obj.real_date.getMinutes()+")";

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
            var issue_date = new Date($scope.userInfo.issue_date);
            $scope.userInfo.issue_date = issue_date.getFullYear()+"."+(issue_date.getMonth() + 1) +"."+issue_date.getDate()
                       +" ("+issue_date.getHours()+":"+issue_date.getMinutes()+")";
          }, function(reason){},function(update){});
    }

  }]);
