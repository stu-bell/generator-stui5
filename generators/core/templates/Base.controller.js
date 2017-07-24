sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {

	"use strict";

	/**
	* Base controller
	* @class Base
	*/
return Controller.extend("<%= appNamespace %>.controller.Base", {

	<% if (baseControllerBody) { %>
    <%- include('Base.controller.body.snippet.js'); %>
  <% }; %>

	});
});
