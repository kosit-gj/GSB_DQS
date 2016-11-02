$(document).ready(function(){

	var restfulURL = "http://192.168.1.100:3001";
	//var restfulURL = "http://goingjesse.hopto.org:3001";
	
	
	var checkUniqueFn = function(text) {
		/* http://localhost:3000/api/products?name__regex=/^test/i */
		var unique = false;
		$.ajax({
			url : restfulURL +"/api/dqs_branch?rule_name="+text+"",
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
			
		var checkboxInitial = "";
		var checkboxUpdate = "";
		var checkboxContact = "";
		var InformBranchRadio = "";
		var EditRuleRelease ="";
		
		if($("#checkboxInitial:checked").val()=="on"){
			checkboxInitial="1";
		}else{
			checkboxInitial="0";
		}
		
		if($("#checkboxUpdate:checked").val()=="on"){
			checkboxUpdate="1";
		}else{
			checkboxUpdate="0";
		}
		
		if($("#checkboxContact:checked").val()=="on"){
			checkboxContact="1";
		}else{
			checkboxContact="0";
		}
		
		if($("#InformBranchRadioTrue:checked").val()){
			InformBranchRadio="1";
		}else if($("#InformBranchRadioFalse:checked").val()){
			InformBranchRadio="0";
		}
		
		if($("#EditRuleReleaseTrue:checked").val()){
			EditRuleRelease="1";
		}else if($("#EditRuleReleaseFalse:checked").val()){
			EditRuleRelease="0";
		}
			
		$.ajax({
			
			url:restfulURL+"/api/dqs_branch",
			type : "POST",
			dataType : "json",
			data : {"rule_name" : $("#rule_name").val(),
					"rule_group" : $("#rule_group").val(),
					"data_flow_id" : $("#data_flow_id").val(),
					"initial_flag" : checkboxInitial,
					"update_flag" : checkboxUpdate,
					"last_contact_flag" : checkboxContact,
					"inform_flag" : InformBranchRadio,
					"edit_rule_release_flag" : EditRuleRelease
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
		
		var checkboxInitial = "";
		var checkboxUpdate = "";
		var checkboxContact = "";
		var InformBranchRadio = "";
		var EditRuleRelease ="";
		
		if($("#checkboxInitial:checked").val()=="on"){
			checkboxInitial="1";
		}else{
			checkboxInitial="0";
		}
		
		if($("#checkboxUpdate:checked").val()=="on"){
			checkboxUpdate="1";
		}else{
			checkboxUpdate="0";
		}
		
		if($("#checkboxContact:checked").val()=="on"){
			checkboxContact="1";
		}else{
			checkboxContact="0";
		}
		
		if($("#InformBranchRadioTrue:checked").val()){
			InformBranchRadio="1";
		}else if($("#InformBranchRadioFalse:checked").val()){
			InformBranchRadio="0";
		}
		
		if($("#EditRuleReleaseTrue:checked").val()){
			EditRuleRelease="1";
		}else if($("#EditRuleReleaseFalse:checked").val()){
			EditRuleRelease="0";
		}
		
		$.ajax({
			url:restfulURL+"/api/dqs_branch/"+$("#id").val(),
			type : "PUT",
			dataType : "json",
			data : {"rule_name" : $("#rule_name").val(),
				"rule_group" : $("#rule_group").val(),
				"data_flow_id" : $("#data_flow_id").val(),
				"initial_flag" : checkboxInitial,
				"update_flag" : checkboxUpdate,
				"last_contact_flag" : checkboxContact,
				"inform_flag" : InformBranchRadio,
				"edit_rule_release_flag" : EditRuleRelease
			},
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
			url:restfulURL+"/api/dqs_branch/"+ id,
			type : "get",
			dataType : "json",
			success : function(data) {
				
				$("#rule_name").val(data['rule_name']);
				$("#rule_group").val(data['rule_group']);
				$("#data_flow_id").val(data['data_flow_id']);	
	
				$('.processType').prop('checked', false);
				
				if(data['initial_flag']==1){
					$('#checkboxInitial').prop('checked', true);
				}
				
				if(data['update_flag']==1){
					$('#checkboxUpdate').prop('checked', true);
				}
				
				if(data['last_contact_flag']==1){
					$('#checkboxContact').prop('checked', true);
				}
				//inform Branch 
				if(data['inform_flag']==1){
					$('#InformBranchRadioTrue').prop('checked', true);
				}
				if(data['inform_flag']==0){
					$('#InformBranchRadioFalse').prop('checked', true);
				}
				//Edit Rule Release
				if(data['edit_rule_release_flag']==1){
					$('#EditRuleReleaseTrue').prop('checked', true);
				}
				if(data['edit_rule_release_flag']==0){
					$('#EditRuleReleaseFalse').prop('checked', true);
				}
				
			}
		});
	};
	
	var searchFn = function(searchText) {
		$.ajax({
			url : restfulURL + "/api/dqs_branch/?rule_name__regex=/^"+searchText+"/i",
			type : "get",
			dataType : "json",
			success : function(data) {
				listRuleFn(data);
			}
		});
	}

	var searchAdvanceFn = function(searchText) {
		$.ajax({
			url : restfulURL + "/api/dqs_branch/?rule_name__regex=/^"+searchText+"/i",
			type : "get",
			dataType : "json",
			success : function(data) {
				listRuleFn(data);
			}
		});
	}
	
	var dropdownCheckbox = function(id) {
		$.ajax({
			url : restfulURL + "/api/dqs_branch/?rule_name__regex=/^"+searchText+"/i",
			type : "get",
			dataType : "json",
			success : function(data) {
				listRuleFn(data);
			}
		});
	}
	
	
	var listRuleFn = function(data) {
		console.log(data);
		var htmlTable = "";
		//var close = $(indexEntry["close_flag"]);
		
		
		
		$.each(data,function(index,indexEntry) {
		htmlTable += "<tr>";
		//htmlTable += "<td>"+ (index + 1)+ "</td>";
		htmlTable += "<td>"+ indexEntry["brcd"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["desc"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["ccdef"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["region"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["dist"]+ "</td>";
		
		if(indexEntry["close_flag"]==1){
			htmlTable += "<td><input type='checkbox' checked='checked' value="+ indexEntry["close_flag"]+"></td>";
		}else if(indexEntry["close_flag"]==0){
			htmlTable += "<td><input type='checkbox' value="+ indexEntry["close_flag"]+"></td>";
		}	
		
		htmlTable += "</tr>";
		});
	
		$("#listBranch").html(htmlTable);
		
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
					 url:restfulURL+"/api/dqs_branch/"+ this.id,
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
			url : restfulURL + "/api/dqs_branch",
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
		searchFn($("#searchRule").val());
		   return false;
	});
	
	$("#btnSearchAdvance").click(function(){
		searchAdvanceFn($("#searchAdvanceRule").val());
		   return false;
	});
	
	
	
	
	$("#btnSubmit").click(function(){
		if (validationFn() == true) { 
			if ($("#action").val() == "add"|| $("#action").val() == "") {	
				
				
				
				if (checkUniqueFn($("#rule_name").val()) == true) { 
						
						insertFn();
					} else {
						alert("name is not unique.");
					}
				}else{
					if (checkUniqueFn($("#rule_name").val()) == true) {
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