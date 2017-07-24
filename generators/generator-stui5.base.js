var Generator = require('yeoman-generator'),
S = require('./scb-helper'),
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
				this.destinationPath(S.jPath(sDestPath, sName))
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
				this.destinationPath(S.jPath(sDestPath, sName)),
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
	};
}
