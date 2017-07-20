var Generator = require('yeoman-generator'),
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


		// helper methods
		this.jPath = R.unapply(R.join('/'));
  	this.jName = R.unapply(R.join('.'));
		this.tmpl = R.curry((mProps, sDestPath, sName) => {
			this.fs.copyTpl(
				this.templatePath(sName),
				this.destinationPath(this.jPath(sDestPath, sName)),
				mProps
			);
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

	writing() {
		var mProps = R.pick(['appTitle', 'appNamespace'], this.config.getAll()),
		jRoot = R.partial(this.jPath, [this.config.get('webappRoot')]),
		sRootPath = this.config.get('webappRoot'),
		sIndexName = 'index.html',
		sComponentName = 'Component.js',
		sManifestName = 'manifest.json';

		// index.html
		this.tmpl(mProps, sRootPath, sIndexName);

		// manifest.json

		// Component.js

		// view and controller
		this.composeWith('stui5:view', {
			arguments: [this.config.get('rootViewName')]
		});

		// eslintrc

	}

	end(){
		// TODO: git init and .gitignore
	}

};
