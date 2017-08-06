var Generator = require('../generator-stui5.base'),
S = require('../scb-helper'),
R = require('ramda');

module.exports = class extends Generator {

  constructor(args, opts) {
    // call super constructor
    super(args, opts);

    // register additional arguments
    this.argument('appNamespace', {
      desc: 'What\'s your project namespace?' ,
      required: false
    });
    this.argument('appTitle', {
      desc: 'What\'s your app title?',
      required: false
    });
    this.argument('appType', {
      desc: 'master-detail or single-page',
      required: false
    });

  }

  // ********************************************************* //
  // run loop: http://yeoman.io/authoring/running-context.html
  // ******************************************************* //

  initializing(){

    // generate default config
    this.composeWith('stui5:config', {});

    // save arguments and options passed
    this.config.set(R.pick(['appNamespace', 'appTitle', 'appType'], this.options));
  }

  prompting() {

    // check if a config key has a value
    var isConfigNil = sKey => R.isNil(this.cfg(sKey));
    // check if a prompt is required (not required if the prompt is already in config)
    var isPromptReq = R.pipe(R.prop('name'), isConfigNil);

    var aPromptIfUnknown = [
      {
        type: 'input',
        name: 'appNamespace',
        default: S.dotify(this.appname),
        message: 'What\'s your project namespace?'
      },
      {
        type: 'input',
        name: 'appTitle',
        message: 'What\'s your app title?',
        default: S.spacefy(this.appname) //default to current folder name
      },
      {
        type: 'list',
        name: 'appType',
        choices: [
          {name: 'master-detail', value: 'master-detail'},
          {name: 'single-page', value: 'single-page'}
        ],
        message: 'What template type do you want to use?',
        default: 'single-page'
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
    if (this.isConfigTrue('baseController')) {
      // super controller path is the base
      this.config.set('superControllerPath', S.jPath(S.pathify(this.cfg('appNamespace')), 'controller/Base.controller'));
    } else {
      // super controller path is sap controller
      this.config.set('superControllerPath', "sap/ui/core/mvc/Controller");
    }
  }

  writing() {

    // README
    this.tmpl({appTitle: this.cfg('appTitle')}, '.', 'README.md');

    // project root templates
    this.composeWith('stui5:projectfiles');

    // webapp root templates
    this.composeWith('stui5:core');

    // floor plan
    if (this.cfg('appType') === 'master-detail') {
      this.composeWith('stui5:masterDetail');
    } else {
      // TODO: cater for other appTypes?
      this.composeWith('stui5:singlePage');
    }

    // tests
    if(this.cfg('qunit') === true) {
      this.composeWith('stui5:tests');
    }

  }

  end(){
    // git init
    if(this.isConfigTrue('gitInit')){
      this.composeWith(require.resolve('generator-git-init/generators/app'), {
        commit: 'Initial commit by yeoman stui5'
      });
      this.log('Git repository initialised');
    }

    this.log('ACTION REQUIRED: Update README.md');
  }

};
