var Generator = require('yeoman-generator'),
S = require('./scb-helper'),
R = require('ramda');

/**
* Adds helper methods to yeoman generator class
* @class stui5-generator-base
*/
module.exports = class extends Generator {

  constructor(args, opts) {
    // call super constructor
    super(args, opts);

    // ********************************************************* //
    // helper methods
    // ******************************************************* //

    var lenEq = i => R.pipe(R.length, R.equals(i));

    /**
     * wrapper on this.config.get and this.config.getAll
     * @param zero paramters => this.config.getAll()
     * @param one paramerter => this.config.get(param)
     * @param multiple parameters => object similar to returned by getAll but with just properties specified
     * @memberof stui5-generator-base
     */
    this.cfg =  R.unapply(R.cond([
      [lenEq(1), sKey => this.config.get(sKey)],
      [lenEq(0), R.always(this.config.getAll())],
      [R.T, R.flip(R.pick)(this.config.getAll())]
    ]))

    /**
    * Wrapper to fs.copy: Copy relative to this.templatePath and this.destinationPath
    * @param    {string} sFrom path to file copy. Path relative to this.templatePath()
    * @param    {string} sTo path to paste file. Path relative to this.destinationPath()
    * @see yeoman-generator: fs.copy
    * @memberof stui5-generator-base
    */
    this.copyFT = R.curry((sFrom, sTo) => {
      this.fs.copy(
        this.templatePath(sFrom),
        this.destinationPath(sTo)
      );
    });

    /**
    * Wrapper to fs.copyTpl: Copy template and fill placeholders.
    * @param {map} mProps Map of placeholder keys and values. Values will replace corresponding template placeholders
    * @param {string} sFrom path to file to copy. Path relative to this.templatePath()
    * @param {string} sTo path to paste file. Path relative to this.destinationPath()
    * @see yeoman-generator: fs.copyTpl
    * @memberof stui5-generator-base
    */
    this.tmplFT = R.curry((mProps, sFrom, sTo) => {
      this.fs.copyTpl(
        this.templatePath(sFrom),
        this.destinationPath(sTo),
        mProps
      );
    });

    /**
    * Wrapper to this.copyFT: assumes file sName is at this.templatePath() and will copied to sDestPath, relative to this.destinationPath, without changing the filename.
    * @param {string} sDestPath Path to paste file (excluding filename) relative to this.destinationPath()
    * @param {string} sName Name of the file at this.templatePath(). Will be used to name the destination file
    * @memberof stui5-generator-base
    * @see this.copyFT
    */
    this.copy = R.curry((sDestPath, sName) => {
      this.copyFT(sName, S.jPath(sDestPath, sName));
    });

    /**
    * Wrapper to this.tmplFT: assumes file sName is at this.templatePath() and will copied to sDestPath, relative to this.destinationPath, without changing the filename.
    * @param {map} mProps map of placholder keys and values. Values will replace corresponding template placeholders
    * @param {string} sDestPath Path to paste file (excluding filename) relative to this.destinationPath()
    * @param {string} sName Name of the file at this.templatePath(). Will be used to name the destination file
    * @memberof stui5-generator-base
    * @see this.tmplFT
    */
    this.tmpl = R.curry((mProps, sDestPath, sName) => {
      this.tmplFT(mProps, sName, S.jPath(sDestPath, sName));
    });

  };
}
