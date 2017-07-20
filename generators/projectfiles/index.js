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
  }

	// ********************************************************* //
	// run loop: http://yeoman.io/authoring/running-context.html
	// ******************************************************* //

	writing() {
    // copy project files
		this.copy('.', 'README.md');
    
    // TODO: check config
		this.copy('.', '.eslintrc');
	}


};
