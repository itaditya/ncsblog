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
            'web > ' ,
            'frontend > ' ,
            'flex'
        ];

        // Blog Controllers

        // var posts = [
        //     {
        //         date : '2016-06-21' ,
        //         imgsrc : 'assets/l2.jpg' ,
        //         link : 'https://abc.x' ,
        //         title : 'How to add images and videos in html'
        //     } ,
        //     {
        //         date : '2014-06-12' ,
        //         imgsrc : 'assets/l1.jpg' ,
        //         link : 'https://abc.y' ,
        //         title : 'Making a text shadow effect in photoshop'
        //     } ,
        //     {
        //         date : '2016-03-02' ,
        //         imgsrc : 'assets/l3.jpg' ,
        //         link : 'https://abc.z' ,
        //         title : 'How to solve programs on codechef'
        //     }
        // ];
        // console.log(JSON.stringify(posts));

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
            // return posts;
            return $http.get('partials/posts.json')
              .error(function (data) {
                console.log('There was an error!', data);
              })
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
        factory.runJs = function() {

            var wid1 = document.getElementsByClassName('widget')[0];
            console.log(screen.width);

            var page = document.getElementsByClassName('page')[0];
            page.addEventListener('scroll',sidebar);

            // keep page variable and event listener together
            // page.scrollBy('130');

            var sidebar = document.getElementsByClassName('sidebar')[0];

            var herobanner = document.getElementsByClassName('hero-banner')[0];
            var heroheight = herobanner.clientHeight;

            function sidebar(e) {
                var scrolled = page.scrollTop;
                if(scrolled >= heroheight) {
                    sidebar.style.position = 'fixed';
                }
                else {
                    sidebar.style.position = 'relative';
                }
            }

            // Modal toggling ------------------

            var comBtn = document.getElementById('comBtn');
            comBtn.addEventListener('click' , toggleCommentModal);

            var closeBtn = document.getElementsByClassName('closeModal')[0];

            function toggleCommentModal() {
                toggler(comBtn);
                closeBtn.addEventListener('click' , toggleCommentModal);
            }

            function toggler(elem) {

                var comModal = elem.dataset.toggleId;
                comModal = document.getElementById(comModal);

                if (comModal.style.display == 'block') {
                    comModal.style.display = 'none';
                }
                else {
                    comModal.style.display = 'block';
                    comModal.classList.add('animated');
                    comModal.classList.add('fadeIn');
                }
            }

            // ---------------------------------

            // Function to trigger callback when an element is visible on screen

            function scrollCall(offset,callback) {
                var scrolled = page.scrollTop;
                if(scrolled >= offset) {
                    callback();
                }
                // else {
                //  sidebar.style.position = 'relative';
                // }
            }

            // -----------------------------------------------------------------

            // Function to calclate element's distance from top

            function offsetTop(elem) {
                var offset = 0 ;
                var siblings = elem.previousElementSibling;

                while(siblings != null) {
                    offset += siblings.clientHeight;
                    siblings = siblings.previousElementSibling;
                }
                return offset;
            }

            // ----------------------------------------------------

            // Functions for generating notification based on scrolling .
             
            page.addEventListener('scroll' , showNotifications);

            function showNotifications() {

                var elem = document.getElementsByClassName('footer')[0];

                //-500 is done to trigger before footer is completely viewed

                scrollCall((offsetTop(elem)-800),function() {
                    page.removeEventListener('scroll' , showNotifications);
                    console.log('notification');
                    var content = {
                        body: 'you can use CSS to darken images',
                        icon: '../assets/dp2.jpg'
                    }
                    notifyMe('Did You Know',content);
                });
            }

            page.addEventListener('scroll' , showRecentPosts);

            function showRecentPosts() {

                var elem = document.getElementsByClassName('posts-card')[0];
                scrollCall(offsetTop(elem),function() {
                    page.removeEventListener('scroll' , showRecentPosts);
                    console.log('ajax');
                    // $http.get('js/JSON/posts.json')
                    //     .error(function (data) {
                    //         console.log('There was an error!', data);
                    //     })
                    //     .success(function(jsonData,statusCode){
                    //     });
                });
            }

            // local storage

            var userName = document.getElementById('user-name');
            var userDomain = document.getElementById('user-domain');

            var userSave = document.getElementById('user-save');
            userSave.addEventListener('click' , saveDetails);

            function saveDetails() {

                // localStorage.setItem('name','aditya');
                // console.log(localStorage.name);

                var userDetails = {
                    name : userName.value ,
                    domain : userDomain.value
                }

                localStorage.setItem('details',JSON.stringify(userDetails));
                console.log(JSON.parse(localStorage.details));
                greetuser();
            }

            // document.addEventListener('hover',greetuser);

            function greetuser() {
                var username = null;
                if (localStorage.length > 0) {
                    username = JSON.parse(localStorage.details).name;   
                };
                if(typeof username != 'object') {
                    console.log('Hello ',username);
                    var elem = document.querySelector('#user-widget');
                    // elem.style.display = "none";
                    // elem.parentNode.removeChild(elem);
                }
            }

            greetuser();
            // ------------------------------------
            // Notification Api

            function notifyMe(heading,content) {
              // Let's check if the browser supports notifications

              if (!("Notification" in window)) {
                alert("This browser does not support desktop notification");
              }

              // Let's check whether notification permissions have already been granted
              else if (Notification.permission === "granted") 
              {

                // If it's okay let's create a notification
                // var notification = new Notification('Did You Know',
                // {
                //   body: 'you can use CSS to darken images',
                //   icon: '../assets/dp2.jpg' // optional
                // });

                var notification = new Notification(heading,content);
              }

              // Otherwise, we need to ask the user for permission
              else if (Notification.permission !== 'denied') {

                  Notification.requestPermission(function (permission) {
                  // If the user accepts, let's create a notification
                  if (permission === "granted") {
                    var notification = new Notification('Hi there!',
                    {
                        body: 'Thank you for granting permission\nHere you can read new facts'
                    });
                  }
                });
              }

              // At last, if the user has denied notifications, and you 
              // want to be respectful there is no need to bother them any more.
            }

            // ----------------
            //----------------------------------------------------------------------------

            /* Future --

            * -Use google prety code
            * -Use codepen embeds --done
            * -Use local storage to save user name and description like front/back/design.. --done
            * -Use notification to display a did you know when scrolled just beore footer. --done   
            * -Use scroll event to send ajax request for new recent posts .
            */

            // Feature to copy code to clipboard just by
            // clicking on code (maybe I will add a button to do this)

            var contbig = document.getElementsByClassName('main')[0];


        }

        return factory;
    });


            // Project Bugs -----
            /*
            * 1) search icon problem in firefox . 
            * 2) placeholder color in firefox . 
            * 3) trouble with height of main and/or container 
                 causing overflowing of content rather than increasing height .
                 -- maybe the problem is with codepen only (yippee!)
                 --- fixed :) by oveflow scroll on codepen (!strange)
            * 4) js anim to respond to btn clicks .
            * 5) sidebar problem with firefox .
            * 6) JS is loading before Angular can render the page .
                 --- fixed ;) by placing js in factory and calling it from ctrl on docment loaded.
            */
