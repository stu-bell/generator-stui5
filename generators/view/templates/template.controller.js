sap.ui.define([
	"<%= superControllerPath %>"
], function (Controller) {

	"use strict";

	/**
	* <%= controllerName %> controller
	* @class <%= controllerName %>
	*/
	return Controller.extend("<%= appNamespace %>.controller.<%= controllerName %>", {

	// ********************************************************* //
	// lifecycle
	// ******************************************************* //

	/**
	 * Runs on Controller "init" event
	 * @return   {[type]}
 	 * @memberof <%= controllerName %>
	 */
	onInit: function () {
		sap.m.MessageToast.show('Good Morning!! :)');
	},

	});
});
