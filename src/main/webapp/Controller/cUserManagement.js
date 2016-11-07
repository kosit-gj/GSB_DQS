$(document).ready(
	function(){

		var restfulURL = "http://192.168.1.100:3001";
		
		 /*var checkUniqueFn = function(text){
				   var unique=false; 
					   $.ajax({
						    url:restfulURL+"/api/dqs_user?grade="+text+"",
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
				  }*/
		

		   /*var validationFn = function(){
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
				  }*/
		
	/*	 var insertFn = function(){
				
				    $.ajax({
					     url:restfulURL+"/api/dqs_user",
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
		 		};*/

		 var updateFn = function(){
				
			 $.each($(".embed_Super_Flagg").get(),function(index,indexEntry){
					var id=$(indexEntry).val();
					
				 $.ajax({
					    url:restfulURL+"/api/dqs_user/"+id,
					    type:"PUT",
					    dataType:"json",
					    data:{"super_flag":$("#operation-"+id).val()},
					    success:function(data,status){
					     //alert(data);
						     if(status=="success"){
						      alert("Upate Success");
						      getDataFn();
						      clearFn();
						     }
						    }
					   });
			 });
			 
				   return false;
			 };

			 
			 
			 var clearFn = function(){
					
					   $("#id").val("");
					   $("#action").val("add");
			}
			 
			 
		/* var findOneFn = function(id){
				   //http://localhost:3000/find-user/58035b7cb4566c158bcecacf
				   $.ajax({
					    url:restfulURL+"/api/dqs_user/"+id,
					    type:"get",
					    dataType:"json",
					    success:function(data){
					      $("#grade").val(data['grade']);
				    	}
				   });
			  };*/
		
			  var searchFn = function(searchText){
				   /* http://localhost:3000/api/products?name__regex=/^test/i */
				    
				   $.ajax({
				    url:restfulURL+"/api/dqs_user/?user_name__regex=/^"+searchText+"/i",
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
						 //$("#listUser").empty();
						   $.each(data,function(index,indexEntry){
							
						    //console.log(indexEntry);
							     htmlTable+="<tr >";
								     /* htmlTable+="<td>"+(index+1)+"</td>";*/
								      htmlTable+="<td>"+indexEntry["user_name"]+"</td>";
								      htmlTable+="<td>"+indexEntry["position"]+"</td>";
								   	  htmlTable+="<td>"+indexEntry["own_cost_center"]+"</td>";
									  htmlTable+="<td>"+indexEntry["revised_cost_center"]+"</td>";
									  htmlTable+="<td>"+indexEntry["role_id"]+" </td>";
									  
									  htmlTable+="<td>";
										if(indexEntry["super_flag"] == "All Branch"){
											 htmlTable+="<select disabled class=\"form-control input-inline-table input-contact-selecttype editSuperFlag\" id=operation-"+indexEntry["_id"]+"><option selected >All Branch</option> <option>Line</option></select>";
										}else{
											 htmlTable+="<select disabled class=\"form-control input-inline-table input-contact-selecttype editSuperFlag\" id=operation-"+indexEntry["_id"]+"><option>All Branch</option> <option selected >Line</option></select>";
										}
							          htmlTable+="</td>"; 
									  
									  /*htmlTable+="<td>";
										  if(indexEntry["super_flag"]){
											  htmlTable+="<select class=\"form-control input-inline-table input-contact-selecttype  editSuperFlag\" id=\"listBranchOper-"+indexEntry["_id"]+"\">"+listBranchOper(indexEntry["_id"])+"</select>";
										  }else{
											  htmlTable+="<select class=\"form-control input-inline-table input-contact-selecttype  editSuperFlag\" id=\"listBranchOper-"+indexEntry["_id"]+"\">"+listBranchOper(indexEntry["_id"])+"</select>";
										  }
									  htmlTable+="</td>";*/
									  
							     htmlTable+="</tr>";
								
						   });
						
						  $("#listUser").html(htmlTable);
						
						
						//ปุ่ม Edit ใน table
						$(".editSuperFlag").click(function(){
							
							var id = this.id.split("-"); 
							
							//alert(id[1]);
							embedParam(id[1]);
							
						});
						
						//ปุ่ม Save
						$("#btnSave").click(function(){
					        updateFn();
					        //alert("btnSave");
						});
			
			};
			
			
			var embedParam = function(id){
				//alert(id);
				var count = 0;
				
				$.each($(".embed_Super_Flagg").get(),function(index,indexEnry){
				//ถ้า id ที่วน == id ที่มี	
					if($(indexEnry).val()==id){
						count+=1;
					}
				});
				
				if(count>0){
					$("#embed_SuperFlag-"+id).remove();
					$("body").append("<input type='hidden' class='embed_Super_Flagg' id='embed_SuperFlag-"+id+"' name='embed_SuperFlag' value='"+id+"'>");
				}else{
					$("body").append("<input type='hidden' class='embed_Super_Flagg' id='embed_SuperFlag-"+id+"' name='embed_SuperFlag' value='"+id+"'>");
				}
				
			}
			
			
			var getDataFn = function(){
				   $.ajax({
					    url:restfulURL+"/api/dqs_user",
					    type:"get",
					    dataType:"json",
						    success:function(data){
						     
						     listDataFn(data);
							 dropDownListRole();
						 }
				  });
			};
		
			//DropDownList Role
			var dropDownListRole = function(data){
				$.ajax ({
					url:restfulURL+"/api/dqs_role" ,
					type:"get" ,
					dataType:"json" ,
						success:function(data){
							var htmlTable="";
							$.each(data,function(index,indexEntry){
								
								htmlTable+="<option value="+indexEntry["role_id"]+">"+indexEntry["role_name"]+"</option>";		
							});	
							$("#listRole").html(htmlTable);
						}
				});
			};
			
			
		/*	//DropDownList	Branch Operation
			var listBranchOper = function(){
				var htmlTable="";
				$.ajax ({
					url:restfulURL+"/api/dqs_branch_operation" ,
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
		
			
		//Call Function start
		  getDataFn();
		  
		/*$("#btnSubmit").click(function(){
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
			  });*/

				
			  $("#btnSearch").click(function(){
				   searchFn($("#searchText").val());
				   return false;
			  });
			
			  $("#btnCancel").click(function(){
				  getDataFn();
				});
			
			  $("#btnEdit").click(function(){
				$(".editSuperFlag").removeAttr("disabled");
			  });
	  
	  //Call Function End
});


