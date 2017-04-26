function isPrototypeOf(prototypeObj, object) {
	var prototype;
	
	if (prototypeObj === undefined || prototypeObj === null) {
		throw new TypeError('Cannot search prototype chain of undefined');
	}
	
	if (object === undefined || object === null) {
		return false;
	}
	
	prototype = Object.getPrototypeOf(object)

	if (prototype === prototypeObj) {
		return true;
	} else if (prototype === null && prototype !== prototypeObj) {
		return false;
	} else {
		return isPrototypeOf(prototypeObj, prototype);
	}	
}

