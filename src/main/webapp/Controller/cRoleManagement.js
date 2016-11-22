


$(document).ready(function(){

	
	var checkUniqueFn = function(text) {
		/* http://localhost:3000/dqs_api/public/products?name__regex=/^test/i */
		var unique = false;
		$.ajax({
			url : restfulURL +"/dqs_api/public/dqs_role?role_name="+text.trim()+"",
			type : "get",
			dataType : "json",
			async : false,
			success : function(data) {
				console.log(data);
				if(data == ""){
					unique = true;
				}else{
					unique = false;
				}
			}
		});
		return unique;
	}
	
	
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
	
	var insertFn = function() {
		
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
		//alert(all_brach_checkbox_role);
		//alert(authority_checkbox_role);
		
	
		$.ajax({
			
			url:restfulURL+"/dqs_api/public/dqs_role",
			type : "POST",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			data : {"role_name" : $("#role_name").val(),authority_flag:authority_checkbox_role,all_branch_flag:all_brach_checkbox_role},
			async:false,
			success : function(data) {
				console.log(data);
				console.log(data['data']);
				if (status = "200") {
					
					callFlashSlide("Insert Successfully.");
					
					getDataFn();
					//listRoleFn(data['data']);
			
					clearFn();
					$('#addModalRole').modal('hide');
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
				
				if (status = "200") {
					callFlashSlide("Update Successfully.");
					getDataFn();
					clearFn();
					$('#addModalRole').modal('hide');
					
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
		$(".modal-title").html("Add New Role");
		//$(".popover-edit-del").click();
		
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
				
				$(".modal-title").html("Edit Role");
				
				
				
			}
		});
	};
	
	var searchFn = function(searchText) {
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
		htmlTable += "<tr>";
		htmlTable += "<td>"+ (index + 1)+ "</td>";
		htmlTable += "<td>"+ indexEntry["role_name"]+ "</td>";
		htmlTable += "<td><i class=\"fa fa-paste font-setseeuser btnAuthorize\" data-target=\"#ModalRoleAuthorize\"  data-toggle=\"modal\" id="+indexEntry["role_id"]+"></i></td> ";
		htmlTable += "<td><i id=\"popover-edit-del-"+indexEntry["role_id"]+"\" class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\"   data-placement=\"top\" data-content=\"<button class='btn btn-warning btn-xs edit' id="+ indexEntry["role_id"]+ " data-target=#addModalRole data-toggle='modal'>Edit</button>&nbsp;<button id="+indexEntry["role_id"]+" class='btn btn-danger btn-xs del'>Delete</button>\"></i></td>";
		htmlTable += "</tr>";
		});
	
		$("#listRole").html(htmlTable);
		
		 $('#tableRole').DataTable( { "dom": '<"top"lp>rt<"bottom"lp><"clear">' } ); 
		
		//getMenu
		$(".btnAuthorize").click(function(){
			getListMenuFn(this.id); 
			$("#label-name-role").html($(this).parent().prev().text());
			$("#role_id").val(this.id);
			
			$("#btnSaveAuthorize").on("click",function(){
				var menus = [];
				$.each($(".menu").get(),function(index,indexEntry){
					//console.log(indexEntry);
					if($(indexEntry).is(":checked")){
						//console.log($(indexEntry).val());
						menus.push($(indexEntry).val());
					}
					
					
				});
				//console.log(menus);
				
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
					
					
			$("#btnSaveAuthorize").off("click");
			});
			//$("#btnSaveAuthorize").off("click");
			
			
		});
		//function popover
		$(".popover-edit-del").popover();
	
		//findOnd
		$(".popover-edit-del").click(function(){
			$(".edit").on("click",function() {
				
				findOneFn(this.id);
				$("#id").val(this.id);
				$("#action").val("edit");
				$("#btnSubmit").val("Edit");
				$("#popover-edit-del-"+this.id).click();
			});
			
			$(".del").click(function(){
			
				$.ajax({
					 url:restfulURL+"/dqs_api/public/dqs_role/"+ this.id,
					 type : "delete",
					 dataType:"json",
					 headers:{Authorization:"Bearer "+tokenID.token},
				     success:function(data){      
				       
				    	if(data['status']==200){
				    		
				    		 callFlashSlide("Delete Successfully.");
				    		 getDataFn();
						     clearFn();
						     $("#popover-edit-del-"+this.id).click();
				    	}
				      
	
					 }
				});
			});	
			
		});
		
		
			
	};
	
	
	var getDataFn = function() {
		//http://192.168.1.58/dqs_api/public/dqs_role
		$.ajax({
			url : restfulURL + "/dqs_api/public/dqs_role",
			type : "get",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			success : function(data) {
				listRoleFn(data);
				//console.log(data);
			}
		});
	};
	//Call Function start
	  getDataFn();
	 
	var getListMenuFn = function(role_id) {
		//http://192.168.1.58/dqs_api/public/dqs_role/2/authorize
		$.ajax({
			url : restfulURL + "/dqs_api/public/dqs_role/"+role_id+"/authorize",
			type : "get",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			success : function(data) {
				listMenuFn(data);
				//console.log(data);
			}
		});
	};
	/*getListMenuFn();*/
	
	
	$("#btnSearch").click(function(){
		searchFn($("#searchText").val());
		   return false;
	});
	
	
	
	$("#btnSubmit").click(function(){
		if (validationFn() == true) {
			if ($("#action").val() == "add"|| $("#action").val() == "") {
				//if (checkUniqueFn($("#role_name").val()) == true) {
					insertFn();
				//} else {
					//alert("name is not unique.");
				//}
			}else{
				//if (checkUniqueFn($("#role_name").val()) == true) {
					updateFn();
				//} else {
					//alert("name is not unique.");
				//}
			}
		}
		return false;
	});
	
	$(".btnCancle").click(function() {
		clearFn();
	});
		
});