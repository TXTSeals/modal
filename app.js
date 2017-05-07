// Ionic Starter App


// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','ui.router','service'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
  }
  if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
  }
});
});

app.config(function($stateProvider,$urlRouterProvider,$httpProvider){
    $httpProvider.interceptors.push('AuthInter');

    $urlRouterProvider.otherwise('/home')

    $stateProvider


    .state('home',{
        url:'/home',
        views: {
            'main':{
                templateUrl: 'templates/home.html',

            }
        }
    })

    .state('signUp',{
        url:'/signUp',
        views: {
            'main':{
                templateUrl: 'templates/signUp.html',

                controller: function($scope,$http,$timeout,$state){
                    $scope.register = function(){
                        $scope.serverMsg =false;

                        $http.post('/signUp', $scope.newUser).then(function(data){
                            $scope.serverMsg = data.data;
                            if($scope.serverMsg.success == true){
                                $timeout(function(){
                                    $state.go('login');
                                }, 2000);
                            }
                        })
                    }
                }
            }
        }
    })
    .state('login',{
        url:'/login',
        views: {
            'main':{
                templateUrl: 'templates/login.html',
                controller: function($scope,$http,$timeout,$state,$window){
                    $scope.setCurrentUser = function(user){
                        $scope.currentUser = user;
                        console.log($scope.currentUser);
                    }
                    $scope.serverMsg = false;

                    $http.get('http://localhost:8080/users').then(function({ data: users }) {
                        $scope.users = users;
                    })
                }
            }
        }
    })
    .state('checkIn',{
        url:'/checkIn',
        views: {
            'main':{
                templateUrl: 'templates/checkIn.html',
                // resolve: {

                // },
                controller: function($scope,$http,$state,$window,$timeout){

                    var today = new Date();
                    var hour = today.getHours();
                    var minute = today.getMinutes();
                    var meridianPlaceHolder = today.getHours();
                    meridianPlaceHolder = AmPm(meridianPlaceHolder);
                    minute = checkTime(minute);
                    hour = checkHour(hour);

                    function AmPm(i){
                        if(i < 12){
                          return "AM";
                      }
                      else{
                          return "PM";
                      }
                  }

                  function checkHour(i){
                    if (i > 12){
                      i = i - 12;
                  };
                  return i;
              }

              function checkTime(i) {
                  if (i < 10) {
                    i = "0" + i
                      };  // add zero in front of numbers < 10
                      return i;
                  }

                  //var arrivalTime = document.getElementById("arrivalTime");
                  $scope.arrivalTime = hour + ":" + minute + " " + meridianPlaceHolder;
                  //arrivalTime.setAttribute("value", hour + ":" + minute + " " + meridianPlaceHolder);

                  //Checks whether or not the user has chosen a latop
                  var laptopQuery = false;
                  $('#yesLaptop').click(function(){
                    laptopQuery = true
                });

                  $('#noLaptop').click(function(){
                    laptopQuery = false
                });


                  //Handles the Inputs of the Check In Page
                  $scope.submit = function(){
                    $scope.serverMsg = false;
                    console.log("Submitting Check In...");

                    //Assigns a Random Laptop
                    var laptops = ["laptop2","laptop3","laptop4","laptop5","laptop6","laptop7","laptop8","laptop9","laptop10","laptop11","laptop12","laptop13","laptop14","laptop15","laptop16","laptop17","laptop18","laptop19","laptop20","laptop21","laptop22","laptop23","laptop24"];
                    var laptop = laptops.splice([Math.floor(Math.random()*laptops.length)], 1);
                    //Retrieves input values
                    var timeLogArrival = document.getElementById("arrivalTime").value;
                    var timeLogDepature = document.getElementById("depatureTime").value;
                    var reasonForVisit = document.getElementById("reasonForVisit").value;
                    $scope.timeLogArrival = timeLogArrival;
                    $scope.timeLogDepature = timeLogDepature;
                    $scope.laptop = laptop;
                    $scope.reason = reasonForVisit;
                    console.log(timeLogDepature);
                    //Logs data, isn't currently working on monogo
                    console.log("Time of Arrival: " + timeLogArrival);
                    console.log("Time of Departure: " + timeLogDepature);
                    console.log("Reason for Visit: " + reasonForVisit);
                    //Displays whether or not a user checke out a laptop or not
                    if (laptopQuery){
                        console.log("Your Laptop: " + laptop);
                        alert("Your Laptop: " + laptop);
                    }
                    else{
                      console.log("You didn't check out a laptop");
                  }



                  $http.post('/check',$scope.currentUser).then(function(data){
                      $scope.serverMsg = data.data;
                      if($scope.serverMsg.success == true){
                        $timeout(function(){
                            console.log("user data updated");

                            $state.go('home');
                        }, 2000);
                    }
                });
              }

          }
      }
  }
});
});

// this is for the phone number
app.directive('phoneInput', function($filter, $browser) {
    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModelCtrl) {
            var listener = function() {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('tel')(value, false));
            };

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function(viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0,10);
            });

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function() {
                $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
            };

            $element.bind('change', listener);
            $element.bind('keydown', function(event) {
                var key = event.keyCode;
                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){
                    return;
                }
                $browser.defer(listener); // Have to do this or changes don't get picked up properly
            });

            $element.bind('paste cut', function() {
                $browser.defer(listener);
            });
        }
    };
});

app.filter('tel', function () {
    return function (tel) {
        console.log(tel);
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
            city = value;
            break;

            default:
            city = value.slice(0, 3);
            number = value.slice(3);
        }

        if(number){
            if(number.length>3){
                number = number.slice(0, 3) + '-' + number.slice(3,7);
            }
            else{
                number = number;
            }

            return ("(" + city + ") " + number).trim();
        }
        else{
            return "(" + city;
        }

    };
});

app.controller