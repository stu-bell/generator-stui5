var Generator = require('../generator-stui5.base'),
R = require('ramda');

module.exports = class extends Generator {

	// ********************************************************* //
	// run loop: http://yeoman.io/authoring/running-context.html
	// ******************************************************* //

	writing() {
		var pickConfig = this.flipPick(this.config.getAll()),
		aPropNames = ['bootstrap', 'appTitle', 'appNamespace', 'superControllerPath', 'rootViewName'],
		propsTmpl = this.tmpl(pickConfig(aPropNames)),
		sRootPath = this.config.get('webappRoot'),
		webappTmpl = propsTmpl(sRootPath);

		// copy core webapp files
		webappTmpl('index.html');
		webappTmpl('Component.js');

		// i18n
		propsTmpl(this.jPath(sRootPath, "i18n"), 'messageBundle.properties');

		// base controller
		if (this.isConfigTrue('baseController')) {
			this.log('baseController true')
			propsTmpl(this.jPath(sRootPath, "controller"), 'Base.controller.js');
		}

		// formatter
		if (this.isConfigTrue('formatter')) {
			this.copy(this.jPath(sRootPath, 'util'), 'formatter.js');
		}

		// mock server
		if (this.isConfigTrue('mockServer')) {
			this.copy(this.jPath(sRootPath, 'util'), 'MockServer.js');
		}


	}


};
