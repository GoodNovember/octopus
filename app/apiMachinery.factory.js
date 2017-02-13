(function() {
'use strict';

	angular
		.module('app')
		.factory('apiMachinery', apiMachinery);

	apiMachinery.inject = ['$http', '$q'];
	function apiMachinery($http, $q) {

		var base_api_url = "http://api.github.com/repos/GoodNovember/octopus/contents/";

		var service = {
			getLetters:getLetters,
			getFile: getFile,
		};
		
		return service;

		////////////////
		function getDir(subpath) { 

			return $q(function(resolve, reject){
				$http
					.get(base_api_url + subpath)
					.then(gotFiles)
					.catch(reject);

				function gotFiles(response){
					resolve(response.data);
				}
			})
		}

		function getFile(path){
			return $q(function(resolve, reject){
				$http
					.get(path)
					.then(gotFiles)
					.catch(reject);

				function gotFiles(response){
					resolve(response.data);
				}
			})
		}

		function getLetters(){
			return getDir("letters/");
		}
	}
})();