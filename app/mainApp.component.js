(function() {
	'use strict';

	angular
		.module("app")
		.component("mainApp",{
			bindings:{},
			controller:mainApp,
			// controllerAs:'ctrl',
			templateUrl:"./app/mainApp.html",
		});//end component

	mainApp.$inject = ["apiMachinery"];

	function mainApp(apiMachinery){
		var $ctrl = this;
		
		$ctrl.$onInit = init;

		$ctrl.letters = [];
		
		function init(){
			console.log("init component componentName", apiMachinery);
			apiMachinery.getLetters().then(function(letters){
				console.log("LETTERS:", letters);
				apiMachinery.getFile(letters[0].path).then(gotFile);

				function gotFile(data){
					console.log("LETTTTTTTER:", data);
				}
			})
		}// end init

		function getFiles(){

		}
		
	}//end controller
	
})();//