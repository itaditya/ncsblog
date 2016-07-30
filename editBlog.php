<!Doctype html>
<html  ng-cloak ng-app="blogApp" lang="en" ng-controller="blogCtrls">
<head>
	<meta charset="utf-8">
	<title> {{pagename}}</title>
	<link rel="stylesheet" type="text/css" href="../css/style.css">
	<link rel="stylesheet" type="text/css" href="../css/lightanim.css">
	<script src="../bower_components/angular/angular.js"></script>	
	<script src="../bower_components/angular-route/angular-route.js"></script>	
	<script type="text/javascript" src="../bower_components/editarea_0_8_2/edit_area/edit_area_full.js"></script>
	<script type="text/javascript">
		editAreaLoader.init({
			id : "textarea_1"		// textarea id
			,font_size : 14
			,word_wrap : true
			,allow_toggle : false
			,allow_resize : "yes"
			// ,toolbar: "search, go_to_line, undo, redo, |, select_font, |, syntax_selection, |, fullscreen,|, change_smooth_selection, |, help"
			// ,plugins : "charmap"
			,toolbar: "search, go_to_line, undo, redo, |, select_font, |, fullscreen,|, change_smooth_selection, |, help"
			,min_width : 800
			,syntax: "html"			// syntax to be uses for highgliting
		});
	</script>
	<style>

		select , #uniqueTag {
			width: 180px;
			height: 50px;
			padding-left: 20px;
			background: #fff;
	        border: 1px solid #888;
		}
		#uniqueTag.ng-invalid.ng-touched {
			border: 1px solid #E00909;
		}
		.uniqueTagError {
			font-size: 12px;
			color: #E00909;
			font-weight: bold;
		}
		.crumbs-connector {
			margin: 10px 20px;			
		}
		button {
			height: 40px;
			margin: 5px 2px;
			padding: 2px 10px;
		}
		.hint-pop:before, .hint-pop:after {
			content: "Press Ctrl + ? for Shortcuts";
			font-size: 14px;
			font-weight: bold;
			word-spacing: -1px;
			color: #555;
		}
		.hint-pop:after {
			content: "Write paragraphs in their topic li's";
			float: right;
		}
		.insert-list {
			text-align: center;
			padding: 0;
			margin: 0;
		}
		.insert-list button {
			padding: 4px 0px;
			width: 100%;
		}
		#postBlogBtn, #saveChangesBtn {
			float: right;
		}
	</style>
</head>

<body>
	<div class="page animated fadeIn">
		<nav-bar info="nav" class="navbar" role="banner"></nav-bar>
		<!-- navbar ends -->
		<!-- <blog-banner info="blog1"></blog-banner> -->
		<hero-banner info="author" class="hero-banner"></hero-banner>
		<!-- Hero Poster Ends -->
		<section class="container" role="blog content">
			<main class="main z-depth border">
				<form name="form" novalidate>
					<select name="club" id="clubSelector">
						<option ng-repeat="club in clubs" value="{{ club }}">
							{{ club | uppercase }}
						</option>
					</select>
					<span class="crumbs-connector">></span>
					<select name="club-inner">
						<option ng-repeat="inner in clubInner" value="{{ inner }}">
							{{ inner | uppercase }}
						</option>
					</select>
					<span class="crumbs-connector">></span>
					<input type="text" id="uniqueTag" name="uniqueTag" placeholder="Add a Unique Tag" ng-model="blog.tag" ng-model-options="{ updateOn: 'default blur' }" ng-minlength="4" required>
					<span class="uniqueTagError" ng-show="form.uniqueTag.$error.minlength">More Than 4 Chars !</span>
<!-- 					<span class="uniqueTagError" ng-show="form.uniqueTag.$error.required">Unique Tag is required</span>
 -->
				</form>
				<!-- {{ blogParagraphs }} -->
			</main>
			<!-- End of Main -->
			<!-- sidebar starts -->
			<aside class="sidebar sm-hide">
				<div class="widget border">
					<p>Contents</p>
					<ul class="index-list">
						<li data-ng-repeat="topic in topics">{{topic}}</li>
					</ul>
					<button id="initiateBlogBtn">Save Content
					</button>
				</div>
				<div class="widget border">
					<p>Insert Element</p>
					<ul class="insert-list">
						<li><button>Heading</button></li>
						<li><button>Paragraph</button></li>
						<li><button>Link</button></li>
						<li><button>Bold Text</button></li>
						<li><button>Emphasised Text</button></li>
						<li><button>Image</button></li>
						<li><button>Code</button></li>
						<li><button>Quote</button></li>
						<li><button>Embed</button></li>
					</ul>
				</div>
				<div class="border widget-sm">
					<p>Don't Be Shy, See Me Once</p>
					<div class="btn modalBtn" data-toggle-id="helpModal">Help !</div>
				</div>
			</aside>
		</section>
		<!-- .main blog container ends -->
<!-- 		<section class="posts-card">
			<div class="preloader-box" ng-hide="postsLoaded">
				<div class="preloader"></div>
			</div>
			<div class="card-details border" ng-repeat="post in posts | orderBy : 'date'" ng-show="postsLoaded">
				<div class="img-container">
					<img ng-src=" {{post.imgsrc}} ">
					<div class="overlay">
						<div class="caption">
							<a ng-href="{{post.link}}">View</a>
						</div>
					</div>
				</div>
				<p>{{post.title}} ({{post.date | date}})</p>
			</div>
		</section> 
	-->
		<blog-footer info="footer" class="footer bg-dk-purple"></blog-footer>
		<div class="modal" id="helpModal">
			<span class="closeModal icon-cross"></span>
			<h2>Help Arriving Soon ..</h2>
		</div>

	</div>
	<!-- Page ends -->

	<!-- Scripts -->

	<!-- Modules -->
	<script src="../js/app.js"></script>

	<!-- Controllers -->
	<script src="../js/controllers.js"></script>

	<!-- Directives -->
	<script src="../js/directives.js"></script>


	<!-- Factories -->

	<script src="../js/factories.js"></script>

	<!--
	<script type="text/javascript" src="js/main.js"></script> 
	<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?lang=css&amp;skin=sunburst"></script>
	<script src="js/routes.js"></script>
	
	-->
</body>
</html>