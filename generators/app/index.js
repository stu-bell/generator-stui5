var Generator = require('yeoman-generator'),
R = require('ramda');

module.exports = class extends Generator {

	// ********************************************************* //
	// run loop: http://yeoman.io/authoring/running-context.html
	// ******************************************************* //

	initializing(){
		// generate default config
		this.composeWith('stui5:config', {});
		this.log("1+1 is: ", R.add(1)(1))
	}

	prompting() {
		// TODO: build array of prompts for mandatory parmaters not present on the config
		// TODO: prompt: would you like to edit the config file before proceding? default No. If yes, edit rc then rerun generator.

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
				name: 'lint',
				message: 'Would you like to include .eslintrc?'
			}
		];

		// prompt returned as a promise
		return this.prompt(aPrompts).then((responses) => {
			// TODO: save to config.

			// save for runtime
			this.mUser = {
				name: responses.name,
				namespace: responses.namespace
			};
			// persist config
			this.config.set(this.mUser);

			// logs
			this.log('Include .eslintrc:', responses.lint);
		});
	}

	method1() {
		this.log('method1 just ran :D');
	}

	writing() {
		// index.html
		var sFilePath = 'index.html';
		this.fs.copyTpl(
			this.templatePath(sFilePath),
			this.destinationPath(sFilePath),
			{ title: this.mUser.name,
				namespace: this.mUser.namespace
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
