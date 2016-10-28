$(document).ready(
	function(){

		var restfulURL = "http://192.168.1.42:3001";
		
		 var checkUniqueFn = function(text){
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
		 		};
				

		 var updateFn = function(){
					
				   $.ajax({
					    url:restfulURL+"/api/dqs_user/"+$("#id").val(),
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
					    url:restfulURL+"/api/dqs_user/"+id,
					    type:"get",
					    dataType:"json",
					    success:function(data){
					      $("#grade").val(data['grade']);
						  $("#grade_name").val(data['grade_name']);
					      $("#process_seq").val(data['process_seq']);
				    	}
				   });
			  };
		
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
						   $.each(data,function(index,indexEntry){
						    //console.log(indexEntry);
							     htmlTable+="<tr >";
								     /* htmlTable+="<td>"+(index+1)+"</td>";*/
								      htmlTable+="<td>"+indexEntry["user_name"]+"</td>";
								      htmlTable+="<td>"+indexEntry["position"]+"</td>";
								   	  htmlTable+="<td>"+indexEntry["own_cost_center"]+"</td>";
									  htmlTable+="<td>"+indexEntry["revised_cost_center"]+"</td>";
									  htmlTable+="<td>"+indexEntry["role_id"]+" </td>";
									  htmlTable+="<td><select class=\"form-control input-inline-table input-contact-selecttype\"><option>"+indexEntry["super_flag"]+"</option><option></option></select></td>";
								htmlTable+="</tr>";
						   });
						
						   $("#listUser").html(htmlTable);
						   
						   
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
							      url:restfulURL+"/api/dqs_user/"+this.id,
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
					    url:restfulURL+"/api/dqs_user",
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


