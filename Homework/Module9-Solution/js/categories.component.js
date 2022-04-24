/**
Assignment#9
Cateogry component template with binding.

Attribution:
- Yaakov Chaikin's course JHU 787
  = https://www.coursera.org/learn/single-page-web-apps-with-angularjs
Author: Erick Hong
*/
(function() {
'use strict';

angular.module('MenuApp')
.component('categories', {
   templateUrl: 'html/categories.component.html',
    bindings: {
        categories: '<'
    }
});
})();
