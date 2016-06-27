// console.log(JSON.stringify(document.getElementsByClassName('blog-paragraphs')[0].outerHTML));
var wid1 = document.getElementsByClassName('widget')[0];
// window.title = "Aditya";
// console.log(wid1.innerHTML);
console.log(screen.width);
var date = new Date();
console.log(date.getUTCDay())
document.addEventListener("keydown",print);
function print(e) {
	if (e.ctrlKey){
		console.log("ctrl");
		var loc = document.location.pathname;
		var sloc = loc.substring(0,(loc.lastIndexOf('.')-4));
		var path = "blogs"+sloc+".json";
		console.log(path);
		// var sloc = loc.toString(loc);
		// console.log(sloc.split());

		e.preventDefault();
	}
}

// Closure
function outer(x) {
	return function(y) {
		console.log(x+y)
	}
}
func = outer(10);
func(20);

// Closure End
var page = document.getElementsByClassName('page')[0];
page.addEventListener('scroll',sidebar);

// keep page variable and event listener together
// page.scrollBy('130');

var sidebar = document.getElementsByClassName('sidebar')[0];

var herobanner = document.getElementsByClassName('hero-banner')[0];
var heroheight = herobanner.clientHeight;

// var container = document.getElementsByClassName('container')[0];
// var contheight = contheight.clientHeight;

// var postscard = document.getElementsByClassName('posts-card')[0];
// var postsheight = postscard.clientHeight;


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

/* Logic

 * the btton has the id of its modal in dataset .
 * the modal display state is toggled then with animation.
*/

/* Improvement to be done
 * for every btn having data-toggle=modal/tooltip/etc. we have to trigger that 
   through its data-toggle-id i.e. generalise it.
*/
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
	// 	sidebar.style.position = 'relative';
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

	scrollCall((offsetTop(elem)-500),function() {
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
}

// document.addEventListener('hover',greetuser);

function greetuser() {
	var username = null;
	if (localStorage.length > 0) {
		username = JSON.parse(localStorage.details).name;	
	};
	if(username != null) {
		console.log('Hello ',username);
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
* -Use codepen embeds --done
* -Use local storage to save user name and description like front/back/design.. --done
* -Use notification to display a did you know when scrolled just beore footer. --done   
* -Use scroll event to send ajax request for new recent posts .
*/

// Feature to copy code to clipboard just by
// clicking on code (maybe I will add a button to do this)

var contbig = document.getElementsByClassName('main')[0];


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
*/
