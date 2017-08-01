var Generator = require('../generator-stui5.base'),
R = require('ramda');

module.exports = class extends Generator {
	// ********************************************************* //
	// run loop: http://yeoman.io/authoring/running-context.html
	// ******************************************************* //

	initializing(){
		// set default config
		this.config.defaults({
			bootstrap: '../../resources/sap-ui-core.js',
			firstViewName: "Initial",
			webappRoot: "webapp",
			appType: "masterDetail",
			baseController: true,
			baseControllerBody: true,
			formatter: true,
			mockServer: true,
			gruntfile: true,
			qunit: true,
			packageJson: true,
			ci: true,
			gitInit: true,
			eslint: true
		});
		this.log('To edit full config, run `yo stui5:config` and edit .yo-rc.json ')
		// TODO: figure out how to modify files with properties from supplied config. Eg properties on the yo-rc for adding your own manifest properties/eslint properties/.gitignore paths. Add these empty properties to the default config. Until then, people can fork the repo and make their own template files
	}
};
