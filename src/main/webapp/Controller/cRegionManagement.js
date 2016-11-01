$(document).ready(
	function(){

		var restfulURL = "http://192.168.1.100:3001";
		/*var restfulURL = "http://171.96.200.171:3001";*/
		/*var restfulURL = "http://goingjesse.hopto.org:3001";*/
		
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
		

		   var validationFn = function(){
				   var validateText="";
					   if($("#region_name").val()==""){
					    	validateText+="name not empty\n";
					   }
						if($("#operation_id").val()==""){
					   		 validateText+="operation not empty\n";
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
					     url:restfulURL+"/api/dqs_region",
					     type:"POST",
					     dataType:"json",
					     data:{"region_name":$("#region_name").val(),"operation_id":$("#listBranchOper").val()},
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
					    url:restfulURL+"/api/dqs_region/"+$("#id").val(),
					    type:"PUT",
					    dataType:"json",
					    data:{"region_name":$("#region_name").val(),"operation_id":$("#listBranchOper").val()},
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
					   $("#region_name").val("");
					   $("#operation_id").val("");
					   $("#btnSubmit").val("Add");
					   $('#ManagementModal').modal('hide');
			}
		 var findOneFn = function(id){
				   //http://localhost:3000/find-user/58035b7cb4566c158bcecacf
				   $.ajax({
					    url:restfulURL+"/api/dqs_region/"+id,
					    type:"get",
					    dataType:"json",
					    success:function(data){
					      $("#region_name").val(data['region_name']);
						  $("#operation_id").val(data['operation_id']);
				    	}
				   });
			  };
		
			  var searchFn = function(searchText){
				   /* http://localhost:3000/api/products?name__regex=/^test/i */
				    
				   $.ajax({
				    url:restfulURL+"/api/dqs_region/?region_name__regex=/^"+searchText+"/i",
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
								   	  htmlTable+="<td>"+indexEntry["region_name"]+"</td>";
									  htmlTable+="<td>"+indexEntry["operation_id"]+"</td>";
								      htmlTable+="<td><i class=\"fa fa-gear font-management popover-del-edit\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-warning btn-xs edit' data-target=#ManagementModal data-toggle='modal' type='button' id="+indexEntry["_id"]+">Edit</button> <button class='btn btn-danger btn-xs del' type='button' id="+indexEntry["_id"]+">Delete</button>\"></i></td>"
								 htmlTable+="</tr>";
						   });
						
						   $("#listRegion").html(htmlTable);
						   
						  //popover 
						$(".popover-del-edit").popover();
						
						
						$(".popover-del-edit").click(function(){
							//findOnd
							$(".edit").on("click",function(){
								    findOneFn(this.id);
								    $("#id").val(this.id);
								    $("#action").val("edit");
								    $("#btnSubmit").val("Edit");
								});
							//delete
						   $(".del").click(function(){
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
				  	 });
				});
			}
			
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
		
			
			//DropDownList	Branch Operation 
			var dropDownListBranchOper = function(data){
				$.ajax ({
					url:restfulURL+"/api/dqs_branch_operation" ,
					type:"get" ,
					dataType:"json" ,
						success:function(data){
							var htmlTable="";
							$.each(data,function(index,indexEntry){
								
								htmlTable+="<option value="+indexEntry["operation_code"]+">"+indexEntry["operation_name"]+"</option>";		
							});	
							$("#listBranchOper").html(htmlTable);
						}
				});
			};
		
		//Call Function start
		  getDataFn();
		$("#btnSubmit").click(function(){
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

			   $("#btnAdd").click(function(){
					 clearFn();
					 dropDownListBranchOper();
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
