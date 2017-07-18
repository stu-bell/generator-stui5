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
				type: 'confirm',
				name: 'lint',
				message: 'Would you like to include .eslintrc?'
			}
		]).then((responses) => {
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
			{ title: 'Generated with Yeoman :)'}
		);
		this.log('Copied ', sFilePath);
	}

};
