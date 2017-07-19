var Generator = require('yeoman-generator');

module.exports = class extends Generator {
		initializing(){
			// set default config
			this.config.defaults({
				eslint: true
			});
			this.log('Full config available in .yo-rc.json')
		}

};
