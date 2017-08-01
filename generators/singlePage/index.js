var Generator = require('../generator-stui5.base'),
	S = require('../scb-helper'),
	R = require('ramda');

module.exports = class extends Generator {

	// ********************************************************* //
	// run loop: http://yeoman.io/authoring/running-context.html
	// ******************************************************* //

	writing() {
		var
			mProps = this.cfg('bootstrap', 'appTitle', 'appNamespace', 'superControllerPath', 'firstViewName'),
			sRootPath = this.cfg('webappRoot'),
			sManifestPath = this.destinationPath(S.jPath(sRootPath, 'manifest.json')),

			// add routes and targets to manifest.json
			oManifest = this.fs.readJSON(sManifestPath),
			aRoutes = [{
				pattern: "",
				name: "Initial",
				target: [
					"Initial"
				]
			}],
			mTargets = {
				"Initial": {
					viewName: this.cfg('firstViewName'),
					viewLevel: 1
				}
			},
		// merge routes and targets
		oManifestUpdated = R.evolve({
			"sap.ui5": {
				routing: {
					routes: R.concat(aRoutes),
					targets: R.merge(mTargets)
				}
			}
		}, oManifest);
		// write back
		this.fs.writeJSON(sManifestPath, oManifestUpdated);

		// copy Rootview
		this.tmpl(mProps, S.jPath(sRootPath, 'view'), 'Root.view.xml')

		// first view and controller via stui5:view
		this.composeWith('stui5:view', {
			arguments: [this.cfg('firstViewName')]
		});

	}


};
