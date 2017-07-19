var Generator = require('yeoman-generator'),
R = require('ramda');

module.exports = class extends Generator {
	initializing(){
		// set default config
		this.config.defaults({
			eslint: true,
			rootViewName: "app.view.xml"
		});
		this.log('Full config available in .yo-rc.json')
	}
};
