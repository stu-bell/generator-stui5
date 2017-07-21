var Generator = require('../generator-stui5.base'),
R = require('ramda');

module.exports = class extends Generator {

	// ********************************************************* //
	// run loop: http://yeoman.io/authoring/running-context.html
	// ******************************************************* //

	writing() {
		var
		aPropNames = ['bootstrap', 'appTitle', 'appNamespace', 'superControllerPath', 'firstViewName'],
		mProps = this.flipPick(this.config.getAll(), aPropNames),
		aViews = ['Master', 'Detail', 'Blank', 'NotFound'],
		sRootPath = this.config.get('webappRoot');

		// copy core webapp files
		this.tmpl(mProps, sRootPath, 'manifest.json');

		// copy Rootview
		this.tmpl(mProps, this.jPath(sRootPath, 'view'), 'Root.view.xml')

		// views and controllers
		R.map(sViewName => {
			this.composeWith('stui5:view', {
				arguments: [sViewName]
			});
		}, aViews);

	}

};
