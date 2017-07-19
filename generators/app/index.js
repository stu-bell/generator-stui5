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
				message: 'What\'s your project namespace?',
				// default: slugify(this.appname) // TODO: slugify
			}
		],
		aPromptAlways = [
			{
				type: 'confirm',
				name: 'view-yo-rc',
				message: 'Would you like to change the full config before continuing?',
				default: 'n',
				warning: 'When you\'re happy with your config, re-run the generator'
			}
		],
		// prompt with only those required and those which should always be prompted
		aPrompts = R.concat(R.filter(isPromptReq, aPromptIfUnknown), aPromptAlways);

		// return promises for the promptss
		return this.prompt(aPrompts)
		.then((responses) => {
			// save to config.
			this.config.set(responses);

			// TODO: finish early if they want to edit the config
			// if (responses.view-yo-rc === true) { // finish early }
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
		// TODO: check config for any overwritten properties that are to be merged into the template? - you'll need to parse and re-write the JSON somehow

		// view
		this.composeWith('stui5:view', {});

		// eslintrc
		// TODO: check config for any overwritten properties that are to be merged into the template.

	}

};
