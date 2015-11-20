angular.module('app.controllers', [])

// Login page controller
.controller('loginCtrl', function($scope, $state) {
  $scope.login = function(username, password) {
    console.log(username, password);

    Parse.User.logIn(username, password, {
      success: function(user) {
        // Do stuff after successful login.
        $state.go('menu.recipeFeed');
      },
      error: function(user, error) {
        // The login failed. Check error to see why.
        $scope.result = 'Unable to login';
      }
    });

  }
})

// Detail page controller
.controller('detailCtrl', function($scope) {

})

// Recipe feed page controller
.controller('recipeFeedCtrl', function($scope) {

})

// Create new recipe controller
.controller('createNewRecipeCtrl', function($scope) {

})

.controller('profileCtrl', function($scope) {
  var userModel = Parse.User.current();
  $scope.name = userModel.get('name');
  $scope.username = userModel.get('username');
  $scope.img = userModel.get('img');
})
