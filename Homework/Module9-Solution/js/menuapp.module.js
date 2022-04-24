/**
Assignment#9
Main MenuApp module with dependencies on data and ui-router.

Attribution:
- Yaakov Chaikin's course JHU 787
  = https://www.coursera.org/learn/single-page-web-apps-with-angularjs
Author: Erick Hong
*/
(function() {
'use strict';

angular.module('MenuApp', ['data', 'ui.router'])
.constant('ApiBaseUrl', 'https://davids-restaurant.herokuapp.com');
})();
