var golbalData=[];
//binding tooltip.
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
			      htmlTable+="<td>"+indexEntry['month_1']+"</td>";
			   	  htmlTable+="<td>"+indexEntry['month_2']+"</td>";
				  htmlTable+="<td>"+indexEntry['month_3']+"</td>";
				  htmlTable+="<td>"+indexEntry['month_4']+"</td>";
			      htmlTable+="<td>"+indexEntry['month_5']+"</td>";
			      htmlTable+="<td>"+indexEntry['month_6']+"</td>";
			      htmlTable+="<td>"+indexEntry['month_7']+"</td>";
			      htmlTable+="<td>"+indexEntry['month_8']+"</td>";
			      htmlTable+="<td>"+indexEntry['month_9']+"</td>";
			      htmlTable+="<td>"+indexEntry['month_10']+"</td>";
			      htmlTable+="<td>"+indexEntry['month_11']+"</td>";
			      htmlTable+="<td>"+indexEntry['month_12']+"</td>";
			      htmlTable+="<td>"+indexEntry['month_13']+"</td>";
			      htmlTable+="<td>"+indexEntry['total']+"</td>";
			      
		     htmlTable+="</tr>";
		     
			     $.each(indexEntry['regions'],function(index2,indexEntry2){
			    	 htmlTable+="<tr class='warning'>";
						      htmlTable+="<td>-- "+indexEntry2['region_name']+"</td>";
						      htmlTable+="<td>ผลรวม</td>";
						      htmlTable+="<td>"+indexEntry2['month_1']+"</td>";
						   	  htmlTable+="<td>"+indexEntry2['month_2']+"</td>";
							  htmlTable+="<td>"+indexEntry2['month_3']+"</td>";
							  htmlTable+="<td>"+indexEntry2['month_4']+"</td>";
						      htmlTable+="<td>"+indexEntry2['month_5']+"</td>";
						      htmlTable+="<td>"+indexEntry2['month_6']+"</td>";
						      htmlTable+="<td>"+indexEntry2['month_7']+"</td>";
						      htmlTable+="<td>"+indexEntry2['month_8']+"</td>";
						      htmlTable+="<td>"+indexEntry2['month_9']+"</td>";
						      htmlTable+="<td>"+indexEntry2['month_10']+"</td>";
						      htmlTable+="<td>"+indexEntry2['month_11']+"</td>";
						      htmlTable+="<td>"+indexEntry2['month_12']+"</td>";
						      htmlTable+="<td>"+indexEntry2['month_13']+"</td>";
						      htmlTable+="<td>"+indexEntry2['total']+"</td>";
					     htmlTable+="</tr>";
					     
					     $.each(indexEntry2['districts'],function(index3,indexEntry3){
					    	 htmlTable+="<tr class='danger'>";
								      htmlTable+="<td>--- "+indexEntry3['district_name']+"</td>";
								      htmlTable+="<td>ผลรวม</td>";
								      htmlTable+="<td>"+indexEntry3['month_1']+"</td>";
								   	  htmlTable+="<td>"+indexEntry3['month_2']+"</td>";
									  htmlTable+="<td>"+indexEntry3['month_3']+"</td>";
									  htmlTable+="<td>"+indexEntry3['month_4']+"</td>";
								      htmlTable+="<td>"+indexEntry3['month_5']+"</td>";
								      htmlTable+="<td>"+indexEntry3['month_6']+"</td>";
								      htmlTable+="<td>"+indexEntry3['month_7']+"</td>";
								      htmlTable+="<td>"+indexEntry3['month_8']+"</td>";
								      htmlTable+="<td>"+indexEntry3['month_9']+"</td>";
								      htmlTable+="<td>"+indexEntry3['month_10']+"</td>";
								      htmlTable+="<td>"+indexEntry3['month_11']+"</td>";
								      htmlTable+="<td>"+indexEntry3['month_12']+"</td>";
								      htmlTable+="<td>"+indexEntry3['month_13']+"</td>";
								      htmlTable+="<td>"+indexEntry3['total']+"</td>";
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
								     		htmlTable+="<td></td>";
								     		htmlTable+="<td></td>";
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
											      htmlTable+="<td>"+indexEntry4['month_1']+"</td>";
											   	  htmlTable+="<td>"+indexEntry4['month_2']+"</td>";
												  htmlTable+="<td>"+indexEntry4['month_3']+"</td>";
												  htmlTable+="<td>"+indexEntry4['month_4']+"</td>";
											      htmlTable+="<td>"+indexEntry4['month_5']+"</td>";
											      htmlTable+="<td>"+indexEntry4['month_6']+"</td>";
											      htmlTable+="<td>"+indexEntry4['month_7']+"</td>";
											      htmlTable+="<td>"+indexEntry4['month_8']+"</td>";
											      htmlTable+="<td>"+indexEntry4['month_9']+"</td>";
											      htmlTable+="<td>"+indexEntry4['month_10']+"</td>";
											      htmlTable+="<td>"+indexEntry4['month_11']+"</td>";
											      htmlTable+="<td>"+indexEntry4['month_12']+"</td>";
											      htmlTable+="<td>"+indexEntry4['month_13']+"</td>";
											      htmlTable+="<td>"+indexEntry4['total']+"</td>";
										     htmlTable+="</tr>";
								     });
						     
					     });
					     		
			     });
	
	   });
				
$("#listData").html(htmlTable);
			  
			
			
	
};
var getDataFn = function() {
	
	var paramOperation=$("#paramEmbedListOperation").val();
	var paramRegion=$("#paramEmbedListRegion").val();
	var paramDistrict=$("#paramEmbedListDistrict").val();
	var paramBranch=$("#paramEmbedListBranch").val();
	
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_operation_report/overdue_kpi",
		type : "get",
		dataType : "json",
		data:{
			operation_code:paramOperation,
			region_code:paramRegion,
			district_code:paramDistrict,
			contact_branch_code:paramBranch,
			
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
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
		}

		
	});
	
	//getDataFn();
	$("#btnAdvanceSearch").click(function(){
		searchAdvanceFn();
		$(".display_result").show();
	});
	//$("#btnAdvanceSearch").click();
	
	//Export
	$("#exportToExcel").click(function(){
		
		

		var paramOperation=$("#paramEmbedListOperation").val();
		var paramRegion=$("#paramEmbedListRegion").val();
		var paramDistrict=$("#paramEmbedListDistrict").val();
		var paramBranch=$("#paramEmbedListBranch").val();
		
		var param="";
		param+="&operation_code="+paramOperation;
		param+="&region_code="+paramRegion;
		param+="&district_code="+paramDistrict;
		param+="&contact_branch_code="+paramBranch;
		
		
		$("form#formExportToExcel ").attr("action",restfulURL+"/dqs_api/public/dqs_operation_report/overdue_kpi/export?token="+tokenID.token+""+param);
		$("form#formExportToExcel ").submit();
	});
});