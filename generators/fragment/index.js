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
    this.argument('fragmentName', {
      description: 'Name of the fragment. Prepended to .fragment.xml',
      required: true
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
    sFragmentPath = S.jPath(this.options.webappRoot, 'fragment', S.jName(this.options.fragmentName, 'fragment.xml'));

    this.copyFT('Template.fragment.xml', sFragmentPath);
  }


};
