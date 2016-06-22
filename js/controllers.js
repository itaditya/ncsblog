'use strict';

/* Controllers */

var blogControllers = angular.module('blogControllers', []);
// var blogApp = angular.module('blogApp', ['blogControllers']);

blogControllers.controller('blogControllers', ['$scope',
  function($scope) {
    $scope.pageno = 1 ;
    $scope.nav = {
        navbrand : 'NCS Blog'
    };

    // Related to blog authors 
    $scope.aditya = {
        image : 'assets/dp2.jpg', 
        name : 'Aditya Agarwal',
        title : 'Angular.js know how'
    }
    $scope.ankit = {
        image : 'assets/dp1.png', 
        name : 'Ankit Jain',
        title : 'Getting Started in PHP'
    }
    // ----------------------------------------
    // For footer ---

    // $scope.footer = {

    // }
    $scope.footer = {
        title : 'NCS' ,
        categories : [
            {
                title : 'backend' ,
                tags : [
                    'frontend' ,
                    'design'
                ]
            },
            {
                title : 'frontend' 
            }
        ]
    }
    // -----------------
}]);

blogControllers.controller('contentControllers', ['$scope',
  function($scope) {
    $scope.topic = 'NCS';
    $scope.breads = [
        'web' ,
        'frontend' ,
        'flexbox'
    ];
    $scope.posts = [
        {
            date : '2016-06-21' ,
            imgsrc : 'assets/l2.jpg' ,
            link : 'https://abc.x' ,
            title : 'How to add images and videos in html'
        } ,
        {
            date : '2014-06-12' ,
            imgsrc : 'assets/l2.jpg' ,
            link : 'https://abc.y' ,
            title : 'Making a text shadow effect in photoshop'
        } ,
        {
            date : '2016-03-02' ,
            imgsrc : 'assets/l2.jpg' ,
            link : 'https://abc.z' ,
            title : 'How to solve programs on codechef'
        }
    ];
    $scope.topics = [
        'Introduction' ,
        'Get Started' ,
        'Prerequisites' , 
        'Examples' , 
        'Experiments' , 
        'Conclusion'
    ];
}]);
