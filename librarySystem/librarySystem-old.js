(function () {

	var libraryStorage = {};

	function librarySystem(libraryName, dependencies, callback) {
	
		var libDependencies = [];
		var library = libraryStorage[libraryName];
		var libDependency;
		
		if (arguments.length > 1) {
			if(library === undefined) {
				libraryStorage[libraryName] = {
					callback: callback,
					dependencies: dependencies,
					isRun: false
				}
			}
		} else {
			if (library.isRun) {
				return library.value;
			} else {
				libDependencies = library.dependencies.map(function(dependency) {
					libDependency = libraryStorage[dependency];
					libDependency.value = libDependency.callback();
					libDependency.isRun = true;
					return libDependency.value;
				});

				library.value = library.callback.apply(this, libDependencies);
				library.isRun = true;
				return library.value;
			}
		}
	}
	
	function libraryReset() {
		libraryStorage = {};
	}

	window.librarySystem = librarySystem;
	window.libraryReset = libraryReset;

})();


