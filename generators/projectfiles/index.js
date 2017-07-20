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
  }

	// ********************************************************* //
	// run loop: http://yeoman.io/authoring/running-context.html
	// ******************************************************* //

	writing() {
    var isTrue = this.configEq(this.config.getAll(), true),
    rootCopy = sName => {
      this.fs.copy(
        this.templatePath(sName),
        this.destinationPath(sName)
      )
    };


    // copy project files
    // eslint
    if(isTrue('eslint')){
      rootCopy('.eslintrc');
    }

    // gitignore
    if (isTrue('gitInit')) {
      rootCopy('.gitignore');
    }

    // TODO: gruntfile
	}


};
