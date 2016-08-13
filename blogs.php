<!Doctype html>
<html  ng-cloak ng-app="blogApp" lang="en" ng-controller="blogCtrls">
<head>
	<meta charset="utf-8">
	<title> {{pagename}}</title>
	<link rel="stylesheet" type="text/css" href="../css/style.css">
	<link rel="stylesheet" type="text/css" href="../css/lightanim.css">
	<script src="../bower_components/angular/angular.js"></script>
	<script src="../bower_components/scroll/scroll.min.js"></script>
</head>
<body>
	<div class="page animated fadeIn">
		<nav-bar info="nav" class="navbar" role="banner"></nav-bar>
		<!-- navbar ends -->
		<!-- <blog-banner info="blog1"></blog-banner> -->
		<hero-banner info="author" class="hero-banner"></hero-banner>
		<!-- Hero Poster Ends -->
		<section class="container" role="blog content">
			<main class="main z-depth border animated fadeIn">
				<ul class="breadcrumb">
					<li data-ng-repeat="crumbs in breads"> {{ crumbs | uppercase }} </li>
				</ul>
				<!-- <span class="blog-date"></span> -->
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
				</div>
				<side-bar info="sidebar" class="sm-hide"></side-bar>
			</aside>
		</section>
		<!-- .main blog container ends -->
		<!-- <p class="posts-text">Read these latest articles<br></p> -->
		<section class="posts-card">
			<div class="preloader-box" ng-hide="postsLoaded">
				<div class="preloader"></div>
			</div>
			<div class="card-details border" ng-repeat="post in posts | orderBy : 'date'" ng-show="postsLoaded">
				<div class="img-container">
					<img ng-src=" {{post.imgsrc}} ">
					<div class="overlay">
						<div class="caption">
							<a ng-href="{{post.link}}" class="btn">View</a>
						</div>
					</div>
				</div>
				<p>{{post.title}} ({{post.date | date}})</p>
			</div>
			<!-- <input autofocus> -->
		</section>
		<blog-footer info="footer" class="footer bg-dk-purple"></blog-footer>
		<div class="modal" id="commentModal">
			<span class="closeModal icon-cross"></span>
			<h2>Fb Comments Coming Soon ..</h2>
		</div>
		<div class="modal" id="quizModal">
			<span class="closeModal icon-cross"></span>
			<h2>Quiz Coming Soon ..</h2>
		</div>
		<div class="modal" id="adModal">
			<span class="closeModal icon-cross"></span>
			<h2>Ads Not Coming Soon ..</h2>
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