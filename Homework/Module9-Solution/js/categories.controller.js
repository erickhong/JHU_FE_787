/**
Assignment#9
Category controller. 

Attribution:
- Yaakov Chaikin's course JHU 787
  = https://www.coursera.org/learn/single-page-web-apps-with-angularjs
Author: Erick Hong
*/
(function() {
'use strict';

angular.module('MenuApp')
.controller('categoriesController', categoriesController);

categoriesController.$inject = ['MenuDataService', 'categories'];
function categoriesController(MenuDataService, categories) {
    var categoryControl = this;
    categoryControl.categories = categories;
}
})();
