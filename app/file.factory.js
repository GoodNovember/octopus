(function() {
'use strict';

	angular
		.module('app')
		.factory('fileFactory', fileFactory);

	fileFactory.inject = ['$q', 'apiMachinery'];
	function fileFactory($q, apiMachinery) {

		var service = {
			getSHA1:getSHA1
		};
		

		return service;

		////////////////
		function getSHA1(inputString) {

		}
	}
})();