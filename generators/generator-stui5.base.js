var Generator = require('yeoman-generator'),
R = require('ramda');

module.exports = class extends Generator {

  constructor(args, opts) {
    // call super constructor
    super(args, opts);

	// ********************************************************* //
  // helper methods
	// ******************************************************* //
  // TODO: jsdoc all of these!
		this.jPath = R.unapply(R.join('/'));
  	this.jName = R.unapply(R.join('.'));
		this.copy = (sDestPath, sName) => {
			this.fs.copy(
				this.templatePath(sName),
				this.destinationPath(this.jPath(sDestPath, sName))
			);
		};
		this.tmpl = R.curry((mProps, sDestPath, sName) => {
			this.fs.copyTpl(
				this.templatePath(sName),
				this.destinationPath(this.jPath(sDestPath, sName)),
				mProps
			);
		});

		this.flipPick = R.flip(R.pick);

		this.tmplFT = R.curry((mProps, sFrom, sTo) => {
			this.fs.copyTpl(
				this.templatePath(sFrom),
				this.destinationPath(sTo),
				mProps
			);
		});
    this.configEq = R.curry((mConfig, value, sKey) => (R.propEq(sKey, value, mConfig)));
    this.isTrue = R.equals(true);
	};
}
