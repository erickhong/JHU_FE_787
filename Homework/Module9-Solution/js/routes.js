/**
Assignment#9
Routes configuration and state for Home, Categories, and Items.

Attribution:
- Yaakov Chaikin's course JHU 787
  = https://www.coursera.org/learn/single-page-web-apps-with-angularjs
Author: Erick Hong
*/
(function() {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {
    //Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            template: '<div><h2>Welcome to My Restaurant</h2><hr class="dashed"></div>'
        })
        .state('categories', {
            url: '/categories',
            templateUrl: 'html/categories.html',
            controller: 'categoriesController as categoryControl',
            resolve: {              //Load before navigating to the page
                categories: ['MenuDataService', function(MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })
        .state('items', {
            url: '/categories/{categoryShortName}',
            templateUrl: 'html/items.html',
            controller: 'itemsController as itemControl',
            params: {
                categoryShortName: null,
                categoryName: null
            },
            resolve: {              //Load before navigating to the page
                items: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
                    return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                }]
            }
        });
}
})();
