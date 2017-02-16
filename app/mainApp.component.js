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

	mainApp.$inject = ["apiMachinery", "$localForage", "fileFactory"];

	function mainApp(apiMachinery, $localForage, fileFactory){
		var $ctrl = this;
		
		$ctrl.$onInit = init;

		$ctrl.letters = [];
		
		$ctrl.authenticate = authenticate;
		$ctrl.logOut = logOut;
		$ctrl.getLetters = getLetters;
		
		function init(){

			console.log("init component componentName");
			
			$ctrl.isLoggedIn = false;
			
			$localForage.getItem("authHeader").then(function(response){
				if(response){
					apiMachinery.setAuth(null, null, response).then(function(){
						$ctrl.isLoggedIn = true;
					});
				}
			});

		}// end init

		function getLetters(){
			apiMachinery.getLetters()
				.then(gotLetters)
				.catch(failedToGetLetters);

			function gotLetters(letters){
				$ctrl.letters = letters;
			}

			function failedToGetLetters(){

			}

		}

		function authenticate(){
			apiMachinery.setAuth($ctrl.username, $ctrl.password).then(function(){
				$ctrl.isLoggedIn = true;
			});
		}

		function logOut(){
			apiMachinery.removeAuth().then(function(){
				$ctrl.isLoggedIn = false;
			})
		}
		
	}//end controller
	
})();//