//Global Variable
var golbalData=[];
//binding tooltip.
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});

var listDataFn = function(data){
	
//			 var htmlTable="";
//			 $("#listDataContactType").empty();
//			   $.each(data,function(index,indexEntry){
//			
//				     htmlTable+="<tr class='rowSearch' >";
//					  
//					      htmlTable+="<td class='columnSearch'>"+indexEntry['seq']+"</td>";
//					      htmlTable+="<td class='columnSearch'>"+indexEntry["contact_type"]+"</td>";
//					      htmlTable+="<td class='columnSearch'>"+indexEntry["file_instance"]+"</td>";
//					   	  htmlTable+="<td class='columnSearch number'>"+notNullFn(indexEntry["total_record_footer_file"])+"</td>";
//						  htmlTable+="<td class='columnSearch number'>"+notNullFn(indexEntry["total_record_read_file"])+"</td>";
//						  htmlTable+="<td class='columnSearch number'>"+notNullFn(indexEntry["total_record_insert_table"])+"</td>";
//					      htmlTable+="<td class='columnSearch '>"+indexEntry["import_date"]+"</td>";
//					   	  htmlTable+="<td class='columnSearch'>"+indexEntry["start_date_time"]+"</td>";
//						  htmlTable+="<td class='columnSearch'>"+indexEntry["end_date_time"]+"</td>";
//						  htmlTable+="<td class='columnSearch'>"+indexEntry["processing_time"]+"</td>";
//						 
//
//				     htmlTable+="</tr>";
//					
//			   });
//				
//			  $("#listDataContactType").html(htmlTable);
			
			
			var htmlTable="";
			 $("#listDataContactType").empty();
			 console.log(data['group']);
			   $.each(data['group'],function(index,indexEntry){
					console.log(index);
				    htmlTable+="<tr>";
						htmlTable+="<td>";
							htmlTable+="<div class=\"ibox float-e-margins\">";
								htmlTable+="<div class=\"ibox-title\">";
									htmlTable+="<h5>Contact Type : "+index+"</h5>";
								htmlTable+="</div>";
								htmlTable+="<div class=\"ibox-content\" style='padding: 0 0px 0px;'>";
								//SUB TABLE HERE..
								
								htmlTable+="<table class=\"table\">";
								htmlTable+="<thead>";
									htmlTable+="<tr  class=\"active\">";
										
										htmlTable+="<th>No.</th>";
										htmlTable+="<th>ContactType</th>";
										htmlTable+="<th>File Name</th>";
										htmlTable+="<th>#Footer Rows</th>";
										htmlTable+="<th>#Read Rows</th>";
										htmlTable+="<th>#Write Rows</th>";
										htmlTable+="<th>#Import Date</th>";
										htmlTable+="<th>Start Date Time</th>";
										htmlTable+="<th>End Date Time</th>";
										htmlTable+="<th>Procesing Time</th>";
										
									htmlTable+="</tr>";
								htmlTable+="</thead>";
									htmlTable+="<tbody>";
									//LOOP START
									
									var count=1;
									 $.each(indexEntry['items'],function(index2,indexEntry2){
										htmlTable+="<tr>";

											  htmlTable+="<td class='columnSearch'>"+indexEntry2['seq']+"</td>";
										      htmlTable+="<td class='columnSearch'>"+indexEntry2["contact_type"]+"</td>";
										      htmlTable+="<td class='columnSearch'>"+indexEntry2["file_instance"]+"</td>";
										   	  htmlTable+="<td class='columnSearch number'>"+notNullFn(indexEntry2["total_record_footer_file"])+"</td>";
											  htmlTable+="<td class='columnSearch number'>"+notNullFn(indexEntry2["total_record_read_file"])+"</td>";
											  htmlTable+="<td class='columnSearch number'>"+notNullFn(indexEntry2["total_record_insert_table"])+"</td>";
										      htmlTable+="<td class='columnSearch '>"+indexEntry2["import_date"]+"</td>";
										   	  htmlTable+="<td class='columnSearch'>"+indexEntry2["start_date_time"]+"</td>";
											  htmlTable+="<td class='columnSearch'>"+indexEntry2["end_date_time"]+"</td>";
											  htmlTable+="<td class='columnSearch'>"+indexEntry2["processing_time"]+"</td>";
											
										htmlTable+="</tr>";
										count++;
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
				
			  $("#listDataContactType").html(htmlTable);
};
var getDataFn = function(page,rpp) {

	var embedParamListContactType= $("#embedParamListContactType").val();
	var embedParamImportDate = $("#embedParamImportDate").val();
	$.ajax({
		url : restfulURL+"/dqs_api/public/dqs_maintenance/import_log",
		type : "post",
		dataType : "json",
		async:false,
		data:{"page":page,"rpp":rpp,
			"contact_type":embedParamListContactType,
			"import_date":embedParamImportDate	
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			checkMaintenanceFn(data);
			listDataFn(data);
			
			golbalData=data;
			paginationSetUpFn(golbalData['current_page'],golbalData['last_page'],golbalData['last_page']);
			
		}
	});
};

$(document).ready(function(){
	
	dropDownListContactType("All");
	$("#import_date").datepicker();
    $("#import_date").datepicker( "option", "dateFormat", "yy-mm-dd" );
    $(".ui-datepicker").hide();
    
	$("#btnSearch").click(function(){
		searchMultiFn($("#searchText").val());
	});
	
	$("#btnSearchAdvance").click(function(){
		
		$(".embedParamSearch").remove();
		$("#embedParamArea").append("<input type='hidden' value='"+$("#listContactType").val()+"' id='embedParamListContactType' name='embedParamListContactType' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#import_date").val()+"' id='embedParamImportDate' name='embedParamImportDate' class='embedParamSearch'>");

		getDataFn(1,$("#rpp").val());
		$("#importReportLogArea").show();
		return false;
	});
	//$("#btnSearchAdvance").click();
	//Export
	$("#exportToExcel").click(function(){
		var param="";
		param+="&contact_type="+$("#embedParamListContactType").val();
		param+="&import_date="+$("#embedParamImportDate").val();		
		$("form#formExportToExcel ").attr("action",restfulURL+"/dqs_api/public/dqs_maintenance/import_log/export?token="+tokenID.token+""+param);
		$("form#formExportToExcel ").submit();
	});

});