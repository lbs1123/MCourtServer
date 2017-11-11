'use strict';

/**
 * @ngdoc function
 * @name angularJsexamApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the angularJsexamApp
 */
angular.module('angularJsexamApp')
  .controller('SignupCtrl', [ 
  	"Data", "$scope", "$state",
  	function (Data, $scope, $state) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  
    $scope.scourt_id = "";
    $scope.user_id   = "";
    $scope.name      = "";
    $scope.password  = "";

    $scope.saveUserInfo = function() {
    	var dataPromise = Data.setData(
    		'http://172.16.2.1:52273/user', '&scourt_id='+$scope.scourt_id+
                                            '&user_id='+$scope.user_id+
                                            '&name='+$scope.name+
                                            '&password='+$scope.password);
    	dataPromise.then(function(results){
    		$scope.scourt_id = "";
        $scope.user_id   = "";
        $scope.name      = "";
        $scope.password  = "";
    	},function(reason){},function(update){});
    };

  }]);
