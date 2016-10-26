$(document).ready(function(){

	var restfulURL = "http://192.168.1.42:3001";
	
	var checkUniqueFn = function(text) {
		/* http://localhost:3000/api/products?name__regex=/^test/i */
		var unique = false;
		$.ajax({
			url : restfulURL +"/api/dqs_role?role_name="+text+"",
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
		$.ajax({
			
			url:restfulURL+"/api/dqs_role",
			type : "POST",
			dataType : "json",
			data : {"role_name" : $("#role_name").val()},
			success : function(data) {
				if (data = "success") {
					alert("Insert Success");
					getDataFn();
					clearFn();
					$('#addModalRole').modal('hide');
				}
			}
		});
		return false;
	};
	
	var updateFn = function() {
		$.ajax({
			url:restfulURL+"/api/dqs_role/"+$("#id").val(),
			type : "PUT",
			dataType : "json",
			data : {"role_name" : $("#role_name").val()},
			success : function(data) {
				if (data = "success") {
					alert("Upate Success");
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
	}
	
	var findOneFn = function(id) {
		// http://localhost:3000/find-user/58035b7cb4566c158bcecacf
		$.ajax({
			url:restfulURL+"/api/dqs_role/"+ id,
			type : "get",
			dataType : "json",
			success : function(data) {
				$("#role_name").val(data['role_name']);
			}
		});
	};
	
	var searchFn = function(searchText) {
		$.ajax({
			url : restfulURL + "/api/dqs_role/?role_name__regex=/^"+searchText+"/i",
			type : "get",
			dataType : "json",
			success : function(data) {
				listRoleFn(data);
			}
		});
	}
	
	var listMenuFn = function(data) {
		console.log(data);
		var htmlTable = "";
		
		$.each(data,function(index,indexEntry) {
		htmlTable += "<tr>";
		htmlTable += "<td><input type=\"checkbox\"></td>";
		htmlTable +="<td>"+indexEntry["menu_name"]+"</td>";
		htmlTable += "</tr>";
		});
	
		$("#listMenu").html(htmlTable);
	}
	
	var listRoleFn = function(data) {
		console.log(data);
		var htmlTable = "";
		
		$.each(data,function(index,indexEntry) {
		htmlTable += "<tr>";
		htmlTable += "<td>"+ (index + 1)+ "</td>";
		htmlTable += "<td>"+ indexEntry["role_name"]+ "</td>";
		htmlTable += "<td><i class=\"fa fa-paste font-setseeuser btnAuthorize\" data-target=\"#ModalRoleAuthorize\"  data-toggle=\"modal\"></i></td> ";
		htmlTable += "<td><i class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-warning btn-xs edit' id="+ indexEntry["_id"]+ " data-target=#addModalRole data-toggle='modal'>Edit</button>&nbsp;<button id="+indexEntry["_id"]+" class='btn btn-danger btn-xs del'>Delete</button>\"></i></td>";
		htmlTable += "</tr>";
		});
	
		$("#listRole").html(htmlTable);
		
		//getMenu
		$(".btnAuthorize").click(function(){
			getListMenuFn(); 	
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
			});
			
			$(".del").click(function(){
			
				$.ajax({
					 url:restfulURL+"/api/dqs_role/"+ this.id,
					 type : "delete",
					 dataType:"json",
				     success:function(data){      
				       
				       getDataFn();
				       clearFn();
	
					 }
				});
			});	
			
		});
		
		
			
	};
	
	
	var getDataFn = function() {
		$.ajax({
			url : restfulURL + "/api/dqs_role",
			type : "get",
			dataType : "json",
			success : function(data) {
				listRoleFn(data);
				console.log(data);
			}
		});
	};
	//Call Function start
	  getDataFn();
	 
	var getListMenuFn = function() {
		$.ajax({
			url : restfulURL + "/api/dqs_menu",
			type : "get",
			dataType : "json",
			success : function(data) {
				listMenuFn(data);
				console.log(data);
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
				if (checkUniqueFn($("#role_name").val()) == true) {
					insertFn();
				} else {
					alert("name is not unique.");
				}
			}else{
				if (checkUniqueFn($("#role_name").val()) == true) {
					updateFn();
				} else {
					alert("name is not unique.");
				}
			}
		}
		return false;
	});
	
	$(".btnCancle").click(function() {
		clearFn();
	});
		
});