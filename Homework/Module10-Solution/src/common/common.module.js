(function() {
"use strict";

angular.module('common', [])
.constant('ApiBasePath', 'https://ehong-coursera-angular.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}
})();
