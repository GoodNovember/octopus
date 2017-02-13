(function() {
'use strict';

	angular
		.module('app')
		.factory('apiMachinery', apiMachinery);

	apiMachinery.inject = ['$http', '$q', "$localForage"];
	function apiMachinery($http, $q, $localForage) {

		var GH_REPO = "octopus";
		var GH_USER = "GoodNovember";

		var base_api_url = "https://api.github.com/repos/GoodNovember/octopus/contents/";

		var service = {
			getLetters:getLetters,
			getFile: getFile,
			setAuth: setAuth,
			removeAuth: removeAuth,
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
			return getContents(GH_USER, GH_REPO, "letters/");
		}

		function getContents(user, repo, contents){
			var url = "https://api.github.com/repos/" + user + "/" + repo + "/contents/" + contents;
			return $q(function(resolve, reject){
				$http
					.get(url)
					.then(gottenFn)
					.catch(reject);

				function gottenFn(response){
					resolve(response.data);
				}
			})
		}

		function setAuth(username, password, headerString){
			return $q(function(resolve, reject){
				if(!headerString){
					var raw = username + ":" + password
					var encoded = window.btoa(raw); // this only turns it into a base64 encoded string. 
					var authString = "Basic " + encoded;
					$localForage.setItem("authHeader", authString).then(function(){
						$http.defaults.headers.common.Authorization = authString; // we will not attach our Authorization to all the next requests.
						resolve();
					});
				}else{
					$http.defaults.headers.common.Authorization = headerString;
					resolve();
				}
			})
		}

		function removeAuth(){
			return $q(function(resolve, reject){
				$localForage
					.removeItem("authHeader")
					.then(resolve)
					.catch(reject);
			})
		}

	}
})();