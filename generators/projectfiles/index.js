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
    this.configEq = R.curry((mConfig, value, sKey) => (R.propEq(sKey, value, mConfig)));
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
    var isTrue = this.configEq(this.config.getAll(), true);

    // copy project files
    // eslint
    if(isTrue('eslint')){
      this.copy('.', '.eslintrc');
    }

    // TODO: gitignore
    // TODO: gruntfile
	}


};
