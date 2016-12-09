$(document).ready(function(){

			

				//$("#action").val("add");
				  var checkUniqueFn = function(text){
				   /* http://localhost:3000/dqs_api/public/products?name__regex=/^test/i */
				   var unique=false; 
					   $.ajax({
						    url:restfulURL+"/dqs_api/public/dqs_menu?menu_name="+text+"",
						    type:"get",
						    dataType:"json",
						    async:false,
							headers:{Authorization:"Bearer "+tokenID.token},
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
						   if($(".menuCategory:checked").val()==undefined){
							 validateText+="please select category name\n";
						   }
						   
							   if(validateText!=""){
							    alert(validateText);
								//callFlashSlide(validateText);
							    return false;
							   }else{
						    return true;
					 }
			  }
			  
			  
			  var insertFn = function(param){
			
				//alert($(".menuCategory:checked").val());
				
			    $.ajax({
				     url:restfulURL+"/dqs_api/public/dqs_menu",
				     type:"POST",
				     dataType:"json",
				     data:{"menu_name":$("#menu_name").val(),"app_url":$("#app_url").val(),"menu_category":$(".menuCategory:checked").val()},
					 headers:{Authorization:"Bearer "+tokenID.token},
					 async:false,
				     success:function(data,status){
				      //alert(data);
				      //console.log(data);
				      console.log(status);
					      if(data['status']=="200"){
					      // alert("Insert Success");
						   
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
						// || data['data']['app_url']==!"" || data['data']['menu_category']==!""
							var validate="";
							if(data['data']['menu_name']!=undefined){
								validate+="<font color='red'>*</font> "+data['data']['menu_name']+"<br>";
							}
							if(data['data']['app_url']!=undefined){
								validate+="<font color='red'>*</font> "+data['data']['app_url']+"<br>";
							}
							if(data['data']['menu_category']!=undefined){
								validate+="<font color='red'>*</font> "+data['data']['menu_category']+"<br>";
							}
							
							
							callFlashSlideInModal(validate);
						  }
				     }
				    });         
			
			    return false;
			   };
			
			  var updateFn = function(){
			
			   $.ajax({
				    url:restfulURL+"/dqs_api/public/dqs_menu/"+$("#id").val(),
				    type:"PATCH",
				    dataType:"json",
				    data:{"menu_name":$("#menu_name").val(),"app_url":$("#app_url").val(),"menu_category":$(".menuCategory:checked").val()},
					headers:{Authorization:"Bearer "+tokenID.token},
				    success:function(data,status){
				     //alert(data);
					     if(status=="success"){
					     // alert("Upate Success");
						  callFlashSlide("Update Successfully.");
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
					  
					   $("#app_url").val("");
					   
					   $("#DQManagement").prop('checked', false);
					   $("#DQMornitoring").prop('checked', false);
					   $("#report").prop('checked', false);
						  
			
			  }
			
			 
			  var findOneFn = function(id){
			   //http://localhost:3000/find-user/58035b7cb4566c158bcecacf
			   $.ajax({
				    url:restfulURL+"/dqs_api/public/dqs_menu/"+id,
				    type:"get",
				    dataType:"json",
					headers:{Authorization:"Bearer "+tokenID.token},
				    success:function(data){
				
					      $("#menu_name").val(data['menu_name']);
						  $("#app_url").val(data['app_url']);
						  console.log(data['menu_category']);
						  
						  if(data['menu_category']=="MM"){
							  
							  $("#DQManagement").prop('checked', true);
							  $("#DQMornitoring").prop('checked', false);
							  $("#report").prop('checked', false);
							  
						  }else if(data['menu_category']=="MN"){
							  
							  $("#DQManagement").prop('checked', false);
							  $("#DQMornitoring").prop('checked', true);
							  $("#report").prop('checked', false);
							  
						  }else if(data['menu_category']=="RP"){
							  
							  $("#DQManagement").prop('checked', false);
							  $("#DQMornitoring").prop('checked', false);
							  $("#report").prop('checked', true);
							  
						  }
						  
			    		}
			   		});
			  	};
			  
			  var searchFn = function(searchText){
			   /* http://localhost:3000/dqs_api/public/products?name__regex=/^test/i */
			    
			   $.ajax({
				    url:restfulURL+"/dqs_api/public/dqs_menu/?menu_name__regex=/^"+searchText+"/i",
				    type:"get",
				    dataType:"json",
					headers:{Authorization:"Bearer "+tokenID.token},
				    success:function(data){
				
				     listDataFn(data);
			    	}
			   	});
			  };
			  
			  var listDataFn = function(data){
			
				/*
				if ( $.fn.DataTable.isDataTable('#tableMenu')) {
				      $('#tableMenu').DataTable().destroy();
				}
				*/
				
			   //console.log(data);
			   var htmlTable="";
			   $.each(data,function(index,indexEntry){
						       htmlTable+="<tr >";
							        htmlTable+="<td>"+(index+1)+"</td>";
							        htmlTable+="<td id=\"menuname-"+indexEntry["menu_id"]+"\"> "+indexEntry["menu_name"]+"</td>";
							     
							        htmlTable+="<td><i class=\"fa fa-group font-management btnAuthorize\" id="+indexEntry["menu_id"]+" data-target=\"#authorize\" data-toggle=\"modal\"></i></td>";
							       	
									htmlTable+="<td><i class=\"fa fa-gear font-management popover-del-edit\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-warning btn-xs edit btn-gear' data-target='#managementModal' data-toggle='modal' type='button' id="+indexEntry["menu_id"]+">Edit</button> <button class='btn btn-danger btn-xs del btn-gear' type='button' id="+indexEntry["menu_id"]+">Delete</button>\"></i></td>";
							   htmlTable+="</tr>";
				     });
				
				     $("#listMenu").html(htmlTable);
				
				
				 //$('#tableMenu').DataTable( { "dom": '<"top"flp>rt<"bottom"lp><"clear">',"bSort" : false } ); 
				 
				 $("#tableMenu_wrapper").click(function(){
					 $(".popover-del-edit").popover();
				 });
			
				
				     
				
			   
				   $(".btnAuthorize").click(function(){
					
						$("#menu_id").val(this.id);
						$("#menuname").text(($("#menuname-"+this.id).text()));
						getDataRoleFn(this.id);
						
						$("#btnSaveAuthorize").on("click",function(){
							var roles = [];
							$.each($(".role").get(),function(index,indexEntry){
								//console.log(indexEntry);
								if($(indexEntry).is(":checked")){
									//console.log($(indexEntry).val());
									roles.push($(indexEntry).val());
								}
								
								
							});
							//console.log(menus);
							
								$.ajax({
									url : restfulURL + "/dqs_api/public/dqs_menu/"+$("#menu_id").val()+"/authorize",
									type : "post",
									dataType : "json",
									headers:{Authorization:"Bearer "+tokenID.token},
									async:false,
									data:{"roles":roles},
									success : function(data) {
										
										
										if(data['status']==200){
											callFlashSlide("Save Authorize is Successfully.");
											$('#authorize').modal('hide');
											
										}
									}
								});
								
								
						$("#btnSaveAuthorize").off("click");
						});

				});
					//popover 
					$(".popover-del-edit").popover();
					
					//delete
					
					//$(".popover-del-edit").click(function(){
					//findOnd
					
					
				
					
					$("#tableMenu").off("click",".popover-del-edit");
					$("#tableMenu").on("click",".popover-del-edit",function(){
						
					    $(".del").click(function(){
					    //alert(this.id);
					    if(confirm("Confirm to Delete Data?")){
					     
					     $.ajax({
						      url:restfulURL+"/dqs_api/public/dqs_menu/"+this.id,
						      type:"delete",
						      dataType:"json",
							  headers:{Authorization:"Bearer "+tokenID.token},
						      //data:{"_id":this.id},
						      success:function(data){  
							
								if(data['status']==200){
								   callFlashSlide("Delete Successfully.");    
							       getDataFn();
							       clearFn();
								}
					
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
					    url:restfulURL+"/dqs_api/public/dqs_menu",
					    type:"get",
					    dataType:"json",
						headers:{Authorization:"Bearer "+tokenID.token},
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
									if(indexEntry['menu_active']=="1"){
										htmlTable += "<td><input class=\"role\" name=\"role_id-"+indexEntry["role_id"]+"\" id=\"role_id-"+indexEntry["role_id"]+"\" checked='checked' type=\"checkbox\" value="+indexEntry["role_id"]+"></td>";
									}else{
										htmlTable += "<td><input class=\"role\" name=\"role_id-"+indexEntry["role_id"]+"\" id=\"role_id-"+indexEntry["role_id"]+"\" type=\"checkbox\" value="+indexEntry["role_id"]+"></td>";
										
									}
							         //htmlTable += "<td><input type=\"checkbox\" id=checkbox-"+indexEntry["_id"]+"></td>";
								        htmlTable+="<td>"+indexEntry["role_name"]+"</td>";
								
								   htmlTable+="</tr>";
					     });
					
					  $("#listRole").html(htmlTable);
				}
			 
			
			
				var getDataRoleFn = function(menu_id){
				
					   //http://192.168.1.58/dqs_api/public/dqs_menu/{menu_id}/authorize
					   $.ajax({
						    url:restfulURL+"/dqs_api/public/dqs_menu/"+menu_id+"/authorize",
						    type:"get",
						    dataType:"json",
							headers:{Authorization:"Bearer "+tokenID.token},
						    success:function(data){
						     
						     listDataRoleFn(data);
						    }
					   });
					
			  };
			  
			/*var getDataAuthorizationFn = function(){
				
				var id = $("#embed_menu_id").val();

				//alert(id);
				   $.ajax({
				    url:restfulURL+"/dqs_api/public/dqs_authorization?role_id="+id+"",
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
				  // if(validationFn()==true){
				
					    if($("#action").val()=="add" || $("#action").val()=="" ){
					     
						    // if(checkUniqueFn($("#menu_name").val())==true){
						      insertFn();
						
						     //}else{
							
						      //alert("name is not unique.");
						
						     //}
					    }else{
					     updateFn();
					
					    }
				  // }
			   return false;
			
			  });
			
			$("#btnSaveAndAnother").click(function(){
				//alert("btnSaveAndAnother");
				insertFn("saveAndAnother");
				
			});
			
			
			
			 
//			 $("#btnAdd").click(function(){
//				 clearFn();
//				 //return false;
//			 });
			 
			  $("#btnSearch").click(function(){
				   
				   searchFn($("#searchText").val());
				   return false;
			
			  });
			
			  $("#cancel").click(function(){
				   
				   clearFn();
				   return false;
			
			  });
			
			 
			  
			  //Call Function End
			  
			 });
