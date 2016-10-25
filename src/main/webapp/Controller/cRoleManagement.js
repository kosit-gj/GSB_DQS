$(document).ready(
	function(){

		var restfulURL = "http://192.168.1.42:3000";

		var insertFn = function() {
			$.ajax({
				url : restfulURL + "/insert-role",
				type : "POST",
				dataType : "json",
				data : {"role_name" : $("#role_name").val()},
				success : function(data) {
					if (data = "success") {
						alert("Insert Success");
						listRoleFn();
						clearFn();
						$('#addModalRole').modal('hide');
					}
				}
			});
			return false;
		};

		var updateFn = function() {
			$.ajax({
				url : restfulURL + "/update-role",
				type : "PUT",
				dataType : "json",
				data : {"id" : $("#id").val(),
						"role_name" : $("#role_name_edit").val()},
				success : function(data) {
					if (data = "success") {
						alert("Upate Success");
						listRoleFn();
						clearFn();
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
				url : restfulURL + "/find-role/" + id,
				type : "get",
				dataType : "json",
				success : function(data) {
					$("#role_name_edit").val(data['role_name']);
				}
			});
		};

		var listRoleFn = function() {
			$.ajax({
				url : restfulURL + "/get-role",
				type : "get",
				dataType : "json",
				success : function(data) {
					console.log(data[0]);
					var htmlTable = "";
					$.each(data,function(index,indexEntry) {
					htmlTable += "<tr>";
					htmlTable += "<td>"+ (index + 1)+ "</td>";
					htmlTable += "<td>"+ indexEntry["role_name"]+ "</td>";
						/*
						 * htmlTable+="<td><button
						 * id="+indexEntry["_id"]+"
						 * class=\"edit\">Edit</button>
						 * &nbsp; <button
						 * id="+indexEntry["_id"]+"
						 * class=\"del\">Del</button></td>";
						 */
					htmlTable += "<td><i class='fa fa-paste font-setseeuser' data-target='#ModalRoleAuthorize' data-toggle='modal'></i></td> ";
					htmlTable += "<td><i class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-warning btn-xs edit' id="+ indexEntry["_id"]+ " data-target=#editModalRole data-toggle='modal'>Edit</button>&nbsp;<button id="+indexEntry["_id"]+" class='btn btn-danger btn-xs del'>Delete</button>\"></i></td>";
					htmlTable += "</tr>";});

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
						
						$(".del").click(function() {
							alert("del");
							$.ajax({
								url : restfulURL+ "/del-role/"+ this.id,type : "get",dataType : "json",
								success : function(data) {
									console.log(data["ok"]);
									console.log(data["n"]);
									if (data["ok"] == 1&& data["n"] == 1) {
										// alert("del");
										// success");
										listRoleFn();
									}
								}
							});
						});
						
					});
					
				}
			});

		};
		listRoleFn();

		$("#btnSubmit").click(function() {
			if ($("#action").val() == "add"|| $("#action").val() == "") {
				insertFn();
			}else{
				return false;
			}
		});
		
		$("#btnSubmitEdit").click(function() {
			if ($("#action").val() == "edit") {
				updateFn();
			}else{
				return false;
			}
		});

		$("#btnCancle").click(function() {
			clearFn();
			return false;
	});
});