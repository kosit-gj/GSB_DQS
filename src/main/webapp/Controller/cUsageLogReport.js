//binding tooltip.
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});
var makeData={
		"Branch: สาขาแฟชั่นไอส์แลนด์":[["1","01/09/2016","4340264","พนักงาน 1","Branch Management"],["2","01/09/2016","4340264","พนักงาน 1","Branch Management"]],
		"Branch: สาขาพระราม3":[["1","01/09/2016","4340264","พนักงาน 1","Branch Management"],["2","01/09/2016","4340264","พนักงาน 1","Branch Management"]],
		"Branch: สาขาพหลโยธิน":[["1","01/09/2016","4340264","พนักงาน 1","Branch Management"],["2","01/09/2016","4340264","พนักงาน 1","Branch Management"]],
		"Branch: สาขารามอินทรา":[["1","01/09/2016","4340264","พนักงาน 1","Branch Management"],["2","01/09/2016","4340264","พนักงาน 1","Branch Management"]],
		"Branch: สาขาแฟชั่นพระราม2":[["1","01/09/2016","4340264","พนักงาน 1","Branch Management"],["2","01/09/2016","4340264","พนักงาน 1","Branch Management"]]
		};

var dropDownListBranch = function(id){
//	$.ajax({
//		url:"http://localhost:3001/api/make_param_contact_type",
//		type:"get",
//		dataType:"json",
//		//headers:{Authorization:"Bearer "+tokenID.token},
//		success:function(data){
	
	    var data=[{"id":"1","name":"สาขา1"},{"id":"2","name":"สาขา2"},{"id":"3","name":"สาขา3"}];
		var html="";	
		html+="<select class=\"form-control input-sm listBranch\" id=\"listBranch\">";
		$.each(data,function(index,indexEntry){
			if(id==indexEntry["id"]){
				html+="<option selected value="+indexEntry["id"]+">"+indexEntry["name"]+"</option>";			
			}else{
				html+="<option  value="+indexEntry["id"]+">"+indexEntry["name"]+"</option>";	
			}		
		});	
		html+="</select>";
		
		$("#listBranchArea").html(html);
		
//		}
//	});
};
var listDataFn = function(data){
	//console.log(data);
	if ( $.fn.DataTable.isDataTable('#mainTableUsageLog')) {
	      $('#mainTableUsageLog').DataTable().destroy();
	     }
	
			 var htmlTable="";
			 $("#listMainUsageLog").empty();
			   $.each(data['group'],function(index,indexEntry){
				
				    htmlTable+="<tr>";
						htmlTable+="<td>";
							htmlTable+="<div class=\"ibox float-e-margins\">";
								htmlTable+="<div class=\"ibox-title\">";
									htmlTable+="<h5>"+index+"</h5>";
								htmlTable+="</div>";
								htmlTable+="<div class=\"ibox-content\" style='padding: 0 0px 0px;'>";
								//SUB TABLE HERE..
								
								htmlTable+="<table class=\"table\">";
								htmlTable+="<thead>";
									htmlTable+="<tr  class=\"active\">";
										htmlTable+="<th>No.</th>";
										htmlTable+="<th>Usage Date</th>";
										htmlTable+="<th>Personnel Id</th>";
										htmlTable+="<th>Personnel Name</th>";
										htmlTable+="<th>Menu</th>";
										
									htmlTable+="</tr>";
								htmlTable+="</thead>";
									htmlTable+="<tbody>";
									//LOOP START
									/*
									usage_dttm
									personnel_id
									thai_full_name
									menu_name
									branch_name
									*/
									 $.each(indexEntry['items'],function(index2,indexEntry2){
										htmlTable+="<tr>";
											htmlTable+="<td><div class='text-inline-table'>"+(index+1)+"</div></td>";
											htmlTable+="<td><div class='text-inline-table'>"+indexEntry2['usage_dttm']+"</div></td>";
											htmlTable+=" <td><div class='text-inline-table'>"+indexEntry2['personnel_id']+"</div></td>";
											htmlTable+="<td><div class='text-inline-table'>"+indexEntry2['thai_full_name']+"</div></td>";  
											htmlTable+="<td><div class='text-inline-table'>"+indexEntry2['menu_name']+"  </div></td>";
											
										htmlTable+="</tr>";
									});
									//LOOP END
								htmlTable+="</tbody>";
							htmlTable+=" </table>";
		                       //SUB TABLE HERE..
							
								htmlTable+="</div>";
							htmlTable+="</div>";
						htmlTable+="</td>";
					htmlTable+="</tr>";
					
			   });
				
			  $("#listMainUsageLog").html(htmlTable);
			  
			
			  //DataTable
			  $('#mainTableUsageLog').DataTable( { "dom": '<"top"lp>rt<"bottom"lp><"clear">' } ); 
			
	
};
var getDataFn = function(branch,personnel_name,usage_start_date,usage_end_date){
	
//	branch_code,
//	personnel_name,
//	usage_start_date,
//	usage_end_date
	
	$.ajax({
		url : restfulURL+"/dqs_api/public/dqs_maintenance/usage_log",
		type : "get",
		dataType : "json",
		//data:{"branch_code":branch,"personnel_name":personnel_name,"usage_start_date":usage_start_date,"usage_end_date":usage_end_date},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			console.log(data);
			listDataFn(data);
			
		}
	});
//listDataFn(makeData)
	
};
var searchAdvance = function(){

	var htmlParameter="";
	htmlParameter+="<input type='hidden' id='embedParamlistBranch' name='embedParamlistBranch' class='embedParam' value='"+$("#listBranch").val()+"' >";
	htmlParameter+="<input type='hidden' id='embedParamPersonnelName' name='embedParamPersonnelName' class='embedParam' value='"+$("#personnel_name").val()+"' >";
	htmlParameter+="<input type='hidden' id='embedParamUsageStartDate' name='embedParamUsageStartDate' class='embedParam' value='"+$("#usage_start_date").val()+"' >";
	htmlParameter+="<input type='hidden' id='embedParamUsageEndDate' name='embedParamUsageEndDate' class='embedParam' value='"+$("#usage_end_date").val()+"' >";
	$(".embedParam").remove();
	$("body").append(htmlParameter);
	getDataFn($("#listBranch").val(),$("#personnel_name").val(),$("#usage_start_date").val(),$("#usage_end_date").val());
}
$(document).ready(function(){
	
	dropDownListBranch();
	
	//parameter date start
	$("#usage_start_date").datepicker();
    $("#usage_start_date").datepicker( "option", "dateFormat", "yy/mm/dd" );
    $("#usage_start_date").val(firstDayInMonthFn());
    
    $("#usage_end_date").datepicker();
    $("#usage_end_date").datepicker( "option", "dateFormat", "yy/mm/dd" );
    $("#usage_end_date").val(firstDayInMonthFn());
    $(".ui-datepicker").hide();
	//parameter date end
    
    
	//getDataFn();
	if ( $.fn.DataTable.isDataTable('#mainTableUsageLog')) {
	      $('#mainTableUsageLog').DataTable().destroy();
	     }
	
	//DataTable
	$('#mainTableUsageLog').DataTable( { "dom": '<"top"flp>rt<"bottom"lp><"clear">' } );
	
	
	
	//Search Data Here..
	$("#btnSearch").click(function(){
		searchAdvance();
	});
	$("#btnSearch").click();
	//Search Data Here..
	
});