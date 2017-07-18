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
				default: 'scb.yeo' // TODO: rename to slug of project?
			}
			{
				type: 'confirm',
				name: 'lint',
				message: 'Would you like to include .eslintrc?'
			}
		]).then((responses) => {
			this.mUser = {
				name: responses.name
			}
			this.log('Name:', responses.name);
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
			{ title: this.mUser.name }
		);
		this.log('Copied ', sFilePath);
	}

};
