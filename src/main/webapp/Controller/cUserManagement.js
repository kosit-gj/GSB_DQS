/*#####Galbal Parameter User Page#######*/

var galbalDqsRoleObj=[];
var galbalRevisedCostCenterObj=[];
var galbalDataUserObj=[];

/*####Galbal Parameter User Page######*/

/*####Init Function  Start######*/
//function list data User
var embedParam = function(id){
	var count = 0;
	$.each($(".embedListRevisedCostCenter").get(),function(index,indexEnry){
	//ถ้า id ที่วน == id ที่มี	
		if($(indexEnry).val()==id){
			count+=1;
		}
	});
	if(count>0){
		$("#embedListRevisedCostCenter-"+id).remove();
		$("body").append("<input type='hidden' class='embedListRevisedCostCenter' id='embedListRevisedCostCenter-"+id+"' name='embedListRevisedCostCenter' value='"+id+"'>");
	}else{
		$("body").append("<input type='hidden' class='embedListRevisedCostCenter' id='embedListRevisedCostCenter-"+id+"' name='embedListRevisedCostCenter' value='"+id+"'>");
	}
}

var embedParamRole = function(id){
	var count = 0;
	$.each($(".embed_Role").get(),function(index,indexEnry){
	//ถ้า id ที่วน == id ที่มี	
		if($(indexEnry).val()==id){
			count+=1;
		}
	});
	
	if(count>0){
		$("#embed_listRole-"+id).remove();
		$("body").append("<input type='hidden' class='embed_Role' id='embed_listRole-"+id+"' name='embed_listRole' value='"+id+"'>");
	}else{
		$("body").append("<input type='hidden' class='embed_Role' id='embed_listRole-"+id+"' name='embed_listRole' value='"+id+"'>");
	}
	
}

  var listDataFn = function(data){
	

			   var htmlTable="";
			 $("#listUser").empty();
			   $.each(data,function(index,indexEntry){
				
				     htmlTable+="<tr class='rowSearch'>";
					  
					      htmlTable+="<td class='columnSearch'>"+indexEntry["thai_full_name"]+"</td>";
					      htmlTable+="<td class='columnSearch'>"+indexEntry["position_name"]+"</td>";
					   	  htmlTable+="<td class='columnSearch'>"+indexEntry["operation_name"]+"</td>";
						  htmlTable+="<td class='columnSearch'>"+indexEntry["own_cost_center"]+"</td>";
						
						  htmlTable+="<td class=\"listRevisedCostCenterInlineArea \">";
						  //htmlTable+=dropDownListRevisedCostCenter(indexEntry["revised_ccdef"],+indexEntry["personnel_id"]);
						  htmlTable+=" <input disabled  style=\"width:200px;\" class=\"form-control input-inline-table input-contact-selecttype editListRevisedCostCenter \" id=\"listRevisedCostCenter-"+indexEntry["personnel_id"]+"\" value=\""+indexEntry["revised_ccdef"]+" "+indexEntry["revised_cost_center"]+"\"> ";
						  htmlTable+="</td>";
				          
				          
						  htmlTable+="<td class=\"listRoleInlineArea \">";
							 // htmlTable+="<select disabled class=\"form-control input-inline-table input-contact-selecttype editListRole \" id=\"listRole-"+indexEntry["_id"]+"\">"+/*listDataRole(indexEntry["role_id"])*/+"</select>";
						  htmlTable+=dropDownListRole(indexEntry["role_id"],"Y",+indexEntry["personnel_id"]);
						  htmlTable+="</td>";
						  
						  
						 
						  
				     htmlTable+="</tr>";
					
			   });
			
			  $("#listUser").html(htmlTable);
			
			//start ปุ่ม Edit ใน table
			
			//Edit SuperFlag
			$(".editListRevisedCostCenter").click(function(){
				
				var id = this.id.split("-"); 
				
				embedParam(id[1]);

				
			});
			
			//Edit Rule
			$(".editListRole").click(function(){
				
				var id = this.id.split("-"); 
				
				embedParamRole(id[1]);
				
			});
			
	
};
//Get data User
var getDataFn = function(page,rpp) {
	

	var personnelID= $("#paramEmbedPersonnelID").val();
	var ownCostCenterCode= $("#paramEmbedOwnCostCenter").val();
	var revisedCostCenterCode= $("#paramEmbedRevisedCostCenter").val();
	var listRole= $("#paramEmbedListRole").val();
	var isActive= $("#paramEmbedIsActive").val();
	
	
		$.ajax({
			url : restfulURL + "/dqs_api/public/dqs_user",
			type : "post",
			dataType : "json",
			data:{"page":page,"rpp":rpp,
			"personnel_id":personnelID,
			"own_cost_center":ownCostCenterCode,
			"revised_cost_center":revisedCostCenterCode,
			"role_id":listRole,
			"active_flag":isActive
			},
			headers:{Authorization:"Bearer "+tokenID.token},
			async:false,
			success : function(data) {
				checkMaintenanceFn(data);
				galbalDataUserObj=data;
				listDataFn(galbalDataUserObj['data']);
				paginationSetUpFn(galbalDataUserObj['current_page'],galbalDataUserObj['last_page'],galbalDataUserObj['last_page']);
				
			}
		});
};

var getDataRole = function(){
	$.ajax ({
		url:restfulURL+"/dqs_api/public/dqs_role" ,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
			success:function(data){
				checkMaintenanceFn(data);
				galbalDqsRoleObj=data;

			}
	});
};
var getDataRevisedCostCenter = function(){
	$.ajax ({
		url:restfulURL+"/dqs_api/public/dqs_user/revised_cost_center" ,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
				checkMaintenanceFn(data);
				galbalRevisedCostCenterObj=data;

			}
	});
};
//DropDownList Role
var dropDownListRole = function(id,paramInline,paramParentID){
	var html="";
	if(paramInline=="Y"){
		html+="<select disabled class=\"form-control input-inline-table input-contact-selecttype editListRole\" id=\"listRole-"+paramParentID+"\">";
		html+="<option value=\"\">No Role</option>";
	}else{
		html+="<select class=\"form-control input-sm \" id=\"listRole\">";
		html+="<option value=\"\">All Role</option>";
	}
	
	$.each(galbalDqsRoleObj,function(index,indexEntry){
		if(id==indexEntry["role_id"]){
			html+="<option selected value="+indexEntry["role_id"]+">"+indexEntry["role_name"]+"</option>";			
		}else{
			html+="<option  value="+indexEntry["role_id"]+">"+indexEntry["role_name"]+"</option>";	
		}		
	});	
	html+="</select>";
	return html;
};

//DropDownList Role
var dropDownListRevisedCostCenter = function(id,paramParentID){
	var html="";
	html+="<select disabled class=\"form-control input-inline-table input-contact-selecttype editListRevisedCostCenter \" id=\"listRevisedCostCenter-"+paramParentID+"\">";
	$.each(galbalRevisedCostCenterObj,function(index,indexEntry){
		
		if(id==indexEntry["ccdef"]){
			html+="<option selected value="+indexEntry["ccdef"]+">"+indexEntry["desc"]+"</option>";			
		}else{
			html+="<option  value="+indexEntry["ccdef"]+">"+indexEntry["desc"]+"</option>";	
		}		
	});	
	html+="</select>";
	return html;
};
/*####Init Function  End######*/


$(document).ready(function(){
	
	
	//call pagination 
	
	//binding tooltip.
	$(document).ready(function(){
	    $('[data-toggle="tooltip"]').tooltip();
	});
	/*####Call Init Function  Start######*/
	getDataRole();
	getDataRevisedCostCenter();
	/*####Call Init Function  End######*/
	$("#listRoleArea").html(dropDownListRole());
	
	
		//function update data
var updateFn = function(){ 
	
	 var users = [];
	 $.each(galbalDataUserObj['data'],function(index,indexEntry){
		 var revisedCostCenter="";
		 var role="";
	
		if($("#embedListRevisedCostCenter-"+indexEntry['personnel_id']).val()!=undefined || $("#embed_listRole-"+indexEntry['personnel_id']).val()!=undefined){
			if($("#embedListRevisedCostCenter-"+indexEntry['personnel_id']).val()!=undefined){
				revisedCostCenter=$("#listRevisedCostCenter-"+indexEntry['personnel_id']).val().split(" ")[0];
				
			}else{
				revisedCostCenter=$("#listRevisedCostCenter-"+indexEntry['personnel_id']).val().split(" ")[0];
			}
			if($("#embed_listRole-"+indexEntry['personnel_id']).val()!=undefined){
				role=$("#listRole-"+indexEntry['personnel_id']).val();
				
			}else{
				role=$("#listRole-"+indexEntry['personnel_id']).val();
			}
			//alert(revisedCostCenter);
			users.push({
				 personnel_id: ""+indexEntry['personnel_id']+"",
			     revised_cost_center: ""+revisedCostCenter+"",
			     role_id: ""+role+""
			});
			
		}
		
	 });

	  $.ajax({
		    url:restfulURL+"/dqs_api/public/dqs_user",
		    type:"PATCH",
		    dataType:"json",
		    data:{"users":users},
		    headers:{Authorization:"Bearer "+tokenID.token},
			async:false,
		    success:function(data,status){
			
			checkMaintenanceFn(data);
			
			    if(data['status'] == "200") {
				if(data['errors']==undefined){
					return false;
				}
				if(data['errors'].length>0){
					var validate = "";
					var count = 0;
					$.each(data['errors'], function(index, indexEntry) {
						if(index != 0 ){validate += "<br> "}
						$.each(data['errors'][index], function(index2, indexEntry2) {
						if (index2 != undefined) {
							if (count == 0) {
								validate += "<font color='red'>* </font>" + indexEntry2 + " : ";
							} else {
								validate += "" + indexEntry2 + "  ";
							}
						}

						count++;
						});
						count=0;
					});
					callFlashSlide(validate,"error");
				}
				else{callFlashSlide("Update Successfully.");}
				
				$(".editListRevisedCostCenter").attr("disabled","disabled");
				$(".editListRole").attr("disabled","disabled");
				getDataFn($("#pageNumber").val(),$("#rpp").val());
			     }
			  }
		});
	 		  
	return false;
 };

			 var clearFn = function(){
					
					   $("#id").val("");
					   $("#action").val("add");
			}
			 
			//function advance search data
			var advanceSearchFn = function(){
				
				var personnelID=$("#personnelID").val();
				var ownCostCenter=$("#ownCostCenter").val();	
				var revisedCostCenter=$("#revisedCostCenter").val();	
				
	
				var listRole=$("#listRole").val();
				var isActive=$("#isActive").val();
				
				
				var htmlParam="";
				htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedPersonnelID' name='paramEmbedPersonnelID' value='"+personnelID+"'>";
				htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedOwnCostCenter' name='paramEmbedOwnCostCenter' value='"+ownCostCenter+"'>";
				//htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedOwnCostCenterCode' name='paramEmbedOwnCostCenterCode' value='"+ownCostCenterCode+"'>";
				htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedRevisedCostCenter' name='paramEmbedRevisedCostCenter' value='"+revisedCostCenter+"'>";
				//htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedRevisedCostCenterCode' name='paramEmbedRevisedCostCenterCode' value='"+revisedCostCenterCode+"'>";
				htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedListRole' name='paramEmbedListRole' value='"+listRole+"'>";
				htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedIsActive' name='paramEmbedIsActive' value='"+isActive+"'>";
				$(".paramEmbed").remove();
				$("body").append(htmlParam);
				
				getDataFn(1,$("#rpp").val());

				}
			
			//#### Call Function start ####
		

		  	//ปุ่ม Save
			$("#btnSave").click(function(){
		        updateFn();
		       // alert("btnSave");
			});
			//ปุ่ม Search
			  $("#btnSearch").click(function(){
				   //searchFn("searchText","tableUser");
					searchMultiFn($("#searchText").val());
			  });
			
			// ปุ่ม Cancel
			  $("#btnCancel").click(function(){
				   getDataFn($("#pageNumber").val(),$("#rpp").val());
				});
			
			  //ปุ่ม click Edit 
			  $("#btnEdit").click(function(){
				//Auto Complete Own Cost Center start
				$(".editListRevisedCostCenter").autocomplete({
				    source: function (request, response) {
				    	 $.ajax({
							    url:restfulURL+"/dqs_api/public/dqs_user/revised_cost_center",
							    type:"POST",
							    dataType:"json",
								headers:{Authorization:"Bearer "+tokenID.token},
								data:{"q":request.term},
								//async:false,
				                error: function (xhr, textStatus, errorThrown) {
				                    console.log('Error: ' + xhr.responseText);
				                },
							    success:function(data){
								checkMaintenanceFn(data);
									response($.map(data, function (item) {
				                        return {
				                            label: item.desc,
				                            value: item.desc
				                        }
				                    }));
								
							    },
								beforeSend:function(){
									$("body").mLoading('hide');	
								}
							   });
				    	
				    }
				});

				//Auto Complete Own Cost Center end
				$(".editListRevisedCostCenter").removeAttr("disabled");
				$(".editListRole").removeAttr("disabled");
				//$(".editRevised").removeAttr("disabled");
			  });
			
			//Auto Complete personnelID start
		
			$("#personnelID").autocomplete({
                source: function (request, response) {
                	 $.ajax({
    					    url:restfulURL+"/dqs_api/public/dqs_user/personnel_id",
    					    type:"get",
    					    dataType:"json",
    						headers:{Authorization:"Bearer "+tokenID.token},
    						data:{"q":request.term},
    						//async:false,
                            error: function (xhr, textStatus, errorThrown) {
                            	console.log('Error: ' + xhr.responseText);
                            },
    					    success:function(data){
    						checkMaintenanceFn(data);
	    						response($.map(data, function (item) {
	                                return {
	                                    label: item.personnel_id,
	                                    value: item.personnel_id
	                                }
	                            }));
    						
    					    },
	    					beforeSend:function(){
	    						$("body").mLoading('hide');	
	    					}
    					   });
                	
                }
            });
		  //Auto Complete personnelID end
			
		  //Auto Complete Own Cost Center start
			$("#ownCostCenter").autocomplete({
                source: function (request, response) {
                	 $.ajax({
    					    url:restfulURL+"/dqs_api/public/dqs_user/cost_center",
    					    type:"get",
    					    dataType:"json",
    						headers:{Authorization:"Bearer "+tokenID.token},
    						data:{"q":request.term},
    						//async:false,
                            error: function (xhr, textStatus, errorThrown) {
                                console.log('Error: ' + xhr.responseText);
                            },
    					    success:function(data){
    						checkMaintenanceFn(data);
	    						response($.map(data, function (item) {
	                                return {
	                                    llabel: item.desc,
	                                    value: item.desc
	                                }
	                            }));
    						
    					    },
	    					beforeSend:function(){
	    						$("body").mLoading('hide');	
	    					}
    					   });
                	
                }
            });
		    
		  //Auto Complete Own Cost Center end
			
		  //Auto Complete Own Cost Center start
			$("#revisedCostCenter").autocomplete({
                source: function (request, response) {
                	 $.ajax({
    					    url:restfulURL+"/dqs_api/public/dqs_user/cost_center",
    					    type:"get",
    					    dataType:"json",
    						headers:{Authorization:"Bearer "+tokenID.token},
    						data:{"q":request.term},
    						//async:false,
                            error: function (xhr, textStatus, errorThrown) {
                                alert('Error: ' + xhr.responseText);
                            },
    					    success:function(data){
    						checkMaintenanceFn(data);
	    						response($.map(data, function (item) {
	                                return {
	                                    label: item.desc,
	                                    value: item.desc
	                                }
	                            }));
    						
    					    },
	    					beforeSend:function(){
	    						$("body").mLoading('hide');	
	    					}
    					   });
                	
                }
            });
		    
		  //Auto Complete Own Cost Center end
			$("#btnAdvanceSearch").click(function(){
				advanceSearchFn();
				$("#pageNumber").val(1);
				//paginationFn(1,1,1);
			});
			$("#btnAdvanceSearch").click();
	  	//#### Call Function End ####
	
	  	//#### Call Export User Function Start ####
		$("#exportToExcel").click(function(){
			$("form#formExportToExcel").attr("action",restfulURL+"/dqs_api/public/dqs_user/export?token="+tokenID.token);
			
												 
			$("#export_personnel_id").val($("#paramEmbedPersonnelID").val());
			$("#export_own_cost_center").val($("#paramEmbedOwnCostCenter").val());
			$("#export_revised_cost_center").val($("#paramEmbedRevisedCostCenter").val());
			$("#export_role_id").val($("#paramEmbedListRole").val());
			$("#export_active_flag").val($("#paramEmbedIsActive").val());
			
			$("form#formExportToExcel").submit();
		});
		//#### Call Export User Function End ####
	
	//Auto Complete Own Cost Center start
	$(".editListRevisedCostCenter").autocomplete({
        source: function (request, response) {
        	 $.ajax({
				    url:restfulURL+"/dqs_api/public/dqs_user/revised_cost_center",
				    type:"POST",
				    dataType:"json",
					headers:{Authorization:"Bearer "+tokenID.token},
					data:{"q":request.term},
					//async:false,
                    error: function (xhr, textStatus, errorThrown) {
                        alert('Error: ' + xhr.responseText);
                    },
				    success:function(data){
					checkMaintenanceFn(data);
						response($.map(data, function (item) {
                            return {
                                label: item.desc,
                                value: item.desc
                            }
                        }));
					
				    },
					beforeSend:function(){
						$("body").mLoading('hide');	
					}
				   });
        	
        }
    });
    
  //Auto Complete Own Cost Center end
	//Not Number Start
	jQuery('.numberOnly').keyup(function () { 
	    this.value = this.value.replace(/[^0-9\.]/g,'');
	});
	//Not Number End
	
});



