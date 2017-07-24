var R = require('ramda');

/**
 * Pseudo class: bundle of static helper methods.
 * @class scb-helper
 */
var SCB = {
	/**
	 * convert dots to slashes for file paths
	 * @memberof scb-helper
	 */
	pathify: R.replace(/\./g, '/'),
	/**
	 * concatenate arguments, separated by slash. Used for joining paths
	 * @param {string}
	 * @memberof scb-helper
	 */
	jPath: R.unapply(R.join('/')),
	/**
	 * concatenate arguments, separated by dot. Used for joining filenames
	 * @param {string}
	 * @memberof scb-helper
	 */
	jName: R.unapply(R.join('.')),
	/**
	* flip of R.pick so that the data comes first
	* @memberof scb-helper
	*/
	flipPick: R.flip(R.pick),
	/**
	 * check if value of a config key is equal to a query value
	 * @see isConfig
	 * @memberof scb-helper
	 */
	configEq: R.curry((mConfig, value, sKey) => (R.propEq(sKey, value, mConfig))),
	/**
	 * assess whether a config parameter is equal to a query value
	 * @see isConfigTrue
	 * @memberof scb-helper
	 */
	isConfig: R.curry((value, sKey, mConfig) => R.equals(value, R.prop(sKey, mConfig))),
};
/**
 * Check if a config parameters is true
 * @param {sting} sKey key of the config pair to check
 * @param {map} mConfig map of config pairs
 * @see isConfig
 * @memberof scb-helper
 */
SCB.isConfigTrue = SCB.isConfig(true);

module.exports = SCB;
