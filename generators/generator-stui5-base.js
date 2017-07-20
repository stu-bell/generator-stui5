var Generator = require('yeoman-generator');

module.exports = class extends Generator {

  constructor(args, opts) {
    // call super constructor
    super(args, opts);

    // helper
    this.hello = () => this.log('hello! :)');
	};
}
