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

    query.find().then(function(models) {
      $scope.offset += ITEMS_PER_PAGE;

      for (var i=0, length=models.length; i<length; i++) {
        $scope.recipes.push({
          title: models[i].get('title'),
          content: models[i].get('content'),
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
.controller('createNewRecipeCtrl', function($scope, $state) {
  document.addEventListener("deviceready", function () {
    $scope.takePicture = function() {
      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation:true
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        // var image = document.getElementById('myImage');
        var src = "data:image/jpeg;base64," + imageData;
        $scope.imageSrc = src;
        //
        // // Save to Parse.com
        // var file = new Parse.File("myfile.txt", imageData);

      }, function(err) {
        // error
      });
    }
  });

  $scope.save = function(title, content) {
    console.log('saving');

    var Recipe = Parse.Object.extend("Recipe");
    var newRecipe = new Recipe();

    newRecipe.set('title', title);
    newRecipe.set('content', content);

    if (!title || !content) {
      return;
    }

    newRecipe.save().then(function() {
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
