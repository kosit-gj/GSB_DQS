$(document).ready(
	function(){

		var restfulURL = "http://192.168.1.100:3001";
		/*var restfulURL = "http://goingjesse.hopto.org:3001";*/
		
		 var checkUniqueFn = function(text){
				   var unique=false; 
					   $.ajax({
						    url:restfulURL+"/api/dqs_grade?grade="+text+"",
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
					     url:restfulURL+"/api/dqs_grade",
					     type:"POST",
					     dataType:"json",
					     data:{"grade":$("#grade").val(),"grade_name":$("#grade_name").val(),"process_seq":$("#process_seq").val()},
					     success:function(data,status){
					      //alert(data);
					      //console.log(data);
					      console.log(status);
						      if(status=="success"){
						       alert("Insert Success");
						       getDataFn();
						       clearFn();
						      }
						   }
				    });         
				
				    return false;
		 		};
				

		 var updateFn = function(){
					
				   $.ajax({
					    url:restfulURL+"/api/dqs_grade/"+$("#id").val(),
					    type:"PUT",
					    dataType:"json",
					    data:{"grade":$("#grade").val(),"grade_name":$("#grade_name").val(),"process_seq":$("#process_seq").val()},
					    success:function(data,status){
					     //alert(data);
						     if(status=="success"){
						      alert("Upate Success");
						      getDataFn();
						      clearFn();
						     }
						    }
					   });
				   return false;
			 };

			 var clearFn =function(){
					
					   $("#id").val("");
					   $("#action").val("add");
					   $("#grade").val("");
					   $("#grade_name").val("");
					   $("#process_seq").val("");
					   $("#btnSubmit").val("Add");
					   $('#addModal').modal('hide');
			}
		 var findOneFn = function(id){
				   //http://localhost:3000/find-user/58035b7cb4566c158bcecacf
				   $.ajax({
					    url:restfulURL+"/api/dqs_grade/"+id,
					    type:"get",
					    dataType:"json",
					    success:function(data){
					      $("#grade").val(data['grade']);
						  $("#grade_name").val(data['grade_name']);
					      $("#process_seq").val(data['process_seq']);
					      
						/*	if(data['inform_flag']==1){
								$('#InformBranchRadioTrue').prop('checked', true);
							}
							if(data['inform_flag']==0){
								$('#InformBranchRadioFalse').prop('checked', true);
							}*/
				    	}
				   });
			  };
		
			  var searchFn = function(searchText){
				   /* http://localhost:3000/api/products?name__regex=/^test/i */
				    
				   $.ajax({
				    url:restfulURL+"/api/dqs_grade/?grade__regex=/^"+searchText+"/i",
				    type:"get",
				    dataType:"json",
				    success:function(data){
				
				     listDataFn(data);
				    }
				   });
				   
				  }
			
			  var listDataFn = function(data){
						
						   console.log(data);
						   var htmlTable="";
						   $.each(data,function(index,indexEntry){
						    //console.log(indexEntry);
							     htmlTable+="<tr >";
								      htmlTable+="<td>"+(index+1)+"</td>";
								      htmlTable+="<td>"+indexEntry["grade"]+"</td>";
								   	  htmlTable+="<td>"+indexEntry["grade_name"]+"</td>";
									 // htmlTable+="<td><input class=\"form-control input-inline-table input-seq\" type=\"text\" name=\"\" id=\"\" value="+indexEntry["process_seq"]+"></td>";
								      htmlTable+="<td><i class=\"fa fa-search font-management btnCondition\" data-target=\"#condition\" id="+indexEntry["_id"]+" data-toggle=\"modal\" ></i></td>";
								      htmlTable+="<td><i <i class=\"fa fa-gear font-management popover-del-edit\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-warning btn-xs edit' data-target=#addModal data-toggle='modal' type='button' id="+indexEntry["_id"]+">Edit</button> <button class='btn btn-danger btn-xs del' type='button' id="+indexEntry["_id"]+">Delete</button>\"></i></td>"
							htmlTable+="</tr>";
						   });
						
						   $("#listGrade").html(htmlTable);
						   
						  //popover 
						$(".popover-del-edit").popover();
						
						//delete
						$(".popover-del-edit").click(function(){
							//findOnd
							$(".edit").on("click",function(){
								    findOneFn(this.id);
								    $("#id").val(this.id);
								    $("#action").val("edit");
								    $("#btnSubmit").val("Edit");
								});
							
						   $(".del").click(function(){
						    if(confirm("Do you want to delete this file?")){
						     $.ajax({
							      url:restfulURL+"/api/dqs_grade/"+this.id,
							      type:"delete",
							      dataType:"json",
							      //data:{"_id":this.id},
								      success:function(data){       
								       
								       getDataFn();
								       clearFn();
						
				     			 }
				   			  });
				   		   		}
				  	 		});
						
						
				});
						
				$(".btnCondition").click(function(){
					
					 $("#embed_grade_id").val(this.id);
					// alert("555");
					getDataConditionFn();
					dropDownListRule();
				 });
			}
			
			  var getDataFn = function(){
				   $.ajax({
					    url:restfulURL+"/api/dqs_grade",
					    type:"get",
					    dataType:"json",
						    success:function(data){
						     
						     listDataFn(data);
						 }
				  });
			};
			
			
			var listDataConditionFn = function(data){
				   var process_seq = "";
				   console.log(data);
				   var htmlTable="";
				   $("#listCondition").empty();
				   $.each(data,function(index,indexEntry){
					
								if (indexEntry["process_seq"] == undefined){
									process_seq = "";
								}else{
									process_seq = indexEntry["process_seq"];
								}
								
							    htmlTable+="<tr >";
								        htmlTable+="<td><input class=\"form-control input-inline-table input-seq\" type=\"text\" name=\"\" id="+indexEntry["process_seq"]+" value="+process_seq+">";
								        htmlTable+="<td><select class=\"form-control input-inline-table input-contact-selecttype\" id="+indexEntry["operator"]+"><option>OR</option> <option>AND</option></select></td>";
										htmlTable+="<td>"+indexEntry["rule_id"]+"</td>";
										htmlTable+="<td><input type=\"checkbox\"  id="+indexEntry["complete_flag"]+"></td>";
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
								      url:restfulURL+"/api/dqs_grade_condition/"+this.id,
								      type:"delete",
								      dataType:"json",
								      //data:{"_id":this.id},
									      success:function(data){       
									       
									       getDataConditionFn();
							
					     				 }
					   			  	});
					   		   	}
					  	 	});
						
					   //findOnd
					   $(".editCondition").click(function(){
					
					   });
					
					
					
					});
					
				}
			 
			
			
				var getDataConditionFn = function(){
					
					var grade_id = $("#embed_grade_id").val();
					//  alert(grade_id);
					   $.ajax({
					    url:restfulURL+"/api/dqs_grade_condition?grade_id="+grade_id+"",
					    type:"get",
					    dataType:"json",
					    success:function(data){
					     
					     listDataConditionFn(data);
					    }
				   });
			  };
			
			
			//DropDownList Rule 
			var dropDownListRule = function(data){
				$.ajax ({
					url:restfulURL+"/api/dqs_rule" ,
					type:"get" ,
					dataType:"json" ,
						success:function(data){
							var htmlTable="";
							$.each(data,function(index,indexEntry){
								
								htmlTable+="<option value="+indexEntry["_id"]+">"+indexEntry["rule_name"]+"</option>";		
							});	
							$("#listRule").html(htmlTable);
						}
				});
			};
			
			//DropDownList make_param_operator
			/*var dropDownListOperator = function(data){
				var htmlTable="";
				$.ajax ({
					url:restfulURL+"/api/make_param_operator" ,
					type:"get" ,
					dataType:"json" ,
					async:false,
						success:function(data){
							
							$.each(data,function(index,indexEntry){
								
								htmlTable+="<option value="+indexEntry["param_operator"]+">"+indexEntry["param_operator"]+"</option>";		
							});	
							$("#listOperator").html(htmlTable);
						}
				});
				return htmlTable;
			};*/
			
			 var insertConditionFn = function(){
					
					    $.ajax({
						     url:restfulURL+"/api/dqs_grade_condition",
						     type:"POST",
						     dataType:"json",
						     data:{"rule_id":$("#listRule").val(),"grade_id":$("#embed_grade_id").val()},
						     success:function(data,status){
						      console.log(status);
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
			 		
			 $("#btnAddCondition").click(function(){
						
					insertConditionFn();

				});

			
		//Call Function start
		  getDataFn();
		$("#btnSubmit").click(function(){
			   if(validationFn()==true){
				    if($("#action").val()=="add" || $("#action").val()=="" ){
				     
				     if(checkUniqueFn($("#grade").val())==true){
				      	insertFn();
				     }else{
				      	alert("name is not unique.");
				     }
				    }else{
				     	updateFn();
				    }
			   }
			   		return false;
			  });

			   $("#btnAdd").click(function(){
					 clearFn();
					 //return false;
			  });
				
			  $("#btnSearch").click(function(){
				   searchFn($("#searchText").val());
				   return false;
			  });
			
			  $("#btnCancle").click(function(){
				   clearFn();
				   return false;
			  });
	  
	  //Call Function End
});


