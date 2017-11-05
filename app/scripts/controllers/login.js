'use strict';

/**
 * @ngdoc function
 * @name angularJsexamApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the angularJsexamApp
 */
angular.module('angularJsexamApp')
  .controller('LoginCtrl', 
  	['$scope','$state','sessionInfo','sessionService', 
  	function ($scope, $state, sessionInfo, sessionService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    console.log(" !!!! login start !!!");

    if (sessionInfo.isUserSignedIn()) {
      console.log("AAAAAAAAAA");
    	$state.go('account');
    } else {
    	$state.go('main');
    }
    $scope.submitLogin = function() {
      console.log("BBBBBBBB");
    	sessionService.login($scope.login, function(res) {
    		$state.go('account');
    	});
    }
    $scope.isUserSignedIn = function() {
      console.log("CCCCCCCC");
    	return sessionInfo.isUserSignedIn();
    }
    $scope.getUserId = function() {
      console.log("DDDDDDDD");
    	if (sessionInfo.isUserSignedIn())
    		return sessionInfo.getCurrentUser().data.user_id;
    	else return '';
    }
    $scope.logout = function() {
      console.log("EEEEEEE");
    	sessionInfo.reset();
    	$state.go('login');
    }
  }]);
