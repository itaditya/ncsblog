'use strict';
var blogDir=angular.module("blogApp",['blogControllers']);

/* Directives */

blogDir.directive("navBar" , function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    },
   templateUrl:'partials/navbar.html'
  }; 
});

blogDir.directive("heroBanner" , function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    },
   templateUrl:'partials/herobanner.html'
  }; 
});

blogDir.directive("blogFooter" , function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    },
   templateUrl:'partials/footer2.html'
  }; 
});