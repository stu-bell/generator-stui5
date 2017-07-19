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

		prompting(){
			// figuring out how to check for existing config keys
			var isConfigNil = sKey => R.isNil(this.config.get(sKey));
			this.log('name param: ', this.config.get('name'));
			this.log('isnil: ', isConfigNil('name'));
		}

};
