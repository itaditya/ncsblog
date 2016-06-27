var options = {
	links : '<a href="" class="hyperlink txt-green"></a>' ,
 	bold : '<strong></strong>' ,
	emphasis : '<span class="emphasise"></span>' ,
	image : '<div class="support-image">\n\t<img src="#" class="border z-depth-1"></div>' ,
	code : '<pre class="codebox bg-dk-purple"></pre>' ,
	quote : '<div class="quoted-text">\n\t<p></p></div>' ,
 	embedding : '<div class="codepen"></div>'
}
// console.log(JSON.stringify(options));

var editorOptions = document.getElementsByClassName('editor-options');
editorOptions[0].addEventListener('click',function() {
	console.log(this);
})