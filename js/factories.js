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

        var breads = [
            'web > ' ,
            'frontend > ' ,
            'flex'
        ];

        var options = {
          web : {
            subOptions : [
              'html' ,
              'css' , 
              'javascript' ,
              'php',
              'api' ,
              'complete'
            ]
          },
          programming : {
            subOptions : [
              'cchef' ,
              'complete'
            ]
          },
          design : {
            subOptions : [
              'html' ,
              'css' , 
              'javascript' ,
              'php',
              'api' ,
              'complete'
            ]
          }
        };

        var categories = [
                {
                    title : 'Web Development' ,
                    tags : [
                        'frontend' ,
                        'design'
                    ]
                },
                {
                    title : 'Technical' ,
                    tags : [
                        'hack whatsapp' ,
                        'pokemon go'
                    ]
                },
                {
                    title : 'Programming' ,
                    tags : [
                        'codechef' ,
                        'greedy algorithim'
                    ]
                },
                {
                    title : 'Designers' ,
                    tags : [
                        'how to photoshop' ,
                        'design an id card'
                    ]
                }
            ];

        var factory = {};

        factory.getBreads = function() {
            return breads;
        };
        factory.getOptions = function() {
            return options;
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
        factory.runCommonJs = function() {
            var page = document.querySelector('.page');
            page.addEventListener('scroll',sidebarFix);

            // keep page variable and event listener together
            // page.scrollBy('130');
            


            var sidebar = document.querySelector('.sidebar');

            
            var heroheight = document.querySelector('.hero-banner').clientHeight;

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
            
            var modalBtn = document.querySelectorAll('.modalBtn');

            for (var i = modalBtn.length - 1; i >= 0; i--) {
                modalBtn[i].addEventListener('click' , toggleCommentModal);
            };

            function toggleCommentModal() {
                var closeBtn = toggler(this);
                var that = this;
                closeBtn.addEventListener('click' , function() {
                    that.click();
                });
                document.addEventListener('keydown' , function(event) {
                    var evt = event || window.event;
                    if(evt.keyCode == 27){
                        that.click();
                    }
                    evt.preventDefault();
                });
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
                return comModal.querySelector(".closeModal");
            }

            // Logic
            // Target all .modalBtn and attach click event
            // toggleCommentModal fnction is to instrct toggler fn to toggle what.
            // toggler retrns the close btn element of the crrently opened modal only.
            // that holds the reference to the respective .modalBtn only .
            // Now on clicking the .modalBtn again that modal will be toggled .

            /* _____________ */


            
            var menu = document.querySelector(".menu");
            menu.addEventListener("click",function(){
                document.querySelector(".sidebar").classList.toggle("sm-hide");
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
                    console.log(postContent);
                    var postContentInJson = JSON.stringify(postContent);
                    postContentInJson='q='+postContentInJson;
                    console.log(postContentInJson);
                    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(postContentInJson);

                    var dlAnchorElem = document.getElementById('downloadAnchorElem');
                    // dlAnchorElem.setAttribute("href",dataStr);
                    // var FileName = uniqueTag.value + '.json' ;
                    // dlAnchorElem.setAttribute("download", FileName);
                    dlAnchorElem.style.color = "#000";
                    // dlAnchorElem.click();
                    ajax("save_data.php/?",postContentInJson);

                }
            });
            
            function ajax(path,sendData) {
               var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                 var output=xhttp.responseText;
                 if(output=="Please Input Unique Tag")
                 {
                                                    //Show error for the unique tag
                 }
                 else if(output=="True")
                 {
                                                    //Forward him to his blog
                 }
                 else
                 {
                                                    //Please rewrite the blog again
                 }
                }
              };
              xhttp.open("GET", path+sendData, true);
              xhttp.send();
            }


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
                var previewBlogContent = editAreaLoader.getValue('textarea_1'); 
                var saveBtnHTML = "<div><br><br><button id=\"saveChangesBtn\">Save Changes</button></div>" ;

                main.insertAdjacentHTML('beforeend',previewBlogContent);
                main.children[2].setAttribute('contenteditable','true');

                main.insertAdjacentHTML('beforeend',saveBtnHTML);
                document.querySelector('.input-field').focus();
                document.querySelector('.input-field').blur();


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
                    document.querySelector('.input-field').focus();
                    document.querySelector('.input-field').blur();
                });
            });

            // The Load Blog as Draft Mechanism 
            var loadBlogBtn = document.querySelector('#loadBlogBtn');
            loadBlogBtn.addEventListener('click',function(e) {
                var blogObj = JSON.parse(localStorage.getItem('draftBlog'));
                editAreaLoader.setValue('textarea_1', blogObj.content);
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
                liStr += "\n\n</ul>";
                editAreaLoader.setValue('textarea_1', liStr);
                var origHTML = initiateBlogBtn.innerHTML;
                initiateBlogBtn.innerHTML = " Content Initiated !";
                setTimeout(function(){
                    initiateBlogBtn.innerHTML = origHTML;
                },2000);
            });

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
            // console.log(frames['frame_textarea_1'].document.body);
            var main = document.querySelector('.main');
            angular.element(main).ready(function () {

                var iframe = document.getElementById('frame_textarea_1').contentDocument;
                var cssLink = "<link rel=\"stylesheet\" type=\"text/css\" href=\"css/EditAreastyle.css\">";

                iframe.head.insertAdjacentHTML("beforeend",cssLink);
            });

            // Keyboard shortcuts inside iframe.
           setTimeout(function () {

                var iframe = document.getElementById('frame_textarea_1').contentDocument;

                var textarea = iframe.body.querySelector("#textarea");
                textarea.addEventListener('keydown',function(event){
                    var evt = event || window.event;
                    if (evt.ctrlKey) {
                        // console.log(evt.keyCode);
                        if(evt.keyCode >= 49 && evt.keyCode <= 57) {
                            insertBtnList[evt.keyCode-49].click();
                            evt.preventDefault();
                        }
                        else if(evt.keyCode == 83) {
                            // "Ctrl + S"
                            document.querySelector("#saveBlogBtn").click();
                            evt.preventDefault();
                        }

                        else if(evt.keyCode == 76) {
                            // "Ctrl + L"
                            document.querySelector("#loadBlogBtn").click();
                            evt.preventDefault();
                        }
                        else if(evt.keyCode == 80) {
                            // "Ctrl + L"
                            document.querySelector("#previewBlogBtn").click();
                            evt.preventDefault();
                        }
                        if(evt.keyCode == 191) {
                            // "Shift + /"
                            var hints = [
                                "\nHeading: Ctrl + 1", "\nParagraph: Ctrl + 2",
                                "\nLink: Ctrl + 3", "\nBold Text: Ctrl + 4",
                                "\nEmphasised Text: Ctrl + 5", "\nImage: Ctrl + 6",
                                "\nCode: Ctrl + 7", "\nQuote: Ctrl + 8",
                                "\nEmbed: Ctrl + 9"
                            ] ;
                            alert(hints);
                            evt.preventDefault();
                        }
                        else {
                            // do nothing ..
                        }
                    }
                    // 48-57  : 0-9
                });
            },1000);
        };
        factory.runJs = function() {

            var page = document.querySelector(".page");

            var btnList = document.querySelectorAll('.btn');
            for (var i = btnList.length - 1; i >= 0; i--) {
                btnList[i].addEventListener("click",function() {
                    this.classList.add("btn-click");
                    setTimeout(function(){
                        document.querySelector('.btn-click').classList.remove("btn-click");
                    },600);
                });
            }

            // ---------------------------------

            // Function to trigger callback when an element is visible on screen

            function scrollCall(offset,callback) {
                var scrolled = page.scrollTop;
                if(scrolled >= offset) {
                    callback();
                }
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

                var elem = document.querySelector('.footer');

                //-600 is done to trigger before footer is completely viewed

                scrollCall((offsetTop(elem)-600),function() {
                    page.removeEventListener('scroll' , showNotifications);
                    console.log('notification');
                    var content = {
                        body: 'you can use CSS to darken images',
                        icon: '../assets/dp2.jpg'
                    };
                    notifyMe('Did You Know',content);
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

            // Jump to section Feature
            
            var sidebarLi = document.querySelectorAll(".index-list li");
            var blogLi = document.querySelectorAll(".blog-paragraphs li");

            function jumpToSection() {
                
                // var blogLi = document.querySelectorAll(".blog-paragraphs li");
                console.log(blogLi);
                var id = parseInt(this.dataset.target);
                blogLi[id].setAttribute("tabindex",100);
                blogLi[id].focus();
            }
            
            if (sidebarLi.length == blogLi.length) {

                for (var i =  0; i < sidebarLi.length; i++) {
                    sidebarLi[i].dataset.target = i;
                    sidebarLi[i].addEventListener("click",jumpToSection);
                    blogLi[i].setAttribute("tabindex",i);
                }
            }
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
    * placeholder color in firefox . 
    * trouble with height of main and/or container 
      causing overflowing of content rather than increasing height .
     -- maybe the problem is with codepen only (yippee!)
     --- fixed :) by oveflow scroll on codepen (!strange)
    * sidebar problem with firefox .
    * JS is loading before Angular can render the page .
     --- fixed ;) by placing js in factory and calling it from ctrl on document loaded.
*/
