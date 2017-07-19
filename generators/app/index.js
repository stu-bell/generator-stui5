var Generator = require('yeoman-generator');

module.exports = class extends Generator {

	prompting() {
		// prompts returned as a promise
		return this.prompt([
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
		]).then((responses) => {
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
		var sFilePath = 'index.html';
		this.fs.copyTpl(
			this.templatePath(sFilePath),
			this.destinationPath(sFilePath),
			{ title: this.mUser.name,
				namespace: this.mUser.namespace
			}
		);
		this.log('Copied ', sFilePath);

		// view
		this.composeWith('stui5:view', {});

	}

};
