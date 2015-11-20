angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('menu', {
      url: '/side-menu21',
      abstract:true,
      templateUrl: 'templates/menu.html'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })

    .state('detail', {
      url: '/detail',
      templateUrl: 'templates/detail.html',
      controller: 'detailCtrl'
    })

    .state('menu.recipeFeed', {
      url: '/feed',
      views: {
        'side-menu21': {
          templateUrl: 'templates/recipeFeed.html',
          controller: 'recipeFeedCtrl'
        }
      }
    })

    .state('menu.createNewRecipe', {
      url: '/new',
      views: {
        'side-menu21': {
          templateUrl: 'templates/createNewRecipe.html',
          controller: 'createNewRecipeCtrl'
        }
      }
    })

    .state('menu.profile', {
      url: '/profile',
      views: {
        'side-menu21': {
          templateUrl: 'templates/profile.html',
          controller: 'profileCtrl'
        }
      }
    })

    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
