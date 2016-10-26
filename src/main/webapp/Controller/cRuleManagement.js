$(document).ready(function(){

	var restfulURL = "http://192.168.1.42:3001";
	
	var checkUniqueFn = function(text) {
		/* http://localhost:3000/api/products?name__regex=/^test/i */
		var unique = false;
		$.ajax({
			url : restfulURL +"/api/dqs_rule?rule_name="+text+"",
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
		if ($("#rule_name").val()=="") {
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
			
			url:restfulURL+"/api/dqs_rule",
			type : "POST",
			dataType : "json",
			data : {"rule_name" : $("#rule_name").val(),
					"rule_group" : $("#rule_group").val(),
					"data_flow_id" : $("#data_flow_id").val(),
					"initial_flag" : $("#initial_flag").val(),
					"update_flag" : $("#update_flag").val(),
					"last_contact_flag" : $("#last_contact_flag").val(),
					"inform_flag" : $("#inform_flag").val(),
					"edit_rule_release_flag" : $("#edit_rule_release_flag").val(),
					
					
			},
			success : function(data) {
				if (data = "success") {
					alert("Insert Success");
					getDataFn();
					clearFn();
					$('#addModalRule').modal('hide');
				}
			}
		});
		return false;
	};
	
	var updateFn = function() {
		$.ajax({
			url:restfulURL+"/api/dqs_rule/"+$("#id").val(),
			type : "PUT",
			dataType : "json",
			data : {"rule_name" : $("#rule_name").val()},
			success : function(data) {
				if (data = "success") {
					alert("Upate Success");
					getDataFn();
					clearFn();
					$('#addModalRule').modal('hide');
				}
			}
		});
		return false;
	};
	
	var clearFn = function() {
		$("#id").val("");
		$("#action").val("add");
		$("#rule_name").val("");
		$("#btnSubmit").val("Add");
	}
	
	var findOneFn = function(id) {
		// http://localhost:3000/find-user/58035b7cb4566c158bcecacf
		$.ajax({
			url:restfulURL+"/api/dqs_rule/"+ id,
			type : "get",
			dataType : "json",
			success : function(data) {
				$("#rule_name").val(data['rule_name']);
			}
		});
	};
	
	var searchFn = function(searchText) {
		$.ajax({
			url : restfulURL + "/api/dqs_rule/?rule_name__regex=/^"+searchText+"/i",
			type : "get",
			dataType : "json",
			success : function(data) {
				listRoleFn(data);
			}
		});
	}
	
	var listRuleFn = function(data) {
		console.log(data);
		var htmlTable = "";
		
		$.each(data,function(index,indexEntry) {
		htmlTable += "<tr>";
		htmlTable += "<td>"+ (index + 1)+ "</td>";
		htmlTable += "<td>"+ indexEntry["rule_name"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["data_flow_id"]+ "</td>";
		
		if(indexEntry["initial_flag"]==1){
			htmlTable += "<td><input type='checkbox' checked='checked' value="+ indexEntry["initial_flag"]+"></td>";
		}else if(indexEntry["initial_flag"]==0){
			htmlTable += "<td><input type='checkbox' value="+ indexEntry["initial_flag"]+"></td>";
		}
		
		if(indexEntry["update_flag"]==1){
			htmlTable += "<td><input type='checkbox' checked='checked' value="+ indexEntry["initial_flag"]+"></td>";
		}else if(indexEntry["initial_flag"]==0){
			htmlTable += "<td><input type='checkbox' value="+ indexEntry["initial_flag"]+"></td>";
		}
		
		if(indexEntry["last_contact_flag"]==1){
			htmlTable += "<td><input type='checkbox' disabled='disabled' checked='checked' value="+ indexEntry["initial_flag"]+"></td>";
		}else if(indexEntry["initial_flag"]==0){
			htmlTable += "<td><input type='checkbox' value="+ indexEntry["initial_flag"]+"></td>";
		}
		
		if(indexEntry["inform_flag"]==1){
			htmlTable += "<td><input type='checkbox' checked='checked' value="+ indexEntry["initial_flag"]+"></td>";
		}else if(indexEntry["initial_flag"]==0){
			htmlTable += "<td><input type='checkbox' value="+ indexEntry["initial_flag"]+"></td>";
		}
		
		if(indexEntry["edit_rule_release_flag"]==1){
			htmlTable += "<td><input type='checkbox' checked='checked' value="+ indexEntry["initial_flag"]+"></td>";
		}else if(indexEntry["initial_flag"]==0){
			htmlTable += "<td><input type='checkbox' value="+ indexEntry["initial_flag"]+"></td>";
		}

		htmlTable += "<td><i class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-warning btn-xs edit' id="+ indexEntry["_id"]+ " data-target=#addModalRule data-toggle='modal'>Edit</button>&nbsp;<button id="+indexEntry["_id"]+" class='btn btn-danger btn-xs del'>Delete</button>\"></i></td>";
		htmlTable += "</tr>";
		});
	
		$("#listRule").html(htmlTable);
		
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
					 url:restfulURL+"/api/dqs_rule/"+ this.id,
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
			url : restfulURL + "/api/dqs_rule",
			type : "get",
			dataType : "json",
			success : function(data) {
				listRuleFn(data);
				console.log(data);
			}
		});
	};
	//Call Function start
	  getDataFn();
	 
	
	
	$("#btnSearch").click(function(){
		searchFn($("#searchText").val());
		   return false;
	});
	
	$("#btnSubmit").click(function(){
		if (validationFn() == true) {
			if ($("#action").val() == "add"|| $("#action").val() == "") {
				if (checkboxInitial.checked == true){
				alert("555");}
			/*if (checkUniqueFn($("#rule_name").val()) == true) { 
					
					insertFn();
				} else {
					alert("name is not unique.");
				}*/
			}else{
				if (checkUniqueFn($("#rule_name").val()) == true) {
					updateFn();
				} else {
					alert("name is not unique.");
				}
			}
			
			
			/*function testCheckbox(oCheckbox)
			{
			    var checkbox_val = oCheckbox.value;
			    if (oCheckbox.checked == true)
			    {
			        alert("Checkbox with name = " + oCheckbox.name + " and value =" +
			                checkbox_val + " is checked");
			    }
			    else
			    {
			        alert("Checkbox with name = " + oCheckbox.name + " and value =" +
			              checkbox_val + " is not checked");
			    }
			}*/
		}
		return false;
	});
	
	$(".btnCancle").click(function() {
		clearFn();
	});
		
});