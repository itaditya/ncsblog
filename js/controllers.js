/* Controllers */

// var blogApp = angular.module('blogApp', ['blogControllers']);

angular.module('blogControllers', ['blogApp'])
    .controller('blogCtrls',
      function blogCtrls( $scope , blogFactory ) {
        'use strict';

        $scope.nav = {
            navbrand : 'NCS BLOG'
        };

        // $scope.$on('ngRepeatFinished',function(){
        //   console.log('Hi');
        // });
        // ----------------------------------------
        // For footer ---

        $scope.footer = {
            title : 'Nibble Computer Society' ,
            categories :  blogFactory.getCategories()
        }

        $scope.breads = blogFactory.getBreads();

        var loc = window.location.pathname;
        var sloc = loc.substring(loc.lastIndexOf('/'),(loc.lastIndexOf('.')-4));
        var path = "blogs"+sloc+".json";

        blogFactory.getBlogData(path)
          .success(function(jsonData, statusCode){
              console.log('The request was successful!', statusCode);
              $scope.pagename = jsonData.pagename ;
              $scope.topics = jsonData.topics ;
              $scope.author = jsonData.author ;

              if (sloc != '/edit') {
                document.querySelectorAll('.breadcrumb li')[2].innerHTML = jsonData.uniqueTag.toUpperCase();
              }

              var parent = document.getElementsByClassName('main')[0];
              parent.insertAdjacentHTML('beforeend',jsonData.content);
          });
          
        angular.element(document).ready(function () {
            blogFactory.runJs();
        });

        if(sloc == '/edit'){
          angular.element(document).ready(function () {
              blogFactory.runEditorJs();
          });
          $scope.clubs = [
            'web' , 
            'programming' ,
            'technical' ,
            'design'
          ];
          $scope.clubInner = [
            'a' , 
            'b'
          ];
        }

        $scope.postsLoaded = false ;
      
        angular.element(document).ready(function () {
          blogFactory.getPosts().success(
              function(jsonData, statusCode){
                console.log('The request was successful!', statusCode);
                $scope.posts = jsonData.posts;
                $scope.postsLoaded = true ;
          });
        });
    });

    // .controller('blogControllers',
    //   function( $scope , blogFactory) {
    //     $scope.nav = {
    //         navbrand : 'NCS BLOG'
    //     };
    //     $scope.posts = blogFactory.getPosts();
    //     // $scope.$on('ngRepeatFinished',function(){
    //     //   console.log('Hi');
    //     // });
    //     // ----------------------------------------
    //     // For footer ---

    //     $scope.footer = {
    //         title : 'Nibble Computer Society' ,
    //         categories :  blogFactory.getCategories()
    //     }
    //     // -----------------
    // })