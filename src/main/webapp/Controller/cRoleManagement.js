$(document).ready(function(){
	
	var validationFn = function() {
		var validateText = "";
		if ($("#role_name").val()=="") {
			validateText += "name not empty\n";
		}
		if (validateText != "") {
			alert(validateText);
			return false;
		} else {
			return true;
		}
	
	}
	
	var insertFn = function(param) {
		
		//alert($("#authority_checkbox_role").val());
		var authority_checkbox_role="";
		var all_brach_checkbox_role="";
		if($("#authority_checkbox_role").is(':checked')){
			authority_checkbox_role="1";
		}else{
			authority_checkbox_role="0";
		}
		if($("#all_brach_checkbox_role").is(':checked')){
			all_brach_checkbox_role="1";
		}else{
			all_brach_checkbox_role="0";
		}
		
		
	
		$.ajax({
			
			url:restfulURL+"/dqs_api/public/dqs_role",
			type : "POST",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			data : {"role_name" : $("#role_name").val(),authority_flag:authority_checkbox_role,all_branch_flag:all_brach_checkbox_role},
			async:false,
			success : function(data) {
				console.log(data);
				//console.log(data['data']);
				if (data['status'] == "200") {
					
					if(param!="saveAndAnother"){
						$('#addModalRole').modal('hide');
						clearFn();
						getDataFn();
						callFlashSlide("Insert Successfully.");	
						
					}else{
						
						clearFn();
						getDataFn();
						callFlashSlideInModal("Insert Data is Successfully.","#information");
						
					}
				}else if (data['status'] == 400) {
					callFlashSlideInModal(data['data']['role_name'],"#information","error");
				}
			}
		});
		return false;
	};
	
	var updateFn = function() {
		
		var authority_checkbox_role="";
		var all_brach_checkbox_role="";
		if($("#authority_checkbox_role").is(':checked')){
			authority_checkbox_role="1";
		}else{
			authority_checkbox_role="0";
		}
		if($("#all_brach_checkbox_role").is(':checked')){
			all_brach_checkbox_role="1";
		}else{
			all_brach_checkbox_role="0";
		}
		
		
		$.ajax({
			url:restfulURL+"/dqs_api/public/dqs_role/"+$("#id").val(),
			type : "PATCH",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			data : {"role_name" : $("#role_name").val(),authority_flag:authority_checkbox_role,all_branch_flag:all_brach_checkbox_role},
			success : function(data) {
				
				if (data['status']== "200") {	
					callFlashSlide("Update Successfully.");
					getDataFn();
					clearFn();
					$('#addModalRole').modal('hide');
					
				}else if (data['status'] == 400) {
					callFlashSlideInModal(data['data']['role_name'],"#information","error");
				}
			}
		});
		return false;
	};
	
	var clearFn = function() {
		$("#id").val("");
		$("#action").val("add");
		$("#role_name").val("");
		$("#btnSubmit").val("Add");
		$("#modalTitleRole").html("Add New Role");
		$("#modalDescription").html("ADD NEW ROLE");
		$(".information").hide();
		
	}
	
	var findOneFn = function(id) {
		
		$.ajax({
			url:restfulURL+"/dqs_api/public/dqs_role/"+ id,
			type : "get",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			success : function(data) {
				
				$("#role_name").val(data['role_name']);	
				if(data['authority_flag']==1){
					
					$("#authority_checkbox_role").prop("checked",true);
					
				}else{
					$("#authority_checkbox_role").prop("checked",false);
					
				}
				
				if(data['all_branch_flag']==1){
					
					$("#all_brach_checkbox_role").prop("checked",true);
				}else{
					
					$("#all_brach_checkbox_role").prop("checked",false);
				}
				
				$("#modalTitleRole").html("Edit Role");
				$("#modalDescription").html("EDIT ROLE");
				
				
				
			}
		});
	};
	
	var searchFn_bk = function(searchText) {
		$.ajax({
			url : restfulURL + "/dqs_api/public/dqs_role/?role_name__regex=/^"+searchText+"/i",
			type : "get",
			dataType : "json",
			success : function(data) {
				listRoleFn(data);
			}
		});
	}
	
	var listMenuFn = function(data) {
		//console.log(data);
		var htmlTable = "";
		
		$.each(data,function(index,indexEntry) {
		htmlTable += "<tr>";
		
		if(indexEntry['role_active']=="1"){
			htmlTable += "<td><input class=\"menu\" name=\"menu_id-"+indexEntry["menu_id"]+"\" id=\"menu_id-"+indexEntry["menu_id"]+"\" type=\"checkbox\" checked='checked' value="+indexEntry["menu_id"]+"></td>";
		}else{
			htmlTable += "<td><input class=\"menu\" name=\"menu_id-"+indexEntry["menu_id"]+"\" id=\"menu_id-"+indexEntry["menu_id"]+"\" type=\"checkbox\" value="+indexEntry["menu_id"]+"></td>";
		}
		
		htmlTable +="<td>"+indexEntry["menu_name"]+"</td>";
		htmlTable += "</tr>";
		});
	
		$("#listMenu").html(htmlTable);
		
	}

	var listRoleFn = function(data) {
		//console.log(data);
		
		if ( $.fn.DataTable.isDataTable('#tableRole')) {
		      $('#tableRole').DataTable().destroy();
		     }
		
		var htmlTable = "";
		
		$.each(data,function(index,indexEntry) {
		htmlTable += "<tr class='rowSearch'>";
		htmlTable += "<td class='columnSearch'>"+ (index + 1)+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["role_name"]+ "</td>";
		htmlTable += "<td class='columnSearch objectCenter'><i class=\"fa fa-group font-setseeuser btnAuthorize\" data-target=\"#ModalRoleAuthorize\"  data-toggle=\"modal\" id="+indexEntry["role_id"]+"></i></td> ";
		htmlTable += "<td class='columnSearch objectCenter'><i id=\"popover-edit-del-"+indexEntry["role_id"]+"\" class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\"   data-placement=\"top\" data-content=\"<button class='btn btn-warning btn-xs btn-gear edit' id="+ indexEntry["role_id"]+ " data-target=#addModalRole data-toggle='modal'>Edit</button>&nbsp;<button id="+indexEntry["role_id"]+" class='btn btn-danger btn-xs btn-gear del' >Delete</button>\"></i></td>";
		htmlTable += "</tr>";
		});
	
		$("#listRole").html(htmlTable);
		 $("#tableRole_wrapper").click(function(){
			 $(".popover-edit-del").popover();
		 });
	
		
		//getMenu
		$(".btnAuthorize").click(function(){
			getListMenuFn(this.id); 
			$("#label-name-role").html($(this).parent().prev().text());
			$("#role_id").val(this.id);
			
			$("#btnSaveAuthorize").off("click");
			$("#btnSaveAuthorize").on("click",function(){
				var menus = [];
				$.each($(".menu").get(),function(index,indexEntry){
					if($(indexEntry).is(":checked")){
						menus.push($(indexEntry).val());
					}
					
					
				});
				
					$.ajax({
						url : restfulURL + "/dqs_api/public/dqs_role/"+$("#role_id").val()+"/authorize",
						type : "post",
						dataType : "json",
						headers:{Authorization:"Bearer "+tokenID.token},
						async:false,
						data:{"menus":menus},
						success : function(data) {
							
							
							if(data['status']==200){
								callFlashSlide("Authorize Successfully.");
								$('#ModalRoleAuthorize').modal('hide');
								
							}
						}
					});
					
					
			
			});
				
			
		});
		//function popover
		$(".popover-edit-del").popover();
		
	
		//findOnd
		$("#tableRole").off("click",".popover-edit-del");
		$("#tableRole").on("click",".popover-edit-del",function(){
			//$("#tableRole").on("click",".edit",function(){
			
			$(".edit").on("click",function() {
				//$(this).parent().parent().parent().children().click();
				$("#btnSaveAndAnother").hide();
				findOneFn(this.id);
				$("#id").val(this.id);
				$("#action").val("edit");
				$("#btnSubmit").val("Edit");
				$("#popover-edit-del-"+this.id).click();
				
				
			});
			
			
			$(".del").on("click",function(){
				$(this).parent().parent().parent().children().click();
				var id = this.id;
				
				$("#confrimModal").modal();
				$(document).off("click","#btnConfirmOK");
				$(document).on("click","#btnConfirmOK",function(){
					
					// content start
						$.ajax({
							 url:restfulURL+"/dqs_api/public/dqs_role/"+ id,
							 type : "delete",
							 dataType:"json",
							 headers:{Authorization:"Bearer "+tokenID.token},
							 async:false,
						     success:function(data){      

						    	if(data['status']==200){
						    		 callFlashSlide("Delete Successfully.");
						    		 getDataFn();
								     clearFn();
								     $("#confrimModal").modal('hide');
								    // $("#popover-edit-del-"+id).click();
						    	}else if(data['status']=="400"){
						    		 callFlashSlide(data['data'],"error");
						    		 $("#confrimModal").modal('hide');
						    		// $("#popover-edit-del-"+id).click();
						    	}
						    	
							 }
						});
					// content end
				});
				
					

				
				
			});
			
		});
		
		
	};
	
	
	var getDataFn = function() {
		$.ajax({
			url : restfulURL + "/dqs_api/public/dqs_role",
			type : "get",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			success : function(data) {
				listRoleFn(data);
			}
		});
	};
	//Call Function start
	  getDataFn();
	 
	var getListMenuFn = function(role_id) {
		$.ajax({
			url : restfulURL + "/dqs_api/public/dqs_role/"+role_id+"/authorize",
			type : "get",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			success : function(data) {
				listMenuFn(data);
			}
		});
	};
	
	$("#btnSearch").click(function(){
		searchMultiFn($("#searchText").val());
		   return false;
	});
	
	$("#btnSubmit").click(function(){
		
		if ($("#action").val() == "add"|| $("#action").val() == "") {
			insertFn();
		}else{
			updateFn();
		}
		return false;
	});
	
	$("#btnSaveAndAnother").click(function(){
		insertFn("saveAndAnother");
	});
	
	$(".btnCancle").click(function() {
		clearFn();
	});
	$("#btnAddRole").click(function() {
		$("#btnSaveAndAnother").show();
	});
	
});