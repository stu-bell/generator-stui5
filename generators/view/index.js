var Generator = require('yeoman-generator');

module.exports = class extends Generator {

	prompting(){
		// TODO: prompt for any missing options
	}

	writing() {
		var sFilePath = 'view/',
			sFileName = 'template',
			sFileExtension = '.view.xml',
			sFullName = sFilePath + sFileName + sFileExtension;
		this.fs.copyTpl(
			this.templatePath('template.view.xml'),
			this.destinationPath(sFullName),
			{ controllerName: 'scb.yeo.controller' }
		);
		this.log('Copied ', sFullName);
	}
};
