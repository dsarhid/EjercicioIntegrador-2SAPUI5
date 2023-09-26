sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'integrador2/util/Formatter',
    "integrador2/util/Constants"
], function (JSONModel, Controller, Filter, FilterOperator, Sorter, Formatter, Constants) {
	"use strict";

	return Controller.extend("integrador2.controller.List", {
		Formatter: Formatter,
		onInit: function () {
			this.oRouter = this.getOwnerComponent().getRouter();
			this._bDescendingSort = false;

			const url = sap.ui.require.toUrl(Constants.modelList.namespace) + Constants.modelList.urlModelList;
			this._model = new sap.ui.model.odata.v2.ODataModel(url, {
				json:true,
				header: {
					"DataServicesVersion": "2.0",
					"Cache-Control": "no-cache , no-store",
					"Pragma": "no-cache"
				},
				useBatch: false
			});

			this._model.read(Constants.modelList.nameProject,{
				async: true,
				success: jQuery.proxy(this.success, this),
				error: jQuery.proxy(this.error, this)
			})

			var oResourceModel = this.getOwnerComponent().getModel(Constants.modelList.i18n);
			oResourceModel.enhance({ bundleName: Constants.modelList.i18nBundleName });

			sap.ui.getCore().getConfiguration().setLanguage(Constants.modelList.Spanish);
		},

		success: function (oData){
			const oModel = new JSONModel(oData);
			this.getView().setModel(oModel,Constants.modelList.nameProductList);
		},

		error: function() {
			alert(Constants.errorMessage.error);
		},

		onListItemPress: function (oEvent) {
			var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(1),
				productPath = oEvent.getSource().getSelectedItem().getBindingContext(Constants.modelList.nameProductList).getPath(),
				product = productPath.split("/").slice(-1).pop();

			const oItemSeleccionado = oEvent.getSource().getSelectedItem().getBindingContext(Constants.modelList.nameProductList).oModel.oData.results[product];
			const oModelSeleccionado = new JSONModel(oItemSeleccionado);
			this.getOwnerComponent().setModel(oModelSeleccionado,Constants.modelList.nameProductListSeleccionado)
			
			this.oRouter.navTo(Constants.detail.pageDetail, {layout: oNextUIState.layout, product: product});

			let oViewModel = new JSONModel({
				layout: Constants.modelList.widthPageDetail
			  });
			  this.getOwnerComponent().setModel(oViewModel, Constants.modelList.appView);
		},
		onSearch: function (oEvent) {
			var aFilter= [];
			const sQuery = oEvent.getSource().getValue();

			if(sQuery && sQuery.length > 0){
				var oFilter = new Filter(Constants.filtros.filtroSearch, FilterOperator.Contains, sQuery);
				aFilter.push(oFilter);
			}

			var oList = this.byId(Constants.modelList.idTableProducts);
			var oBindingItems = oList.getBinding(Constants.modelList.BindingItems);
			oBindingItems.filter(aFilter, Constants.modelList.nameBinding);
		},

		onSort: function (oEvent) {
			this._bDescendingSort = !this._bDescendingSort;
			var oView = this.getView(),
				oTable = oView.byId(Constants.modelList.idTableProducts),
				oBinding = oTable.getBinding(Constants.modelList.BindingItems),
				oSorter = new Sorter(Constants.filtros.filtroSort, this._bDescendingSort);

			oBinding.sort(oSorter);
		}
	});
});
