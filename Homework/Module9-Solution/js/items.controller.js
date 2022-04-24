/**
Assignment#9
Item controller.

Attribution:
- Yaakov Chaikin's course JHU 787
  = https://www.coursera.org/learn/single-page-web-apps-with-angularjs
Author: Erick Hong
*/
(function() {
'use strict';

angular.module('MenuApp').controller('itemsController', itemsController);

itemsController.$inject = ['$stateParams', 'items', 'MenuDataService'];
function itemsController($stateParams, items, MenuDataService) {
    var itemControl = this;
    itemControl.items = items;
    itemControl.categoryName = $stateParams.categoryName;
}
})();
