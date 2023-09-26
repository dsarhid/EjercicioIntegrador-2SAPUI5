sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"integrador2/util/Constants"
], function (JSONModel, Controller, Constants) {
	"use strict";

	return Controller.extend("integrador2.controller.Detail", {
		onInit: function () {

			this.oRouter = this.getOwnerComponent().getRouter();
			this.oModel = this.getOwnerComponent().getModel();

			this.oRouter.getRoute(Constants.detail.pageDetail).attachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute(Constants.detail.pageDetailDetail).attachPatternMatched(this._onProductMatched, this);
		},
		handleItemPress: function (oEvent) {
			var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(2),
				supplierPath = oEvent.getSource().getSelectedItem().getBindingContext(Constants.modelList.nameProductList).getPath(),
				supplier = supplierPath.split("/").slice(-1).pop();

			this.oRouter.navTo(Constants.detail.pageDetailDetail, {layout: oNextUIState.layout,
				product: this._product, supplier: supplier});
		},
		handleClose: function () {
			var sNextLayout = this.oModel.getProperty(Constants.detail.propertyHandleClose);
            let oViewModel = new JSONModel({
				layout: Constants.modelList.widthReturnPrincipalPage
            });
            this.getOwnerComponent().setModel(oViewModel, Constants.modelList.appView);
			this.oRouter.navTo(Constants.detail.pageList, {layout: sNextLayout});
		},
		_onProductMatched: function (oEvent) {
			this._product = oEvent.getParameter("arguments").product || this._product || "0";
			this.getView().bindElement({
				path: Constants.modelList.resultsPath + this._product,
				model: Constants.modelList.nameProductList
			});
		}
	});
});
