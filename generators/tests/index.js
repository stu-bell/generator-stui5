var Generator = require('../generator-stui5.base'),
R = require('ramda'),
S = require('../scb-helper');

module.exports = class extends Generator {

  // ********************************************************* //
  // run loop: http://yeoman.io/authoring/running-context.html
  // ******************************************************* //
  initializing(){

    // generate default config
    this.composeWith('stui5:config', {});

    // save arguments and options passed
    // this.config.set(R.pick(['webappRoot'], this.options));
  }

  writing() {

    var mProps = this.cfg('bootstrap', 'appTitle', 'appNamespace', 'superControllerPath', 'rootViewName'),
    sFormatterNamespace = S.pathify(S.jPath(this.config.get('appNamespace'), 'util/formatter')),
    mProps2 = R.assoc('formatterNamespace', sFormatterNamespace, mProps),
    template = this.tmpl(mProps2),
    sUnitPath = S.jPath(this.cfg('webappRoot'), 'test/unit');

    template(sUnitPath, 'unitTests.qunit.html');
    template(sUnitPath, 'allTests.js');
    template(S.jPath(sUnitPath, 'util'), 'formatter.js');
  }
};
