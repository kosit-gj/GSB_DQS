$(document).ready(
	function(){

		var restfulURL = "http://192.168.1.57:3001";
		
		//function เชค ชื่อซ้ำ
		 var checkUniqueFn = function(text){
			   var unique=false; 
				   $.ajax({
					    url:restfulURL+"/api/dqs_region?region_name="+text+"",
					    type:"get",
					    dataType:"json",
					    async:false,
					    success:function(data){
					     
					     console.log(data);
						     if(data==""){
						      //alert("data empty");
						      unique=true;
						     }else{
						      unique=false;
						      //alert("full data");
						     }
					     
					    }
				   });
			   return unique;
			  }
	
		 var checkUniqueOperFn = function(text){
			   var unique=false; 
				   $.ajax({
					    url:restfulURL+"/api/dqs_branch_operation?operation_name="+text+"",
					    type:"get",
					    dataType:"json",
					    async:false,
					    success:function(data){
					     
					     console.log(data);
						     if(data==""){
						      //alert("data empty");
						      unique=true;
						     }else{
						      unique=false;
						      //alert("full data");
						     }
					     
					    }
				   });
			   return unique;
			  }
		 
		 
		 //function เชคค่าว่าง
		   var validationFn = function(){
			   var validateText="";
			       if($("#region_code").val()==""){
				    	validateText+="region code not empty\n";
				   }
				   if($("#region_name").val()==""){
				    	validateText+="region name not empty\n";
				   }
					if($("#list_Branch_Oper").val()==""){
				   		 validateText+="operation not empty\n";
				   }
				   if(validateText!=""){
					    alert(validateText);
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
					    alert(validateText);
					    return false;
				   }else{
				   		return true;
				   }
			  }
		 
		 
		 //function insert data Region
		 var insertFn = function(){
			    $.ajax({
				     url:restfulURL+"/api/dqs_region",
				     type:"POST",
				     dataType:"json",
				     data:{ "region_code":$("#region_code").val(),
							"region_name":$("#region_name").val(),
							"operation_id":$("#list_Branch_Oper").val()},
				     success:function(data,status){
				      //console.log(status);
					      if(status=="success"){
					       //alert("Insert Success");
					       getDataFn();
					       clearFn();
					      }
					   }
			    });         
			
			     $(".ManagementModal").fadeTo(1000,2000).slideUp(500);
			    return false;
	 		};

				
		 	//function update data Region
		    var updateFn = function(){
				   $.ajax({
					    url:restfulURL+"/api/dqs_region/"+$("#id").val(),
					    type:"PUT",
					    dataType:"json",
					    data:{ "region_code":$("#region_code").val(),
							   "region_name":$("#region_name").val(),
							   "operation_id":$("#list_Branch_Oper").val()},
					    success:function(data,status){
						     if(status=="success"){
						      //alert("Upate Success");
						      getDataFn();
						      //clearFn();
						     }
						   }
					   });
				
					$(".ManagementModal").fadeTo(1000, 2000).slideUp(500);
				   return false;
			 };
			
			 
			 
			var clostModalFn =function(){
				$('#ManagementModal').modal('hide');
				$(".alert-success").fadeTo(1000, 2000).slideUp(500);
			} 
			
			
			 //function clear data
		    var clearFn =function(){
			   $("#id").val("");
			   $("#action").val("add");
			   $("#region_code").val("");
			   $("#region_name").val("");
			   $("#list_Branch_Oper").val("");
			   $("#btnSubmit").val("Add");
			   $("#btnSaveAnother").val("Add");
					   
			}
			 
			 //get data to Edit
			 var findOneFn = function(id){
				   $.ajax({
					    url:restfulURL+"/api/dqs_region/"+id,
					    type:"get",
					    dataType:"json",
					    success:function(data){
						  $("#region_code").val(data['region_code']);
					      $("#region_name").val(data['region_name']);
						  dropDownListBranchOper(data['operation_id']);
				    	}
				   });
			  };
		
			// function search
			  var searchFn = function(searchText){
				   $.ajax({
				    url:restfulURL+"/api/dqs_region/?region_name__regex=/^"+searchText+"/i",
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
							   	  htmlTable+="<td>"+indexEntry["region_name"]+"</td>";
								  htmlTable+="<td>"+indexEntry["operation_id"]+"</td>";
							      htmlTable+="<td><i class=\"fa fa-gear font-management popover-del-edit\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-info btn-xs showBranchOper' data-target=#modalOperation data-toggle='modal' type='button' id="+indexEntry["_id"]+">Operation</button> <button class='btn btn-warning btn-xs edit' data-target=#ManagementModal data-toggle='modal' type='button' id="+indexEntry["_id"]+">Edit</button> <button class='btn btn-danger btn-xs del' type='button' id="+indexEntry["_id"]+">Delete</button>\"></i></td>"
							 htmlTable+="</tr>";
					   });
					   $("#listRegion").html(htmlTable);
						
					   //DataTable
					   $('#tableRegion').DataTable( { "dom": '<"top"lp>rt<"bottom"lp><"clear">',"bSort" : false } ); 
					
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
							$(".textadd_edit").text("EDIT REGIONAL OFFICE");
							    findOneFn(this.id);
							    $("#id").val(this.id);
							    $("#action").val("edit");
							    $("#btnSubmit").val("Edit");
							    $("#btnSaveAnother").val("Edit");
							
							});
							
						//delete
					   	$(".del").on("click",function(){
					    	if(confirm("Do you want to delete this file?")){
						    	 $.ajax({
							      url:restfulURL+"/api/dqs_region/"+this.id,
							      type:"delete",
							      dataType:"json",
							          //data:{"_id":this.id},
								      success:function(data){       
									       getDataFn();
									       clearFn();
				     			 }
				   			  });
				   		   }
						
						$(".showBranchOper").click(function(){
							getDataBranchOperFn();
						});
				  	 });
				});
			}
			
               var insertBranchOperFn = function(){
				    $.ajax({
					     url:restfulURL+"/api/dqs_branch_operation",
					     type:"POST",
					     dataType:"json",
					     data:{ "operation_name":$("#operation_name").val(),
								"cost_center":$("#cost_center").val(),},
					     success:function(data,status){
					      //console.log(data);
					      console.log(status);
						      if(status=="success"){
						       alert("Insert Success");
						       getDataBranchOperFn();
						       clearOperFn();
						      }
						   }
				    });         
				
				    return false;
		 		};
		 		
	 		 var updateBranchOperFn = function(){
					   $.ajax({
						    url:restfulURL+"/api/dqs_branch_operation/"+$("#id").val(),
						    type:"PUT",
						    dataType:"json",
						    data:{ "operation_name":$("#operation_name").val(),
								   "cost_center":$("#cost_center").val(),},
						    success:function(data,status){
							     if(status=="success"){
								      alert("Upate Success");
								      getDataBranchOperFn();
								      clearOperFn();
							     	}
							    }
						   });
					   return false;
				 }
		 		
		 		var findOneOperationFn = function(id) {
					$.ajax({
						url:restfulURL+"/api/dqs_branch_operation/"+ id,
						type : "get",
						dataType : "json",
						success : function(data) {
							$("#operation_name").val(data["operation_name"]);
							$("#cost_center").val(data["cost_center"]);
						}
					});
				};
				

				 //function clear data
				 var clearOperFn =function(){
					   $("#id").val("");
					   $("#action").val("add");
					   $("#operation_name").val("");
					   $("#cost_center").val("");
					   $("#btnSaveOper").val("Add");
						   
				}
				 
			    var listDataBranchOperFn = function(data){
					   var htmlTable="";
					   $.each(data,function(index,indexEntry){
						     htmlTable+="<tr >";
							      htmlTable+="<td>"+(index+1)+"</td>";
							   	  htmlTable+="<td>"+indexEntry["operation_name"]+"</td>";
								  htmlTable+="<td>"+indexEntry["cost_center"]+"</td>";
							      htmlTable+="<td><i class=\"fa fa-gear font-management popover-del-editOper\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-warning btn-xs editOper' type='button' id="+indexEntry["_id"]+">Edit</button> <button class='btn btn-danger btn-xs deleteOper' type='button' id="+indexEntry["_id"]+">Delete</button>\"></i></td>"
							 htmlTable+="</tr>";
					   });
					   $("#listTableBranchOper").html(htmlTable);
					
				       $(".popover-del-editOper").popover();
					
					
					   $('.popover-del-editOper').click(function(){
							//findOnd
							$(".editOper").on("click",function(){
								    findOneOperationFn(this.id);
								    $("#id").val(this.id);
								    $("#action").val("edit");
								    $("#btnSaveOper").val("Edit");
								});
						
						//delete
					   	$(".deleteOper").click(function(){
						
					    if(confirm("Do you want to delete this file?")){
						     $.ajax({
							      url:restfulURL+"/api/dqs_branch_operation/"+this.id,
							      type:"delete",
							      dataType:"json",
							          //data:{"_id":this.id},
								      success:function(data){       
									       getDataBranchOperFn();
									       clearOperFn();
						
						     			 }
						   			  });
					   		   	  }
							});
				});
					
			};
			
			var getDataBranchOperFn = function(){
				   $.ajax({
					    url:restfulURL+"/api/dqs_branch_operation",
					    type:"get",
					    dataType:"json",
						    success:function(data){
						    	 listDataBranchOperFn(data);
						 }
				  });
			};
			getDataBranchOperFn();
			
			
			//DropDownList	Branch Operation
			var dropDownListBranchOper = function(operation_id){
				$.ajax ({
					url:restfulURL+"/api/dqs_branch_operation" ,
					type:"get" ,
					dataType:"json" ,
						success:function(data){
							var htmlTable="";
							$.each(data,function(index,indexEntry){
								if(indexEntry["_id"] == operation_id){
									htmlTable+="<option selected=\"selected\" value="+indexEntry["_id"]+">"+indexEntry["operation_name"]+"</option>";		
								}else{
									htmlTable+="<option value="+indexEntry["_id"]+">"+indexEntry["operation_name"]+"</option>";		
								}
							});	
							$("#list_Branch_Oper").html(htmlTable);
						}
				});
			};
			
			//get data Region
			  var getDataFn = function(){
				   $.ajax({
					    url:restfulURL+"/api/dqs_region",
					    type:"get",
					    dataType:"json",
						    success:function(data){
						     	listDataFn(data);
						 }
				  });
			};
			//Call Function start
			getDataFn();

				// ปุ่ม save 
		  		$("#btnSubmit").click(function(){
				   if(validationFn()==true){
					    if($("#action").val()=="add" || $("#action").val()=="" ){
						     if(checkUniqueFn($("#region_name").val())==true){
						      	insertFn();
								clostModalFn();
						     }else{
						      	alert("Name is aleady please fill name other. ");
						     }
					    }else{
					     	updateFn();
					        clostModalFn();
					    }
				   }
			   		return false;
			  });
		
		 // ปุ่ม SaveAnother 
		 	  $("#btnSaveAnother").click(function(){
			   		if(validationFn()==true){
					    if($("#action").val()=="add" || $("#action").val()=="" ){
						     if(checkUniqueFn($("#region_name").val())==true){
						      	insertFn();
						     }else{
						      	alert("Name is aleady please fill name other. ");
						     }
					    }else{
					     	updateFn();
					    }
			   }
			   		return false;
			  });
				
			//ปุ่ม add in branch operation
			   $("#btnAdd").click(function(){
					 clearFn();
					 $(".textadd_edit").text("ADD REGIONAL OFFICE");
					 dropDownListBranchOper();
			  });
				
			   $("#btnSaveOper").click(function(){
				   if(validationOperFn()==true){
						    if($("#action").val()=="add" || $("#action").val()=="" ){
							     if(checkUniqueOperFn($("#operation_name").val())==true){
							      	insertBranchOperFn();
							     }else{
							      	alert("Name is aleady please fill name other. ");
							     }
						    }else{
						     	updateBranchOperFn();
						    }
					   }
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
	  
	  //Call Function End
});
