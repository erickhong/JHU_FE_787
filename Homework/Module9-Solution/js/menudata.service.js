/**
Assignment#9
Service to fetch menu data for all categories and all items in a category
using a promise.

Attribution:
- Yaakov Chaikin's course JHU 787
  = https://www.coursera.org/learn/single-page-web-apps-with-angularjs
Author: Erick Hong
*/
(function() {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http', 'ApiBaseUrl'];
function MenuDataService($http, ApiBaseUrl) {
    var service = this;
    //Fetch all categories
    service.getAllCategories = function () {
        return $http({
            method: "GET",
            url: (ApiBaseUrl + '/categories.json')
        }).then(function(response) {;
            return response.data;
        });
    };
    //Fetch all items in a category
    service.getItemsForCategory = function (categoryShortName) {
        return $http({
            method: "GET",
            url: (ApiBaseUrl + '/menu_items.json?category=' + categoryShortName)
        }).then(function(response) {
            return response.data.menu_items;
        });
    };
}
})();
