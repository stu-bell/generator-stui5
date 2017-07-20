var Generator = require('yeoman-generator'),
R = require('ramda');

module.exports = class extends Generator {


	// ********************************************************* //
	// constructor
	// ******************************************************* //

  constructor(args, opts) {
    // call super constructor
    super(args, opts);

		// helper methods
		this.jPath = R.unapply(R.join('/'));
  	this.jName = R.unapply(R.join('.'));
		this.pickConfig = R.flip(R.pick);
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

  }

	// ********************************************************* //
	// run loop: http://yeoman.io/authoring/running-context.html
	// ******************************************************* //

	writing() {
		var pickConfig = this.pickConfig(this.config.getAll()),
		aPropNames = ['appTitle', 'appNamespace'],
		webappTmpl = this.tmpl(pickConfig(aPropNames), this.config.get('webappRoot'));

    // copy core webapp files
		webappTmpl('index.html');
		webappTmpl('manifest.json');
		webappTmpl('Component.js');


	}


};
