var Generator = require('../generator-stui5.base'),
R = require('ramda');

module.exports = class extends Generator {

	// ********************************************************* //
	// run loop: http://yeoman.io/authoring/running-context.html
	// ******************************************************* //

	writing() {
		var pickConfig = this.flipPick(this.config.getAll()),
		aPropNames = ['appTitle', 'appNamespace'],
		webappTmpl = this.tmpl(pickConfig(aPropNames), this.config.get('webappRoot'));

    // copy core webapp files
		webappTmpl('index.html');
		webappTmpl('manifest.json');
		webappTmpl('Component.js');


	}


};
