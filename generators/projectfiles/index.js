var Generator = require('../generator-stui5.base'),
S = require('../scb-helper'),
R = require('ramda');

module.exports = class extends Generator {

	// ********************************************************* //
	// run loop: http://yeoman.io/authoring/running-context.html
	// ******************************************************* //

	writing() {
    var rootCopy = sName => {
      this.fs.copy(
        this.templatePath(sName),
        this.destinationPath(sName)
      )
    };

    // copy project files

		// package.json
		if (S.isConfigTrue('packageJson')) {
			rootCopy('package.json')
		}

    // eslint
    if(S.isConfigTrue('eslint')){
      rootCopy('.eslintrc');
    }

    // gitignore
    if (S.isConfigTrue('gitInit')) {
      rootCopy('.gitignore');
    }

    // ci
    if (S.isConfigTrue('ci')) {
      rootCopy('.gitlab-ci.yml');
    }

    // gruntfile
    if (S.isConfigTrue('gruntfile')) {
      rootCopy('Gruntfile.js');
    }

	}


};
