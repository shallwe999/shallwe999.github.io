/*
	Iridium by TEMPLATED
    templated.co @templatedco
    Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

function getRootPath_dc() {
	var pathName = window.location.pathname.substring(1);
	var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));
	if (webName == "") {
		return window.location.protocol + '//' + window.location.host;
	}
	else {
		return window.location.protocol + '//' + window.location.host + '/' + webName;
	}
}

skel.init({
	// Used on the local website.
	//prefix: getRootPath_dc() + 'coding/blog/blog_alpha/' + 'css/style',
	// Used on the remote website.
	prefix: 'https://shallwe999.github.io' + '/css/style',
	resetCSS: true,
	boxModel: 'border',
	grid: {
		gutters: 50
	},
	breakpoints: {
		'mobile': {
			range: '-480',
			lockViewport: true,
			containers: 'fluid',
			grid: {
				collapse: true,
				gutters: 10
			}
		},
		'desktop': {
			range: '481-',
			containers: 1200
		},
		'1000px': {
			range: '481-1200',
			containers: 960
		}
	}
}, {
	panels: {
		panels: {
			navPanel: {
				breakpoints: 'mobile',
				position: 'left',
				style: 'reveal',
				size: '80%',
				html: '<div data-action="navList" data-args="nav"></div>'
			}
		},
		overlays: {
			titleBar: {
				breakpoints: 'mobile',
				position: 'top-left',
				height: 44,
				width: '100%',
				html: '<span class="toggle" data-action="togglePanel" data-args="navPanel"></span>' +
 '<span class="title" data-action="copyHTML" data-args="logo"></span>'
			}
		}
	}


});


/*** 初始化返回顶部功能 ***/
window.addEventListener('scroll', function(e){
	var t = document.documentElement.scrollTop || document.body.scrollTop;
	if(t > 400){
		$('.back_top').show();
	}else{
		$('.back_top').hide();
	}
});

function clickBackToTop() {
	$('body,html').animate({scrollTop: 0}, 300);
	return false;
};


/*** 置顶栏显示 ***/
var topnavStatus = false;  // 标示是否切换到置顶栏状态
var isAnimated = true;  // 标示动画是否执行
var topnavInit = true;  //第一次调用

window.addEventListener('scroll', function(e){
	var t = document.documentElement.scrollTop || document.body.scrollTop;
	if (t > 300){
		if (!topnavStatus){
			isAnimated = false;
		}
		$('#topnav').show();
		if(topnavInit || (!isAnimated && topnavStatus)){  //如果动画没执行过
			$("#topnav").css("top", "-46px");  //每次要执行动画之前都将top值设为-45px
			$("#topnav").animate({"top": "0px"}, 450);
			isAnimated = true;
			topnavInit = false;
		}
		topnavStatus = true;
	}else{
		topnavInit = false;
		if (topnavStatus){
			isAnimated = false;
		}
		if(!isAnimated && !topnavStatus){  //如果动画没执行过
			$("#topnav").css("top", "0px");  //每次要执行动画之前都将top值设为-45px
			$("#topnav").animate({"top": "-46px"}, 450);
			isAnimated = true;
		}
		topnavStatus = false;
	}
});


/*** Github 名片功能（作者：xuelangZF） ***/
window.onload = (function() {
	var e = document.getElementById('github-usercard');
	var username = e.getAttribute("user");

	if (username) {
	  var api_url = 'https://api.github.com/users/' + username;
	} else {
	  return fail();
	}

	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
	  if (request.readyState === 4) {
		if (request.status === 200) {
		  return success(request.responseText);
		} else {
		  return fail();
		}
	  } else {
		// HTTP is continuing....
	  }
	}

	// Sent request
	request.open('GET', api_url);
	request.send();

	function success(text) {
	  var response_obj = JSON.parse(request.responseText)
	  var s =
		'<div class="github-usercard">' +
		'<div class="github-hd">' +
		'<a class="github-avatar" href="' + response_obj.html_url + '" target="_top">' +
		'<img src="' + response_obj.avatar_url + '&amp;s=48"></a>' +
		'</a>' +
		'<strong><a target="_blank" style="float: left;" href="' + response_obj.html_url + '">' +
		response_obj.name + '</a></strong>' +
		'<div class="right"><a class="github-btn" href="' + response_obj.html_url + '">Follow</a></div>' +
		'<span>@' + username + '</span>' +
		'</div>' +
		'<div class="github-bd">' +
		'<div class="github-desc">' +
		response_obj.bio +
		'<ul><li>' +
		'<a href="https://github.com/' + username + '?tab=repositories" target="_top"><strong>' + response_obj.public_repos + '</strong>Repos</a>' +
		'</li>' +
		'<li>' +
		'<a href="https://gist.github.com/' + username + '" target="_top"><strong>' + response_obj.public_gists + '</strong>Gists</a>' +
		'</li>' +
		'<li>' +
		'<a href="https://github.com/' + username + '/followers" target="_top"><strong>' + response_obj.followers + '</strong>Followers</a></li>' +
		'</ul>' +
		'</div>' +
		'</div>' +
		'</div>';
	  e.innerHTML = s;
	}

	function fail() {
	  e.innerHTML = "Get user info failed.";
	}
});


/*** 实现Loading界面展示 ***/

//监听加载状态改变
document.onreadystatechange = completeLoading;

//加载状态为complete时移除loading效果
function completeLoading() {
    if (document.readyState == "complete") {
		var loadingMask = document.getElementById('loading-circle');
		$('#loading-circle').animate({opacity: 0}, 400, function(){loadingMask.parentNode.removeChild(loadingMask);});
    }
}


