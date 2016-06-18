var wid1 = document.getElementsByClassName('widget')[0];
// window.title = "Aditya";
// console.log(wid1.innerHTML);
console.log(screen.width);
var date = new Date();
console.log(date.getUTCDay())
document.addEventListener("keydown",print);

localStorage.setItem('myCat', 'Tom');
localStorage.setItem('myName', 'Aditya');

console.log(JSON.stringify(localStorage));

function print(e) {
	if (e.ctrlKey){
		console.log("ctrl");
		// preventDefault();
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

var comBtn = document.getElementById('comBtn');
comBtn.addEventListener('click' , toggleCommentModal);

var closeBtn = document.getElementsByClassName('closeModal')[0];

function toggleCommentModal() {

	var comModal = comBtn.dataset.toggle;
	comModal = document.getElementById(comModal);

	if (comModal.style.display == 'block') {
		comModal.style.display = 'none';
	}
	else {
		comModal.style.display = 'block';
		comModal.classList.add('animated');
		comModal.classList.add('fadeIn');
	}

	closeBtn.addEventListener('click' , toggleCommentModal);
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

// Functions for dynamic content loading based on scrolling .
 
page.addEventListener('scroll' , showNotifications);

function showNotifications() {

	var elem = document.getElementsByClassName('footer')[0];

	scrollCall(offsetTop(elem),function() {
		page.removeEventListener('scroll' , showNotifications);
		console.log('notification');
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

// Local storage

function storageAvailable(type) {
	try {
		var storage = window[type],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return false;
	}
}

if (storageAvailable('localStorage')) {
	// Yippee! We can use localStorage awesomeness
}
else {
	// Too bad, no localStorage for us
} 
//--------------
// AJAX --------------------------

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'my_data.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

function init() {
 loadJSON(function(response) {
  // Parse JSON string into object
    var actual_JSON = JSON.parse(response);
 });
}
//--------------------------------
//----------------------------------------------------------------------------

/* Future --

* -Use google prety code
* -Use codepen embeds --done
* -Use local storage to save user name and description like front/back/design..
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
*/
