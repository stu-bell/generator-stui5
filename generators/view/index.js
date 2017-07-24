var Generator = require('../generator-stui5.base'),
S = require('../scb-helper'),
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

  }

	// ********************************************************* //
	// run loop: http://yeoman.io/authoring/running-context.html
	// ******************************************************* //

	prompting(){
		// TODO: prompt for any missing options not passed through options - although not actually needed becuase it'll complain if you don't supply required arguments
	}

	writing() {

		var
    sViewPath = S.jPath(this.options.webappRoot, 'view', S.jName(this.options.viewName, 'view.xml')),
    sControllerPath = S.jPath(this.options.webappRoot, 'controller', S.jName(this.options.controllerName, 'controller.js')),
    pickConfig = S.flipPick(this.config.getAll()),
    pickOptions = S.flipPick(this.options),
		mProps = R.mergeAll([pickConfig(['appNamespace', 'superControllerPath']), pickOptions(["controllerName", "viewName"])]);

    // XML view
    this.tmplFT(mProps, 'template.view.xml', sViewPath);

		// JS controller
		this.tmplFT(mProps, 'template.controller.js', sControllerPath);
	}


};
