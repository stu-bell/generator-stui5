var R = require('ramda');

/**
 * Pseudo class: bundle of static helper methods.
 * @class scb-helper
 */
var SCB = {
	/**
	 * convert separtors to spaces
	 * Separators defined by the replace pattern, include / - and .
	 * @param {string}
	 * @memberof scb-helper
	 */
	spacefy: R.replace(/\/|\-|\./g, ' '),
	/**
	 * convert separtors to dots
	 * Separators defined by the replace pattern, include / and -
	 * @param {string}
	 * @memberof scb-helper
	 */
	dotify: R.replace(/\/|\-/g, '.'),
	/**
	 * convert dots or dashes to slashes for file paths
	 * @param {string}
	 * @memberof scb-helper
	 */
	pathify: R.replace(/\.|\-/g, '/'),
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
};

module.exports = SCB;
