var Generator = require('../generator-stui5.base'),
    S = require('../scb-helper');

module.exports = class extends Generator {

  // ******************************************************* //
  // constructor
  // ******************************************************* //

  constructor(args, opts) {
    // call super constructor
    super(args, opts);    
  }

  // ********************************************************* //
  // run loop: http://yeoman.io/authoring/running-context.html
  // ******************************************************* //

  prompting(){
    // 
  }

  writing() {
    
    var pickConfig = S.flipPick(this.config.getAll()),
		    aPropNames = ['bootstrap', 'appTitle', 'appNamespace',
                      'superControllerPath', 'rootViewName'],
		    propsTmpl = this.tmpl(pickConfig(aPropNames)),
        sRootPath = this.config.get('webappRoot'),
        sFormatterNamespace = S.jPath(this.config.get('appNamespace'),
                                      'util/formatter'),
        oConfig = this.config.getAll();

		propsTmpl(S.jPath(sRootPath, 'test/unit'), 'unitTests.qunit.html');
		propsTmpl(S.jPath(sRootPath, 'test/unit'), 'allTests.js');
    sFormatterNamespace = S.pathify(sFormatterNamespace);
    this.tmpl(Object.assign(oConfig, {formatterNamespace: sFormatterNamespace}),
              S.jPath(sRootPath, 'test/unit/util'),
              'formatter.js');
  }


};
