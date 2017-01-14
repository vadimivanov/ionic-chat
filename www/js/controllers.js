angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats, mySocket) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  // io.on('connection', function(socket){
  //   socket.on('chat message', function(msg){
  //     io.emit('chat message', msg);
  //   });
  // });
  $scope.chats = [];
  mySocket.on('connection', function(socket){
    console.log('socket connection ', socket);
    socket.on('chat message', function(msg){
      mySocket.emit('chat message', msg);
    });
  });
  
  mySocket.on('chat message', function(msg){
    console.log('messages on ', msg);
    $scope.chats.push({text:msg});
  });
  $scope.addMessage = function(msg) {
    console.log('addMessage emit ', msg);
    mySocket.emit('chat message', msg);
  };

  // $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
