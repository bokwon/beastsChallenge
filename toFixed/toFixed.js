function toFixed(numObj, digits) {
	var numStr = numObj.toString();
	var curDecimalPoint = numStr.indexOf('.');
	var newDecimalPoint;
	var roundValueIndex;
	var roundedValue;
	var result;

	if (typeof numObj !== 'number') {
		throw new TypeError("It should pass number object for the first argument.");
	}

	if (digits && (digits < 0 || digits > 20)) {
		throw new RangeError("toFixed() digits argument must be between 0 and 20");
	}

	if (digits) {
		newDecimalPoint = curDecimalPoint + digits;
		roundValueIndex = newDecimalPoint + 1;

		if (curDecimalPoint > 0) {
			if (numStr[roundValueIndex] && Number(numStr[roundValueIndex]) >= 5 ) {
				roundedValue = Number(numStr.substr(newDecimalPoint, 1)) + 1;
				result = numStr.substr(0, curDecimalPoint) + numStr.substr(curDecimalPoint, digits) + roundedValue.toString();
			} else {
				result = numStr + addZeros(roundValueIndex-digits+1);
			}
		} else {
			result = numStr + '.' + addZeros(digits);
		}

	} else {
		newDecimalPoint = curDecimalPoint - 1;
		roundValueIndex = curDecimalPoint + 1;

		if (curDecimalPoint > 0) {
			if (numStr[roundValueIndex] && Number(numStr[roundValueIndex]) >= 5) {
				roundedValue = Number(numStr.substr(newDecimalPoint, 1)) + 1;
				result = numStr.substr(0, newDecimalPoint) + roundedValue.toString();
			} else {
				result = numStr.substr(0, curDecimalPoint);
			}
		} else {
			result = numStr;
		}

	}
	return result;
}

function addZeros(digits) {
	var zeroStr = "";

	while(zeroStr.length < digits) {
		zeroStr = zeroStr + "0";
	}

	return zeroStr;
}
