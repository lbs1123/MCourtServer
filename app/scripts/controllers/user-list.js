'use strict';

/**
 * @ngdoc function
 * @name angularJsexamApp.controller:UserListCtrl
 * @description
 * # UserListCtrl
 * Controller of the angularJsexamApp
 */
angular.module('angularJsexamApp')
  .controller('UserListCtrl', [ 
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
    		'http://172.16.2.1:52273/user');
    	dataPromise.then(function(results) {
    		$scope.userList = results.data;
    	}, function(reason){},function(update){});

    }

    $scope.deleteUserInfo = function(id) {
    	var dataPromise = Data.deleteData(
    		'http://172.16.2.1:52273/user/'+id, '');
    	dataPromise.then(function(results) {
    		$scope.requestUserList();
    	}, function(reason){},function(update){});
    }

    $scope.modifyUserInfo = function(id, scourt_id, user_id, name, password) {
    	var dataPromise = Data.modifyData(
    		'http://172.16.2.1:52273/user/'+id, '&scourt_id='+scourt_id+
                                                    '&user_id='+user_id+
                                                    '&name='+name+
                                                    '&password='+password);
    	dataPromise.then(function(results) {
    		$scope.requestUserList();
    	}, function(reason){},function(update){});
    }

    $scope.userInfo = {};
    $scope.getUserInfo = function(id) {
    	var dataPromise = Data.getData(
    		'http://172.16.2.1:52273/user/'+id);
    	dataPromise.then(function(results) {
    		$scope.userInfo = results.data;
    	}, function(reason){},function(update){});
    }

  }]);
