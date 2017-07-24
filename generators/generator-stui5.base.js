var Generator = require('yeoman-generator'),
R = require('ramda');

module.exports = class extends Generator {

  constructor(args, opts) {
    // call super constructor
    super(args, opts);

	// ********************************************************* //
  // helper methods
	// ******************************************************* //
		this.copy = (sDestPath, sName) => {
			this.fs.copy(
				this.templatePath(sName),
				this.destinationPath(this.jPath(sDestPath, sName))
			);
		};
    this.copyFT = (sFrom, sTo) => {
      this.fs.copy(
        this.templatePath(sFrom),
        this.destinationPath(sTo)
      );
    };

		this.tmpl = R.curry((mProps, sDestPath, sName) => {
			this.fs.copyTpl(
				this.templatePath(sName),
				this.destinationPath(this.jPath(sDestPath, sName)),
				mProps
			);
		});

		this.tmplFT = R.curry((mProps, sFrom, sTo) => {
			this.fs.copyTpl(
				this.templatePath(sFrom),
				this.destinationPath(sTo),
				mProps
			);
		});


    // TODO: migrate these to helper class
    this.pathify = R.replace(/\./g, '/');
    this.jPath = R.unapply(R.join('/'));
    this.jName = R.unapply(R.join('.'));
    this.configEq = R.curry((mConfig, value, sKey) => (R.propEq(sKey, value, mConfig)));
    this.flipPick = R.flip(R.pick);
    this.isConfig = R.curry((value, sKey) => R.equals(value, this.config.get(sKey)));
    this.isConfigTrue = this.isConfig(true);

	};
}
