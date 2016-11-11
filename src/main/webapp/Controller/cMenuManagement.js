$(document).ready(function(){

			var restfulURL="http://192.168.1.49:3001";
			
			

				//$("#action").val("add");
				  var checkUniqueFn = function(text){
				   /* http://localhost:3000/api/products?name__regex=/^test/i */
				   var unique=false; 
					   $.ajax({
						    url:restfulURL+"/api/dqs_menu?menu_name="+text+"",
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
				
			  //console.log(checkUniqueFn("aa"));
			  
			  var validationFn = function(){
			   
				   var validateText="";
						   if($("#menu_name").val()==""){
						    validateText+="name not empty\n";
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
				     url:restfulURL+"/api/dqs_menu",
				     type:"POST",
				     dataType:"json",
				     data:{"menu_name":$("#menu_name").val()},
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
				    url:restfulURL+"/api/dqs_menu/"+$("#id").val(),
				    type:"PUT",
				    dataType:"json",
				    data:{"menu_name":$("#menu_name").val()},
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
					   $("#menu_name").val("");
					   $("#btnSubmit").val("Add");
					   $('#managementModal').modal('hide');
			
			  }
			
			 
			  var findOneFn = function(id){
			   //http://localhost:3000/find-user/58035b7cb4566c158bcecacf
			   $.ajax({
				    url:restfulURL+"/api/dqs_menu/"+id,
				    type:"get",
				    dataType:"json",
				    success:function(data){
				
				      $("#menu_name").val(data['menu_name']);
				      
			    		}
			   		});
			  	};
			  
			  var searchFn = function(searchText){
			   /* http://localhost:3000/api/products?name__regex=/^test/i */
			    
			   $.ajax({
				    url:restfulURL+"/api/dqs_menu/?menu_name__regex=/^"+searchText+"/i",
				    type:"get",
				    dataType:"json",
				    success:function(data){
				
				     listDataFn(data);
			    	}
			   	});
			  };
			  
			  var listDataFn = function(data){
			
			   //console.log(data);
			   var htmlTable="";
			   $.each(data,function(index,indexEntry){
						       htmlTable+="<tr >";
							        htmlTable+="<td>"+(index+1)+"</td>";
							        htmlTable+="<td id=\"menuname-"+indexEntry["_id"]+"\"> "+indexEntry["menu_name"]+"</td>";
							     
							        htmlTable+="<td><i class=\"fa fa-paste font-management btnAuthorize\" id="+indexEntry["_id"]+" data-target=\"#authorize\" data-toggle=\"modal\"></i></td>";
							       	
									htmlTable+="<td><i class=\"fa fa-gear font-management popover-del-edit\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-warning btn-xs edit' data-target='#managementModal' data-toggle='modal' type='button' id="+indexEntry["_id"]+">Edit</button> <button class='btn btn-danger btn-xs del' type='button' id="+indexEntry["_id"]+">Delete</button>\"></i></td>";
							   htmlTable+="</tr>";
				     });
				
				     $("#listMenu").html(htmlTable);
				
				
			   
				   $(".btnAuthorize").click(function(){
					
						$("#embed_menu_id").val(this.id);
						
						$("#menuname").text(($("#menuname-"+this.id).text()));
						
						//getDataAuthorizationFn();
						getDataRoleFn();

				});
					//popover 
					$(".popover-del-edit").popover();
					
					//delete
					$(".popover-del-edit").click(function(){
						
					    $(".del").click(function(){
					    //alert(this.id);
					    if(confirm("Do you want to delete this file?")){
					     
					     $.ajax({
						      url:restfulURL+"/api/dqs_menu/"+this.id,
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
			
					   //findOnd
					   $(".edit").click(function(){	
					
						    findOneFn(this.id);
						
						    $("#id").val(this.id);
						    $("#action").val("edit");
						    $("#btnSubmit").val("Edit");
			   			});
				});
			 
		};
			  
			  var getDataFn = function(){
			   
				   $.ajax({
					    url:restfulURL+"/api/dqs_menu",
					    type:"get",
					    dataType:"json",
					    success:function(data){
					     
					     listDataFn(data);
				    	}
				   });
			 };
			
			
			
			
			  var listDataRoleFn = function(data){
				
				  // console.log(data);
				   var htmlTable="";
				   $.each(data,function(index,indexEntry){
							       htmlTable+="<tr >";
							
							            htmlTable += "<td><input type=\"checkbox\" id=checkbox-"+indexEntry["_id"]+"></td>";
							            
										/*htmlTable+="<td>";
											if(indexEntry["role_id"]==1){
												htmlTable+="<input type=\"checkbox\" checked='checked' id=closeCheckbox-"+indexEntry["_id"]+">";
											}else if(indexEntry["role_id"]==0){
												htmlTable+="<input type=\"checkbox\" id=closeCheckbox-"+indexEntry["_id"]+">";
											}
										htmlTable+="</td>";*/
										
										
								        htmlTable+="<td>"+indexEntry["role_name"]+"</td>";
								
								   htmlTable+="</tr>";
					     });
					
					  $("#listRole").html(htmlTable);
				}
			 
			
			
				var getDataRoleFn = function(){
				
					   
					   $.ajax({
						    url:restfulURL+"/api/dqs_role",
						    type:"get",
						    dataType:"json",
						    success:function(data){
						     
						     listDataRoleFn(data);
					    }
				   });
			  };
			  
			/*var getDataAuthorizationFn = function(){
				
				var id = $("#embed_menu_id").val();

				//alert(id);
				   $.ajax({
				    url:restfulURL+"/api/dqs_authorization?role_id="+id+"",
				    type:"get",
				    dataType:"json",
				    success:function(data){
				     
				     listDataRoleFn(data);
				    }
			   });
		  };*/
			  
			  //Call Function start
			  getDataFn();
			
			  $("#btnSubmit").click(function(){
				   if(validationFn()==true){
				
					    if($("#action").val()=="add" || $("#action").val()=="" ){
					     
						     if(checkUniqueFn($("#menu_name").val())==true){
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
			
			  $("#cancel").click(function(){
				   alert("cancel");
				   clearFn();
				   return false;
			
			  });
			
			 
			  
			  //Call Function End
			  
			 });
