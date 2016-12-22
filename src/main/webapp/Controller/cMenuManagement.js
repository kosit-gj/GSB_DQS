var insertFn = function(param){
    $.ajax({
	     url:restfulURL+"/dqs_api/public/dqs_menu",
     type:"POST",
     dataType:"json",
     data:{"menu_name":$("#menu_name").val(),"app_url":$("#app_url").val(),"menu_category":$(".menuCategory:checked").val()},
	 headers:{Authorization:"Bearer "+tokenID.token},
	 async:false,
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
			if(data['data']['menu_name']!=undefined){
				validate+="<font color='red'>*</font> "+data['data']['menu_name']+"<br>";
			}
			if(data['data']['app_url']!=undefined){
				validate+="<font color='red'>*</font> "+data['data']['app_url']+"<br>";
			}
			if(data['data']['menu_category']!=undefined){
				validate+="<font color='red'>*</font> "+data['data']['menu_category']+"<br>";
			}
			callFlashSlideInModal(validate,"#information","error");
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
		     if(data['status']=="200"){
		    
			    callFlashSlide("Update Successfully.");
			    $('#managementModal').modal('hide');
		        getDataFn();
		        clearFn();
     		}else if (data['status'] == "400") {
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
				callFlashSlideInModal(validate,"#information","error");
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
	   $("#modalTitleRole").html("Add New Menu");
	   $("#modalDescription").html("ADD NEW MENU");
		  

  }
var findOneFn = function(id){
	  
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
var listDataFn = function(data){

   var htmlTable="";
   $.each(data,function(index,indexEntry){
			       htmlTable+="<tr class='rowSearch'>";
				        htmlTable+="<td class='columnSearch'>"+(index+1)+"</td>";
				        htmlTable+="<td class='columnSearch' id=\"menuname-"+indexEntry["menu_id"]+"\"> "+indexEntry["menu_name"]+"</td>";
				     
				        htmlTable+="<td class='objectCenter'><i class=\"fa fa-group font-management btnAuthorize\" id="+indexEntry["menu_id"]+" data-target=\"#authorize\" data-toggle=\"modal\"></i></td>";
				       	
						htmlTable+="<td class='objectCenter'><i class=\"fa fa-gear font-management popover-del-edit\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-warning btn-xs edit btn-gear' data-target='#managementModal' data-toggle='modal' type='button' id="+indexEntry["menu_id"]+">Edit</button> <button class='btn btn-danger btn-xs del btn-gear' type='button' id="+indexEntry["menu_id"]+">Delete</button>\"></i></td>";
				   htmlTable+="</tr>";
	     });
	
	 $("#listMenu").html(htmlTable);
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
					
					if($(indexEntry).is(":checked")){
						
						roles.push($(indexEntry).val());
					}
				});
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
		
	//delete,edit
	$("#tableMenu").off("click",".popover-del-edit");
	$("#tableMenu").on("click",".popover-del-edit",function(){
			
	$(".del").click(function(){
		var id = this.id;
		$(this).parent().parent().parent().children().click();
		    
		$("#confrimModal").modal();
		$(document).off("click","#btnConfirmOK");
		$(document).on("click","#btnConfirmOK",function(){
		     $.ajax({
			      url:restfulURL+"/dqs_api/public/dqs_menu/"+id,
			      type:"delete",
			      dataType:"json",
				  headers:{Authorization:"Bearer "+tokenID.token},
			      success:function(data){  
				
					if(data['status']==200){
						
					   callFlashSlide("Delete Successfully.");    
				       getDataFn();
				       clearFn();
				 	   $("#confrimModal").modal('hide');
				 	   
					}else if(data['status']==400){
						
						callFlashSlide(data['data'],"error");
						 $("#confrimModal").modal('hide');
						   
					}
		
     			 }
     		});
		});	
   		 
   });

   //findOnd
   		$(".edit").click(function(){	
		    $("#modalTitleRole").html("Edit New Menu");
		    $("#modalDescription").html("EDIT NEW MENU");
		    findOneFn(this.id);
		    $("#id").val(this.id);
		    $("#action").val("edit");
		    $("#btnSubmit").val("Edit");
			$("#btnSaveAndAnother").hide();
			$(this).parent().parent().parent().children().click();
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
	
	   var htmlTable="";
	   $.each(data,function(index,indexEntry){
				       htmlTable+="<tr >";							
						if(indexEntry['menu_active']=="1"){
							htmlTable += "<td><input class=\"role\" name=\"role_id-"+indexEntry["role_id"]+"\" id=\"role_id-"+indexEntry["role_id"]+"\" checked='checked' type=\"checkbox\" value="+indexEntry["role_id"]+"></td>";
						}else{
							htmlTable += "<td><input class=\"role\" name=\"role_id-"+indexEntry["role_id"]+"\" id=\"role_id-"+indexEntry["role_id"]+"\" type=\"checkbox\" value="+indexEntry["role_id"]+"></td>";
							
						}
					        htmlTable+="<td>"+indexEntry["role_name"]+"</td>";
					
					   htmlTable+="</tr>";
		     });
		
		  $("#listRole").html(htmlTable);
	}
var getDataRoleFn = function(menu_id){
	
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
$(document).ready(function(){
				  
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
			
	$("#btnSaveAndAnother").click(function(){
		insertFn("saveAndAnother");
		
	});
	
	 $("#btnAdd").click(function(){
		 clearFn();
		 $("#btnSaveAndAnother").show();
	 });
	 
	 $("#btnSearch").click(function(){
		
		searchMultiFn($("#searchText").val());
		
	 });
	
	  $("#cancel").click(function(){
		   
		   clearFn();
		   return false;
	
	  });
	 //Call Function End
			  
});
