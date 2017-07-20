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
		this.flipPick = R.flip(R.pick);
		this.copy = (sDestPath, sName) => {
			this.fs.copy(
				this.templatePath(sName),
				this.destinationPath(this.jPath(sDestPath, sName))
			);
		};
		this.tmplFT = R.curry((mProps, sFrom, sTo) => {
			this.fs.copyTpl(
				this.templatePath(sFrom),
				this.destinationPath(sTo),
				mProps
			);
		});
  }

	// ********************************************************* //
	// run loop: http://yeoman.io/authoring/running-context.html
	// ******************************************************* //

	prompting(){
		// TODO: prompt for any missing options not passed through options - although not actually needed becuase it'll complain if you don't supply required arguments
	}

	writing() {

		var
    sViewPath = this.jPath(this.options.webappRoot, 'view', this.jName(this.options.viewName, 'view.xml')),
    sControllerPath = this.jPath(this.options.webappRoot, 'controller', this.jName(this.options.controllerName, 'controller.js')),
    pickConfig = this.flipPick(this.config.getAll()),
    pickOptions = this.flipPick(this.options),
		mProps = R.mergeAll([pickConfig(['appNamespace']), pickOptions(["controllerName"]), {baseController: "sap/ui/core/mvc/Controller"}]);

    // XML view
    this.tmplFT(mProps, 'template.view.xml', sViewPath);

		// JS controller
		this.tmplFT(mProps, 'template.controller.js', sControllerPath);
	}


};
