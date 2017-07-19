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
		// check if a config key has a value
		var isConfigNil = sKey => R.isNil(this.config.get(sKey));
		// check if a prompt is required (not required if the prompt is already in config)
		var isPromptReq = R.pipe(R.prop('name'), isConfigNil);

		var aPrompts = [
			{
				type: 'input',
				name: 'name',
				message: 'What\'s your project name?',
				default: this.appname //default to current folder name
			},
			{
				type: 'input',
				name: 'namespace',
				message: 'What\'s your project namespace?',
				default: 'scb.yeo' // TODO: rename to slug of project? R.slugify?
			},
			{
				type: 'confirm',
				name: 'eslint',
				message: 'Would you like to include .eslintrc?'
			}
		];


		return this.prompt(R.filter(isPromptReq, aPrompts))
		.then((responses) => {
			// TODO: save to config.

			this.log('name: ', this.config.get('name') );
			this.log('namespace: ', responses.namespace);
			this.log('eslint: ', this.config.get('eslint'));
		});


	}

};
