$(document).ready(
	function(){

		//var restfulURL = "http://192.168.1.57:3001";
		/*var restfulURL = "http://goingjesse.hopto.org:3001";*/
		
		 var checkUniqueFn = function(text,textseq){
				   var unique=false; 
					   $.ajax({
						    url:restfulURL+"/dqs_api/public/dqs_grade?grade="+text+"",
						    type:"get",
						    dataType:"json",
						    async:false,
							headers:{Authorization:"Bearer "+tokenID.token},
						    success:function(data){
						    //console.log(data);
							     if(data==""){
							      unique=true;
							     }else{
							      unique=false;
							     }
						    }
					   });
				   return unique;
				  }
		 
		 	
		   var validationFn = function(){
				   var validateText="";
					   if($("#grade").val()==""){
					    	validateText+="name not empty\n";
					   }
						if($("#grade_name").val()==""){
					   		 validateText+="Decription not empty\n";
					   }
					   if($("#process_seq").val()==""){
					    	validateText+="seq not empty\n";
					   }
					    if(isNaN($("#process_seq").val()))
					    {
					     	validateText+="seq is number only\n";
					    }
					   if(validateText!=""){
						    alert(validateText);
						    return false;
					   }else{
					   		return true;
					   }
				  }

		 var insertFn = function(){
				
				    $.ajax({
					     url:restfulURL+"/dqs_api/public/dqs_grade",
					     type:"POST",
					     dataType:"json",
					     data:{"grade":$("#grade").val(),"grade_name":$("#grade_name").val(),"processing_seq":$("#process_seq").val()},
						 headers:{Authorization:"Bearer "+tokenID.token},
					     success:function(data,status){
					      //console.log(data);
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
				

		 var updateFn = function(){
					
				   $.ajax({
					    url:restfulURL+"/dqs_api/public/dqs_grade/"+$("#id").val(),
					    type:"PATCH",
					    dataType:"json",
					    data:{"grade":$("#grade").val(),"grade_name":$("#grade_name").val(),"processing_seq":$("#process_seq").val()},
						headers:{Authorization:"Bearer "+tokenID.token},
					    success:function(data,status){
						     if(status=="success"){
						     //alert("Upate Success");
						      getDataFn();
						      //clearFn();
						     }
						    }
					   });
				   $(".ManagementModal").fadeTo(1000,2000).slideUp(500);
				   return false;
			 };

			 
			 var clostModal = function(){
				   $('#managementModal').modal('hide');
				   
				   $(".alertManagement").fadeTo(1000,2000).slideUp(500);
			 }
			 
			 var clearFn =function(){
					
					   $("#id").val("");
					   $("#action").val("add");
					   $("#grade").val("");
					   $("#grade_name").val("");
					   $("#process_seq").val("");
					   $("#btnSubmit").val("Add");
					   $("#btnAddAnother").val("Add");	
			}
		 var findOneFn = function(id){
				   //http://localhost:3000/find-user/58035b7cb4566c158bcecacf
				   $.ajax({
					    url:restfulURL+"/dqs_api/public/dqs_grade/"+id,
					    type:"get",
					    dataType:"json",
						headers:{Authorization:"Bearer "+tokenID.token},
					    success:function(data){
					      $("#grade").val(data['grade']);
						  $("#grade_name").val(data['grade_name']);
					      $("#process_seq").val(data['processing_seq']);
				    	}
				   });
			  };
		
			  var searchFn = function(searchText){
				   /* http://localhost:3000/api/products?name__regex=/^test/i */
				    
				   $.ajax({
					    url:restfulURL+"/dqs_api/public/dqs_grade/?grade__regex=/^"+searchText+"/i",
					    type:"get",
					    dataType:"json",
						headers:{Authorization:"Bearer "+tokenID.token},
					    success:function(data){
					
					     	listDataFn(data['data']);
					    }
					  });
				   
				  }
			
			  var listDataFn = function(data){
				
				if ( $.fn.DataTable.isDataTable('#tableGrade')) {
				      $('#tableGrade').DataTable().destroy();
			     }
						
						 //console.log(data);
						   var htmlTable="";
						   $.each(data,function(index,indexEntry){
							     htmlTable+="<tr >";
								      htmlTable+="<td>"+indexEntry["processing_seq"]+"</td>"; 
								      htmlTable+="<td>"+indexEntry["grade"]+"</td>"; 
								   	  htmlTable+="<td id=\"gradename-"+indexEntry["grade_id"]+"\">"+indexEntry["grade_name"]+"</td>";
									 // htmlTable+="<td><input class=\"form-control input-inline-table input-seq\" type=\"text\" name=\"\" id=\"\" value="+indexEntry["process_seq"]+"></td>";
								      //htmlTable+="<td><i class=\"fa fa-search font-management showCondition\" data-target=\"#condition\" id="+indexEntry["_id"]+" data-toggle=\"modal\" ></i></td>";
								      htmlTable+="<td><i <i class=\"fa fa-gear font-management popover-del-edit\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-info btn-xs btnCondition' data-target=#conditionModal data-toggle='modal' type='button' id="+indexEntry["grade_id"]+">Condition</button> <button class='btn btn-warning btn-xs edit' data-target=#managementModal data-toggle='modal' type='button' id="+indexEntry["grade_id"]+">Edit</button> <button class='btn btn-danger btn-xs del' type='button' id="+indexEntry["grade_id"]+">Delete</button>\"></i></td>"
							htmlTable+="</tr>";
						   });
						
						   $("#listGrade").html(htmlTable);
						
						
						  //DataTable
						$('#tableGrade').DataTable( { "dom": '<"top"lp>rt<"bottom"lp><"clear">',"bSort" : false } );
						
						//เมื่อ click แล้วให้มันไปผูกกับ popover
						$("#tableGrade_wrapper").click(function(){
							    $(".popover-del-edit").popover();
						});
						
						  //popover 
						$(".popover-del-edit").popover();
						
						
						$("#tableGrade").off("click",".popover-del-edit");
						$("#tableGrade").on("click",".popover-del-edit",function(){
							
							//findOnd
							$(".edit").on("click",function(){
									$(".textadd_edit").text("EDIT GRADE");
								
								    findOneFn(this.id);
								    $("#id").val(this.id);
								    $("#action").val("edit");
								    $("#btnSubmit").val("Edit");
								    $("#btnAddAnother").val("Edit");
								    
								});
							
							//delete
						   $(".del").on("click",function(){
						    if(confirm("Do you want to delete this file?")){
						     $.ajax({
							      url:restfulURL+"/dqs_api/public/dqs_grade/"+this.id,
							      type:"delete",
							      dataType:"json",
								  headers:{Authorization:"Bearer "+tokenID.token},
							      //data:{"_id":this.id},
								      success:function(data){       
								       
								       getDataFn();
								       clearFn();
						
				     			 	}
				   			  	});
				   		   	}
						
				  	 		});
						
						//add condition
						$(".btnCondition").click(function(){
							
							 $("#embed_grade_id").val(this.id);
							 
							 $("#embed_grade_name").text(($("#gradename-"+this.id).text()));
							 
							getDataConditionFn();
							dropDownListRule();
						 });
				});
			}
			
			
			
			  var getDataFn = function(){
				   $.ajax({
					    url:restfulURL+"/dqs_api/public/dqs_grade",
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
				  
				$("#btnSubmit").click(function(){
					   if(validationFn()==true){
						    if($("#action").val()=="add" || $("#action").val()=="" ){
						     
						    // if(checkUniqueFn($("#grade").val())==true){
								insertFn();
						        clostModal();
//						     }else{
//						      	alert("name or seq is not unique.");
//						     }
						    }else{
						     	updateFn();
						        clostModal();
						    }
					   }
					   		return false;
					  });
				
				
				$("#btnAddAnother").click(function(){
					   if(validationFn()==true){
						    if($("#action").val()=="add" || $("#action").val()=="" ){
						     
						     //if(checkUniqueFn($("#grade").val())==true){
						      	insertFn();
						    // }else{
						    //  	alert("name or seq is not unique.");
						    // }
						    }else{
						     	updateFn();
						    }
					   }
					   		return false;
					  });
		
		
		
				//listCondition
				var listDataConditionFn = function(data){
					
					   var process_seq = "";
					  //console.log(data);
					   var htmlTable="";
					   $("#listCondition").empty();
					   $.each(data,function(index,indexEntry){
						            //เชค ว่าถ้าข้อมูล undefined ให้แสดงออกมาเป็นค่าว่าง
									if (indexEntry["process_seq"] == undefined){
										process_seq = "";
									}else{
										process_seq = indexEntry["process_seq"];
									}
									
								    htmlTable+="<tr >";
								
											if(process_seq == indexEntry["process_seq"]){//เชค ว่าถ้าข้อมูล undefined ให้แสดงออกมาเป็นค่าว่าง
									        	htmlTable+="<td><input disabled class=\"form-control input-inline-table input-seq\" type=\"text\" name=\"\" id=seq-"+indexEntry["_id"]+" value="+indexEntry["process_seq"]+">";
											}else if(indexEntry["process_seq"]== undefined){
												htmlTable+="<td><input disabled class=\"form-control input-inline-table input-seq\" type=\"text\" name=\"\" id=seq-"+indexEntry["_id"]+" value="+process_seq+">";
											}
									
									        htmlTable+="<td>";
												if(indexEntry["operator"] == "or"){
													 htmlTable+="<select disabled class=\"form-control input-inline-table input-contact-selecttype\" id=operater-"+indexEntry["_id"]+"><option selected>or</option> <option>and</option></select>";
												}else{
													 htmlTable+="<select disabled class=\"form-control input-inline-table input-contact-selecttype\" id=operater-"+indexEntry["_id"]+"><option>or</option> <option selected>and</option></select>";
												}
									        htmlTable+="</td>";
									        
											htmlTable+="<td>"+indexEntry["rule_id"]+"</td>";
												
											htmlTable+="<td>";
												if(indexEntry["complete_flag"] == 1){
													htmlTable+="<input disabled type=\"checkbox\" checked id=Complete-"+indexEntry["_id"]+">";
												}else if(indexEntry["complete_flag"] == 0){
													htmlTable+="<input disabled type=\"checkbox\" id=Complete-"+indexEntry["_id"]+">";
												}
											htmlTable+="</td>";
											
											htmlTable+="<td><i class=\"fa fa-gear font-management popover-del-editCondition\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-warning btn-xs editCondition'  type='button' id="+indexEntry["_id"]+">Edit</button> <button class='btn btn-danger btn-xs deleteCondition' type='button' id="+indexEntry["_id"]+">Delete</button>\"></i></td";
									htmlTable+="</tr>";
						     });
						
						  $("#listCondition").html(htmlTable);
						
						//popover 
						$(".popover-del-editCondition").popover();
						
						//delete
						$(".popover-del-editCondition").click(function(){
		
							$(".deleteCondition").click(function(){
								
								    if(confirm("Do you want to delete this file?")){
								     $.ajax({
									      url:restfulURL+"/dqs_api/public/dqs_grade_condition/"+this.id,
									      type:"delete",
									      dataType:"json",
										  headers:{Authorization:"Bearer "+tokenID.token},
									      //data:{"_id":this.id},
										      success:function(data){       
										       
										       getDataConditionFn();
								
						     				 }
						   			  	});
						   		   	}
						  	 	});
							//การรับส่งค่า id
							$(".editCondition").click(function(){
								
								$("#seq-"+this.id).removeAttr("disabled");
								$("#operater-"+this.id).removeAttr("disabled");
								$("#Complete-"+this.id).removeAttr("disabled");
								$("#embed_condition_id").remove();
									$("body").append("<input type='hidden' id='embed_condition_id' name='embed_condition_id' value='"+this.id+"'>");
						});
					});
				}
				
				
				//ปุ่ม add Condition
				$("#btnSaveListCondition").click(function(){
					
					 var completeCheack = "";

					 	if($("#Complete-"+$("#embed_condition_id").val()).prop('checked')){
					 		completeCheack="1";
					 	}else{
					 		completeCheack="0";
					 	}
					 	
					 	updateConditionFn(completeCheack);

					});
				 
				
				//ฟังก์ชั่น update condition
				 var updateConditionFn = function(completeCheack){
		
					 	
						   $.ajax({
							    url:restfulURL+"/dqs_api/public/dqs_grade_condition/"+$("#embed_condition_id").val(),
							    type:"PUT",
							    dataType:"json",
							    data:{"process_seq":$("#seq-"+$("#embed_condition_id").val()).val(),
									  "operator":$("#operater-"+$("#embed_condition_id").val()).val(),
									  "complete_flag":completeCheack },
								headers:{Authorization:"Bearer "+tokenID.token},
							    success:function(data,status){
							     //alert(data);
								     if(status=="success"){
								      alert("Upate Success");
								
								     getDataConditionFn();
								     }
								    }
							   });
						   return false;
					 };
				
				
				    //ฟังก์ชั่น get data condition
					var getDataConditionFn = function(){
						
						var grade_id = $("#embed_grade_id").val();

						   $.ajax({
							    url:restfulURL+"/dqs_api/public/dqs_grade/"+grade_id+"/condition",
									          // /dqs_api/public/dqs_grade/{grade_id}/condition 
							    type:"get",
							    dataType:"json",
								headers:{Authorization:"Bearer "+tokenID.token},
							    success:function(data){
							     
							     listDataConditionFn(data['conditions']);
							    }
					   });
				  };
				
				
				 var insertConditionFn = function(){
					 var completeCheack = "0";
						    $.ajax({
							     url:restfulURL+"/dqs_api/public/dqs_grade/"+grade_id+"/condition",
							     type:"PATCH",
							     dataType:"json",
							     data:{"rule_id":$("#listRule").val(),
										"grade_id":$("#embed_grade_id").val(),
										"complete_flag":completeCheack },
								 headers:{Authorization:"Bearer "+tokenID.token},
							     success:function(data,status){
							    //console.log(status);
								      if(status=="success"){
								       alert("Insert Success");
								
								       //listDataConditionFn();
									   getDataConditionFn();
								       //clearFn();
								      }
								   }
						    });         
						
						    return false;
				 		};
				 		
				
				//DropDownList Rule 
				var dropDownListRule = function(){
					$.ajax ({
						url:restfulURL+"/dqs_api/public/dqs_rule" , //http://192.168.1.58/dqs_api/public/dqs_rule
						
						type:"get" ,
						dataType:"json" ,
						headers:{Authorization:"Bearer "+tokenID.token},
							success:function(data){
								
								var htmlTable="";
								$.each(data['data'],function(index,indexEntry){
									
									htmlTable+="<option value="+indexEntry["rule_id"]+">"+indexEntry["rule_name"]+"</option>";		
								});	
								$("#listRule").html(htmlTable); 
							}
					});
				};

				
				 		
				 		
			  $("#btnAddCondition").click(function(){
					insertConditionFn();
		
			  });


			  $("#btnAdd").click(function(){
					 clearFn();
					 $(".textadd_edit").text("ADD NEW GRADE");
					 //return false;
			  });
				
			  $("#btnSearch").click(function(){
				   searchFn($("#searchText").val());
				   return false;
			  });
			
			  $("#btnCancle").click(function(){
				   getDataConditionFn();
				   //return false;
			  });
	  
	  //Call Function End
});


