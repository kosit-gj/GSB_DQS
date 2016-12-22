var golbalData = [];
//binding tooltip.
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});

var listDataFn = function(data){
	
			 var htmlTable="";
			 $("#listDataSumKpiScore").empty();
			 
			  
			htmlTable+="<tr class='danger'>";
			      htmlTable+="<td>ทั่วประเทศ</td>";
			      htmlTable+="<td>ผลรวม</td>";
			      if(data['country'][0]['nof_person_incomplete_cif']==undefined){
			    	  htmlTable+="<td></td>";
			      }else{
			    	  htmlTable+="<td>"+data['country'][0]['nof_person_incomplete_cif']+"</td>";
			      }
			      
			      if(data['country'][0]['nof_person_incomplete_cif']==undefined){
			    	  htmlTable+="<td></td>";
			      }else{
			    	  htmlTable+="<td>"+data['country'][0]['nof_nodoc_incomplete_cif']+"</td>";
			      }
			      
			      if(data['country'][0]['nof_person_incomplete_cif']==undefined){
			    	  htmlTable+="<td></td>";
			      }else{
			    	  htmlTable+="<td>"+data['country'][0]['nof_all_cif']+"</td>";
			      }
			      
			      if(data['country'][0]['nof_person_incomplete_cif']==undefined){
			    	  htmlTable+="<td></td>";
			      }else{
			    	  htmlTable+="<td>"+data['country'][0]['percent_complete']+"</td>";
			      }
			      
			      if(data['country'][0]['nof_person_incomplete_cif']==undefined){
			    	  htmlTable+="<td></td>";
			      }else{
			    	  htmlTable+="<td>"+data['country'][0]['average_kpi']+"</td>";
			      }
			   	  
				 
				  
			      
			
		     htmlTable+="</tr>";
		     
		     if(data['operations']==""){
		    	 $("#listDataSumKpiScore").html(htmlTable);
		    	 return false;
		     }
			$.each(data['operations'],function(index,indexEntry){
				
				
				     htmlTable+="<tr class='warning'>";
					      htmlTable+="<td>"+indexEntry['operation_name']+"</td>";
					      htmlTable+="<td>ผลรวม</td>";
					      htmlTable+="<td>"+indexEntry['nof_person_incomplete_cif']+"</td>";
					   	  htmlTable+="<td>"+indexEntry['nof_nodoc_incomplete_cif']+"</td>";
						  htmlTable+="<td>"+indexEntry['nof_all_cif']+"</td>";
						  htmlTable+="<td>"+indexEntry['percent_complete']+"</td>";
					      htmlTable+="<td>"+indexEntry['average_kpi']+"</td>";
					    
				     htmlTable+="</tr>";
				     
					     $.each(indexEntry['regions'],function(index2,indexEntry2){
					    	 htmlTable+="<tr class='danger'>";
								      htmlTable+="<td>-- "+indexEntry2['region_name']+"</td>";
								      htmlTable+="<td>ผลรวม</td>";
								      htmlTable+="<td>"+indexEntry2['nof_person_incomplete_cif']+"</td>";
								   	  htmlTable+="<td>"+indexEntry2['nof_nodoc_incomplete_cif']+"</td>";
									  htmlTable+="<td>"+indexEntry2['nof_all_cif']+"</td>";
									  htmlTable+="<td>"+indexEntry2['percent_complete']+"</td>";
								      htmlTable+="<td>"+indexEntry2['average_kpi']+"</td>";
								      
							     htmlTable+="</tr>";
							     
							     $.each(indexEntry2['districts'],function(index3,indexEntry3){
							    	 htmlTable+="<tr class='warning'>";
										      htmlTable+="<td>--- "+indexEntry3['district_name']+"</td>";
										      htmlTable+="<td>ผลรวม</td>";
										      htmlTable+="<td>"+indexEntry3['nof_person_incomplete_cif']+"</td>";
										   	  htmlTable+="<td>"+indexEntry3['nof_nodoc_incomplete_cif']+"</td>";
											  htmlTable+="<td>"+indexEntry3['nof_all_cif']+"</td>";
											  htmlTable+="<td>"+indexEntry3['percent_complete']+"</td>";
										      htmlTable+="<td>"+indexEntry3['average_kpi']+"</td>";
										     
									     htmlTable+="</tr>";
									     
									     
											     htmlTable+="<tr>";
										     		htmlTable+="<td>---- รหัสสาขา</td>";
										     		htmlTable+="<td>ชื่อสาขา</td>";
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
													      htmlTable+="<td>"+indexEntry4['nof_person_incomplete_cif']+"</td>";
													   	  htmlTable+="<td>"+indexEntry4['nof_nodoc_incomplete_cif']+"</td>";
														  htmlTable+="<td>"+indexEntry4['nof_all_cif']+"</td>";
														  htmlTable+="<td>"+indexEntry4['percent_complete']+"</td>";
													      htmlTable+="<td>"+indexEntry4['average_kpi']+"</td>";
													     
												     htmlTable+="</tr>";
										     });
								     
							     });
							     		
					     });
					     
						     
					
			   });
				
				
			  $("#listDataSumKpiScore").html(htmlTable);
			  
			

			
	
};
var getDataFn = function() {
	
	var paramOperation=$("#paramEmbedListOperation").val();
	var paramRegion=$("#paramEmbedLisRegion").val();
	var paramDistrict=$("#paramEmbedListDistrict").val();
	var paramBranch=$("#paramEmbedListBranch").val();
	var paramYear=$("#paramEmbedListYear").val();
	var paramMonth=$("#paramEmbedListMonth").val();
	
	$.ajax({
		//url : "./Test/Service/kpiScore.txt",
		url : restfulURL+"/dqs_api/public/dqs_operation_report/kpi_result",
		type : "get",
		dataType : "json",
		data:{
			operation_code:paramOperation,
			region_code:paramRegion,
			district_code:paramDistrict,
			contact_branch_code:paramBranch,
			year:paramYear,
			month:paramMonth,
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
	htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedLisRegion' name='paramEmbedListRegion' value='"+$("#listRegion").val()+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedListDistrict' name='paramEmbedListDistrict' value='"+$("#listDistrict").val()+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedListBranch' name='paramEmbedListBranch' value='"+$("#listBranch").val()+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedListYear' name='paramEmbedListYear' value='"+$("#listYear").val()+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedListMonth' name='paramEmbedListMonth' value='"+$("#listMonth").val()+"'>";
	
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
			dropDownListBranch($(this).val());
		}

		
	});
	
	
	
	dropDownListYear();
	dropDownListMonth();
	$("#btnAdvanceSearch").click(function(){
		searchAdvanceFn();
	});
	$("#btnAdvanceSearch").click();
	
	//Export
	$("#exportToExcel").click(function(){

		var paramOperation=$("#paramEmbedListOperation").val();
		var paramRegion=$("#paramEmbedLisRegion").val();
		var paramDistrict=$("#paramEmbedListDistrict").val();
		var paramBranch=$("#paramEmbedListBranch").val();
		var paramYear=$("#paramEmbedListYear").val();
		var paramMonth=$("#paramEmbedListMonth").val();
		
		
	
		
		var param="";
		param+="&operation_code="+paramOperation;
		param+="&region_code="+paramRegion;
		param+="&district_code="+paramDistrict;
		param+="&contact_branch_code="+paramBranch;
		param+="&year="+paramYear;
		param+="&month="+paramMonth;

		$("form#formExportToExcel").attr("action",restfulURL+"/dqs_api/public/dqs_operation_report/kpi_result/export?token="+tokenID.token+""+param);
		$("form#formExportToExcel").submit();
	});
});