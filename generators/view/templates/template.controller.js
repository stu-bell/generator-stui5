sap.ui.define([
	"<%= superControllerPath %>"
], function (Controller) {

	"use strict";

	/**
	* <%= controllerName %> controller
	* @class <%= controllerName %>
	*/
	return Controller.extend("<%= appNamespace %>.controller.<%= controllerName %>", {

		debug: function () {
			debugger;
		}
	});
});
