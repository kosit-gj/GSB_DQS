var golbalData=[];
var costCenterId="";
var costCenterName="";
//get data Region
  var getDataFn = function(page,rpp){
	   $.ajax({
		    url:restfulURL+"/dqs_api/public/dqs_region",
		    type:"get",
		    dataType:"json",
			data:{"page":page,"rpp":rpp},
			async:false,
		    headers:{Authorization:"Bearer "+tokenID.token},
			    success:function(data){
				checkMaintenanceFn(data);
			     	listDataFn(data['data']);
					
					golbalData=data;
					paginationSetUpFn(golbalData['current_page'],golbalData['last_page'],golbalData['last_page']);
			 }
	  });
};
// list data Region
  var listDataFn = function(data){
//		if ( $.fn.DataTable.isDataTable('#tableRegion')) {
//	      $('#tableRegion').DataTable().destroy();
//	     }
//			
		var htmlTable="";
		   $.each(data,function(index,indexEntry){
			     htmlTable+="<tr class='rowSearch'>";
				      htmlTable+="<td class='columnSearch'>"+indexEntry['seq']+"</td>";
				      htmlTable+="<td class='columnSearch'>"+indexEntry["region_code"]+"</td>";
				   	  htmlTable+="<td class='columnSearch'>"+indexEntry["regdesc"]+"</td>";
					  htmlTable+="<td class='columnSearch'>"+indexEntry["operation_name"]+"</td>";
				      htmlTable+="<td class='objectCenter'><i class=\"fa fa-gear font-management popover-del-edit\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-warning btn-xs edit' data-target=#ManagementModal data-toggle='modal' type='button' id="+indexEntry["region_id"]+">Edit</button> <button class='btn btn-danger btn-xs del' type='button' id="+indexEntry["region_id"]+">Delete</button>\"></i></td>"
				 htmlTable+="</tr>";
		   });
		   $("#listRegion").html(htmlTable);
			
		   //DataTable
		   //$('#tableRegion').DataTable( { "dom": '<"top"flp>rt<"bottom"lp><"clear">',"bSort" : false } ); 
		
			//เมื่อ click แล้วให้มันไปผูกกับ popover
			$("#tableRegion_wrapper").click(function(){
			    $(".popover-del-edit").popover();
			});
			
			  //popover 
			$(".popover-del-edit").popover();
			
			
			$("#tableRegion").off("click",".popover-del-edit");
			$("#tableRegion").on("click",".popover-del-edit",function(){
				
			//findOnd
			$(".edit").on("click",function(){
				 $(this).parent().parent().parent().children().click();
				   $("#modalTitleRole").html("Edit Region");
				   $("#modalDescription").html("EDIT REGION");
				    findOneFn(this.id);
				    $("#region_id").val(this.id);
				    $("#action").val("edit");
				    $("#btnSubmit").val("Edit");
				    $("#btnSaveAnother").val("Edit");
				    $("#btnSaveAnother").hide();
				   
				});
				
			//delete
		   	$(".del").on("click",function(){
			var id = this.id;
		    $(this).parent().parent().parent().children().click();
				$("#confrimModal").modal();
				$(document).off("click","#btnConfirmOK");
				$(document).on("click","#btnConfirmOK",function(){
			    	 $.ajax({
				      url:restfulURL+"/dqs_api/public/dqs_region/"+id,
				      type:"DELETE",
				      dataType:"json",
					  headers:{Authorization:"Bearer "+tokenID.token},
					  success:function(data){ 
						checkMaintenanceFn(data);
						if(data['status']==200){
							
							   callFlashSlide("Delete Successfully.");       
						       getDataFn($("#pageNumber").val(),$("#rpp").val());
						       getDataFn();
						       clearFn();
							   $("#confrimModal").modal('hide');
							   
						}else if(data['status']=="400"){
							callFlashSlide(data['data'],"error");  
						}
	     			 }
	   			  });
	   		   
				});
	  	 });
		
	});
}
//function clear data
var clearFn =function(){
	
   $("#modalTitleRole").html("Add New Region");
   $("#modalDescription").html("ADD NEW REGION");    
   $("#region_id").val("");
   $("#action").val("add");
   $("#region_code").val("");
   $("#region_name").val("");
   $("#btnSubmit").val("Add");
   $("#btnSaveAnother").val("Add");
   $(".information").hide();
   
   dropDownListBranchOper();
		   
}

//DropDownList	Branch Operation
var dropDownListBranchOper = function(operation_id){
	$.ajax ({
		url:restfulURL+"/dqs_api/public/dqs_branch_operation" ,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
			success:function(data){
				checkMaintenanceFn(data);
				var htmlTable="";
				$.each(data,function(index,indexEntry){
					if(indexEntry["operation_id"] == operation_id){
						htmlTable+="<option selected=\"selected\" value="+indexEntry["operation_id"]+">"+indexEntry["operation_name"]+"</option>";		
					}else{
						htmlTable+="<option value="+indexEntry["operation_id"]+">"+indexEntry["operation_name"]+"</option>";		
					}
				});	
				$("#list_Branch_Oper").html(htmlTable);
			}
	});
};
//get data to Edit
var findOneFn = function(id){
	   $.ajax({
		    url:restfulURL+"/dqs_api/public/dqs_region/"+id,
		    type:"get",
		    dataType:"json",
		    headers:{Authorization:"Bearer "+tokenID.token},
		    success:function(data){
			checkMaintenanceFn(data);
			  $("#region_code").val(data['region_code']);
		      $("#region_name").val(data['regdesc']);
			  dropDownListBranchOper(data['operation_id']);
	    	}
	   });
  };


$(document).ready(function(){
		
		
	//Number Only Text Fields.
//	$(".numberOnly").keydown(function (e) {
//		        // Allow: backspace, delete, tab, escape, enter and .
//			
//		        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
//		             // Allow: Ctrl+A, Command+A
//		            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
//		             // Allow: home, end, left, right, down, up
//		            (e.keyCode >= 35 && e.keyCode <= 40)) {
//		                 // let it happen, don't do anything
//		                 return;
//		        }
//		        // Ensure that it is a number and stop the keypress
//		        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
//		            e.preventDefault();
//		        }
//		});
	
	//Not Number Start
	jQuery('.numberOnly').keyup(function () { 
	    this.value = this.value.replace(/[^0-9\.]/g,'');
	});
	//Not Number End
	
		
		 
		 
		 //function เชคค่าว่าง
		   var validationFn = function(){
			   var validateText="";
			       if($("#region_code").val()==""){
				    	validateText+="region code not empty\n";
				   }
					if($("#list_Branch_Oper").val()==""){
				   		 validateText+="operation not empty\n";
				   }
				   if(validateText!=""){
					    callFlashSlide(validateText,"error");
					    return false;
				   }else{
				   		return true;
				   }
			  }
		
		 
		 var validationOperFn = function(){
			   var validateText="";
			       if($("#operation_name").val()==""){
				    	validateText+="Operation name not empty\n";
				   }
				   if($("#cost_center").val()==""){
				    	validateText+="Cost Center not empty\n";
				   }
				   if(validateText!=""){
					    callFlashSlide(validateText,"error");
					    return false;
				   }else{
				   		return true;
				   }
			  }
		 
		 
		 //function insert data Region
		 var insertFn = function(param){
			    $.ajax({
				     url:restfulURL+"/dqs_api/public/dqs_region",
				     type:"POST",
				     dataType:"json",
				     headers:{Authorization:"Bearer "+tokenID.token},
				     data:{ "region_code":$("#region_code").val(),
							"operation_id":$("#list_Branch_Oper").val()},
				     success:function(data,status){
					 checkMaintenanceFn(data);
						  //console.log(data);
					      if(data['status']=="200"){
						
							if(param !="saveAndAnother"){
							   callFlashSlide("Insert Successfully.");
						       getDataFn($("#pageNumber").val(),$("#rpp").val());
						       clearFn();
						
						 	   $('#ManagementModal').modal('hide');
						 	  
							}else{
								getDataFn($("#pageNumber").val(),$("#rpp").val());
								clearFn();
								callFlashSlideInModal("Insert Data is Successfully.","#information");
								
							}
					
					
					      }else if(data['status']=="400"){
						
								var validate="";
								if(data['data']['region_code']!=undefined){
									validate+="<font color='red'>*</font> "+data['data']['region_code']+"<br>";
								}
								callFlashSlideInModal(validate,"#information","error");
						  }
					   }
							
			    });         
			    return false;
	 		};

				
		 	//function update data Region
		    var updateFn = function(){
				   $.ajax({
					    url:restfulURL+"/dqs_api/public/dqs_region/"+$("#region_id").val(),
					    type:"PATCH",
					    dataType:"json",
					    headers:{Authorization:"Bearer "+tokenID.token},
					    data:{ "region_code":$("#region_code").val(),
							   "operation_id":$("#list_Branch_Oper").val()},
					    success:function(data,status){
						checkMaintenanceFn(data);
						     if(data['status']=="200"){
								 $('#ManagementModal').modal('hide');
							     callFlashSlide("Update Successfully.");
								 getDataFn($("#pageNumber").val(),$("#rpp").val());
						      	//clearFn();
						     }
						   }
					   });
				   return false;
			 };
			
			 
			 
			var closeModalFn =function(){
				$('#ManagementModal').modal('hide');
			} 
			
			
			 
			 
			
			// function search
			  var searchFn_bk = function(searchText){
				   $.ajax({
				    url:restfulURL+"/dqs_api/public/dqs_region/?region_name__regex=/^"+searchText+"/i",
				    type:"get",
				    dataType:"json",
				    success:function(data){
					checkMaintenanceFn(data);
					     listDataFn(data);
				      }
				  });
 			  }
			
			
			
			
			//Call Function start
			getDataFn();
			//call pagination 
			paginationSetUpFn(golbalData['current_page'],golbalData['last_page'],golbalData['last_page']);
			
			
			/*//////////////////////// Start BranchOperation /////////////// */
			
			var listDataBranchOperFn = function(data){
				   var htmlTable="";
				   $.each(data,function(index,indexEntry){
					     htmlTable+="<tr >";
						      htmlTable+="<td>"+(index+1)+"</td>";
						   	  htmlTable+="<td>"+indexEntry["operation_name"]+"</td>";
							  htmlTable+="<td>"+indexEntry["cost_center"]+"</td>";
						      htmlTable+="<td><i class=\"fa fa-gear font-management popover-del-editOper\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-warning btn-xs editOper' type='button' id="+indexEntry["operation_id"]+">Edit</button> <button class='btn btn-danger btn-xs deleteOper' type='button' id="+indexEntry["operation_id"]+">Delete</button>\"></i></td>"
						 htmlTable+="</tr>";
				   });
				   $("#listTableBranchOper").html(htmlTable);
				
			       $(".popover-del-editOper").popover();
				
				
				   $('.popover-del-editOper').click(function(){
						//findOnd
						$(".editOper").on("click",function(){
							    findOneOperationFn(this.id,$(this).parent().parent().parent().prev().text());
							    $("#operation_id").val(this.id);
							    $("#action").val("edit");
							    $("#btnSaveOper").val("Edit");
								$(this).parent().parent().parent().children().click();
							});
					
					//delete
				   	$(".deleteOper").click(function(){
					var id = this.id;
					$(this).parent().parent().parent().children().click();
					
						    $("#confrimModal").modal();
							$(document).off("click","#btnConfirmOK");
							$(document).on("click","#btnConfirmOK",function(){
							
							     $.ajax({
								      url:restfulURL+"/dqs_api/public/dqs_branch_operation/"+id,
								      type:"delete",
								      dataType:"json",
								      headers:{Authorization:"Bearer "+tokenID.token},
								      success:function(data){    
									  checkMaintenanceFn(data);
											if(data['status']==200){  
									       		getDataBranchOperFn();
									       		clearOperFn();
												$("#confrimModal").modal('hide');
									
											}else if(data['status']==400){
												
												callFlashSlideInModal(data['data'],"#information2","error");
												$("#confrimModal").modal('hide');
												   
											}
										  
						     			 }
						   			  });
				   		   	  
							});
						
						
						});
				   });
			};
			
               var insertBranchOperFn = function(){
				    $.ajax({
					     url:restfulURL+"/dqs_api/public/dqs_branch_operation",
					     type:"POST",
					     dataType:"json",
					     headers:{Authorization:"Bearer "+tokenID.token},
					     data:{ "operation_name":$("#operation_name").val(),
								"cost_center":$("#auto_cost_center_id").val()},
					     success:function(data,status){
						 checkMaintenanceFn(data);
						      if(data['status']=="200"){
							
							  callFlashSlideInModal("Insert Successfully.","#information2");
						      getDataBranchOperFn();
						      clearOperFn();
						
					     	  }else if (data['status'] == "400") {
						
									var validate="";
									if(data['data']['operation_name']!=undefined){
										validate+="<font color='red'>*</font> "+data['data']['operation_name']+"<br>";
									}
									
									callFlashSlideInModal(validate,"#information2","error");
							   }
					
						 }
				    });         
				
				    return false;
		 		};
		 		
	 		 var updateBranchOperFn = function(){
					   $.ajax({
						    url:restfulURL+"/dqs_api/public/dqs_branch_operation/"+$("#operation_id").val(),
						    type:"PATCH",
						    dataType:"json",
						    headers:{Authorization:"Bearer "+tokenID.token},
						    data:{ "operation_name":$("#operation_name").val(),
								   "cost_center":$("#auto_cost_center_id").val()},
						    success:function(data,status){
							checkMaintenanceFn(data);
							     if(data['status']=="200"){
								
									  callFlashSlideInModal("Upate Successfully.","#information2");
								      getDataBranchOperFn();
								      clearOperFn();
								
							     	}else if (data['status'] == "400") {
								
											var validate="";
											if(data['data']['operation_name']!=undefined){
												validate+="<font color='red'>*</font> "+data['data']['operation_name']+"<br>";
											}
											if(data['data']['cost_center']!=undefined){
												validate+="<font color='red'>*</font> "+data['data']['cost_center']+"<br>";
											}
											
											callFlashSlideInModal(validate,"#information2","error");
									  }
							    }
						   });
					   return false;
				 }
		 		
		 		var findOneOperationFn = function(id,cost_center_name) {
					$.ajax({
						url:restfulURL+"/dqs_api/public/dqs_branch_operation/"+ id,
						type : "get",
						dataType : "json",
						headers:{Authorization:"Bearer "+tokenID.token},
						success : function(data) {
							checkMaintenanceFn(data);
							$("#operation_name").val(data["operation_name"]);
							$("#list_cost_center").val(data["cost_center"]);
							$("#auto_cost_center").val(cost_center_name);
							$("#auto_cost_center_id").val(data["cost_center"]);
							costCenterName= cost_center_name;
							costCenterId = data["cost_center"];
						}
					});
				};
				

				 //function clear data
				 var clearOperFn =function(){
					   $("#operation_id").val("");
					   $("#action").val("add");
					   $("#operation_name").val("");
					   $("#btnSaveOper").val("Add");
					   $("#auto_cost_center").val("");
					   $("#auto_cost_center_id").val("");
						//dropDownListCostCenter();
						   
				}
				 
			    
			
			var getDataBranchOperFn = function(){
				   $.ajax({
					    url:restfulURL+"/dqs_api/public/dqs_branch_operation",
					    type:"get",
					    dataType:"json",
					    headers:{Authorization:"Bearer "+tokenID.token},
						    success:function(data){
							checkMaintenanceFn(data);
						    	 listDataBranchOperFn(data);
						        
						 }
				  });
			};
			getDataBranchOperFn();
			
			
			
			
			var dropDownListCostCenter = function(ccdef){
				$.ajax ({
					url:restfulURL+"/dqs_api/public/dqs_user/revised_cost_center" ,
					type:"get" ,
					dataType:"json" ,
					headers:{Authorization:"Bearer "+tokenID.token},
						success:function(data){
							checkMaintenanceFn(data);
							if(data!=""){
							var htmlTable="";
							$.each(data,function(index,indexEntry){
								if(indexEntry["ccdef"] == ccdef){
									htmlTable+="<option selected=\"selected\" value="+indexEntry["ccdef"]+">"+indexEntry["desc"]+"</option>";		
								}else{
									htmlTable+="<option value="+indexEntry["ccdef"]+">"+indexEntry["desc"]+"</option>";		
								}
							});	
							$("#list_cost_center").html(htmlTable);
							}
						}
				});
			};
			
			/*//////////////////////////// End BranchOperation ///////////////////// */
			
			
			
				// ปุ่ม save 
	  		$("#btnSubmit").click(function(){
	  			
			   //if(validationFn()==true){
				    if($("#action").val()=="add" || $("#action").val()=="" ){
				      	insertFn();
				    }else{
				     	updateFn();
				    }
			   //}
		   		return false;
		  });
		
		 // ปุ่ม SaveAnother 
		 	  $("#btnSaveAnother").click(function(){
			   		insertFn("saveAndAnother");
			   		return false;
			  });
				
			//ปุ่ม add in branch operation
			   $("#btnAdd").click(function(){
					 clearFn();
					 $(".textadd_edit").text("ADD REGIONAL OFFICE");
					 $("#btnSaveAnother").show();
			  });
				
			   $("#btnSaveOper").click(function(){
				   //alert($("#auto_cost_center_id").val());
						    if($("#action").val()=="add" || $("#action").val()=="" ){
							    insertBranchOperFn();
						    }else{
						     	updateBranchOperFn();
						    }
					   	return false;
			  }); 
			   
			   $("#btnCancelOper").click(function(){
					   clearOperFn();
					   return false;
				  });
			   
			   //ปุ่ม search
			  
			  $("#btnSearch").click(function(){
				
				 searchMultiFn($("#searchText").val());
				
				  // return false;
			  });
				
			  //ปุ่ม cancel
			  $("#btnCancel").click(function(){
				   clearFn();
				   return false;
			  });

			$(".showBranchOper").on("click",function(){
				getDataBranchOperFn();
				//dropDownListCostCenter();
				$(".information").hide();
				$(this).parent().parent().parent().children().click();
			});
			
			$("#region_code").keyup(function(){
				
				$.ajax ({
					url:restfulURL+"/dqs_api/public/dqs_branch/region/getRegionName",
					type:"POST" ,
					dataType:"json" ,
					//async:false,
					headers:{Authorization:"Bearer "+tokenID.token},
					data:{"region_code":$(this).val()},
					success:function(data){
						checkMaintenanceFn(data);
						$("body").mLoading('hide');	
							$("#region_name").val(data['regdesc']);
							
						},
						beforeSend:function(){
						$("body").mLoading('hide');	
					}
				});
			});
	  
	  //Call Function End
	//Autocomplete Search Start
	$("#auto_cost_center").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+"/dqs_api/public/dqs_branch_operation/auto_cost_center",
				 type:"post",
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
                                value: item.desc,
                                cost_center: item.ccdef,
                                cost_center_name: item.desc
                            };
                        }));
					
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        },
		select:function(event, ui) {
            $("#auto_cost_center").val(ui.item.value);
            $("#auto_cost_center_id").val(ui.item.cost_center);
            costCenterName = ui.item.value;
            costCenterId=ui.item.cost_center;
            return false;
        },change: function(e, ui) { 
        	if ($("#auto_cost_center").val() == costCenterName) {
				$("#auto_cost_center_id").val(costCenterId);
			} else if (ui.item != null) {
				$("#auto_cost_center_id").val(ui.item.cost_center);
			} else {
				$("#auto_cost_center_id").val("");
			}
			
        	
         }
    });
   
	//Autocomplete Search End
	
});
