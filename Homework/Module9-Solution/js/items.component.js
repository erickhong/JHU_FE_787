/**
Assignment#9
Item component template and binding. 

Attribution:
- Yaakov Chaikin's course JHU 787
  = https://www.coursera.org/learn/single-page-web-apps-with-angularjs
Author: Erick Hong
*/
(function() {
'use strict';

angular.module('MenuApp')
    .component('items', {
        templateUrl: 'html/items.component.html',
        bindings: {
            items: '<'
        }
    });
})();
