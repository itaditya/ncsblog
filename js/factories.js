/* Services */

// var blogFactory = angular.module('blogFactory', ['ngResource']);

// blogFactory.factory('Phone', ['$resource',
//   function($resource){
//     return $resource('phones/:phoneId.json', {}, {
//       query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
//     });
//   }]);

angular.module('blogApp')
    .factory('blogFactory',function($http) {
        'use strict';

        // Content Controllers

        var breads = [
            'web' ,
            'frontend' ,
            'flexbox'
        ];

        // Blog Controllers

        var posts = [
            {
                date : '2016-06-21' ,
                imgsrc : 'assets/l2.jpg' ,
                link : 'https://abc.x' ,
                title : 'How to add images and videos in html'
            } ,
            {
                date : '2014-06-12' ,
                imgsrc : 'assets/l1.jpg' ,
                link : 'https://abc.y' ,
                title : 'Making a text shadow effect in photoshop'
            } ,
            {
                date : '2016-03-02' ,
                imgsrc : 'assets/l3.jpg' ,
                link : 'https://abc.z' ,
                title : 'How to solve programs on codechef'
            }
        ];

        var categories = [
                {
                    title : 'backend' ,
                    tags : [
                        'frontend' ,
                        'design'
                    ]
                },
                {
                    title : 'frontend' ,
                    tags : [
                        'frontend' ,
                        'design'
                    ]
                },
                {
                    title : 'programming' ,
                    tags : [
                        'frontend' ,
                        'design'
                    ]
                },
                {
                    title : 'designers' ,
                    tags : [
                        'frontend' ,
                        'design'
                    ]
                }
            ];

        var factory = {};

        factory.getBreads = function() {
            return breads;
        };
        factory.getPosts = function() {
            return posts;
        };
        factory.getCategories = function() {
            return categories;
        };
        factory.getBlogData = function(path) {
            return $http.get(path)
              .error(function (data) {
                console.log('There was an error!', data);
              })
        };

        return factory;
    });
