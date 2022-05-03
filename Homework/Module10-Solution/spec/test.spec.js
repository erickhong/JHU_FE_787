describe('menuservice', function () {

    var menuService;
    var $httpBackend;
    var ApiBasePath;

    beforeEach(function () {
        module('common');
        module(function ($provide) {
          $provide.factory('loadingHttpInterceptor', function () {
            return {request: null, response: null, responseError: null};
          });
        });

        inject(function ($injector) {
            menuService = $injector.get('MenuService');
            $httpBackend = $injector.get('$httpBackend');
            ApiBasePath = $injector.get('ApiBasePath');
        });
    });

    //Basic test to for Jasmine setup
    it('contains a basic case to ensure setup works', function(){
        expect(true).toBe(true);
    });

    //Lecture45 example
    it('should return categories list (test from Lecture45)', function() {
        $httpBackend.whenGET(ApiBasePath + '/categories.json').respond(['Lunch', 'Dessert']);
        menuService.getCategories().then(function(data) {
            expect(data).toEqual(['Lunch', 'Dessert']);
        });
        $httpBackend.flush();
    });

    //https://github.com/jhu-ep-coursera/restaurant-server
    //https://ehong-coursera-angular.herokuapp.com/menu_items/L16.json
    it('should return L16 menu item using getFavoriteDish()', function() {
        var menuNumber = 'L16';
        $httpBackend.whenGET(ApiBasePath + '/menu_items/' + menuNumber + '.json').respond(
            {
                "id":208,
                "short_name":"L16",
                "name":"Beef String Bean",
                "description":"sliced beef sauteed with string beans and onions",
                "price_small":null,
                "price_large":12.95,
                "small_portion_name":null,
                "large_portion_name":null,
                "created_at":"2016-11-14T01:25:09.508Z",
                "updated_at":"2022-05-02T03:45:05.747Z",
                "category_short_name":"L",
                "image_present":true
            }
        );
        menuService.getFavoriteDish(menuNumber).then(function(data) {
            expect(data).toEqual(
                {
                    "id":208,
                    "short_name":"L16",
                    "name":"Beef String Bean",
                    "description":"sliced beef sauteed with string beans and onions",
                    "price_small":null,
                    "price_large":12.95,
                    "small_portion_name":null,
                    "large_portion_name":null,
                    "created_at":"2016-11-14T01:25:09.508Z",
                    "updated_at":"2022-05-02T03:45:05.747Z",
                    "category_short_name":"L",
                    "image_present":true
                }
            );
        });

        $httpBackend.flush();
  });

    //https://ehong-coursera-angular.herokuapp.com/menu_items/FR2.json
    it('should return FR2 menu item using getFavoriteDish()', function() {
        var menuNumber = 'FR2';
        $httpBackend.whenGET(ApiBasePath + '/menu_items/' + menuNumber + '.json').respond(
            {
                "id":109,
                "short_name":"FR2",
                "name":"Chicken Fried Rice",
                "description":"white meat chicken sauteed with onions and bean sprouts with rice",
                "price_small":9.95,
                "price_large":12.45,
                "small_portion_name":"pint","large_portion_name":"large",
                "created_at":"2022-05-02T04:58:01.323Z",
                "updated_at":"2022-05-02T04:58:01.323Z",
                "category_short_name":"FR",
                "image_present":true
            }
        );
        menuService.getFavoriteDish(menuNumber).then(function(data) {
            expect(data).toEqual(
                {
                    "id":109,
                    "short_name":"FR2",
                    "name":"Chicken Fried Rice",
                    "description":"white meat chicken sauteed with onions and bean sprouts with rice",
                    "price_small":9.95,
                    "price_large":12.45,
                    "small_portion_name":"pint","large_portion_name":"large",
                    "created_at":"2022-05-02T04:58:01.323Z",
                    "updated_at":"2022-05-02T04:58:01.323Z",
                    "category_short_name":"FR",
                    "image_present":true
                }
            );
        });
        $httpBackend.flush();
    });
});
