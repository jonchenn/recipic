// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', [
  'ionic',
  'ionic.service.core',
  'ionic.service.analytics',
  'parse-angular',
  'parse-angular.enhance',
  'app.controllers',
  'app.routes',
  'app.services',
  'app.directives',
])

.constant('_', window._)

.run(function($ionicPlatform, $ionicAnalytics) {
  $ionicPlatform.ready(function() {
    // Analytics
    $ionicAnalytics.register();

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    // Initialize Parse
    Parse.initialize(
      "Your Parse App ID here" /* App ID */ ,
      "Your Parse JS Key here" /* JS key */
    );
    // Migrating to new session tokens, see https://parse.com/tutorials/session-migration-tutorial.
    Parse.User.enableRevocableSession();

  });
})
