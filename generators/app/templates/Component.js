sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/m/routing/RouteMatchedHandler"
], function (UIComponent, JSONModel, RouteMatchedHandler) {
	"use strict";

	return UIComponent.extend("scb.fleetman.Component", {
		metadata : {
			manifest : "json"
		},

	init : function() {

		// TODO: how to load local json models from the model directory?

		// // system model
		// var oSystemModel = new JSONModel({
		// 	busy : {
		// 		dataset : false
		// 	}
		// });
		// this.setModel(oSystemModel, "system");

		// set device model
		var bIsPhone = sap.ui.Device.system.phone;
		var oDeviceModel = new JSONModel({
			isPhone : bIsPhone,
			isNoPhone : !bIsPhone,
			listMode : bIsPhone ? "None" : "SingleSelectMaster",
			listItemType : bIsPhone ? "Active" : "Inactive"
		});
		oDeviceModel.setDefaultBindingMode("OneWay");
		this.setModel(oDeviceModel, "device");

		// call the super init - calling this after models are declared makes models available in the onInit methods of controllers. Not sure why. Doesn't seem to work for i18n defined models
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

		new sap.m.routing.RouteMatchedHandler(this.getRouter());
		this.getRouter().initialize();
	},

});
});
