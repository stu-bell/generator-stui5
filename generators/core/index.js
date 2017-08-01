var Generator = require('../generator-stui5.base'),
S = require('../scb-helper'),
R = require('ramda');

module.exports = class extends Generator {

	// ********************************************************* //
	// run loop: http://yeoman.io/authoring/running-context.html
	// ******************************************************* //

	writing() {
		var
		mConfig = this.cfg('bootstrap', 'appTitle', 'appNamespace', 'superControllerPath', 'rootViewName', 'baseControllerBody', 'firstViewName'),
		sRootPath = this.cfg('webappRoot'),
		template = this.tmpl(mConfig);

		// copy core webapp files
		template(sRootPath, 'index.html');
		template(sRootPath, 'Component.js');
		template(sRootPath, 'manifest.json');

		// i18n
		template(S.jPath(sRootPath, "i18n"), 'messageBundle.properties');

		// base controller
		if (this.isConfigTrue('baseController')) {
			template(S.jPath(sRootPath, "controller"), 'Base.controller.js');
		}

		// formatter
		if (this.isConfigTrue('formatter')) {
			this.copy(S.jPath(sRootPath, 'util'), 'formatter.js');
		}

		// mock server
		if (this.isConfigTrue('mockServer')) {
			this.copy(S.jPath(sRootPath, 'util'), 'MockServer.js');
		}


	}


};
