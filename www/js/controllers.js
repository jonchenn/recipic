angular.module('app.controllers', [])

// Login page controller
.controller('loginCtrl', function($scope, $state) {
  $scope.login = function(username, password) {
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

  var ITEMS_PER_PAGE = 3;

  $scope.offset = 0;
  $scope.recipes = [];

  $scope.refresh = function() {
    $scope.offset = 0;
    $scope.recipes = [];
    $scope.loadMore();
  };

  $scope.loadMore = function() {
    var query = new Parse.Query('Recipe');
    query.descending('createdAt');

    // offset
    query.limit(ITEMS_PER_PAGE);
    query.skip($scope.offset);
    query.include('user');

    query.find().then(function(models) {
      $scope.offset += ITEMS_PER_PAGE;

      for (var i=0, length=models.length; i<length; i++) {
        var user = models[i].get('user');
        var image = models[i].get('image');

        $scope.recipes.push({
          title: models[i].get('title'),
          content: models[i].get('content'),
          username: (user ? user.get('username') : ''),
          image: (image ? image.url() : ''),
          time: moment(models[i].get('createdAt')).fromNow(),
        });
      }

      $scope.$broadcast('scroll.refreshComplete');
      $scope.$broadcast('scroll.infiniteScrollComplete');

    }).fail(function(err) {
      alert(err);
    });
  };

  $scope.loadMore();

})

// Create new recipe controller
.controller('createNewRecipeCtrl', function($scope, $state, Camera) {
  $scope.takePicture = function() {
    Camera.getPicture({
      quality: 75,
      targetWidth: 800,
      targetHeight: 300,
      saveToPhotoAlbum: false,
      destinationType: 0, //Camera.DestinationType.DATA_URL,

    }).then(function(imageData) {
      console.log(imageData);
      $scope.imageData = "data:image/jpeg;base64," + imageData;

    }, function(err) {
      console.error(err);
    });
  };

  $scope.save = function(title, content) {
    var Recipe = Parse.Object.extend("Recipe");
    var newRecipe = new Recipe();

    newRecipe.set('title', title);
    newRecipe.set('content', content);
    newRecipe.set('user', Parse.User.current());

    var file = new Parse.File(
      'receipe-'+newRecipe.get('objectId')+'.jpg',
      { base64: $scope.imageData });

    newRecipe.set('image', file);

    if (!title || !content) {
      return;
    }

    newRecipe.save().then(function(savedModel) {
      // Save successfully, go back to feed.
      $state.go('menu.recipeFeed');

    }).fail(function(err) {
      alert(err);
    });
  }

})

.controller('profileCtrl', function($scope) {
  var userModel = Parse.User.current();
  $scope.name = userModel.get('name');
  $scope.username = userModel.get('username');
  $scope.img = userModel.get('img');
})

;
