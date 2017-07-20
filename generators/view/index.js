var Generator = require('yeoman-generator'),
R = require('ramda');

module.exports = class extends Generator {


	// ********************************************************* //
	// constructor
	// ******************************************************* //


  constructor(args, opts) {
    // call super constructor
    super(args, opts);

		// register additional arguments
		this.argument('viewName', {
			description: 'Name of the view. Prepended to .view.xml',
			required: true
		});
		this.argument('controllerName', {
			description: 'Name of the controller. Prepended to .controller.js. Defaults to viewName',
			required: false,
			default: this.options.viewName
		});
    this.argument('webappRoot', {
      description: 'Path to the root folder of webapp',
      default: this.config.get('webappRoot')
    });


		// helper methods
		this.jPath = R.unapply(R.join('/'));
  	this.jName = R.unapply(R.join('.'));
  }

	// ********************************************************* //
	// run loop: http://yeoman.io/authoring/running-context.html
	// ******************************************************* //

	prompting(){
		// TODO: prompt for any missing options not passed through options - although not actually needed becuase it'll complain if you don't supply required arguments
	}

	writing() {
    // XML view
		var
      sPath = this.jPath(this.options.webappRoot, 'view'),
      sName = this.jName(this.options.viewName, 'view.xml'),
      sFullPath = this.jPath(sPath, sName);
		this.fs.copyTpl(
			this.templatePath('template.view.xml'),
			this.destinationPath(sFullPath),
			{ controllerName: this.options.controllerName + '.controller' }
		);
		this.log('Copied ', sFullPath);

		// TODO: JS controller
	}


};
