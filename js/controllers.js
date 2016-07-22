/* Controller */

angular.module('blogControllers', ['blogApp'])
    .controller('blogCtrls',
      function blogCtrls($scope, blogFactory) {
        'use strict';

        $scope.nav = {
            navbrand : 'NCS BLOG'
        };

        $scope.footer = {
            title : 'Nibble Computer Society' ,
            categories :  blogFactory.getCategories()
        }

        $scope.breads = blogFactory.getBreads();

        var loc = window.location.pathname;
        var sloc = loc.substring(loc.lastIndexOf('/'),(loc.lastIndexOf('.')-4));
        var path = "blogs"+sloc+".json";

        


        // Ankit Bhai ye dekho, ye load data ke liye hai.
        // Isse mai saare blogs including the editBlog, sab ka .main div container
        // ke andar HTML inject kr deta huin. 
        // 
        //Last line (iske neeche waali uncomment kr dio)
        // var path = "Load_data.php";

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
            blogFactory.runCommonJs();
        });

        if(sloc == '/edit'){
          angular.element(document).ready(function () {
              blogFactory.runEditorJs();
          });

          var options = blogFactory.getOptions();


          var primaries = [];
          var secondaries = [];

          var i = 0, prop = 0;
          for (prop in options) {
            if (options.hasOwnProperty(prop)) {
              primaries[i] = prop;
              i++;
            }
          }

          $scope.clubs = primaries;
          $scope.clubInner = options["web"].subOptions;

        }
        else {
          angular.element(document).ready(function () {
              blogFactory.runJs();
          });
        }

        // Preloader Mechanism 
        $scope.postsLoaded = false ;
      
        angular.element(document).ready(function () {
          blogFactory.getPosts().success(
              function(jsonData, statusCode){
                console.log('The request was successful!', statusCode);
                $scope.posts = jsonData.posts;
                $scope.postsLoaded = true;
          });
        });
    });