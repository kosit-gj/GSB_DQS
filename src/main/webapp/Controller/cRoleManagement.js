$(document).ready(
	function(){

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
						//alert("data empty");
						unique = true;
					}else{
						unique = false;
						//alert("full data");
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
			/*if ($("#role_name_edit").val()=="") {
				validateText += "name not empty\n";
			}*/
			/*
			 * if($("#sku").val()==""){ validateText+="sku not
			 * empty\n"; } if($("#price").val()==""){
			 * validateText+="price not empty\n"; }
			 * 
			 * if(isNaN($("#price").val())) { validateText+="price
			 * is number only\n";
			 *  }
			 */

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
						/*$('#addModalRole').modal('hide');*/
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
						/*$('#editModalRole').modal('hide');*/
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
		
		/*var clearEditFn = function() {
			$("#id").val("");
			$("#action").val("add");
			$("#role_name_edit").val("");
			$("#btnSubmit").val("Add");
			$('#editModalRole').modal('hide');
		}*/

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

		var listRoleFn = function(data) {
			/*$.ajax({
				url : restfulURL + "/get-role",
				type : "get",
				dataType : "json",
				success : function(data) {*/
					console.log(data);
					var htmlTable = "";
					
					$.each(data,function(index,indexEntry) {
					htmlTable += "<tr>";
					htmlTable += "<td>"+ (index + 1)+ "</td>";
					htmlTable += "<td>"+ indexEntry["role_name"]+ "</td>";
					htmlTable += "<td><i class=\"fa fa-paste font-setseeuser\" data-target=\"#ModalRoleAuthorize\" data-toggle=\"modal\"></i></td> ";
					htmlTable += "<td><i class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-warning btn-xs edit' id="+ indexEntry["_id"]+ " data-target=#addModalRole data-toggle='modal'>Edit</button>&nbsp;<button id="+indexEntry["_id"]+" class='btn btn-danger btn-xs del'>Delete</button>\"></i></td>";
					htmlTable += "</tr>";
					});

					$("#listRole").html(htmlTable);

					//function popover
					$(".popover-edit-del").popover();

					//findOnd
					$(".popover-edit-del").click(function(){
						$(".edit").on("click",function() {
							// alert("edit");
							findOneFn(this.id);
							$("#id").val(this.id);
							$("#action").val("edit");
							$("#btnSubmit").val("Edit");
						});
						
						$(".del").click(function(){
							alert("del");
							$.ajax({
								 url:restfulURL+"/api/dqs_role/"+ this.id,
								 type : "delete",
								 dataType:"json",
							      //data:{"_id":this.id},
							      success:function(data){       
							       
							       getDataFn();
							       clearFn();
							       /* dataType : "json",
								 	success : function(data) {
									console.log(data["ok"]);
									console.log(data["n"]);
									if (data["ok"] == 1&& data["n"] == 1) {
										// alert("del");
										// success");
										getDataFn();*/
									}
								}
							/*}*/);
						});
						
					});
					
			/*	}
			});*/

		};
		//listRoleFn();
		
		/*$("#keySearch").keyup(function(){
			var nameSearch = $(this).val();  
		    if(nameSearch != ''){
		    	listRoleFn();
		    }
		    	
		});*/
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
			/*alert("get");*/
		};
		//Call Function start
		  getDataFn();

		/*$("#btnSubmit").click(function() { //alert($("#role_name").val());
			if(validationFn()==true){
				if(checkUniqueFn($("#role_name").val())==true){
					insertFn();
				}else{
					alert("name is not unique.");
				}
				return false;
			}
		});*/
		$("#btnSubmit").click(
			function(){
				if (validationFn() == true) {
				if ($("#action").val() == "add"|| $("#action").val() == "") {
					if (checkUniqueFn($("#name").val()) == true) {
						insertFn();
					} else {
						alert("name is not unique.");
					}
				}else{
					updateFn();
				}
			}
			return false;
		});
		
		/*$("#btnSubmitEdit").click(function() {	
			if(validationFn()==true){
				if(checkUniqueFn($("#role_name_edit").val())==true){
					updateFn();
				}else{
					alert("name is not unique.");
				}
				return false;
			}
		});*/

		$("#btnCancle").click(function() {
			clearFn();
			return false;
		});
		
		/*$("#btnCancleEdit").click(function() {
			clearEditFn();
			return false;
		});*/
});