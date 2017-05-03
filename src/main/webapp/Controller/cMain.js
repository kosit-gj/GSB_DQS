var tokenID= eval("("+sessionStorage.getItem("tokenID")+")");
//Global Parameter Start
var galbaMenuObj=[];
var nameMenuData="";
//Global Parameter End

var checkMaintenanceFn = function(data){
	
	if(data['maintenance']==1 ){
		window.location.href = "./maintenance.html"; 
		return false;
	}else{
		return true;
	}
}

//insert usage log
var insertUsageLogFn = function(menu_id){
	
	$.ajax({
		url:restfulURL+"/dqs_api/public/session/log",
		type:"post",
		dataType:"json",
		headers:{Authorization:"Bearer "+tokenID.token},
		data:{"menu":menu_id},
		async:false,
		success:function(data){
			checkMaintenanceFn(data);
			if(data['status']==200){
				console.log("insert to log success.");
			}
		}
	});
}



//listCustomerTypeArea
var dropDownListCusType = function(id){
	
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_monitoring/cust_type",
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
		checkMaintenanceFn(data);
		var html="";	
		html+="<select class=\"form-control input-sm listBranch\" id=\"listCusType\">";
		html+="<option selected='selected' value=''> All Customer Type</option>";
		
		$.each(data,function(index,indexEntry){
			
				html+="<option  value="+indexEntry["gsbccode"]+">"+indexEntry["desc"]+"</option>";	
				
		});	
		html+="</select>";
		$("#listCusTypeArea").html(html);
		}
		
	});
};


//DropDownList ContactType
var dropDownListContactType = function(txt){
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_maintenance/contact_type",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
		checkMaintenanceFn(data);
		var html="";	
		html+="<select class=\"form-control input-sm listContactType\" id=\"listContactType\">";
		if(txt == "All"){html+="<option selected value=''>All Contact Type</option>";}
		$.each(data,function(index,indexEntry){
						//console.log(indexEntry["contact_type"]);
				//html+="<option  value=\""+indexEntry["contact_type"]+"\">"+indexEntry["contact_type"]+"</option>";
				html+="<option  value='"+indexEntry["contact_type"]+"'>"+indexEntry["contact_type"]+"</option>";
				
		});	
		html+="</select>";
		
		$("#contactTypeArea").html(html);
			
		}
	});
};

//Drop Down Operation Report Start
var dropDownListOperation = function(){
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_operation_report/operation_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
		checkMaintenanceFn(data);
		var html="";	
		html+="<select class=\"form-control input-sm listOperation\" id=\"listOperation\">";
		html+="<option selected='selected' value=''>All Operation</option>";
		$.each(data,function(index,indexEntry){
			
				html+="<option  value="+indexEntry["operation_id"]+">"+indexEntry["operation_name"]+"</option>";	
			
		});	
		html+="</select>";
		$("#listOperationArea").html(html);
		}
	});
};

var dropDownListRegion = function(operation_id){
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_operation_report/region_list",
		type:"get",
		dataType:"json",
		async:false,
		data:{operation_id:operation_id},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
		checkMaintenanceFn(data);
	    var html="";	
		html+="<select class=\"form-control input-sm listRegion\" id=\"listRegion\">";
		
		html+="<option selected='selected' value=''>All Region</option>";
		$.each(data,function(index,indexEntry){

				html+="<option  value="+indexEntry["region"]+">"+indexEntry["regdesc"]+"</option>";	
				
		});	
		html+="</select>";
		$("#listRegionArea").html(html);
		
		}
	});
};
var dropDownListDistrict = function(region){
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_operation_report/district_list",
		type:"get",
		dataType:"json",
		async:false,
		data:{region:region},
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
		checkMaintenanceFn(data);
		var html="";	
		html+="<select class=\"form-control input-sm listDistrict\" id=\"listDistrict\">";
		html+="<option selected='selected' value=''>All District</option>";
		$.each(data,function(index,indexEntry){
			
				html+="<option  value="+indexEntry["dist"]+">"+indexEntry["distdesc"]+"</option>";			
					
		});	
		html+="</select>";
		$("#listDistrictArea").html(html);
		
		}
	});
};

var dropDownListBranchReport = function(dist){
	
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_operation_report/branch_list",
		type:"get",
		dataType:"json",
		data:{dist:dist},
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
		checkMaintenanceFn(data);
		var html="";	
		html+="<select class=\"form-control input-sm listBranch\" id=\"listBranch\">";
		html+="<option selected='selected' value=''>All Branch</option>";
		$.each(data,function(index,indexEntry){
			
				html+="<option  value="+indexEntry["brcd"]+">"+indexEntry["desc"]+"</option>";	
				
		});	
		html+="</select>";
		$("#listBranchArea").html(html);
		
		}
	});
};
var dropDownListYear = function(id){
	
		var currentTime = new Date();
		var year = currentTime.getFullYear();
		var html="";	
		html+="<select class=\"form-control input-sm listYear\" id=\"listYear\">";
		for(var i=year; i>=1913;i--){
			
			html+="<option>"+i+"</option>";
			
		}
		html+="</select>";
		$("#listYearArea").html(html);
		
	
};
var dropDownListMonth = function(){

	var currentTime = new Date();
	var cureentMonth = currentTime.getMonth()+1;
	var data=[{"id":"1","name":"มกราคม"},
	              {"id":"2","name":"กุมภาพันธ์"},
	              {"id":"3","name":"มีนาคม"},
	              {"id":"4","name":"เมษายน"},
	              {"id":"5","name":"พฤษภาคม"},
	              {"id":"6","name":"มิถุนายน"},
	              {"id":"7","name":"กรกฎาคม"},
	              {"id":"8","name":"สิงหาคม"},
	              {"id":"9","name":"กันยายน"},
	              {"id":"10","name":"ตุลาคม"},
	              {"id":"11","name":"พฤศจิกายน"},
	              {"id":"12","name":"ธันวาคม"},
	              ];
		var html="";	
		html+="<select class=\"form-control input-sm listMonth\" id=\"listMonth\">";
		//html+="<option  value=''>All</option>";
		$.each(data,function(index,indexEntry){
			if(cureentMonth==indexEntry["id"]){
				html+="<option selected value="+indexEntry["id"]+">"+indexEntry["name"]+"</option>";			
			}else{
				html+="<option  value="+indexEntry["id"]+">"+indexEntry["name"]+"</option>";	
			}		
		});	
		html+="</select>";
		$("#listMonthArea").html(html);
		
	
};
//Drop Down Operation Report End

//check value not null
var notNullFn = function(data){
	var dataNotNull="";
	if((data == '' || data == 'undefinided' || data == null )){
		dataNotNull="";
	}else{
		dataNotNull=data;
	}
	return dataNotNull;
}

//set paginate start
var paginationSetUpFn = function(pageIndex,pageButton,pageTotal){
	if(pageTotal==0){
		pageTotal=1
	}
	$('.pagination_top,.pagination_bottom').off("page");
	$('.pagination_top,.pagination_bottom').bootpag({
	    total: pageTotal,//page Total
	    page: pageIndex,//page index
	    maxVisible: 5,//จำนวนปุ่ม
	    leaps: true,
	    firstLastUse: true,
	    first: '←',
	    last: '→',
	    wrapClass: 'pagination',
	    activeClass: 'active',
	    disabledClass: 'disabled',
	    nextClass: 'next',
	    prevClass: 'prev',
	    next: 'next',
	    prev: 'prev',
	    lastClass: 'last',
	    firstClass: 'first'
	}).on("page", function(event, num){
		var rpp=10;
		if($("#rpp").val()==undefined){
			rpp=10;
		}else{
			rpp=$("#rpp").val();
		}
		
		getDataFn(num,rpp);
		
	    $(".pagingNumber").remove();
	    var htmlPageNumber= "<input type='hidden' id='pageNumber' name='pageNumber' class='pagingNumber' value='"+num+"'>";
	    $("body").append(htmlPageNumber);
	   
	}); 

	$(".countPagination").off("change");
	$(".countPagination").on("change",function(){

		$("#countPaginationTop").val($(this).val());
		$("#countPaginationBottom").val($(this).val());
		
		getDataFn(1,$(this).val());
		
		$(".rpp").remove();
		$(".pagingNumber").remove();
		var htmlRrp="";
		htmlRrp+= "<input type='hidden' id='rpp' name='rpp' class='rpp' value='"+$(this).val()+"'>"; 
	    htmlRrp+= "<input type='hidden' id='pageNumber' name='pageNumber' class='pagingNumber' value='1'>";
	   

	    $("body").append(htmlRrp);
	});
}
//set paginate end
var searchFn = function(searchID,tableID){
	
	// Declare variables
	  var input, filter, table, tr, td,id2,id3, i;
	  input = document.getElementById(searchID);
	  filter = input.value.toUpperCase();
	  table = document.getElementById(tableID);
	  tr = table.getElementsByTagName("tr");

	  // Loop through all table rows, and hide those who don't match the search query
	  for (i = 0; i < tr.length; i++) {
	    td = tr[i].getElementsByTagName("td")[0];
	    if (td) {
		      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
		        tr[i].style.display = "";
		      } else {
		        tr[i].style.display = "none";
		      }
	    }
	  }
	  
	 
	
};

var searchMultiFn=function(search,searchName){
	var paramSearchName="";
	 if(searchName==undefined){
		 paramSearchName="";
	 }else{
		 paramSearchName =searchName;
	 }
	 
	 var search = search.trim().toLowerCase();
	 $(".rowSearch"+paramSearchName).hide();
     $.each( $(".rowSearch"+paramSearchName),function(index1,indexEntry1){
    	 //console.log(indexEntry1);	
    	 var i=0;
    	 $.each($(".columnSearch"+paramSearchName,this),function(index2,indexEntry2){
    		 //console.log($(indexEntry2).text());
    		 //console.log($(indexEntry2).text().indexOf(search));
    		 if($(indexEntry2).text().trim().toLowerCase().indexOf(search)>=0){
    			 $(this).parent().show();
    			 return false;
    		 }
    	 });
     });
}

var firstDayInMonthFn = function(){
	var d = new Date();
	var month = d.getMonth()+1;
	var day = d.getDate();
	
	var output = d.getFullYear() + '-' +
	    ((''+	month).length<2 ? '0' : '') + month + '-01';
	return output;
}
var currentDateFn = function(){
	var d = new Date();
	var month = d.getMonth()+1;
	var day = d.getDate();
	var output = d.getFullYear() + '-' +
	    ((''+month).length<2 ? '0' : '') + month + '-';
	    if(day==1){
	    	output+= ((''+day).length<2 ? '0' : '') + day;
	    }else{
	    	 output+= ((''+day).length<2 ? '0' : '') + (day-1);	
	    }
	return output;
}
var currentDateFn2 = function(){
	var d = new Date();
	var month = d.getMonth()+1;
	var day = d.getDate();
	var output = d.getFullYear() + '-' +
	    ((''+month).length<2 ? '0' : '') + month + '-';
	    
		output+= ((''+day).length<2 ? '0' : '') + day;
	   
	return output;
}
var currentDateTimeFn = function(){
	/*New Code Start*/

	var now = new Date();

	var year = now.getFullYear();

	var month = now.getMonth()+1;

	var day = now.getDate();

	var hour = now.getHours();

	var minute = now.getMinutes();

	var second = now.getSeconds();

	if(month.toString().length == 1) {

	var month = '0'+month;

	}

	if(day.toString().length == 1) {

	var day = '0'+day;

	}

	if(hour.toString().length == 1) {

	var hour = '0'+hour;

	}

	if(minute.toString().length == 1) {

	var minute = '0'+minute;

	}

	if(second.toString().length == 1) {

	var second = '0'+second;

	}

	var dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;

	

	/*New Code End*/
	return dateTime;
}

var getPastMonthTH = function(){
	var dataReturn;
	var monthTH=["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน",
	             "พฤษาภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน",
	             "ตุลาคม","พฤจิกายน","ธันวาคม"];
	
	var d = new Date();
	var month = d.getMonth();
	var year =d.getFullYear()+543;
	
	if(month==0){
		dataReturn=monthTH[11]+" "+(year-1);
	}else{
		dataReturn=monthTH[month]+" "+year
	}
	return dataReturn;
	
}



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
		checkMaintenanceFn(data);
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
		url:restfulURL+"/dqs_api/public/session",
		type:"DELETE",
		dataType:"json",
		headers:{Authorization:"Bearer "+tokenID.token},
		//data:{token:tokenID.token},
		success:function(data){
		checkMaintenanceFn(data);
			//console.log(data);
			if(data['status']=="200"){
			
				window.location.href = "login.html"; 
				sessionStorage.setItem("tokenID","{}");
				
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
	
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_role/"+role_id+"/authorize",
		type:"GET",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
		checkMaintenanceFn(data);
			galbaMenuObj=data;
		}
	});
};


var listMenuFn = function(){
	
	var DQManagementMenuCate="";
	var DQMonitoringMenuCate="";
	var reportMenuCate="";
	
	$.each(tokenID.data.menu,function(index,indexEntry){
		if(indexEntry['app_url']!=null){
			var URLNotExtension=indexEntry['app_url'].split(".");
			URLNotExtension=URLNotExtension[0];
			
			if(indexEntry['menu_category']=="MM"){
				DQManagementMenuCate+="<li><a class=\"mainMenu\" id=\"menu-"+indexEntry['menu_id']+"\" href=\"#/pages/"+URLNotExtension+"\"><div class=\"menu_name\">"+indexEntry['menu_name']+"</div><div class=\"app_url app_url_hidden\">"+indexEntry['app_url']+"</div></a></li>";
			}else if(indexEntry['menu_category']=="MN"){
				
				DQMonitoringMenuCate+="<li><a class=\"mainMenu\" id=\"menu-"+indexEntry['menu_id']+"\" href=\"#/pages/"+URLNotExtension+"\"><div class=\"menu_name\">"+indexEntry['menu_name']+"</div><div class=\"app_url app_url_hidden\">"+indexEntry['app_url']+"</div></a></li>";
			}else if(indexEntry['menu_category']=="RP"){
				
				reportMenuCate+="<li><a class=\"mainMenu\" id=\"menu-"+indexEntry['menu_id']+"\" href=\"#/pages/"+URLNotExtension+"\"><div class=\"menu_name\">"+indexEntry['menu_name']+"</div><div class=\"app_url app_url_hidden\">"+indexEntry['app_url']+"</div></a></li>";
			}
		}
	});
	$("#DQManagementMenuCate").html(DQManagementMenuCate);
	$("#DQMonitoringMenuCate").html(DQMonitoringMenuCate);
	$("#reportMenuCate").html(reportMenuCate);
};
listMenuFn();
var flashSLideUp=function(){
	
	$("#slide_status").slideUp();
	
}
$(document).on("click","#btnClose",function(){
	flashSLideUp();
});
$(document).on("click",".btnModalClose",function(){
	flashSlideInModalSlideUp();
});

var callFlashSlide = function(text,flashType){
		if(flashType=="error"){
			
			$("#slide_status_area").html(text);
			$("#slide_status").slideDown("slow");
			
		}else{
			$("#slide_status_area").html(text);
			$("#slide_status").slideDown("slow");
			setTimeout(function(){
				$("#slide_status").slideUp();
			},3000);
		}
}

var flashSlideInModalSlideUp=function(){
	
	$("#information").slideUp();
	$("#information2").slideUp();
	
}

var callFlashSlideInModal =function(text,id,flashType){
	var btnClose="<div class=\"btnModalClose\"><i class='fa fa-times'></i></div>";
	
	if(flashType=="error"){
		
		if(id!=undefined){
			$(id).html(btnClose+""+text).show();
			
		}else{
			
			$("#information").html(btnClose+""+text).show();
		}
		
	}else{
		
		if(id!=undefined){
			$(id).html(btnClose+""+text).show();
		}else{
			$("#information").html(btnClose+""+text).show();
		}
		setTimeout(function(){
			if(id!=undefined){
				$(id).hide("slow");
			}else{
				$("#information").hide("slow");
			}
		},3000);
	}
	

}

var includeFileFn = function(paramUrl){
	
	$.ajax({
		url:paramUrl,
		type:"GET",
		dataType:"html",
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
		checkMaintenanceFn(data);
			$("#includePage").html(data);
		},
		error: function(jqXHR, textStatus, errorThrown) {
		    if('error'==textStatus){
		    	window.location.reload(true);
		    }
		}
		
	});
}



$(".mainMenu").click(function(){
	$("ul.dropdown-menu li").removeClass("active");
	$(this).parent().addClass("active");
	var menu_id=this.id
	menu_id=menu_id.split("-");
	menu_id=menu_id[1];
	insertUsageLogFn(menu_id);
	
	//remove parameter pagination
	$("#rpp").remove();
	$("#pageNumber").remove();
	
	$("#rpp2").remove();
	$("#pageNumber2").remove();
	
	$(".display_result").hide();
	
	//alert($(".menu_name",this).text());
	nameMenuData=$(".menu_name",this).text();
	sessionStorage.setItem("nameMenuData",nameMenuData);
	
});
$("#btnHome").click(function(){
	window.location.replace("./");
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

	$route.current.templateUrl = './Views/' + $routeParams.url + ".html";
	  $.get($route.current.templateUrl, function (data){
	       $("#includePage").html(data);
	       $("#naviLabelMenu").html("<i class=\"fa fa-share-alt\"></i> "+sessionStorage.getItem("nameMenuData"));
	   	   $("#naviTitle").show();
	    });
});
















