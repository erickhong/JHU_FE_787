(function () {
"use strict";

angular.module('common')
        .service('MenuService', MenuService);

MenuService.$inject = ['$http', 'ApiBasePath'];
function MenuService($http, ApiBasePath) {
    var service = this;

    service.getCategories = function () {
        return $http.get(ApiBasePath + '/categories.json')
                .then(function (response) {
                    return response.data;
                }
        );
    };

    service.getMenuItems = function (category) {
    var config = {};
    if (category) {
        config.params = {'category': category};
    }

    return $http.get(ApiBasePath + '/menu_items.json', config)
                .then(function (response) {
                        return response.data;
                    }
                );
    };

    service.getFavoriteDish = function(short_name) {
        return $http.get(ApiBasePath + '/menu_items/' + short_name + '.json')
                .then(function (response) {
                        return response.data;
                    }
                );
    }

    service.user = {};
    service.saveUser = function(user) {
        service.user = angular.copy(user);
    }

    service.getUser = function() {
        return service.user;
    }
}
})();
