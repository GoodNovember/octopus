(function() {
	'use strict';

	angular.module('app').config(configuration);

	configuration.$inject = ["$localForageProvider"];

	function configuration($localForageProvider){
		$localForageProvider.config({
			// driver      : 'localStorageWrapper', // if you want to force a driver
			name        : 'octopus-app', // name of the database and prefix for your data, it is "lf" by default
			version     : 1.0, // version of the database, you shouldn't have to use this
			// storeName   : 'keyvaluepairs', // name of the table
			description : 'The Octopus sits in the darkness.'
		});
	}

})();