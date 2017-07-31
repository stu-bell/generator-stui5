var Generator = require('../generator-stui5.base'),
S = require('../scb-helper'),
R = require('ramda');

module.exports = class extends Generator {

	// ********************************************************* //
	// run loop: http://yeoman.io/authoring/running-context.html
	// ******************************************************* //

	writing() {
		var aRoutes = [
			{
				pattern: "",
				name: "master",
				target: [
					"blank",
					"master"
				]
			},
			{
				pattern: "{item}",
				name: "detail",
				target: [
					"detail",
					"master"
				]
			},
			{
				pattern: "{item}/notFound",
				name: "notFound",
				target: [
					"notFound",
					"master"
				]
			}
		],
		mTargets = {
			master: {
				viewName: "Master",
				viewLevel: 1,
				viewId: "master",
				controlAggregation: "masterPages"
			},
			blank: {
				viewName: "Blank",
				viewId: "blank",
				viewLevel: 2,
				controlAggregation: "detailPages"
			},
			notFound: {
				viewName: "NotFound",
				viewId: "blank",
				viewLevel: 2,
				controlAggregation: "detailPages"
			},
			detail: {
				viewName: "Detail",
				viewId: "detail",
				viewLevel: 2,
				controlAggregation: "detailPages"
			}
		},
		aPropNames = ['bootstrap', 'appTitle', 'appNamespace', 'superControllerPath', 'firstViewName'],
		mProps = S.flipPick(this.config.getAll(), aPropNames),
		aViews = ['Master', 'Detail', 'Blank', 'NotFound'],
		sRootPath = this.config.get('webappRoot'),
		sManifestPath = this.destinationPath(S.jPath(sRootPath, 'manifest.json')),
		// TODO: pointfree this
		// add routes and targets to manifest.json
		oManifest = this.fs.readJSON(sManifestPath),
		// add routes
		aRoutesPath = ['sap.ui5', 'routing', 'routes'],
		oManifestRoutes = R.assocPath(aRoutesPath, R.concat(R.path(aRoutesPath, oManifest), aRoutes), oManifest),
		// add targets
		aTargetsPath = ['sap.ui5', 'routing', 'targets'],
		oManifestTargets = R.assocPath(aTargetsPath, R.merge(mTargets, R.path(aTargetsPath, oManifestRoutes)), oManifestRoutes);
		// write manifest back
		this.fs.writeJSON(sManifestPath, oManifestTargets);

		// copy Rootview
		this.tmpl(mProps, S.jPath(sRootPath, 'view'), 'Root.view.xml')

		// views and controllers
		R.map(sViewName => {
			this.composeWith('stui5:view', {
				arguments: [sViewName]
			});
		}, aViews);

	}

};
