#NCS BLOG
___

## *Project Description*
> As a developer I felt the need for a college blogging app . I made it using
Angular JS framework . It stands feature rich today with lots of awesome
blog helping fellow geeks at : NCS Blog[http://adiblog.esy.es/]

### *Need For Blog*

### *How to contribute*

> Fork this repo by clicking the FORK button above ^ .

* then clone this repo into your local workstation using 
	
` git clone www.github.com/< your git id >/ncsblog.git

* jump in the directory containing the cloned repo with

` cd < path >

* So now, you have the project ready to begin with .

### For contribution in CSS and JS 

* the css/ folder holds all the css, but you should make a new file only .
* always prefer making new classes(with sensible names) and style them whenever possible.
* using Id to style multiple items is not alllowed (use classes) .
* all featured JS is included in the js/factory.js file.
* All the html elements are targeted through 
	```
	document.querySelector(".class_name") 
	*and* 
	document.querySelector("#id_name") 

	```
* events are handled via 
	
	```
	document.querySelector("element").addEventListener("event",function_name);

	```
* terminate statements via semicolons.
* check your Js authenticity via #JsLint before sending PR(s). 
* avoid using Global variables.
* do not tamper with controller.js .
* always Pull the latest code and then Push to it.
* before sending a PR, register an issue.

* use of jqLite and Vanilla Js instead of jQuery is highly supported because the project has only two dependencies : EditArea text editor and Angular Js framework.

#### Main Concerns :
* The Blog Author dashboard .
* The Blog website landing page featuring trending and latest blogs in an intuitive manner.

### For contribution in backend

* will be updated soon, hold your horses. 


*Important :* ### No Pull Request will be merged on master branch .
Kindly use the contribute branch . 