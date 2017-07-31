var Generator = require('../generator-stui5.base'),
S = require('../scb-helper'),
R = require('ramda');

module.exports = class extends Generator {

	// ********************************************************* //
	// run loop: http://yeoman.io/authoring/running-context.html
	// ******************************************************* //

	writing() {
		var
		aPropNames = ['bootstrap', 'appTitle', 'appNamespace', 'superControllerPath', 'firstViewName'],
		mProps = S.flipPick(this.config.getAll(), aPropNames),
		sRootPath = this.config.get('webappRoot'),
		sManifestPath = this.destinationPath(S.jPath(sRootPath, 'manifest.json')),

		// add routes and targets to manifest.json
		// TODO: ramda this
		oManifest = this.fs.readJSON(sManifestPath);
		oManifest['sap.ui5'].routing.routes.push({
          pattern: "",
          name: "Initial",
          target: [
            "Initial"
          ]
        });
		oManifest['sap.ui5'].routing.targets['Initial'] = {
          viewName: this.config.get('firstViewName'),
          viewLevel: 1
        };
		this.fs.writeJSON(sManifestPath, oManifest);

		// copy Rootview
		this.tmpl(mProps, S.jPath(sRootPath, 'view'), 'Root.view.xml')

		// first view and controller via stui5:view
		this.composeWith('stui5:view', {
			arguments: [this.config.get('firstViewName')]
		});

	}


};
