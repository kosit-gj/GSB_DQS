$(document).ready(
	function(){
		 
		 
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
					    callFlashSlide(validateText);
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
					    callFlashSlide(validateText);
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

						  //console.log(data);
					      if(data['status']=="200"){
						
							if(param !="saveAndAnother"){
							   callFlashSlide("Insert Successfully.");
						       getDataFn();
						       clearFn();
						 	   $('#managementModal').modal('hide');
							}else{
								getDataFn();
								clearFn();
								callFlashSlideInModal("Insert Data is Successfully.");
							}
					
					
					      }else if(data['status']=="400"){
						
								var validate="";
								if(data['data']['region_code']!=undefined){
									validate+="<font color='red'>*</font> "+data['data']['region_code']+"<br>";
								}
								callFlashSlideInModal(validate);
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
						     if(data['status']=="200"){
								 $('#ManagementModal').modal('hide');
							     callFlashSlide("Update Successfully.");
								 getDataFn();
						      	//clearFn();
						     }
						   }
					   });
				   return false;
			 };
			
			 
			 
			var closeModalFn =function(){
				$('#ManagementModal').modal('hide');
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
			   dropDownListBranchOper();
					   
			}
			 
			 //get data to Edit
			 var findOneFn = function(id){
				   $.ajax({
					    url:restfulURL+"/dqs_api/public/dqs_region/"+id,
					    type:"get",
					    dataType:"json",
					    headers:{Authorization:"Bearer "+tokenID.token},
					    success:function(data){
						  $("#region_code").val(data['region_code']);
					      $("#region_name").val(data['regdesc']);
						  dropDownListBranchOper(data['operation_id']);
				    	}
				   });
			  };
		
			// function search
			  var searchFn = function(searchText){
				   $.ajax({
				    url:restfulURL+"/dqs_api/public/dqs_region/?region_name__regex=/^"+searchText+"/i",
				    type:"get",
				    dataType:"json",
				    success:function(data){
					     listDataFn(data);
				      }
				  });
 			  }
			
			
			 // list data Region
			  var listDataFn = function(data){
					if ( $.fn.DataTable.isDataTable('#tableRegion')) {
				      $('#tableRegion').DataTable().destroy();
				     }
						
					var htmlTable="";
					   $.each(data,function(index,indexEntry){
						     htmlTable+="<tr >";
							      htmlTable+="<td>"+(index+1)+"</td>";
							      htmlTable+="<td>"+indexEntry["region_code"]+"</td>";
							   	  htmlTable+="<td>"+indexEntry["regdesc"]+"</td>";
								  htmlTable+="<td>"+indexEntry["operation_name"]+"</td>";
							      htmlTable+="<td><i class=\"fa fa-gear font-management popover-del-edit\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-info btn-xs showBranchOper' data-target=#modalOperation data-toggle='modal' type='button' id="+indexEntry["region_id"]+">Operation</button> <button class='btn btn-warning btn-xs edit' data-target=#ManagementModal data-toggle='modal' type='button' id="+indexEntry["region_id"]+">Edit</button> <button class='btn btn-danger btn-xs del' type='button' id="+indexEntry["region_id"]+">Delete</button>\"></i></td>"
							 htmlTable+="</tr>";
					   });
					   $("#listRegion").html(htmlTable);
						
					   //DataTable
					   $('#tableRegion').DataTable( { "dom": '<"top"flp>rt<"bottom"lp><"clear">',"bSort" : false } ); 
					
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
										   callFlashSlide("Delete Successfully.");       
									       getDataFn();
									       clearFn();
										   $("#confrimModal").modal('hide');
				     			 }
				   			  });
				   		   
							});
				  	 });
					
					$(".showBranchOper").on("click",function(){
						getDataBranchOperFn();
						dropDownListCostCenter();
						$(this).parent().parent().parent().children().click();
					});
				});
			}
			
			//get data Region
			  var getDataFn = function(){
				   $.ajax({
					    url:restfulURL+"/dqs_api/public/dqs_region",
					    type:"get",
					    dataType:"json",
					    headers:{Authorization:"Bearer "+tokenID.token},
						    success:function(data){
						     	listDataFn(data['data']);
						 }
				  });
			};
			//Call Function start
			getDataFn();
			
			
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
							    findOneOperationFn(this.id);
							    $("#operation_id").val(this.id);
							    $("#action").val("edit");
							    $("#btnSaveOper").val("Edit");
								$(this).parent().parent().parent().children().click();
							});
					
					//delete
				   	$(".deleteOper").click(function(){
					$(this).parent().parent().parent().children().click();
					
				    if(confirm("Do you want to delete this file?")){
					     $.ajax({
						      url:restfulURL+"/dqs_api/public/dqs_branch_operation/"+this.id,
						      type:"delete",
						      dataType:"json",
						      headers:{Authorization:"Bearer "+tokenID.token},
							      success:function(data){       
								       getDataBranchOperFn();
								       clearOperFn();
					
					     			 }
					   			  });
				   		   	  }
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
								"cost_center":$("#list_cost_center").val(),},
					     success:function(data,status){
						      if(data['status']=="200"){
							
							  callFlashSlideInModal("Insert Successfully.","#information2");
						      getDataBranchOperFn();
						      clearOperFn();
						
					     	  }else if (data['status'] == "400") {
						
									var validate="";
									if(data['data']['operation_name']!=undefined){
										validate+="<font color='red'>*</font> "+data['data']['operation_name']+"<br>";
									}
									
									callFlashSlideInModal(validate,"#information2");
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
								   "cost_center":$("#list_cost_center").val(),},
						    success:function(data,status){
							     if(status=="success"){
								
									  callFlashSlideInModal("Upate Successfully.","#information2");
								      getDataBranchOperFn();
								      clearOperFn();
								
							     	}else if (data['status'] == "400") {
								
											var validate="";
											if(data['data']['operation_name']!=undefined){
												validate+="<font color='red'>*</font> "+data['data']['operation_name']+"<br>";
											}
											
											callFlashSlideInModal(validate,"#information2");
									  }
							    }
						   });
					   return false;
				 }
		 		
		 		var findOneOperationFn = function(id) {
					$.ajax({
						url:restfulURL+"/dqs_api/public/dqs_branch_operation/"+ id,
						type : "get",
						dataType : "json",
						headers:{Authorization:"Bearer "+tokenID.token},
						success : function(data) {
							$("#operation_name").val(data["operation_name"]);
							$("#list_cost_center").val(data["cost_center"]);
						}
					});
				};
				

				 //function clear data
				 var clearOperFn =function(){
					   $("#operation_id").val("");
					   $("#action").val("add");
					   $("#operation_name").val("");
					   $("#btnSaveOper").val("Add");
						dropDownListCostCenter();
						   
				}
				 
			    
			
			var getDataBranchOperFn = function(){
				   $.ajax({
					    url:restfulURL+"/dqs_api/public/dqs_branch_operation",
					    type:"get",
					    dataType:"json",
					    headers:{Authorization:"Bearer "+tokenID.token},
						    success:function(data){
						    	 listDataBranchOperFn(data);
						        
						 }
				  });
			};
			getDataBranchOperFn();
			
			
			//DropDownList	Branch Operation
			var dropDownListBranchOper = function(operation_id){
				$.ajax ({
					url:restfulURL+"/dqs_api/public/dqs_branch_operation" ,
					type:"get" ,
					dataType:"json" ,
					headers:{Authorization:"Bearer "+tokenID.token},
						success:function(data){
							
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
			
			var dropDownListCostCenter = function(ccdef){
				$.ajax ({
					url:restfulURL+"/dqs_api/public/dqs_branch" ,
					type:"get" ,
					dataType:"json" ,
					headers:{Authorization:"Bearer "+tokenID.token},
						success:function(data){
							console.log(data)
							var htmlTable="";
							$.each(data['data'],function(index,indexEntry){
								if(indexEntry["ccdef"] == ccdef){
									htmlTable+="<option selected=\"selected\" value="+indexEntry["ccdef"]+">"+indexEntry["desc_1"]+"</option>";		
								}else{
									htmlTable+="<option value="+indexEntry["ccdef"]+">"+indexEntry["desc_1"]+"</option>";		
								}
							});	
							$("#list_cost_center").html(htmlTable);
						}
				});
			};
			
			/*//////////////////////////// End BranchOperation ///////////////////// */
			
			
			
				// ปุ่ม save 
	  		$("#btnSubmit").click(function(){
	  			
			   //if(validationFn()==true){
				    if($("#action").val()=="add" || $("#action").val()=="" ){
				      	insertFn();
						//closeModalFn();
				    }else{
				     	updateFn();
				        //closeModalFn();
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
				   //if(validationOperFn()==true){
						    if($("#action").val()=="add" || $("#action").val()=="" ){
							    insertBranchOperFn();
						    }else{
						     	updateBranchOperFn();
						    }
					   //}
					   	return false;
			  }); 
			   
			   $("#btnCancelOper").click(function(){
					   clearOperFn();
					   return false;
				  });
			   
			   //ปุ่ม search
			  $("#btnSearch").click(function(){
				   searchFn($("#searchText").val());
				   return false;
			  });
				
			  //ปุ่ม cancel
			  $("#btnCancel").click(function(){
				   clearFn();
				   return false;
			  });
			
			$("#region_code").keyup(function(){
				$.ajax ({
					url:restfulURL+"/dqs_api/public/dqs_branch/region/getRegionName",
					type:"POST" ,
					dataType:"json" ,
					async:false,
					headers:{Authorization:"Bearer "+tokenID.token},
					data:{"region_code":$(this).val()},
					
						success:function(data){
							
							console.log(data['regdesc']);
							$("#region_name").val(data['regdesc']);
							
						}
				});
			});
	  
	  //Call Function End
});
