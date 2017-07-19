var Generator = require('yeoman-generator');

module.exports = class extends Generator {

  constructor(args, opts) {
    // call super constructor
    super(args, opts);

		// register additional arguments
		this.argument('viewName', {
			description: 'Name of the view. Prepended to .view.xml', required: false
		});
		this.argument('controllerName', {
			description: 'Name of the controller. Prepended to .controller.js. Defaults to viewName',
			required: false,
			default: this.options.viewName
		});
  }

	prompting(){
		// TODO: prompt for any missing options not passed through options
	}

	writing() {
		// XML view
		var sFilePath = 'view/',
			sFileName = this.options.viewName,
			sFileExtension = '.view.xml',
			sFullName = sFilePath + sFileName + sFileExtension;
		this.fs.copyTpl(
			this.templatePath('template.view.xml'),
			this.destinationPath(sFullName),
			{ controllerName: this.options.controllerName + '.controller' }
		);
		this.log('Copied ', sFullName);

		// TODO: JS controller
	}
};
