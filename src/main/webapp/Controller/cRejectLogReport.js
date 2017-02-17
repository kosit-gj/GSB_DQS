//binding tooltip.
var golbalData=[];
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});

//DropDownList Role
/*
var dropDownListContactType = function(){
	
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_maintenance/contact_type",
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			
		//	console.log(data);
		var html="";	
		html+="<select class=\"form-control input-sm listContactType\" id=\"listContactType\">";
	
		$.each(data,function(index,indexEntry){
			
				html+="<option  value="+indexEntry["contact_type"]+">"+indexEntry["contact_type"]+"</option>";	
					
		});	
		html+="</select>";
		$("#contactTypeArea").html(html);
			
		}
	});
	
};
*/
var listDataFn = function(data){
	
			 var htmlTable="";
			 $("#listMainReject").empty();
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
										htmlTable+="<th>CIF</th>";
										htmlTable+="<th>Own Branch</th>";
										htmlTable+="<th>Last Contact Branch</th>";
										htmlTable+="<th>Citizen ID</th>";
										htmlTable+="<th>Birth Date</th>";
										htmlTable+="<th>Reject Detail</th>";
									htmlTable+="</tr>";
								htmlTable+="</thead>";
									htmlTable+="<tbody>";
									//LOOP START
									$.each(indexEntry['items'],function(index2,indexEntry2){
										htmlTable+="<tr>";
											htmlTable+="<td><div class='text-inline-table'>"+indexEntry2['seq']+"</div></td>";
											htmlTable+="<td><div class='text-inline-table'>"+indexEntry2['cif_no']+"</div></td>";
											htmlTable+=" <td><div class='text-inline-table'>"+indexEntry2['own_branch']+"</div></td>";
											htmlTable+="<td><div class='text-inline-table'>"+indexEntry2['contact_branch_code']+"</div></td>";  
											htmlTable+="<td><div class='text-inline-table'>"+indexEntry2['citizen_id']+"  </div></td>";
											htmlTable+="<td><div class='text-inline-table'>"+indexEntry2['birth_date']+"</div></td>";
											htmlTable+="<td><div class='text-inline-table'>"+indexEntry2['reject_desc']+"</div></td>";
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
				
			  $("#listMainReject").html(htmlTable);
			  
			
			  
};
var getDataFn = function(page,rpp) {
	
	var contactType= $("#embedParamListContactType").val();
	var rejectStartDate = $("#embedParamRejectStartDate").val();
	var rejectEndDate = $("#embedParamRejectEndDate").val();
	
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_maintenance/reject_log",
		type : "post",
		dataType : "json",
		data:{"page":page,"rpp":rpp,
			"contact_type":contactType,"reject_start_date":rejectStartDate ,"reject_end_date":rejectEndDate
			},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			//console.log(data);
			listDataFn(data);
			golbalData=data;
			paginationSetUpFn(golbalData['current_page'],golbalData['last_page'],golbalData['last_page']);
			
			
		}
	});
	//listDataFn(makeData)
	
};

var searchAdvance = function(){

	var htmlParameter="";
	htmlParameter+="<input type='hidden' id='embedParamListContactType' name='embedParamListContactType' class='embedParam' value='"+$("#listContactType").val()+"' >";
	htmlParameter+="<input type='hidden' id='embedParamRejectStartDate' name='embedParamRejectStartDate' class='embedParam' value='"+$("#rejectStartDate").val()+"' >";
	htmlParameter+="<input type='hidden' id='embedParamRejectEndDate' name='embedParamRejectEndDate' class='embedParam' value='"+$("#rejectEndDate").val()+"' >";
	$(".embedParam").remove();
	$("#embedParamArea").append(htmlParameter);
	//getDataFn();
	getDataFn(1,$("#rpp").val());
}


$(document).ready(function(){
	
	//List Contact Type
	dropDownListContactType();
		
	//parameter date start
	$("#rejectStartDate").datepicker();
    $("#rejectStartDate").datepicker( "option", "dateFormat", "yy-mm-dd" );
    //$("#rejectStartDate").val(firstDayInMonthFn());
    
    $("#rejectEndDate").datepicker();
    $("#rejectEndDate").datepicker( "option", "dateFormat", "yy-mm-dd" );
    //$("#rejectEndDate").val(currentDateFn());
    $(".ui-datepicker").hide();
    
	//parameter date end
    
	//Search Data Here..
	$("#btnSearchAdvance").click(function(){
		searchAdvance();
		$(".display_result").show();
	});
	//$("#btnSearchAdvance").click();
	//Search Data Here..
	
	//Export
	$("#exportToExcel").click(function(){
		
		var param="";
		param+="&contact_type="+$("#embedParamListContactType").val();
		param+="&reject_start_date="+$("#embedParamRejectStartDate").val();
		param+="&reject_end_date="+$("#embedParamRejectEndDate").val();
		
		$("form#formExportToExcel ").attr("action",restfulURL+"/dqs_api/public/dqs_maintenance/reject_log/export?token="+tokenID.token+""+param);
		$("form#formExportToExcel ").submit();
	});
	
});