var Generator = require('../generator-stui5.base'),
R = require('ramda');

module.exports = class extends Generator {
	// ********************************************************* //
	// run loop: http://yeoman.io/authoring/running-context.html
	// ******************************************************* //

	initializing(){
		// set default config
		this.config.defaults({
			rootViewName: "App",
			webappRoot: "webapp",
			baseController: true,
			gitInit: true,
			eslint: true
		});
		this.log('Full config available in .yo-rc.json')
		// TODO: baseController
		// TODO: figure out how to modify files with properties from supplied config. Eg properties on the yo-rc for adding your own manifest properties/eslint properties/.gitignore paths. Add these empty properties to the default config. Until then, people can fork the repo and make their own template files
	}
};
