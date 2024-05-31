angular.module('myapp', ['ngRoute'])
// tạo loading
    .run(function ($rootScope) {
        $rootScope.$on('$routeChangeStar', function () {
            $rootScope.loading = true;
        })
        $rootScope.$on('$routechangeSuccess', function () {
            $rootScope.loading = false;
        })
        $rootScope.$on('$routechangeError', function () {
            $rootScope.loading = false;
            alert("Đã có lỗi xảy ra");
        })
    })

    .config(function ($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: "inc/page/wrapper_home_page.html",
                controller: "homeCtrl",
            })
            .when('/news', {
                templateUrl: "inc/page/wrapper_news_page.html",
                controller: "newsCtrl",
            })
            .when('/about', {
                templateUrl: "inc/page/wrapper_about_page.html",
                controller: "aboutCtrl",
            })
            .when('/contact', {
                templateUrl: "inc/page/wrapper_contact_page.html",
                controller: "contactCtrl",
            })
            .when('/sale', {
                templateUrl: "inc/page/wrapper_sales_page.html",
                controller: "saleCtrl",
            })
            .when('/detail/:id', {
                templateUrl: "inc/page/wrapper_detail_page.html",
                controller: "detailCtrl",
            })
            .when('/cart', {
                templateUrl: "inc/page/wrapper_cart_page.html",
                controller: "cartCtrl",
            })
            .when('/introduce', {
                templateUrl: 'inc/page/wrapper_introduce_page.html',
                controller: 'introduceCtr'
            })
            .when('/post',  {
                templateUrl: 'inc/page/wrapper_post_page.html',
                controller: 'postCtr'
            })
            .when('/category/:id', {
                templateUrl: "inc/page/wrapper_products_page.html",
                controller: "categoryCtrl",
            })
            .when('/category/:id/:keyword', {
                templateUrl: "inc/page/wrapper_products_page.html",
                
            })
            .when('/search/:keyword', {
                templateUrl: "inc/page/wrapper_search_page.html",
                controller: "searchCtrl",
            })
            .when('/login', {
                templateUrl: "inc/authentic/login-page.html",
                // controller: "loginCtrl",
            })
            .when('/sign-in', {
                templateUrl: "inc/authentic/signin-page.html",
                // controller: "signinCtrl",
            })
            .otherwise({
                redirectTo: "/home"
            })
    })
    .controller('appCtrl', function ($scope, $http) {
        // Sắp xếp
        $scope.sortBy = function (params) { $scope.params = params; }
        $scope.filterBy = function (props) { $scope.props = props; }
        // end sắp xếp
        $http.get("public/js/data.json").then(
            function (res) {
                $scope.productList = res.data;
            },
            function (res) {
                alert('Đã có lỗi xảy ra');
            }
        );

        // cart
        $scope.cart = [];
        $scope.addCart = function (product) {
            let index = $scope.cart.findIndex(item => item.id == product.id);
            if (index >= 0) {
                $scope.cart[index].quantity++;
            } else {
                let productCart = { id: product.id, name: product.name, price: product.price, discount: product.discount, category: product.category, image_full: product.image_full, quantity: 1 };
                $scope.cart.push(productCart);
            }
        }
        $scope.totalMoney = function () {
            let total = 0;
            for (let i = 0; i < $scope.cart.length; i++) {
                total = $scope.cart[i].quantity * $scope.cart[i].price;
            }
            return total;
        }

        $scope.totalquantity = function () {
            let quantity = 0;
            for (let i = 0; i < $scope.cart.length; i++) {
                quantity+=$scope.cart[i].quantity;
            }
            return quantity;
        }
        // endcart
    })
    .controller('homeCtrl', function ($scope) {
        $scope.categoryiphone = [];
        $scope.categoryIpad = [];
        $scope.categoryMac = [];
        $scope.categoryWatch = [];

        // Duyệt mảng lấy data từng loại
        const productData = $scope.productList.filter(function (product) {
            if (product.category == "iphone") {
                $scope.categoryiphone.push(product);
            } else if (product.category == "ipad") {
                $scope.categoryIpad.push(product);
            } else if (product.category == "mac") {
                $scope.categoryMac.push(product);
            } else if (product.category == "watch") {
                $scope.categoryWatch.push(product);
            }
        });
    })
    .controller('categoryCtrl', function ($scope, $routeParams) {
        $scope.id = $routeParams.id;
        $scope.keyword = $routeParams.keyword;
        $scope.categoryProduct = [];
        const categoryList = [];
        const categoryData = $scope.productList.filter(function (product) {
            if (product.category == $scope.id) {
                $scope.categoryProduct.push(product);
                categoryList.push(product.model);
            }
        });
        $scope.categoryList = [...new Set(categoryList)];
        // console.log($scope.categoryList);

        // Phân trang
        $scope.page = 1;
        $scope.limit = 8;
        $scope.start = 0;
        $scope.changePage = function (page) {
            $scope.page = page;
            $scope.start = ($scope.page - 1) * $scope.limit;
        }
        $scope.totalPage = function () {
            var totalPage = Math.ceil($scope.categoryProduct.length / $scope.limit);
            var pages = [];
            for (var i = 1; i <= totalPage; i++) {
                pages.push(i);
            }
            return pages;
        }
        // phâng trang
    })
    .controller('detailCtrl', function ($scope, $routeParams) {
        $scope.id = $routeParams.id;
        $scope.product = {};
        $scope.colors = {};
        $scope.storage = {};
        $scope.image_urls = {};
        for (const item of $scope.productList) {
            if (item.id == $scope.id) {
                $scope.product = item;
                $scope.colors = item.colors;
                $scope.storage = item.storage_options;
                $scope.image_urls = item.image_urls;
                break;
            }
        }
    })
    .controller('searchCtrl', function ($scope, $routeParams) {
        $scope.keyword = $routeParams.keyword;
        
    })
    .controller('cartCtrl', function ($scope) {
        $scope.delete = function (index) {
            $scope.cart.splice(index, 1);
        }
    })
    .controller('introduceCtr', function($scope, $routeParams) {
        
    })

