			var restfulURL="http://192.168.1.42:3001";
			 $(document).ready(function(){
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
				
			/*var checkUniqueFnEdit = function(text){
				    http://localhost:3000/api/products?name__regex=/^test/i 
				   var unique=false; 
				   $.ajax({
				    url:restfulURL+"/api/dqs_menu?menu_nameEdit="+text+"",
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
					   $('#addModal').modal('hide');
			
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
			   
			  }
			  
			  var listDataFn = function(data){
			
			   console.log(data);
			   var htmlTable="";
			   $.each(data,function(index,indexEntry){
						       htmlTable+="<tr >";
							        htmlTable+="<td>"+(index+1)+"</td>";
							        htmlTable+="<td>"+indexEntry["menu_name"]+"</td>";
							     
							        htmlTable+="<td><i class=\"fa fa-paste font-management\" data-target=\"#authorize\" data-toggle=\"modal\"></i></td>";
							       	
									htmlTable+="<td><i class=\"fa fa-gear font-management popover-del-edit\" data-html=\"true\" data-container=\"body\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-warning btn-xs edit' data-target='#managementModal' data-toggle='modal' type='button' id="+indexEntry["_id"]+">Edit</button> <button class='btn btn-danger btn-xs del' type='button' id="+indexEntry["_id"]+">Delete</button>\"></i></td>";
							   htmlTable+="</tr>";
				     });
				
				     $("#listMenu").html(htmlTable);
			   
			   
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
		
			}
			  
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
			
			   clearFn();
			   return false;
			
			  });
			
			 
			  
			  //Call Function End
			  
			 });


/*$(document).ready(function(){

				var restfulURL="http://192.168.1.42:3001";
				
				  var insertFn = function(){
				
				    $.ajax({
					     url:restfulURL+"/insert-menu",
					     type:"POST",
					     dataType:"json",
					     data:{"menu_name":$("#menu_name").val()},
					     success:function(data){
						      //alert(data);
						      if(data="success"){
						       alert("Insert Success");
						       listMenuFn();
						       clearFn();
					      }
					     }
				    });         
				
				    return false;
				   };
				
				  var updateFn = function(){
				
				   $.ajax({
					    url:restfulURL+"/update-menu",
					    type:"PUT",
					    dataType:"json",
					    data:{"id":$("#id").val(),"menu_name":$("#menu_edit").val()},
					    success:function(data){
						     //alert(data);
						     if(data="success"){
						      alert("Upate Success");
						      listMenuFn();
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
					   $('#addModal').modal('hide');
					
				  }
				  var cleareditFn =function(){
					   $("#id").val("");
					   $("#action").val("add");
					   $("#menu_edit").val("");
					   $("#btnSubmit").val("Add");
					   $('#editModal').modal('hide');
					  }
				
				  var findOneFn = function(id){
				   //http://localhost:3000/find-user/58035b7cb4566c158bcecacf
					   $.ajax({
						    url:restfulURL+"/find-menu/"+id,
						    type:"get",
						    dataType:"json",
						    success:function(data){
						
						      $("#menu_edit").val(data['menu_name']);
				      
				   			 }
				   		});
				  };
				
				  var listMenuFn = function(){
				   $.ajax({
					    url:restfulURL+"/get-menu",
					    type:"get",
					    dataType:"json",
					    success:function(data){
					     console.log(data[0]);
					     var htmlTable="";
						     $.each(data,function(index,indexEntry){
							       htmlTable+="<tr >";
								        htmlTable+="<td>"+(index+1)+"</td>";
								        htmlTable+="<td>"+indexEntry["menu_name"]+"</td>";
								     
								        htmlTable+="<td><i class=\"fa fa-paste font-management\" data-target=\"#authorize\" data-toggle=\"modal\"></i></td>";
								       	
										htmlTable+="<td><i class=\"fa fa-gear font-management popover-del-edit\" data-html=\"true\" data-container=\"body\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-warning btn-xs edit' data-target='#editModal' data-toggle='modal' type='button' id="+indexEntry["_id"]+">Edit</button> <button class='btn btn-danger btn-xs del' type='button' id="+indexEntry["_id"]+">Delete</button>\"></i></td>";
								   htmlTable+="</tr>";
					     });
					
					     $("#listMenu").html(htmlTable);
				
					//popover 
					$(".popover-del-edit").popover();
					
					//delete
					$(".popover-del-edit").click(function(){
					
					     //findOnd
					     $(".edit").click(function(){
					      findOneFn(this.id);
					      $("#id").val(this.id);
					      $("#action").val("edit");
					      $("#btnSubmit").val("Edit");
					
					     });
					
					
						$(".del").click(function(){

					      $.ajax({
						       url:restfulURL+"/del-menu/"+this.id,
						       type:"get",
						       dataType:"json",
						       //data:{"_id":this.id},
						       success:function(data){
							        console.log(data["ok"]);
							        console.log(data["n"]);
						
							        if(data["ok"]==1 && data["n"]==1){
							         alert("delte success");
							         listMenuFn();
					      			 }
					     	 	 }
					     	 });
					     });
					});
		      	}
		   });
		};
		  listMenuFn();
				
				
				
				
				  $("#btnSubmit").click(function(){
				   //alert($("#fullname").val());
				   //alert($("#age").val());
				   //alert($("#action").val());
					   if($("#action").val()=="add" || $("#action").val()=="" ){
					    insertFn();
					   }else{
					     return false;
					
				   }
				  });
				
				  $("#btnSubmitedit").click(function(){
					   //alert($("#fullname").val());
					   //alert($("#age").val());
					   //alert($("#action").val());
					   if($("#action").val()=="edit"){
					   		updateFn();
					   }else{
							return false;
					   }
				
					  });
				
				
				  $("#btnCancle").click(function(){
						   clearFn();
						   return false;
				
				  });
				
				
				
				  $("#canceledit").click(function(){
					  	 cleareditFn();
					  	 return false;
				
					  });
				
});
*/