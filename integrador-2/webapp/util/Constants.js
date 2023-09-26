sap.ui.define([], function (){
    'use strict';
    return{
        modelList: {
            i18n: "i18n",
            i18nBundleName: "Integrador-2.i18n.i18n_es",
            Spanish: "es",
            namespace: "integrador2",
            urlModelList: "/v2/northwind/northwind.svc/",
            nameProject: "/Products_by_Categories",
            nameProductList: "productCategoriesModel",
            nameProductListSeleccionado: "productCategoriesModelSeleccionado",
            idTableProducts: "idTableProducts",
            BindingItems: "items",
            nameBinding: "Application",
            routeItemDetail: "RouteItemDetail",
            appView: "appView",
            widthPageDetail: "TwoColumnsBeginExpanded",
            widthReturnPrincipalPage: "OneColumn"
        },
        errorMessage: {
            error: "Error"
        },
        filtros: {
            filtroSort: "UnitsInStock",
            filtroSearch: "ProductName"
        },
        detail: {
            pageList: "list",
            pageDetail: "detail",
            pageDetailDetail: "detailDetail",
            propertyHandleClose: "/actionButtonsInfo/midColumn/closeColumn",
            resultsPath: "/results/"
        }
    };
}, true)