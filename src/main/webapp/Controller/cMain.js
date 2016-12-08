var tokenID= eval("("+localStorage.getItem("tokenID")+")");
var restfulURL="http://192.168.1.58";
//Global Parameter Start
var galbaMenuObj=[];
//Global Parameter End


if(tokenID==null){
	window.location.href = "login.html"; 
};

$( document ).ajaxStart(function() {
	$("body").mLoading();
});
$( document ).ajaxStop(function() {
	$("body").mLoading('hide');
});

var checkSession = function(){
	$.ajax({
		url:restfulURL+"/dqs_api/public/session",
		type:"GET",
		dataType:"json",
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
		
			if(data['status']!="200"){
				window.location.href = "login.html"; 
			}else{
				$("#mainContent").show();
				$("#fullName").html(tokenID.data['full_name']);
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
		    if('error'==textStatus){
		    	window.location.href = "login.html"; 
		    }
		}
		
	});
}
checkSession();

var logoutFn = function(){
	$.ajax({
		url:"http://192.168.1.58/dqs_api/public/session",
		type:"DELETE",
		dataType:"json",
		headers:{Authorization:"Bearer "+tokenID.token},
		//data:{token:tokenID.token},
		success:function(data){
			
			//console.log(data);
			if(data['status']=="200"){
			
				window.location.href = "login.html"; 
				localStorage.setItem("tokenID","{}");
				
			}
			
			
		},
		error: function(jqXHR, textStatus, errorThrown) {
		    //alert(jqXHR.status);
		    //alert(textStatus);
		    if('error'==textStatus){
		    	window.location.href = "login.html"; 
		    	
		    }
		    //alert(errorThrown);
		   // console.log(jqXHR);
		}
	});
}

$("#logOut").click(function(){
	logoutFn();
});

var getMainMenu = function(role_id){
	//galbaMenuObj
	http://192.168.1.58/dqs_api/public/dqs_role/{role_id}/authorize
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_role/"+role_id+"/authorize",
		type:"GET",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//console.log(data);
			galbaMenuObj=data;
		}
	});
};
//getMainMenu(1);

var listMenuFn = function(){
	
	var DQManagementMenuCate="";
	var DQMonitoringMenuCate="";
	var reportMenuCate="";
	
	$.each(tokenID.data.menu,function(index,indexEntry){
		//console.log(indexEntry['menu_id']);
		var URLNotExtension=indexEntry['app_url'].split(".");
		URLNotExtension=URLNotExtension[0];
		
		//console.log(indexEntry['menu_category']);
		//console.log(indexEntry['role_active']);//menu_category
		if(indexEntry['menu_category']=="MM"){
			DQManagementMenuCate+="<li><a class=\"mainMenu\" id=\"menu-"+indexEntry['menu_id']+"\" href=\"#/pages/"+URLNotExtension+"\"><div class=\"menu_name\">"+indexEntry['menu_name']+"</div><div class=\"app_url app_url_hidden\">"+indexEntry['app_url']+"</div></a></li>";
		}else if(indexEntry['menu_category']=="MN"){
			DQMonitoringMenuCate+="<li><a class=\"mainMenu\" id=\"menu-"+indexEntry['menu_id']+"\" href=\"#/pages/"+URLNotExtension+"\"><div class=\"menu_name\">"+indexEntry['menu_name']+"</div><div class=\"app_url app_url_hidden\">"+indexEntry['app_url']+"</div></a></li>";
		}else if(indexEntry['menu_category']=="RP"){
			reportMenuCate+="<li><a class=\"mainMenu\" id=\"menu-"+indexEntry['menu_id']+"\" href=\"#/pages/"+URLNotExtension+"\"><div class=\"menu_name\">"+indexEntry['menu_name']+"</div><div class=\"app_url app_url_hidden\">"+indexEntry['app_url']+"</div></a></li>";
		}
	});
	$("#DQManagementMenuCate").html(DQManagementMenuCate);
	$("#DQMonitoringMenuCate").html(DQMonitoringMenuCate);
	$("#reportMenuCate").html(reportMenuCate);
	//console.log(tokenID.data.menu);
};
listMenuFn();

var callFlashSlide = function(text){
	
		//setTimeout(function(){
		$("#slide_status").html(text).slideDown("slow");
		//},1000);
		setTimeout(function(){
			$("#slide_status").slideUp();
		},3000);
}

var includeFileFn = function(paramUrl){
	
	$.ajax({
		url:paramUrl,
		type:"GET",
		dataType:"html",
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			//console.log(data);
			$("#includePage").html(data);
		},
		error: function(jqXHR, textStatus, errorThrown) {
		    if('error'==textStatus){
		    	window.location.reload(true);
		    }
		    //alert(errorThrown);
		   // console.log(jqXHR);
		}
		
	});
}

//$(".mainMenu").click(function(){
//
//	$("#naviTitle").hide();
//	$("#includePage").empty();
//	var page=$(".app_url",this).text();
//	var menuName=$(".menu_name",this).text();
//	//alert(page.trim());
//	if(page.trim()=="#"){
//		//return false;
//	}else{
//		includeFileFn(page);
//	}
//	$("#naviLabelMenu").html("<i class=\"fa fa-share-alt\"></i> "+menuName+"");
//	$("#naviTitle").show();
//	
//	
//	
//	
//});

$(".mainMenu").click(function(){
	var url=$(".menu_name",this).text();
	var link=$(".app_url",this).text();
	
//routeTest(url,link);
});
var app = angular.module("myApp", ["ngRoute"]);



app.config(function($routeProvider) {
	$routeProvider
	.when("/", {
        templateUrl : "home.html"
    })
    .when("/pages/:url", {
        templateUrl : "home.html",
        controller:"pageController"
    	
    })
    
    .otherwise({
    	templateUrl : "home.html"
    });
});

app.controller("pageController",function($scope, $route, $routeParams){

	$route.current.templateUrl = './' + $routeParams.url + ".html";
	//$route.current.controller = $routeParams.url;
	  $.get($route.current.templateUrl, function (data){
	      // console.log(data);
	       $("#includePage").html(data);
	      // $("#naviLabelMenu").html("<i class=\"fa fa-share-alt\"></i> "+menuName+"");
	   	   $("#naviTitle").show();
	    });
});
/*
app.controller('myCtrl2', function($scope) {
    $scope.firstname = "John11";
    $scope.lastname = "Doe";   
    console.log($scope.lastname);
});
*/












