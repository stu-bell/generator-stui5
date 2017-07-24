var R = require('ramda');

var SCB = {
	// TODO: jsdoc all of these!
	pathify: R.replace(/\./g, '/'),
	jPath: R.unapply(R.join('/')),
	jName: R.unapply(R.join('.')),
	configEq: R.curry((mConfig, value, sKey) => (R.propEq(sKey, value, mConfig))),
	flipPick: R.flip(R.pick),
	isConfig: R.curry((value, sKey, mConfig) => R.equals(value, R.prop(sKey, mConfig))),
};
SCB.isConfigTrue = SCB.isConfig(true);

module.exports = SCB;
