var Generator = require('../generator-stui5.base'),
R = require('ramda'),
slugify = require('underscore.string/slugify');

module.exports = class extends Generator {

  constructor(args, opts) {
    // call super constructor
    super(args, opts);

		// register additional arguments
		this.argument('appNamespace', {
			description: 'What\'s your project namespace?' ,
			required: false
		});
		this.argument('appTitle', {
			description: 'What\'s your app title?',
			required: false
		});

  }

	// ********************************************************* //
	// run loop: http://yeoman.io/authoring/running-context.html
	// ******************************************************* //

	initializing(){
		// generate default config
		this.composeWith('stui5:config', {});

		// save arguments passed
		this.config.set(R.pick(['appNamespace', 'appTitle'], this.options));
	}

	prompting() {

		// check if a config key has a value
		var isConfigNil = sKey => R.isNil(this.config.get(sKey));
		// check if a prompt is required (not required if the prompt is already in config)
		var isPromptReq = R.pipe(R.prop('name'), isConfigNil);

		var aPromptIfUnknown = [
			{
				type: 'input',
				name: 'appNamespace',
				default: slugify(this.appname),
				message: 'What\'s your project namespace?'
			},
			{
				type: 'input',
				name: 'appTitle',
				message: 'What\'s your app title?',
				default: this.appname //default to current folder name
			}
		],
		// prompt with only those required and those which should always be prompted
		aPrompts = R.filter(isPromptReq, aPromptIfUnknown);

		// return promises for the prompts
		return this.prompt(aPrompts).then((responses) => {

			// start by saving all responses to config.
			this.config.set(responses);
		});
	}

  configuring() {
    // TODO check config isn't demanding anything nonsensical

    // set base controller path
		if (this.isTrue(this.config.get('baseController'))) {
      // super controller path is the base
      this.config.set('superControllerPath', this.jPath(this.pathify(this.config.get('appNamespace')), 'controller/Base.controller'));
    } else {
      // super controller path is sap controller
      this.config.set('superControllerPath', "sap/ui/core/mvc/Controller");
    }
  }

	writing() {

		// README
		this.tmpl({appTitle: this.config.get('appTitle')}, '.', 'README.md');

		// project root templates
		this.composeWith('stui5:projectfiles');

		// webapp root templates
		this.composeWith('stui5:core');

		// view and controller
		this.composeWith('stui5:view', {
			arguments: [this.config.get('rootViewName')]
		});

	}

	end(){
		// TODO: git init
	}

};
