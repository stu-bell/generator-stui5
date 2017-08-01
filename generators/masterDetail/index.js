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
		mProps = this.cfg('bootstrap', 'appTitle', 'appNamespace', 'superControllerPath', 'firstViewName'),
		aViews = ['Master', 'Detail', 'Blank', 'NotFound'],
		sRootPath = this.cfg('webappRoot'),
		sManifestPath = this.destinationPath(S.jPath(sRootPath, 'manifest.json')),
		// add routes and targets to manifest.json
		oManifest = this.fs.readJSON(sManifestPath),
		// merge routes and targets
		oManifestUpdated = R.evolve({
			"sap.ui5": {
				routing: {
					routes: R.concat(aRoutes),
					targets: R.merge(mTargets)
				}
			}
		}, oManifest);
		// write manifest back
		this.fs.writeJSON(sManifestPath, oManifestUpdated);

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
