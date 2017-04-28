function toFixed(numObj, digits) {
	var result;
	var numStr = numObj.toString();
	var decimalPoint = numStr.indexOf('.');
	var roundIndex;
	var roundedValue;
	
	if (typeof numObj !== 'number') {
		throw new TypeError("It should pass number object for the first argument.");
	}
	
	if (digits && (digits < 0 || digits > 20)) {
		throw new RangeError("toFixed() digits argument must be between 0 and 20");
	}
	
	if (digits) {
		if (decimalPoint > 0) {
			roundIndex = decimalPoint+digits+1;
			
			if (numStr[roundIndex]) {
				if (Number(numStr[roundIndex]) >= 5) {
					roundedValue = Number(numStr.substr(decimalPoint+digits, 1)) + 1;
					result = numStr.substr(0, decimalPoint) + numStr.substr(decimalPoint, digits) + roundedValue.toString();
				} 
			} else {
				result = numStr + addZeros(roundIndex-digits+1);	
			}
			
		} else {
			result = numStr + '.' + addZeros(digits);
		}
	} else {
		if (decimalPoint > 0) {
			roundIndex = decimalPoint+1;
			
			if (Number(numStr[roundIndex]) >= 5) {
				roundedValue = Number(numStr.substr(decimalPoint-1, 1)) + 1;
				result = numStr.substr(0, decimalPoint-1) + roundedValue.toString();
			} else {
				result = numStr.substr(0, decimalPoint);
			}
		}	else {
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