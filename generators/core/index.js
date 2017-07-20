var Generator = require('../generator-stui5.base'),
R = require('ramda');

module.exports = class extends Generator {

	// ********************************************************* //
	// run loop: http://yeoman.io/authoring/running-context.html
	// ******************************************************* //

	writing() {
		var pickConfig = this.flipPick(this.config.getAll()),
		aPropNames = ['appTitle', 'appNamespace', 'superControllerPath'],
		propsTmpl = this.tmpl(pickConfig(aPropNames)),
		sRootPath = this.config.get('webappRoot'),
		webappTmpl = propsTmpl(sRootPath);

    // copy core webapp files
		webappTmpl('index.html');
		webappTmpl('manifest.json');
		webappTmpl('Component.js');

		// base controller
		if (this.isTrue(this.config.get('baseController'))) {
			propsTmpl(this.jPath(sRootPath, "controller"), 'Base.controller.js');
		}

	}


};
