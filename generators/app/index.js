var Generator = require('yeoman-generator'),
R = require('ramda');

module.exports = class extends Generator {

	// ********************************************************* //
	// run loop: http://yeoman.io/authoring/running-context.html
	// ******************************************************* //

	initializing(){
		// generate default config
		this.composeWith('stui5:config', {});
	}

	prompting() {

		// check if a config key has a value
		var isConfigNil = sKey => R.isNil(this.config.get(sKey));
		// check if a prompt is required (not required if the prompt is already in config)
		var isPromptReq = R.pipe(R.prop('name'), isConfigNil);

		var aPromptIfUnknown = [
			{
				type: 'input',
				name: 'name',
				message: 'What\'s your project name?',
				default: this.appname //default to current folder name
			},
			{
				type: 'input',
				name: 'namespace',
				// default: slugify(this.appname), // TODO: slugify https://www.npmjs.com/package/underscore.string
				message: 'What\'s your project namespace?'
			}
		],
		aPromptAlways = [
			{
				type: 'confirm',
				name: 'proceedWithConfig',
				message: 'Are you happy to proceed with the exsitng yo-rc config?',
			}
		],
		// prompt with only those required and those which should always be prompted
		aPrompts = R.concat(R.filter(isPromptReq, aPromptIfUnknown), aPromptAlways);

		// return promises for the prompts
		return this.prompt(aPrompts).then((responses) => {

			// start by saving all responses to config.
			this.config.set(responses);

			// delete responses not needed for config
			this.config.delete('proceedWithConfig');

			// finish early if they want to edit the config
			if (responses.proceedWithConfig === false) {
				this.log('Modify your .yo-rc.json config file then re-run the generator');
				// TODO finish early - Do we really need this option at all?/
			}
		});
	}

	writing() {
		// index.html
		var sFilePath = 'index.html';
		this.fs.copyTpl(
			this.templatePath(sFilePath),
			this.destinationPath(sFilePath),
			{ title: this.config.get('name'),
				namespace: this.config.get('namespace'),
			}
		);
		this.log('Copied ', sFilePath);

		// manifest.json

		// Component.js

		// view and controller
		this.composeWith('stui5:view', {
			viewName: this.config.get('rootViewName');
		});

		// eslintrc

	}

	end(){
		// TODO: git init and .gitignore
	}

};
