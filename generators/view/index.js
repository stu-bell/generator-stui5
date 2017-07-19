var Generator = require('yeoman-generator');

module.exports = class extends Generator {

	prompting(){
		// TODO: prompt for any missing options not passed through options
		// default controller name to that of view name?
		// TODO get options passed for generating viewname and controller name later
	}

	writing() {
		// XML view
		var sFilePath = 'view/',
			sFileName = 'viewName',
			sFileExtension = '.view.xml',
			sFullName = sFilePath + sFileName + sFileExtension;
		this.fs.copyTpl(
			this.templatePath('template.view.xml'),
			this.destinationPath(sFullName),
			{ controllerName: 'viewName' + '.controller' }
		);
		this.log('Copied ', sFullName);

		// TODO: JS controller
	}
};
