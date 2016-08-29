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
        };

        $scope.breads = blogFactory.getBreads();

        var loc = window.location.pathname;
        console.log(loc);
        // var sloc = loc.substring(loc.lastIndexOf('/'),(loc.lastIndexOf('.')-4));
        var sloc = loc.substring(loc.lastIndexOf('/')+1);

        // var path = "blogs"+sloc+".json";
        var path = "../load_data.php?q="+sloc;
        blogFactory.getBlogData(path)
          .success(function(jsonData, statusCode){
              console.log('The request was successful!', statusCode,jsonData);
              $scope.pagename = jsonData.pagename ;
              $scope.topics = jsonData.topics ;
              $scope.author = jsonData.author ;

              if (sloc != 'edit') {
                document.querySelectorAll('.breadcrumb li')[2].innerHTML = jsonData.uniqueTag.toUpperCase();
              }

              var parent = document.querySelector('.main');
              parent.insertAdjacentHTML('beforeend',jsonData.content);

              angular.element(document).ready(function () {
                  blogFactory.runCommonJs();


              if(sloc == 'edit'){
                // setTimeout(function () {
                    blogFactory.runEditorJs();
                // },3000);

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
                // setTimeout(function () {
                    blogFactory.runJs();
                // },3000);
              }
              });
          });

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