var Generator = require('../generator-stui5.base'),
R = require('ramda');

module.exports = class extends Generator {

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
