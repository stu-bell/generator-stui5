sap.ui.define([
	"<%= baseController %>"
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
