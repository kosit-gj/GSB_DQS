var tokenID= eval("("+localStorage.getItem("tokenID")+")");
var restfulURL="http://192.168.1.58";


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
			
			console.log(data);
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

var callFlashSlide = function(text){
	
		setTimeout(function(){
		$("#slide_status").html(text).slideDown("slow");
		},1000);
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

$(".mainMenu").click(function(){
	//alert(this.id);
	$("#naviTitle").hide();
	$("#includePage").empty();
	var page="";
	if(this.id=="User"){
		page="user_management.html";
		$("#naviLabelMenu").html("<i class=\"fa fa-user\"></i> User");
		$("#naviTitle").show();
	}else if(this.id=="Role"){
		page="rolemanagement.html";
		$("#naviLabelMenu").html("<i class=\"fa fa-group\"></i> Role");
		$("#naviTitle").show();
	}else if(this.id=="Menu"){
		page="menu_management.html";
		$("#naviLabelMenu").html("<i class=\"fa fa-th-list\"></i> Menu");
		$("#naviTitle").show();
	}else if(this.id=="Configuration"){
		page="System_Configuration.html";
		$("#naviLabelMenu").html("<i class=\"fa fa-th-list\"></i> Configuration");
		$("#naviTitle").show();
	}else if(this.id=="Branch"){
		page="branch_management.html";
		$("#naviLabelMenu").html("<i class=\"fa fa-th-list\"></i> Branch");
		$("#naviTitle").show();
	}
	
	
	
	includeFileFn(page);
	//return false;
	
	
});








