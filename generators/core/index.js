var Generator = require('../generator-stui5.base'),
S = require('../scb-helper'),
R = require('ramda');

module.exports = class extends Generator {

	// ********************************************************* //
	// run loop: http://yeoman.io/authoring/running-context.html
	// ******************************************************* //

	writing() {
		var pickConfig = S.flipPick(this.config.getAll()),
		aPropNames = ['bootstrap', 'appTitle', 'appNamespace', 'superControllerPath', 'rootViewName'],
		propsTmpl = this.tmpl(pickConfig(aPropNames)),
		sRootPath = this.config.get('webappRoot'),
		webappTmpl = propsTmpl(sRootPath);

		// copy core webapp files
		webappTmpl('index.html');
		webappTmpl('Component.js');

		// i18n
		propsTmpl(S.jPath(sRootPath, "i18n"), 'messageBundle.properties');

		// base controller
		if (S.isConfigTrue('baseController')) {
			this.log('baseController true')
			propsTmpl(S.jPath(sRootPath, "controller"), 'Base.controller.js');
		}

		// formatter
		if (S.isConfigTrue('formatter')) {
			this.copy(S.jPath(sRootPath, 'util'), 'formatter.js');
		}

		// mock server
		if (S.isConfigTrue('mockServer')) {
			this.copy(S.jPath(sRootPath, 'util'), 'MockServer.js');
		}


	}


};
