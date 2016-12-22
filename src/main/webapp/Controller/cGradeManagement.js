//Global Parameter Start
var globalCount=0;
var golbalDataCondition=[];
//Global Parameter End


//Click แล้ว ฝังข้อมูล
var embedParamSeqFn = function(id){
	var count = 0;
	$.each($(".embed_seq").get(),function(index,indexEnry){
	//ถ้า id ที่วน == id ที่มี	
		if($(indexEnry).val()==id){
			count+=1;
		}
	});
	if(count>0){
		$("#embed_seq-"+id).remove();
		$("body").append("<input type='hidden' class='embed_seq' id='embed_seq-"+id+"' name='embed_seq-"+id+"' value='"+id+"'>");
	}else{
		$("body").append("<input type='hidden' class='embed_seq' id='embed_seq-"+id+"' name='embed_seq-"+id+"' value='"+id+"'>");
	}
}
var embedParamOperatorsFn = function(id){
	var count = 0;
	$.each($(".embed_operater").get(),function(index,indexEnry){
	//ถ้า id ที่วน == id ที่มี	
		if($(indexEnry).val()==id){
			count+=1;
		}
	});
	if(count>0){
		$("#embed_operater-"+id).remove();
		$("body").append("<input type='hidden' class='embed_operater' id='embed_operater-"+id+"' name='embed_operater-"+id+"' value='"+id+"'>");
	}else{
		$("body").append("<input type='hidden' class='embed_operater' id='embed_operater-"+id+"' name='embed_operater-"+id+"' value='"+id+"'>");
	}
}
var embedParamCompleteFnFn = function(id){
	var count = 0;
	$.each($(".embed_complete_flag").get(),function(index,indexEnry){
	//ถ้า id ที่วน == id ที่มี	
		if($(indexEnry).val()==id){
			count+=1;
		}
	});
	if(count>0){
		$("#embed_complete_flag-"+id).remove();
		$("body").append("<input type='hidden' class='embed_complete_flag' id='embed_complete_flag-"+id+"' name='embed_complete_flag-"+id+"' value='"+id+"'>");
	}else{
		$("body").append("<input type='hidden' class='embed_complete_flag' id='embed_complete_flag-"+id+"' name='embed_complete_flag-"+id+"' value='"+id+"'>");
	}
}
// List Error Function Start
var listErrorFn =function(data){
	var errorData="";
	
	$.each(data,function(index,indexEntry){
		if(index==0){
		
			if(indexEntry['error']['processing_seq']!=undefined){
				errorData+=indexEntry['error']['processing_seq']+" ";
			}
			if(indexEntry['error']['rule_id']!=undefined){
				errorData+="<br>Rule ID:"+indexEntry['rule_id']+" | "+indexEntry['error']['rule_id'];
			}
		}else{
			
			if(indexEntry['error']['processing_seq']!=undefined){
				errorData+="<br>"+indexEntry['error']['processing_seq']+" ";
			}
			if(indexEntry['error']['rule_id']!=undefined){
				errorData+="<br>Rule ID : "+indexEntry['rule_id']+" |"+indexEntry['error']['rule_id'];
			}
		}
	});
	
	return errorData;
}
//List Error Function End

$(document).ready(function(){
	//tooltip
	$(document).ready(function(){
	    $('[data-toggle="tooltip"]').tooltip();
	});

		 var insertFn = function(param){
				
				    $.ajax({
					     url:restfulURL+"/dqs_api/public/dqs_grade",
					     type:"POST",
					     dataType:"json",
					     data:{"grade":$("#grade").val(),"grade_name":$("#grade_name").val(),"processing_seq":$("#processing_seq").val()},
						 headers:{Authorization:"Bearer "+tokenID.token},
						 
					     success:function(data,status){
						      if(data['status']=="200"){
						      
								   if(param !="saveAndAnother"){
									   callFlashSlide("Insert Successfully.");
								       getDataFn();
								       clearFn();
								 	   $('#managementModal').modal('hide');
									}else{
										getDataFn();
										clearFn();
										callFlashSlideInModal("Insert Data is Successfully.","#information");
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
									callFlashSlideInModal(validate,"#information","error");
							  }
						   }
				    });         
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
									callFlashSlideInModal(validate,"#information","error");
									
							  }
						
						    }
					   });
				   return false;
			 };

			 var clostModal = function(){
				   $('#managementModal').modal('hide');
				   $(".alertManagement").fadeTo(1000,2000).slideUp(500);
			 }
			 var clearFn =function(){
					
				       $("#modalTitleRole").html("Add New Grade");
					   $("#modalDescription").html("ADD NEW GRADE");
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
			
			  var listDataFn = function(data){
				
						   var htmlTable="";
						   $.each(data,function(index,indexEntry){
					     	  htmlTable+="<tr class='rowSearch'>";
						      htmlTable+="<td class='columnSearch'>"+indexEntry["processing_seq"]+"</td>"; 
						      htmlTable+="<td class='columnSearch'>"+indexEntry["grade"]+"</td>"; 
						   	  htmlTable+="<td class='columnSearch' id=\"gradename-"+indexEntry["grade_id"]+"\">"+indexEntry["grade_name"]+"</td>";
							 // htmlTable+="<td><input class=\"form-control input-inline-table input-seq\" type=\"text\" name=\"\" id=\"\" value="+indexEntry["processing_seq"]+"></td>";
						      //htmlTable+="<td><i class=\"fa fa-search font-management showCondition\" data-target=\"#condition\" id="+indexEntry["_id"]+" data-toggle=\"modal\" ></i></td>";
						      htmlTable+="<td class='objectCenter'><i <i class=\"fa fa-gear font-gear font-management popover-del-edit\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-info btn-xs  btnCondition' data-target=#conditionModal data-toggle='modal' type='button' id="+indexEntry["grade_id"]+">Condition</button> <button class='btn btn-warning btn-xs edit' data-target=#managementModal data-toggle='modal' type='button' id="+indexEntry["grade_id"]+">Edit</button> <button class='btn btn-danger btn-xs del' type='button' id="+indexEntry["grade_id"]+">Delete</button>\"></i></td>"
							  htmlTable+="</tr>";
						   });
						
						   $("#listGrade").html(htmlTable);
						
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
								
								    $("#modalTitleRole").html("Edit Grade");
								    $("#modalDescription").html("EDIT GRADE");
									$(this).parent().parent().parent().children().click();
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
							var id = this.id;
							$(this).parent().parent().parent().children().click();
							
						   	$("#confrimModal").modal();
							$(document).off("click","#btnConfirmOK");
							$(document).on("click","#btnConfirmOK",function(){
							     $.ajax({
								      url:restfulURL+"/dqs_api/public/dqs_grade/"+id,
								      type:"delete",
								      dataType:"json",
									  headers:{Authorization:"Bearer "+tokenID.token},
									  success:function(data){       
									       if(data['status']=="200"){
										
										 		callFlashSlide("Delete Successfully.");  
									       		getDataFn();
									       		clearFn();
												$("#confrimModal").modal('hide');
												
											}else if(data['status']=="400"){
												callFlashSlide(data['data'],"error");  
												$("#confrimModal").modal('hide');
											}
					     			 	}
					   			  	});
						
							});
				   		   	
						
				  	 		});
						
						//add condition
						$(".btnCondition").click(function(){
							
							 $("#embed_grade_id").val(this.id);
							 $("#embed_grade_name").text(($("#gradename-"+this.id).text()));
							 
							getDataConditionFn();
							dropDownListRule();
							$(this).parent().parent().parent().children().click();
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
					
				    if($("#action").val()=="add" || $("#action").val()=="" ){
						insertFn();
				        
				    }else{
				     	updateFn();
				    }
			   		return false;
			
				});
				
				$("#btnAddAnother").click(function(){
					
					insertFn("saveAndAnother");
					return false;
					
				});
		
				//listCondition
				var listDataConditionFn = function(data){
					   $("#action_new_condition").val("");
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
													htmlTable+="<input disabled type=\"checkbox\" checked id=Complete-"+indexEntry["condition_id"]+" class='complete_flag'>";
												}else if(indexEntry["complete_flag"] == 0){
													htmlTable+="<input disabled type=\"checkbox\" id=Complete-"+indexEntry["condition_id"]+" class='complete_flag'>";
												}
											htmlTable+="</td>";
											
											//htmlTable+="<td class='iconDisable'><i class=\"fa fa-gear font-management popover-del-editCondition\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-warning btn-xs editCondition'  type='button' id="+indexEntry["condition_id"]+">Edit</button> <button class='btn btn-danger btn-xs deleteCondition' type='button' id="+indexEntry["condition_id"]+">Delete</button>\"></i></td";
											htmlTable+="<td class='iconDisable'><button class='btn btn-danger btn-xs deleteCondition' type='button' id="+indexEntry["condition_id"]+">Delete</button></td";
									htmlTable+="</tr>";
						     });
						
						  $("#listCondition").html(htmlTable);
						
							 //Delete
							$(".deleteCondition").click(function(){
								
								var grade_id = $("#embed_grade_id").val();
								var id = this.id;
						
									$("#confrimModal").modal();
									$(document).off("click","#btnConfirmOK");
									$(document).on("click","#btnConfirmOK",function(){
										
									     $.ajax({
										      url:restfulURL+"/dqs_api/public/dqs_grade/"+grade_id+"/condition/"+id+"",
										      type:"delete",
										      dataType:"json",
											  headers:{Authorization:"Bearer "+tokenID.token},
										      success:function(data){       
											        if(data['status']==200){
											       		getDataConditionFn();
											 	   		$("#confrimModal").modal('hide');
													}else if(data['status']=="400"){
											    		 callFlashSlide(data['data'],"error");
											    		 $("#confrimModal").modal('hide');
											    	}
							     				 }
							   			  	});
									});
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
				}
				

				//click ที่ checkox Close แล้ว แยกไอดี ส่งไปฝัง(embed) 
				$('#conditionTable').on("click",".input-seq",function(){		
						
					var id = this.id.split("-"); 
					embedParamSeqFn(id[1]);	
					
				});
				
				//click ที่ checkox Close แล้ว แยกไอดี ส่งไปฝัง(embed) 
				$('#conditionTable').on("change",".input-contact-selecttype",function(){		
					var id = this.id.split("-"); 
					embedParamOperatorsFn(id[1]);
				});

				//click ที่ checkox Close แล้ว แยกไอดี ส่งไปฝัง(embed) 
				$('#conditionTable').on("click",".complete_flag",function(){		
					var id = this.id.split("-"); 
					embedParamCompleteFnFn(id[1]);	
				});
				
				//ปุ่ม add Condition
				$("#btnSaveListCondition").click(function(){ 
				
					
				if($("#action_condition").val() == "edit") {	
					
				var grade_id = $("#embed_grade_id").val();

					  // get data for loop array start
					  var grades=[];
					  $.each(golbalDataCondition,function(index,indexEntry){

					  
					  var rule_id = "";
					  var processing_seq = "";
					  var operator = "";
					  var complete_flag = "";
					 
					 
					  if($("#embed_seq-"+indexEntry['condition_id']).val()!=undefined 
						|| $("#embed_operater-"+indexEntry['condition_id']).val()!=undefined 
						|| $("#embed_complete_flag-"+indexEntry['condition_id']).val()!=undefined 
						)
					  {
						  
					  	   //send value Seq
						   processing_seq=$("#seq-"+indexEntry['condition_id']).val();
						   //send value ContactType 
						   operator=$("#operater-"+indexEntry['condition_id']).val();
					 
						   //send value KPI 
						   if($("#Complete-"+indexEntry['condition_id']).prop('checked')){ 
							   complete_flag = 1;
					        }else{ 
					        	complete_flag = 0;
					        }
						   
						   grades.push({
							   condition_id:""+indexEntry['condition_id']+"",
							   rule_id:""+indexEntry['rule_id']+"",
							   processing_seq:processing_seq,
							   operator: ""+operator+"",
							   complete_flag: ""+complete_flag+"",
						   });
						   
					  }
					  
					  });
					//Get data for loop array end
						$.ajax({
							     url:restfulURL+"/dqs_api/public/dqs_grade/"+grade_id+"/condition",
							     type:"PATCH",
							     dataType:"json",
							     data:{"grades":grades},
							     headers:{Authorization:"Bearer "+tokenID.token},
							     async:false,
							     success:function(data,status){
							     	  if(data['status']==200 ){
										getDataConditionFn();
									  	$("#action_condition").val("add");
										if(data['data']['error'].length==0){
								      	
									  	callFlashSlideInModal("Update Successfully.","#information2"); 
								
										}else{
											callFlashSlideInModal(listErrorFn(data['data']['error']),"#information2","error");
										  }
									  	  
									  }
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
					
						  $.ajax({
							     url:restfulURL+"/dqs_api/public/dqs_grade/"+grade_id+"/condition",
							     type:"POST",
							     dataType:"json",
							     data:{"conditions": conditions },
								 headers:{Authorization:"Bearer "+tokenID.token},
							     success:function(data,status){
							    
									if(data['data']['error']==undefined){
										callFlashSlideInModal(data['data'],"#information2","error");
									  }else{
							
									      if(data['data']['error'].length==0){
										    getDataConditionFn();
										    callFlashSlideInModal("Insert Successfully.","#information2");
									     
									      }else{
											callFlashSlideInModal(listErrorFn(data['data']['error']),"#information2","error");
										  }
										  
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
								 golbalDataCondition=data['conditions'];
							
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
							htmlTableInline+="<input id='new_complete-"+globalCount+"' type=\"checkbox\" class='new_complete_flag'>";
							htmlTableInline+="</td>";
							htmlTableInline+="<td ><button class='btn btn-danger btn-xs  deleteNewCondition new-condition' type='button' id='"+globalCount+"'>Delete</button></td>";
							//htmlTableInline+="<td ><i class=\"fa fa-gear font-management font-management2  new-condition\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-danger btn-xs deleteCondition deleteNewCondition new-condition' type='button' id='"+globalCount+"'>Delete</button>\"></i></td>";
							htmlTableInline+="</tr>";
						
						 $("#listCondition").append(htmlTableInline);
						 $('[data-toggle="popover"]').popover();  
						 globalCount++;
				}
				
				 $(document).on("click",".deleteNewCondition",function(){
					
					$(this).parent().parent().remove();
					globalCount--;
					if(globalCount==0){
						$("#btnCancelAddCondition").click();
					}
				 });
				
				//DropDownList Rule 
				var dropDownListRule = function(){
					$.ajax ({
						url:restfulURL+"/dqs_api/public/dqs_grade/rule_list" , 
						
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
					$("#action_new_condition").val("add");
					//$(".iconDisable").html("<i style='opacity:0.3;cursor:default;' class='fa fa-gear font-management'></i>");
					$(".iconDisable").html("<button id=\"\" style='opacity:0.3;cursor:default;' type=\"button\" class=\"btn btn-danger btn-xs   new-condition\">Delete</button>");
					return false;
				  }else{
					  callFlashSlideInModal("Can't add Condition. Because your doing Update Data!.","#information2","error");
				  }
			  });
			 
			  $("#btnCancelAddCondition").click(function(){
				  getDataConditionFn();
				  $("#action_condition").val("add");
				  $("#action_new_condition").val("");
			  });

			  $("#btnAdd").click(function(){
					 clearFn();
					 $(".textadd_edit").text("ADD NEW GRADE");
			  });
				
			  $("#btnSearch").click(function(){
				searchMultiFn($("#searchText").val());
			  });
			
			  $("#btnCancle").click(function(){
				   getDataConditionFn();
			  });
			
			$("#btnEdit").click(function() {
				if($("#action_new_condition").val()=="add"){
					callFlashSlideInModal("Can't edit Condition. Because your doing insert Data!.","#information2","error");
					return false;
				  }
				$(".input-seq").removeAttr("disabled");
				$(".input-contact-selecttype").removeAttr("disabled");
				$(".complete_flag").removeAttr("disabled");
				$("#action_condition").val("edit");
			});

});