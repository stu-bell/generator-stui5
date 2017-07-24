var R = require('ramda');

var S = {
	multiply: R.multiply
}
S.double = S.multiply(2);

module.exports = S;
