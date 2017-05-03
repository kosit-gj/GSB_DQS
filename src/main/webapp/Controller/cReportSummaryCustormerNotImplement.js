//binding tooltip.
var golbalData=[];
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});

var listDataFn = function(data){

	
			 var htmlTable="";
			 $("#listDataSumCusNotImplement").empty();
			   $.each(data,function(index,indexEntry){
				
					
				     htmlTable+="<tr class='danger'>";
					      htmlTable+="<td>"+indexEntry['operation_name']+"</td>";
					      htmlTable+="<td>ผลรวม</td>";
					      htmlTable+="<td class='number'>"+indexEntry['cleansing']+"</td>";
					   	  htmlTable+="<td class='number'>"+indexEntry['mapping']+"</td>";
						  htmlTable+="<td class='number'>"+indexEntry['matching']+"</td>";
						  htmlTable+="<td class='number'>"+indexEntry['edit']+"</td>";
					      htmlTable+="<td class='number'>"+indexEntry['kpi']+"</td>";
					      htmlTable+="<td class='number'>"+indexEntry['total']+"</td>";
				     htmlTable+="</tr>";
				     
					     $.each(indexEntry['regions'],function(index2,indexEntry2){
					    	 htmlTable+="<tr class='warning'>";
								      htmlTable+="<td>-- "+indexEntry2['region_name']+"</td>";
								      htmlTable+="<td>ผลรวม</td>";
								      htmlTable+="<td class='number'>"+indexEntry2['cleansing']+"</td>";
								   	  htmlTable+="<td class='number'>"+indexEntry2['mapping']+"</td>";
									  htmlTable+="<td class='number'>"+indexEntry2['matching']+"</td>";
									  htmlTable+="<td class='number'>"+indexEntry2['edit']+"</td>";
								      htmlTable+="<td class='number'>"+indexEntry2['kpi']+"</td>";
								      htmlTable+="<td class='number'>"+indexEntry2['total']+"</td>";
							     htmlTable+="</tr>";
							     
							     $.each(indexEntry2['districts'],function(index3,indexEntry3){
							    	 htmlTable+="<tr class='danger'>";
										      htmlTable+="<td>--- "+indexEntry3['district_name']+"</td>";
										      htmlTable+="<td>ผลรวม</td>";
										      htmlTable+="<td class='number'>"+indexEntry3['cleansing']+"</td>";
										   	  htmlTable+="<td class='number'>"+indexEntry3['mapping']+"</td>";
											  htmlTable+="<td class='number'>"+indexEntry3['matching']+"</td>";
											  htmlTable+="<td class='number'>"+indexEntry3['edit']+"</td>";
										      htmlTable+="<td class='number'>"+indexEntry3['kpi']+"</td>";
										      htmlTable+="<td class='number'>"+indexEntry3['total']+"</td>";
									     htmlTable+="</tr>";
									     
									     
											     htmlTable+="<tr>";
										     		htmlTable+="<td>---- รหัสสาขา</td>";
										     		htmlTable+="<td>ชื่อสาขา</td>";
										     		htmlTable+="<td></td>";
										     		htmlTable+="<td></td>";
										     		htmlTable+="<td></td>";
										     		htmlTable+="<td></td>";
										     		htmlTable+="<td></td>";
										     		htmlTable+="<td></td>";
									     		htmlTable+="/tr>";
										     $.each(indexEntry3['branches'],function(index4,indexEntry4){
										    	 htmlTable+="<tr class=''>";
													      htmlTable+="<td>---- "+indexEntry4['contact_branch_code']+"</td>";
													      htmlTable+="<td>"+indexEntry4['contact_branch_name']+"</td>";
													      htmlTable+="<td class='number'>"+indexEntry4['cleansing']+"</td>";
													   	  htmlTable+="<td class='number'>"+indexEntry4['mapping']+"</td>";
														  htmlTable+="<td class='number'>"+indexEntry4['matching']+"</td>";
														  htmlTable+="<td class='number'>"+indexEntry4['edit']+"</td>";
													      htmlTable+="<td class='number'>"+indexEntry4['kpi']+"</td>";
													      htmlTable+="<td class='number'>"+indexEntry4['total']+"</td>";
												     htmlTable+="</tr>";
										     });
								     
							     });
							     		
					     });
					     
						     
					
			   });
				
			  $("#listDataSumCusNotImplement").html(htmlTable);
			  
};
var getDataFn = function() {
	var paramOperation=$("#paramEmbedListOperation").val();
	var paramRegion=$("#paramEmbedListRegion").val();
	var paramDistrict=$("#paramEmbedListDistrict").val();
	var paramBranch=$("#paramEmbedListBranch").val();
	var paramYear=$("#paramEmbedListYear").val();
	var paramMonth=$("#paramEmbedListMonth").val();
	var paramStatus=$("#paramEmbedListStatus").val();
	
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_operation_report/no_progress",
		type : "get",
		dataType : "json",
		data:{
			operation_code:paramOperation,
			region_code:paramRegion,
			district_code:paramDistrict,
			contact_branch_code:paramBranch,
			year:paramYear,
			month:paramMonth,
			status:paramStatus
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			//console.log(data);
			checkMaintenanceFn(data);
			listDataFn(data);
		}
	});
	
	
	
};

var searchAdvanceFn = function(){
	//embed parameter start
	var htmlParam="";
	htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedListOperation' name='paramEmbedListOperation' value='"+$("#listOperation").val()+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedListRegion' name='paramEmbedListRegion' value='"+$("#listRegion").val()+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedListDistrict' name='paramEmbedListDistrict' value='"+$("#listDistrict").val()+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedListBranch' name='paramEmbedListBranch' value='"+$("#listBranch").val()+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedListYear' name='paramEmbedListYear' value='"+$("#listYear").val()+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedListMonth' name='paramEmbedListMonth' value='"+$("#listMonth").val()+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedListStatus' name='paramEmbedListStatus' value='"+$("#listStatus").val()+"'>";
	$(".paramEmbedArea").empty();
	$(".paramEmbedArea").append(htmlParam);
	getDataFn();
	//getDataFn(1,$("#rpp").val());
}

$(document).ready(function(){
	
		dropDownListOperation();
		$(document).off("change","#listOperation");
		$(document).on("change","#listOperation",function(){
			if($(this).val()==""){
				var dropDownHtmlRegion="<select id=\"listRegion\" class=\"form-control input-sm listRegion\">";
				dropDownHtmlRegion+="<option value=\"\">All Region</option>";
				dropDownHtmlRegion+="</select>";
				
				var dropDownHtmlDistrict="<select id=\"listDistrict\" class=\"form-control input-sm listDistrict\">";
				dropDownHtmlDistrict+="<option value=\"\">All District</option>";
				dropDownHtmlDistrict+="</select>";
				
				var dropDownHtmlBranch="<select id=\"listBranch\" class=\"form-control input-sm listBranch\">";
				dropDownHtmlBranch+="<option value=\"\">All Branch</option>";
				dropDownHtmlBranch+="</select>";

				$("#listRegionArea").html(dropDownHtmlRegion);
				$("#listDistrictArea").html(dropDownHtmlDistrict);
				$("#listBranchArea").html(dropDownHtmlBranch);
			}else{
				dropDownListRegion($(this).val());
			}
		});
		$(document).off("change","#listRegion");
		$(document).on("change","#listRegion",function(){
			//var 
			if($(this).val()==""){
				var dropDownHtmlDistrict="<select id=\"listDistrict\" class=\"form-control input-sm listDistrict\">";
				dropDownHtmlDistrict+="<option value=\"\">All District</option>";
				dropDownHtmlDistrict+="</select>";
				
				var dropDownHtmlBranch="<select id=\"listBranch\" class=\"form-control input-sm listBranch\">";
				dropDownHtmlBranch+="<option value=\"\">All Branch</option>";
				dropDownHtmlBranch+="</select>";

				$("#listDistrictArea").html(dropDownHtmlDistrict);
				$("#listBranchArea").html(dropDownHtmlBranch);
			}else{
				dropDownListDistrict($(this).val());
			}
			
		});
		$(document).off("change","#listDistrict");
		$(document).on("change","#listDistrict",function(){

			if($(this).val()==""){
				
				var dropDownHtmlBranch="<select id=\"listBranch\" class=\"form-control input-sm listBranch\">";
				dropDownHtmlBranch+="<option value=\"\">All Branch</option>";
				dropDownHtmlBranch+="</select>";
				$("#listBranchArea").html(dropDownHtmlBranch);
			}else{
				dropDownListBranchReport($(this).val());
				//alert($(this).val());
			}
			
		});
		
		
		
		dropDownListYear();
		dropDownListMonth();
		
		
	
	
	$("#btnAdvanceSearch").click(function(){
		searchAdvanceFn();
		$(".display_result").show();
	});
	//$("#btnAdvanceSearch").click();
	
	
	//Export
	$("#exportToExcel").click(function(){
		
		
		
		var param="";
		param+="&operation_code="+$("#paramEmbedListOperation").val();
		param+="&region_code="+$("#paramEmbedListRegion").val();
		param+="&district_code="+$("#paramEmbedListDistrict").val();
		param+="&contact_branch_code="+$("#paramEmbedListBranch").val();
		param+="&year="+$("#paramEmbedListYear").val();
		param+="&month="+$("#paramEmbedListMonth").val();
		param+="&status="+$("#paramEmbedListStatus").val();
		
		$("form#formExportToExcel ").attr("action",restfulURL+"/dqs_api/public/dqs_operation_report/no_progress/export?token="+tokenID.token+""+param);
		$("form#formExportToExcel ").submit();
	});
});