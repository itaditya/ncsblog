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
                    title : 'Backend' ,
                    tags : [
                        'frontend' ,
                        'design'
                    ]
                },
                {
                    title : 'Frontend' ,
                    tags : [
                        'frontend' ,
                        'design'
                    ]
                },
                {
                    title : 'Programming' ,
                    tags : [
                        'frontend' ,
                        'design'
                    ]
                },
                {
                    title : 'Designers' ,
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
              });
        };
        factory.getCategories = function() {
            return categories;
        };
        factory.getBlogData = function(path) {
            return $http.get(path)
              .error(function (data) {
                console.log('There was an error!', data);
              });
        };
        factory.runEditorJs = function() {
            console.log('Lets Make a Blog'); 

            var topicList = [
            ];
            var topicListSrc = document.querySelectorAll('.index-list li');


            for (var i = 0; i < topicListSrc.length; i++) {
                topicListSrc[i].setAttribute('contenteditable','true');
            }
            document.querySelector('.topic h2').setAttribute('contenteditable','true');


            function DataToObject() {
                for (var i = 0; i < topicListSrc.length; i++) {
                    topicList[i] = topicListSrc[i].innerHTML;
                }

                var postContent = {
                    pagename : document.querySelector('.topic h2').innerHTML,
                    author : {
                        image : document.querySelector('.topic img').getAttribute('src') ,
                        name : document.querySelector('.topic p strong').innerHTML ,
                        title : document.querySelector('.topic h2').innerHTML
                    } ,
                    uniqueTag :  document.querySelector('#uniqueTag').value,
                    topics : topicList ,
                    content : editAreaLoader.getValue('textarea_1') 
                };
                return postContent ;
            }

            //The Download blog In Json Mechanism
            var postBlogBtn = document.querySelector('#postBlogBtn');
            postBlogBtn.addEventListener('click',function(e) {
                var uniqueTag = document.querySelector('#uniqueTag');
                if(uniqueTag.classList.contains("ng-invalid")){
                    this.style.opacity = "0.7";
                    var origHTML = this.innerHTML;
                    this.innerHTML = "Correct Tag First";
                    var that = this;
                    setTimeout(function() {
                        that.innerHTML = origHTML;
                        uniqueTag.focus();
                    },800);
                    return false;

                }
                else {
                    this.style.opacity = "1";
                    var postContent = DataToObject();
                    var postContentInJson = JSON.stringify(postContent);
                    console.log(postContentInJson);
                    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(postContentInJson);

                    var dlAnchorElem = document.getElementById('downloadAnchorElem');
                    dlAnchorElem.setAttribute("href",dataStr);
                    var FileName = uniqueTag.value + '.json' ;
                    dlAnchorElem.setAttribute("download", FileName);
                    dlAnchorElem.style.color = "#000";
                    dlAnchorElem.click();
                }
            });

            // The Save Blog as Draft Mechanism 
            var saveBlogBtn = document.querySelector('#saveBlogBtn');
            saveBlogBtn.addEventListener('click',function(e) {
                localStorage.setItem('draftBlog',JSON.stringify(DataToObject()));
                saveBlogBtn.innerHTML = "Saved as Draft !";
                setTimeout(function(){
                    saveBlogBtn.innerHTML = "Save Blog as Draft";
                },2000);
            });

            // The Preview Blog as Draft Mechanism 
            var previewBlogBtn = document.querySelector('#previewBlogBtn');
            previewBlogBtn.addEventListener('click',function(e) {

                var main = document.querySelector('.main');
                var editItems = main.children;
                for (var i = 0; i < 2; i++) {
                    editItems[i].style.display = "none";
                }
                var previewBlogContent = editAreaLoader.getValue('textarea_1') 
                var saveBtnHTML = "<div><br><br><button id=\"saveChangesBtn\">Save Changes</button></div>" ;

                main.insertAdjacentHTML('beforeend',previewBlogContent);
                main.children[2].setAttribute('contenteditable','true');

                main.insertAdjacentHTML('beforeend',saveBtnHTML);
                document.querySelector('.input-field').focus();

                var saveChangesBtn = document.querySelector('#saveChangesBtn');
                saveChangesBtn.addEventListener('click' , function() {
                    main.children[2].setAttribute('contenteditable','false');
                    editAreaLoader.setValue('textarea_1',main.children[2].outerHTML);

                    var editItems = main.children;
                    for (var i = 0; i < 2; i++) {
                        editItems[i].style.display = "block";
                    }
                    main.removeChild(main.children[3]);
                    main.removeChild(main.children[2]);
                });
            });

            // The Load Blog as Draft Mechanism 
            var loadBlogBtn = document.querySelector('#loadBlogBtn');
            loadBlogBtn.addEventListener('click',function(e) {
                var blogObj = JSON.parse(localStorage.getItem('draftBlog'));
                editAreaLoader.setValue('textarea_1', blogObj.content)
                loadBlogBtn.innerHTML = " Draft Loaded !";
                setTimeout(function(){
                    loadBlogBtn.innerHTML = " Load Draft";
                },2000);
            });

            // The initiate Blog as Draft Mechanism 
            var initiateBlogBtn = document.querySelector('#initiateBlogBtn');
            initiateBlogBtn.addEventListener('click',function() {

                var topicListSrc = document.querySelectorAll('.index-list li');

                var liStr = "<ul class=\"blog-paragraphs\">\n";
                for (var i = 0; i < topicListSrc.length; i++) {
                    liStr += "\n<li role=\"" + topicListSrc[i].innerHTML + "\"></li>";
                }
                liStr += "\n\n</ul>"
                editAreaLoader.setValue('textarea_1', liStr);
                initiateBlogBtn.innerHTML = " Content Initiated !";
                setTimeout(function(){
                    initiateBlogBtn.innerHTML = "Change Content";
                },2000);
            })

            var insertTags = [
                {
                    open : "<h2 class=\"heading\">" ,
                    close : "</h2>"
                } ,
                {
                    open : "<p class=\"info-text\">" ,
                    close : "</p>"
                } ,
                {
                    open : "<a href=\" \" class=\"hyperlink txt-green\" >" ,
                    close : "</a>"
                } , 
                {
                    open : "<strong> " ,
                    close : " </strong>"
                } ,
                {
                    open : "<span class=\"emphasise\"> " ,
                    close : "</span>"
                } ,
                {
                    open : "<div class=\"support-image\"><img src=\"" ,
                    close : "\" class=\"border z-depth-1\"></div>"
                } ,
                {
                    open : "<pre class=\"codebox bg-dk-purple\"> " ,
                    close : "</pre>"
                } ,
                {
                    open : "<div class=\"quoted-text\"><p>" ,
                    close : "</p></div>"
                } ,
                {
                    open : "<div class=\"codepen\">" ,
                    close : "</div>"
                } 

            ];

            var insertBtnList = document.querySelectorAll('.insert-list li button');
            for (var i = 0; i < insertBtnList.length; i++) {
                insertBtnList[i].dataset.insert = i;
            }
            for (var i = 0; i < insertBtnList.length; i++) {
                insertBtnList[i].addEventListener('click',function(){
                    var index =  this.dataset.insert;
                    editAreaLoader.insertTags('textarea_1', insertTags[index].open, insertTags[index].close);
                });
            }
            document.addEventListener('keydown',function(event){
                var evt = event || window.event;
                if(evt.ctrlKey && evt.keyCode >= 49 && evt.keyCode <= 57) {
                    insertBtnList[evt.keyCode-49].click();
                    evt.preventDefault();
                }
                // 48-57  : 0-9
            });
            // console.log(frames['frame_textarea_1'].document.body);
            var main = document.querySelector('.main');
            angular.element(main).ready(function () {

                var iframe = document.getElementById('frame_textarea_1').contentDocument;
                var cssLink = "<link rel=\"stylesheet\" type=\"text/css\" href=\"css/EditAreastyle.css\">";

                iframe.head.insertAdjacentHTML("beforeend",cssLink);
            });
        };
        factory.runJs = function() {

            var wid1 = document.getElementsByClassName('widget')[0];

            var page = document.getElementsByClassName('page')[0];
            page.addEventListener('scroll',sidebarFix);

            // keep page variable and event listener together
            // page.scrollBy('130');
            


            var sidebar = document.getElementsByClassName('sidebar')[0];

            var herobanner = document.getElementsByClassName('hero-banner')[0];
            var heroheight = herobanner.clientHeight;

            function sidebarFix(e) {
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

            var btnList = document.querySelectorAll('.btn');
            for (var i = btnList.length - 1; i >= 0; i--) {
                btnList[i].addEventListener("click",function() {
                    this.classList.add("btn-click");
                    setTimeout(function(){
                        document.querySelector('.btn-click').classList.remove("btn-click");
                    },600);
                })
            };

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

                while(siblings !== null) {
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
                    };
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
                };

                localStorage.setItem('details',JSON.stringify(userDetails));
                console.log(JSON.parse(localStorage.details));
                greetuser();
            }

            // document.addEventListener('hover',greetuser);

            function greetuser() {
                var username = null;
                if (localStorage.length > 0) {
                    username = JSON.parse(localStorage.details).name;   
                }
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
            * -Use scroll event to send ajax request for new recent posts .
            */

            // Feature to copy code to clipboard just by
            // clicking on code (maybe I will add a button to do this)

            var contbig = document.getElementsByClassName('main')[0];


        };

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
