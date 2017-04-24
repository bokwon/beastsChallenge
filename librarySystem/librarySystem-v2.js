(function () {

	var libraryStorage = {};

	function librarySystem(name, dependency, callback) {
		if (arguments.length > 1) {
			registerLibrary(name, dependency, callback);	
		} else {
			return loadLibrary(name);
		}
	}
	
	function registerLibrary(name, dependency, callback) {
		if(libraryStorage[name]) {
			throw new Error(name + ' library already exists.');	
		}
		
		libraryStorage[name] = {
			callback: callback,
			dependencies: dependency,
			isRun: false
		}
	} 
	
	function loadLibrary(name) {
		
		var libDependencies = [];
		var library = libraryStorage[name];
		
		if (library.isRun) {
			return library.value;
		} else {
			libDependencies = library.dependencies.map(function loadSubLibrary(dependency) {
				return loadLibrary(dependency);
			});

			library.value = library.callback.apply(this, libDependencies);
			library.isRun = true;
			return library.value;
		}
	}
	
	function libraryReset() {
		libraryStorage = {};
	}

	window.librarySystem = librarySystem;
	window.libraryReset = libraryReset;

})();


