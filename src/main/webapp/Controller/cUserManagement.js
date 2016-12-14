/*#####Galbal Parameter User Page#######*/

var galbalDqsRoleObj=[];
var galbalRevisedCostCenterObj=[];
var galbalDataUserObj=[];

/*####Galbal Parameter User Page######*/

/*####Init Function  Start######*/
//function list data User
var embedParam = function(id){
	//alert(id);
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
	//alert(id);
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
	
	if ( $.fn.DataTable.isDataTable('#tableUser')) {
	      $('#tableUser').DataTable().destroy();
	     }
	
			   var htmlTable="";
			 $("#listUser").empty();
			   $.each(data,function(index,indexEntry){
				/*
				personnel_id
				thai_full_name
				position_name
				branch_code
				own_cost_center
				revised_cost_center
				role_id
				*/
				     htmlTable+="<tr >";
					  
					      htmlTable+="<td>"+indexEntry["thai_full_name"]+"</td>";
					      htmlTable+="<td>"+indexEntry["position_name"]+"</td>";
					   	  htmlTable+="<td>"+indexEntry["operation_name"]+"</td>";
						  htmlTable+="<td>"+indexEntry["own_cost_center"]+"</td>";
						
						  htmlTable+="<td class=\"listRevisedCostCenterInlineArea\">";
						  htmlTable+=dropDownListRevisedCostCenter(indexEntry["revised_ccdef"],+indexEntry["personnel_id"]);
						  htmlTable+="</td>";
				          
				          
						  htmlTable+="<td class=\"listRoleInlineArea\">";
							 // htmlTable+="<select disabled class=\"form-control input-inline-table input-contact-selecttype editListRole \" id=\"listRole-"+indexEntry["_id"]+"\">"+/*listDataRole(indexEntry["role_id"])*/+"</select>";
						  htmlTable+=dropDownListRole(indexEntry["role_id"],"Y",+indexEntry["personnel_id"]);
						  htmlTable+="</td>";
						  
						  
						 
						  
				     htmlTable+="</tr>";
					
			   });
			
			  $("#listUser").html(htmlTable);
			  
			
			//DataTable
			 // $('#tableUser').DataTable( { "dom": '<"top"flp>rt<"bottom"lp><"clear">' } ); 
			  $('#tableUser').DataTable( { "dom": '<"top"flp>rt<"bottom"lp><"clear">',"bSort" : false  } ); 
			
			
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
			
			
			//Edit Revised
			/*$(".editRevised").click(function(){
				
				var id = this.id.split("-"); 
				
				embedParamRevised(id[1]);
				
			});*/
			
			//end ปุ่ม Edit ใน table
	
};
//Get data User
var getDataFn = function() {
		$.ajax({
			url : restfulURL + "/dqs_api/public/dqs_user",
			type : "get",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			//data:{Authorization:"Bearer "+tokenID.token},
			success : function(data) {
				galbalDataUserObj=data['data'];
				listDataFn(galbalDataUserObj);
				//dropDownListRole();
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
				
				galbalRevisedCostCenterObj=data;

			}
	});
};
//DropDownList Role
var dropDownListRole = function(id,paramInline,paramParentID){
	var html="";
	if(paramInline=="Y"){
		html+="<select disabled class=\"form-control input-inline-table input-contact-selecttype editListRole\" id=\"listRole-"+paramParentID+"\">";
	}else{
		html+="<select class=\"form-control input-sm \" id=\"listRole\">";
	}
	//html+="<option  value=''>All</option>";	
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
	html+="<select disabled class=\"form-control input-inline-table input-contact-selecttype editListRevisedCostCenter\" id=\"listRevisedCostCenter-"+paramParentID+"\">";
	$.each(galbalRevisedCostCenterObj,function(index,indexEntry){
		
		if(id==indexEntry["ccdef"]){
			html+="<option selected value="+indexEntry["ccdef"]+">"+indexEntry["desc_1"]+"</option>";			
		}else{
			html+="<option  value="+indexEntry["ccdef"]+">"+indexEntry["desc_1"]+"</option>";	
		}		
	});	
	html+="</select>";
	return html;
};
/*####Init Function  End######*/


$(document).ready(function(){
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
	 $.each(galbalDataUserObj,function(index,indexEntry){
		//console.log($("#embedListRevisedCostCenter-"+indexEntry['personnel_id']).val()); 
		 var revisedCostCenter="";
		 var role="";
	
		if($("#embedListRevisedCostCenter-"+indexEntry['personnel_id']).val()!=undefined || $("#embed_listRole-"+indexEntry['personnel_id']).val()!=undefined){
			if($("#embedListRevisedCostCenter-"+indexEntry['personnel_id']).val()!=undefined){
				//alert("ok")
				revisedCostCenter=$("#listRevisedCostCenter-"+indexEntry['personnel_id']).val();
				
			}else{
				revisedCostCenter="";
			}
			if($("#embed_listRole-"+indexEntry['personnel_id']).val()!=undefined){
				//alert("ok")
				role=$("#listRole-"+indexEntry['personnel_id']).val();
				
			}else{
				role="";
			}
		
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
		     console.log(data);
			     if(status=="success"){
				callFlashSlide("Update Successfully.");
				$(".editListRevisedCostCenter").attr("disabled","disabled");
				$(".editListRole").attr("disabled","disabled");
				

			     }
			  }
		});
	 
	 
		 

				  
				return false;
			 };

			 
			 
			 var clearFn = function(){
					
					   $("#id").val("");
					   $("#action").val("add");
			}
			 
			 
			 //function search data
			  var searchFn = function(searchText){
				   /* http://localhost:3000/dqs_api/public/products?name__regex=/^test/i */
				    
				   $.ajax({
				    url:restfulURL+"/dqs_api/public/dqs_user/?user_name__regex=/^"+searchText+"/i",
				    type:"get",
				    dataType:"json",
				    success:function(data){
				
				     listDataFn(data);
				    }
				   });
				   
				  }
			//function advance search data
			var advanceSearchFn = function(){
				var personnelID=$("#personnelID").val();
				var ownCostCenter=$("#ownCostCenter").val().split("-");	
				var ownCostCenterCode=ownCostCenter[0];
				
				var revisedCostCenter=$("#revisedCostCenter").val().split("-");	
				var revisedCostCenterCode=revisedCostCenter[0];
				
				var listRole=$("#listRole").val();
				var isActive=$("#isActive").val();
				
				//personnelID,ownCostCenter,ownCostCenterCode,revisedCostCenter,revisedCostCenterCode,listRole,isActive
			
				var htmlParam="";
				htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedPersonnelID' name='paramEmbedPersonnelID' value='"+personnelID+"'>";
				htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedOwnCostCenter' name='paramEmbedOwnCostCenter' value='"+ownCostCenter+"'>";
				htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedOwnCostCenterCode' name='paramEmbedOwnCostCenterCode' value='"+ownCostCenterCode+"'>";
				htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedRevisedCostCenter' name='paramEmbedRevisedCostCenter' value='"+revisedCostCenter+"'>";
				htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedRevisedCostCenterCode' name='paramEmbedRevisedCostCenterCode' value='"+revisedCostCenterCode+"'>";
				htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedListRole' name='paramEmbedListRole' value='"+listRole+"'>";
				htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedIsActive' name='paramEmbedIsActive' value='"+isActive+"'>";
				$(".paramEmbed").remove();
				$("body").append(htmlParam);
				
				
				/*
				"page,
				rpp,
				personnel_id,
				own_cost_center,
				revised_cost_center,
				role_id,
				active_flag"
				*/
				/*
				alert(personnelID);
				alert(ownCostCenter);
				alert(revisedCostCenter);
				alert(listRole);
				alert(isActive);
				*/
				//http://192.168.1.58/dqs_api/public/dqs_user
				   $.ajax({
				    url:restfulURL+"/dqs_api/public/dqs_user",
				    type:"get",
				    dataType:"json",
				    headers:{Authorization:"Bearer "+tokenID.token},
					data:{"personnel_id":personnelID,
						"own_cost_center":ownCostCenterCode,
						"revised_cost_center":revisedCostCenterCode,
						"role_id":listRole,
						"active_flag":isActive},
				    success:function(data){
					//console.log(data['data']);
						//if(data['data']!=""){
							listDataFn(data['data']);
						//}
				     //
				    }
				   });
				   
				  }
			
		
			
			
			
	
			
			/*var embedParamRevised = function(id){
				//alert(id);
				var count = 0;
				
				$.each($(".embed_Revised").get(),function(index,indexEnry){
				//ถ้า id ที่วน == id ที่มี	
					if($(indexEnry).val()==id){
						count+=1;
					}
				});
				
				if(count>0){
					$("#embed_listRevised-"+id).remove();
					$("body").append("<input type='hidden' class='embed_Revised' id='embed_listRevised-"+id+"' name='embed_listRevised' value='"+id+"'>");
				}else{
					$("body").append("<input type='hidden' class='embed_Revised' id='embed_listRevised-"+id+"' name='embed_listRevised' value='"+id+"'>");
				}
				
			}*/
			
			
			
			
			
			//List Role in table
			
			
		
			/*
			var listDataRole = function(id){
				
				var htmlTable="";
				$.ajax ({
					url:restfulURL+"/dqs_api/public/dqs_role" ,
					type:"get" ,
					dataType:"json" ,
					headers:{Authorization:"Bearer "+tokenID.token},
					async:false,
						success:function(data){
							
							
							$.each(data,function(index,indexEntry){
								//alert(id+"=="+indexEntry["_id"]);
								
								if(id==indexEntry["_id"]){
									htmlTable+="<option selected value="+indexEntry["_id"]+">"+indexEntry["role_name"]+"</option>";			
								}else{
									htmlTable+="<option  value="+indexEntry["_id"]+">"+indexEntry["role_name"]+"</option>";	
									}
								
								});	
							
						}
				});
				return htmlTable;
			};
			*/
			
		/*	//DropDownList	Branch Operation
			var listBranchOper = function(){
				var htmlTable="";
				$.ajax ({
					url:restfulURL+"/dqs_api/public/dqs_branch_operation" ,
					type:"get" ,
					dataType:"json" ,
					async:false,
						success:function(data){
							
							$.each(data,function(index,indexEntry){
								
								htmlTable+="<option value="+indexEntry["operation_code"]+">"+indexEntry["operation_name"]+"</option>";			
							});	
							
							
							//$("#listBranchOper-"+id).html(htmlTable);
						}
				});
				return htmlTable;
			};*/
		
			
			
			//#### Call Function start ####
			getDataFn();

		  	//ปุ่ม Save
			$("#btnSave").click(function(){
		        updateFn();
		       // alert("btnSave");
			});
			
			//ปุ่ม Search
			  $("#btnSearch").click(function(){
				   searchFn($("#searchText").val());
				   return false;
			  });
			
			// ปุ่ม Cancel
			  $("#btnCancel").click(function(){
				  getDataFn();
				});
			
			  //ปุ่ม click Edit 
			  $("#btnEdit").click(function(){
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
    						async:false,
                            error: function (xhr, textStatus, errorThrown) {
                            	alert('Error: ' + xhr.responseText);
                            },
    					    success:function(data){
    						
	    						response($.map(data, function (item) {
	                                return {
	                                    label: item.personnel_id,
	                                    value: item.personnel_id
	                                }
	                            }));
    						
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
    						async:false,
                            error: function (xhr, textStatus, errorThrown) {
                                alert('Error: ' + xhr.responseText);
                            },
    					    success:function(data){
    						
	    						response($.map(data, function (item) {
	                                return {
	                                    llabel: item.ccdef+" - "+item.desc_1,
	                                    value: item.ccdef+" - "+item.desc_1
	                                }
	                            }));
    						
    					    }
    					   });
                	
                }
            });
		    
		  //Auto Complete Own Cost Center end
			
			//Auto Complete Own Cost Center start
			$("#revisedCostCenter").autocomplete({
                source: function (request, response) {
                	 $.ajax({
    					    url:restfulURL+"/dqs_api/public/dqs_user/revised_cost_center",
    					    type:"get",
    					    dataType:"json",
    						headers:{Authorization:"Bearer "+tokenID.token},
    						data:{"q":request.term},
    						async:false,
                            error: function (xhr, textStatus, errorThrown) {
                                alert('Error: ' + xhr.responseText);
                            },
    					    success:function(data){
    						
	    						response($.map(data, function (item) {
	                                return {
	                                    label: item.ccdef+" - "+item.desc_1,
	                                    value: item.ccdef+" - "+item.desc_1
	                                }
	                            }));
    						
    					    }
    					   });
                	
                }
            });
		    
		  //Auto Complete Own Cost Center end
			
			
			$("#btnAdvanceSearch").click(function(){
				advanceSearchFn();
			});
	  //#### Call Function End ####
	
	  //#### Call Export User Function Start ####
		$("#exportToExcel").click(function(){
			$("form#formExportToExcel").attr("action",restfulURL+"/dqs_api/public/dqs_user/export?token="+tokenID.token);
			
			
			$("#export_personnel_id").val($("#paramEmbedPersonnelID").val());
			$("#export_own_cost_center").val($("#paramEmbedOwnCostCenterCode").val());
			$("#export_revised_cost_center").val($("#paramEmbedRevisedCostCenterCode").val());
			$("#export_role_id").val($("#paramEmbedListRole").val());
			$("#export_active_flag").val($("#paramEmbedIsActive").val());
			
			$("form#formExportToExcel").submit();
		});
	  //#### Call Export User Function End ####
	
});


