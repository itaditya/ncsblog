var cimages = document.querySelector(".carousel-images");
var coffset = cimages.style.marginLeft;
var cimg = cimages.getElementsByTagName('li');
var ncimg = cimages.childElementCount;
var baseoffset = cimages.parentNode.clientWidth;
var cloadbtn = document.querySelector("#cload");

function cimgload() {
	var couter = cimages.parentNode.parentNode;
	var loadtype = couter.dataset.loadtype;
	if (loadtype == "simple") {
		addLazyImages();
	}
	else {
		cloadbtn.style.display = "block";
	}
}

// document.addEventListener('mousemove',cimgload);

function setbaseoffset() {
	baseoffset = cimages.parentNode.clientWidth;
}
document.addEventListener('resize',setbaseoffset);

function carouselPrev() {
	if (coffset < 0) {
		coffset = coffset + baseoffset;
	}
	cimages.style.marginLeft = coffset + "px";
}
function carouselNext() {
	if (coffset > -1*baseoffset*(ncimg-1)) {
		coffset = coffset - baseoffset;
	}
	cimages.style.marginLeft = coffset + "px";
}
document.querySelector("#cnext").addEventListener('click',carouselNext);
document.querySelector("#cprev").addEventListener('click',carouselPrev);

function addLazyImages() {
	for( i=0 ; i < ncimg ; i++ ) {
		cimg[i].style.background = 'url(' + cimg[i].dataset.src + ')';
		cimg[i].style.width = baseoffset + "px";
	}
	cloadbtn.removeEventListener('click',addLazyImages);
}
cloadbtn.addEventListener('click',addLazyImages);

//Sliding through arrow keys

document.addEventListener('keydown',function() {
	var keyno = event.keyCode;
	if (keyno == 39) {
	    // key = "Right";
	    carouselNext();
	}
	if (keyno == 37) {
	    // key = "Left";
	    carouselPrev();
	}
})


// ----------------------

/* Current Features :
* Scrolling via buttons.
* Complete array of images lazy loaded together (aw!).
* Simple to use.
* Scrolling through keyboard .
* No dependencies .
* Full Control of the content placed inside .
* The html is fixed only for
  .carousel-outer > .carousel-inner > ul .carousel-images > li
  
*/

/*Features to be added :
* responsive.
* animation and delays while scrolling. 
* scrolling through keyboard and radio buttons.
* lazyload for each image rather than all together.
* auto-scrolling with circular queue.
* video carousel.
* the neighbours of active image should be opacitised
  and/or rotated-y and/or a little smaller.
*/

document.addEventListener('keydown',function(e){
	if (e.ctrlKey || e.altKey) {
		console.log("keyboard input");
	};
});


/*Scrolling Algorithim -
* User customise the width of the parent of the ul i.e. carousel-inner.
* Image loading type is detected and then addLazyImages function is called accordingly.
* Width of each li is equated to the above parent.
* The total width of the ul is found by adding width of all li .
* carousel(prev,next) func control the left  margin of the ul to scroll ,
  (more negative shows right side picture).
* the addLazyImages function is used to add images after a click of cloadbtn.
*/