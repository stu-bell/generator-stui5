var Generator = require('../generator-stui5.base'),
S = require('../scb-helper'),
R = require('ramda');

module.exports = class extends Generator {

	// ********************************************************* //
	// run loop: http://yeoman.io/authoring/running-context.html
	// ******************************************************* //

	writing() {
		var
		aPropNames = ['bootstrap', 'appTitle', 'appNamespace', 'superControllerPath', 'rootViewName', 'baseControllerBody', 'firstViewName'],
		mConfig = R.pick(aPropNames, this.config.getAll()),
		sRootPath = this.config.get('webappRoot'),
		template = this.tmpl(mConfig);

		// copy core webapp files
		template(sRootPath, 'index.html');
		template(sRootPath, 'Component.js');
		template(sRootPath, 'manifest.json');

		// i18n
		template(S.jPath(sRootPath, "i18n"), 'messageBundle.properties');

		// base controller
		if (S.isConfigTrue('baseController')) {
			template(S.jPath(sRootPath, "controller"), 'Base.controller.js');
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
