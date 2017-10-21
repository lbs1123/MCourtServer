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
    $scope.e_mail_id = "";
    $scope.name      = "";
    $scope.password  = "";

    $scope.saveUserInfo = function() {
    	var dataPromise = Data.setData(
    		'http://127.0.0.1:52273/user', '&scourt_id='+$scope.scourt_id+
                                       '&e_mail_id='+$scope.e_mail_id+
                                       '&name='+$scope.name+
                                       '&password='+$scope.password);
    	dataPromise.then(function(results){
    		$scope.scourt_id = "";
        $scope.e_mail_id = "";
        $scope.name      = "";
        $scope.password  = "";
    	},function(reason){},function(update){});
    };

  }]);
