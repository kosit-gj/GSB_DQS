var globalCount=0;

$(document).ready(function(){
		
		 var checkUniqueFn = function(text,textseq){
				   var unique=false; 
					   $.ajax({
						    url:restfulURL+"/dqs_api/public/dqs_grade?grade="+text+"",
						    type:"get",
						    dataType:"json",
						    async:false,
							headers:{Authorization:"Bearer "+tokenID.token},
						    success:function(data){
						 
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
					   if($("#processing_seq").val()==""){
					    	validateText+="seq not empty\n";
					   }
					    if(isNaN($("#processing_seq").val()))
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

		 var insertFn = function(param){
				
				    $.ajax({
					     url:restfulURL+"/dqs_api/public/dqs_grade",
					     type:"POST",
					     dataType:"json",
					     data:{"grade":$("#grade").val(),"grade_name":$("#grade_name").val(),"processing_seq":$("#processing_seq").val()},
						 headers:{Authorization:"Bearer "+tokenID.token},
						 
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

							   }else if (data['status'] == "400") {
							
									var validate="";
									if(data['data']['processing_seq']!=undefined){
										validate+="<font color='red'>*</font> "+data['data']['processing_seq']+"<br>";
									}
									if(data['data']['grade']!=undefined){
										validate+="<font color='red'>*</font> "+data['data']['grade']+"<br>";
									}
									if(data['data']['grade_name']!=undefined){
										validate+="<font color='red'>*</font> "+data['data']['grade_name']+"<br>";
									}
									callFlashSlideInModal(validate);
							  }
						   }
				    });         
					//$(".ManagementModal").fadeTo(1000,2000).slideUp(500);
				    return false;
		 		};
				

		 var updateFn = function(){
					
				   $.ajax({
					    url:restfulURL+"/dqs_api/public/dqs_grade/"+$("#id").val(),
					    type:"PATCH",
					    dataType:"json",
					    data:{"grade":$("#grade").val(),"grade_name":$("#grade_name").val(),"processing_seq":$("#processing_seq").val()},
						headers:{Authorization:"Bearer "+tokenID.token},
					    success:function(data,status){
						     if(data['status']==200){
							   clearFn();
						 	   $('#managementModal').modal('hide');
							   callFlashSlide("Update Successfully.");
						       getDataFn();
						     }else if (data['status'] == "400") {
							
									var validate="";
									if(data['data']['processing_seq']!=undefined){
										validate+="<font color='red'>*</font> "+data['data']['processing_seq']+"<br>";
									}
									if(data['data']['grade']!=undefined){
										validate+="<font color='red'>*</font> "+data['data']['grade']+"<br>";
									}
									if(data['data']['grade_name']!=undefined){
										validate+="<font color='red'>*</font> "+data['data']['grade_name']+"<br>";
									}
									callFlashSlideInModal(validate);
									
							  }
						
						    }
					   });
				  //$(".ManagementModal").fadeTo(1000,2000).slideUp(500);
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
					   $("#processing_seq").val("");
					   $("#btnSubmit").val("Add");
					   $("#btnAddAnother").val("Add");
					   $("#action_condition").val("add");
					   $("#btnAddAnother").show();
					   
			}
		 var findOneFn = function(id){
				   $.ajax({
					    url:restfulURL+"/dqs_api/public/dqs_grade/"+id,
					    type:"get",
					    dataType:"json",
						//data:{token:tokenID.token},
						headers:{Authorization:"Bearer "+tokenID.token},
					    success:function(data){
					      $("#grade").val(data['grade']);
						  $("#grade_name").val(data['grade_name']);
					      $("#processing_seq").val(data['processing_seq']);
				    	}
				   });
			  };
		
			  var searchFn = function(searchText){		    
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
							 // htmlTable+="<td><input class=\"form-control input-inline-table input-seq\" type=\"text\" name=\"\" id=\"\" value="+indexEntry["processing_seq"]+"></td>";
						      //htmlTable+="<td><i class=\"fa fa-search font-management showCondition\" data-target=\"#condition\" id="+indexEntry["_id"]+" data-toggle=\"modal\" ></i></td>";
						      htmlTable+="<td><i <i class=\"fa fa-gear font-gear font-management popover-del-edit\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-info btn-xs  btnCondition' data-target=#conditionModal data-toggle='modal' type='button' id="+indexEntry["grade_id"]+">Condition</button> <button class='btn btn-warning btn-xs edit' data-target=#managementModal data-toggle='modal' type='button' id="+indexEntry["grade_id"]+">Edit</button> <button class='btn btn-danger btn-xs del' type='button' id="+indexEntry["grade_id"]+">Delete</button>\"></i></td>"
							  htmlTable+="</tr>";
						   });
						
						   $("#listGrade").html(htmlTable);
						
						
						  //DataTable
						//$('#tableGrade').DataTable( { "dom": '<"top"lp>rt<"bottom"lp><"clear">',"bSort" : false } );
						$('#tableGrade').DataTable( { "dom": '<"top"f>rt<"bottom"><"clear">',"bSort" : false } );
						
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
								    $("#btnAddAnother").hide();
								    
								});
							
							//delete
						   $(".del").on("click",function(){
						    if(confirm("Do you want to delete this file?")){
						     $.ajax({
							      url:restfulURL+"/dqs_api/public/dqs_grade/"+this.id,
							      type:"delete",
							      dataType:"json",
								  headers:{Authorization:"Bearer "+tokenID.token},
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
					   //if(validationFn()==true){
						    if($("#action").val()=="add" || $("#action").val()=="" ){
								insertFn();
						        //clostModal();
						    }else{
						     	updateFn();
						        //clostModal();
						    }
					   //}
					   		return false;
					  });
				
				
				$("#btnAddAnother").click(function(){
					  
					insertFn("saveAndAnother");
						  
					   	return false;
					  });
		
				//listCondition
				var listDataConditionFn = function(data){
					
					   var processing_seq = "";
					   var htmlTable="";
					   $("#listCondition").empty();
					   $.each(data,function(index,indexEntry){
						            //เชค ว่าถ้าข้อมูล undefined ให้แสดงออกมาเป็นค่าว่าง
									if (indexEntry["processing_seq"] == undefined){
										processing_seq = "";
									}else{
										processing_seq = indexEntry["processing_seq"];
									}
									
								    htmlTable+="<tr >";
								
											if(processing_seq == indexEntry["processing_seq"]){//เชค ว่าถ้าข้อมูล undefined ให้แสดงออกมาเป็นค่าว่าง
									        	htmlTable+="<td><input disabled class=\"form-control input-inline-table input-seq\" type=\"text\" name=\"\" id=seq-"+indexEntry["condition_id"]+" value="+indexEntry["processing_seq"]+">";
											}else if(indexEntry["processing_seq"]== undefined){
												htmlTable+="<td><input disabled class=\"form-control input-inline-table input-seq\" type=\"text\" name=\"\" id=seq-"+indexEntry["condition_id"]+" value="+processing_seq+">";
											}
									
									        htmlTable+="<td>";
												if(indexEntry["operator"] == "or"){
													 htmlTable+="<select disabled class=\"form-control input-inline-table input-contact-selecttype\" id=operater-"+indexEntry["condition_id"]+"><option selected>or</option> <option>and</option></select>";
												}else{
													 htmlTable+="<select disabled class=\"form-control input-inline-table input-contact-selecttype\" id=operater-"+indexEntry["condition_id"]+"><option>or</option> <option selected>and</option></select>";
												}
									        htmlTable+="</td>";
									        
											htmlTable+="<td>"+indexEntry["rule_name"]+"<input type='hidden' id='rule_id-"+indexEntry["condition_id"]+"' value="+indexEntry["rule_id"]+"></td>";
												
											htmlTable+="<td>";
												if(indexEntry["complete_flag"] == 1){
													htmlTable+="<input disabled type=\"checkbox\" checked id=Complete-"+indexEntry["condition_id"]+">";
												}else if(indexEntry["complete_flag"] == 0){
													htmlTable+="<input disabled type=\"checkbox\" id=Complete-"+indexEntry["condition_id"]+">";
												}
											htmlTable+="</td>";
											
											htmlTable+="<td class='iconDisable'><i class=\"fa fa-gear font-management popover-del-editCondition\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-warning btn-xs editCondition'  type='button' id="+indexEntry["condition_id"]+">Edit</button> <button class='btn btn-danger btn-xs deleteCondition' type='button' id="+indexEntry["condition_id"]+">Delete</button>\"></i></td";
									htmlTable+="</tr>";
						     });
						
						  $("#listCondition").html(htmlTable);
						
						//popover 
						$(".popover-del-editCondition").popover();
						
						//delete
						$(".popover-del-editCondition").click(function(){
		
							$(".deleteCondition").click(function(){
								
								var grade_id = $("#embed_grade_id").val();
								
								    if(confirm("Do you want to delete this file?")){
								     $.ajax({
									      url:restfulURL+"/dqs_api/public/dqs_grade/"+grade_id+"/condition/"+this.id+"",
									      type:"delete",
									      dataType:"json",
										  headers:{Authorization:"Bearer "+tokenID.token},
									     
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
								
								$("#action_condition").val("edit");
								$("#embed_condition_id").remove();
								$("body").append("<input type='hidden' id='embed_condition_id' name='embed_condition_id' value='"+this.id+"'>");
						});
					});
				}
				
				
				//ปุ่ม add Condition
				$("#btnSaveListCondition").click(function(){ 
				
				if($("#action_condition").val() == "edit") {	
					
					var grade_id = $("#embed_grade_id").val();
					
					if($("#Complete-"+$("#embed_condition_id").prop('checked'))){ 
						   complate_flag = 1;
				        }else{ 
				        	complate_flag = 0;
				        }
						$.ajax({
							     url:restfulURL+"/dqs_api/public/dqs_grade/"+grade_id+"/condition/"+$("#embed_condition_id").val()+"",
							     type:"PATCH",
							     dataType:"json",
							     data:{"rule_id":$("#rule_id-"+$("#embed_condition_id").val()).val(),
									   "processing_seq":$("#seq-"+$("#embed_condition_id").val()).val(),
									   "operator":$("#operater-"+$("#embed_condition_id").val()).val(),
									   "complete_flag":complate_flag},
							     headers:{Authorization:"Bearer "+tokenID.token},
							     success:function(data,status){
							     
								      getDataConditionFn();
									  $("#action_condition").val("add");
								   }
						    });         
					
					    return false;
				}
					
				if($("#action_condition").val()=="add") {
						var grade_id = $("#embed_grade_id").val();
	
						var processing_seq = "";
						  var operator = "";
						  var rule_id = "";
						  var complate_flag = "";
						  var conditions = [];
						  
						for(var i=0;i<globalCount;i++){
							processing_seq=$("#new_seq-"+i).val();
							operator=$("#new_operator-"+i).val();
							rule_id=$("#new_rule_id-"+i).val();
							   //send value KPI 
							   if($("#new_complete-"+i).prop('checked')){ 
								   complate_flag = 1;
						        }else{ 
						        	complate_flag = 0;
						        }
							   
							   conditions.push({
								   rule_id: ""+rule_id+"",
								     processing_seq: ""+processing_seq+"",
								     operator: ""+operator+"",
								     complete_flag: ""+complate_flag+""
							   });
						}
						
					//console.log(conditions);
					
						  $.ajax({
							     url:restfulURL+"/dqs_api/public/dqs_grade/"+grade_id+"/condition",
							     type:"POST",
							     dataType:"json",
							     data:{"conditions": conditions },
								 headers:{Authorization:"Bearer "+tokenID.token},
							     success:function(data,status){
							     console.log(data['data']['error'].length);
								      if(data['data']['error'].length==0){
									
								       //alert("Insert Success");
									    getDataConditionFn();
									    callFlashSlideInModal("Insert Successfully.","#information2");
								     
								      }else{
										callFlashSlideInModal("The rule id has already been taken.","#information2");
										
									  }
								   }
						    });         
					
					    return false;
					}
				
					});
							
				    //ฟังก์ชั่น get data condition
					var getDataConditionFn = function(){
						globalCount=0;
						var grade_id = $("#embed_grade_id").val();

						   $.ajax({
							    url:restfulURL+"/dqs_api/public/dqs_grade/"+grade_id+"/condition",
							    type:"get",
							    dataType:"json",
								headers:{Authorization:"Bearer "+tokenID.token},
							    success:function(data){
							     
							     listDataConditionFn(data['conditions']);
							    }
					   });
				  };
				
				var insertConditionInlineFn = function(rule){	
					
					var rule=rule.split("-");
					var rule_name=rule[1];
					var rule_id=rule[0];
					
					var htmlTableInline = ""
					
							htmlTableInline+="<tr >";
								
							htmlTableInline+="<td><input id='new_seq-"+globalCount+"'  class=\"form-control input-inline-table input-seq new-condition\" type=\"text\" name=\"\"";
							htmlTableInline+="</td>";
							htmlTableInline+="<td>";
							htmlTableInline+="<select id='new_operator-"+globalCount+"' class=\"form-control input-inline-table input-contact-selecttype new-condition\" ><option>or</option> <option selected>and</option></select>";
							htmlTableInline+="</td>";
						    htmlTableInline+="<td>";
						    htmlTableInline+="<p>"+rule_name+"<input type='hidden' id='new_rule_id-"+globalCount+"' value="+rule_id+"></p>";
						    htmlTableInline+="</td>";
							htmlTableInline+="<td>";
							htmlTableInline+="<input id='new_complete-"+globalCount+"' type=\"checkbox\"";
							htmlTableInline+="</td>";
							htmlTableInline+="<td ><i class=\"fa fa-gear font-management font-management2  new-condition\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-danger btn-xs deleteCondition deleteNewCondition new-condition' type='button' id='"+globalCount+"'>Delete</button>\"></i></td>";
							//htmlTableInline+="<td><i data-content=\"&lt;button class='btn btn-warning btn-xs editCondition'  type='button' id=13&gt;Edit&lt;/button&gt; &lt;button class='btn btn-danger btn-xs deleteCondition' type='button' id=13&gt;Delete&lt;/button&gt;\" data-placement=\"top\" data-toggle=\"popover\" data-html=\"true\" class=\"fa fa-gear font-management popover-del-editCondition\" data-original-title=\"\" title=\"\" aria-describedby=\"popover753603\"></i><td>";
							htmlTableInline+="</tr>";
						
						 $("#listCondition").append(htmlTableInline);
						 
						 $('[data-toggle="popover"]').popover(); 
						
						 
						 globalCount++;
				}
				
				 $(document).on("click",".deleteNewCondition",function(){
					$(this).parent().parent().parent().parent().remove();
				 });
				 
				 
				
				//DropDownList Rule 
				var dropDownListRule = function(){
					$.ajax ({
						url:restfulURL+"/dqs_api/public/dqs_rule" , 
						
						type:"get" ,
						dataType:"json" ,
						headers:{Authorization:"Bearer "+tokenID.token},
							success:function(data){
								
								var htmlTable="";
								$.each(data['data'],function(index,indexEntry){
									
									htmlTable+="<option value='"+indexEntry["rule_id"]+"-"+indexEntry["rule_name"]+"'>"+indexEntry["rule_name"]+"</option>";		
								});	
								$("#listRule").html(htmlTable); 
							}
					});
				};
 		
			  $("#btnAddCondition").click(function(){
				
				  if($("#action_condition").val()=="add"){
					insertConditionInlineFn($("#listRule").val());
					$(".iconDisable").html("<i style='opacity:0.3;cursor:default;' class='fa fa-gear font-management'></i>");
				  }else{
					  alert("ไม่สามารถเพิ่มได้");
				  }
					
					
			  });
			 
			  $("#btnCancelAddCondition").click(function(){
				  getDataConditionFn();
				  $("#action_condition").val("add");
			  });

			  $("#btnAdd").click(function(){
					 clearFn();
					 $(".textadd_edit").text("ADD NEW GRADE");
			  });
				
			  $("#btnSearch").click(function(){
				   searchFn($("#searchText").val());
				   return false;
			  });
			
			  $("#btnCancle").click(function(){
				   getDataConditionFn();
			  });

});