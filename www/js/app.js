// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "templates/home.html",
          controller: 'HomeTabCtrl'
        }
      }
    })
    .state('tabs.list', {
      url: "/list",
      views: {
        'list-tab': {
          templateUrl: "templates/list.html",
          controller: 'ListController'
        }
      }
    })
    .state('tabs.calendar', {
      url: "/calendar",
      views: {
        'calendar-tab': {
          templateUrl: "templates/calendar.html",
          controller: 'CalendarController'
        }
      }
    })
    .state('tabs.about', {
      url: "/about",
      views: {
        'about-tab': {
          templateUrl: "templates/about.html"
        }
      }
    });
    $urlRouterProvider.otherwise("/tab/home");
})


.controller('HomeTabCtrl', function($scope) {
})

.controller('CalendarController', ['$scope', '$http', function($scope, $http) {
  $http.get('js/data.json').success(function(data) {
    $scope.calendar = data.calendar;

  $scope.toggleStar = function(item) {
    item.star = !item.star;
  };

  $scope.onItemDelete = function(dayIndex, item) {
    //console.log(day.schedule.indexOf(item));
    $scope.calendar[dayIndex].schedule.splice($scope.calendar[dayIndex].schedule.indexOf(item), 1);
  };

  });
}])



.controller('ListController', ['$scope', '$http', function($scope, $http) {
  $http.get('js/data.json').success(function(data) {
    $scope.artists = data.artists;

  $scope.data = {
    showDelete: false
  };
  
  $scope.toggleStar = function(item) {
    item.star = !item.star;
  };
  
  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.artists.splice(fromIndex, 1);
    $scope.artists.splice(toIndex, 0, item);
  };
  
  $scope.onItemDelete = function(item) {
    $scope.artists.splice($scope.artists.indexOf(item), 1);
  };

  });
}]);

