$(document).ready(function(){

	var restfulURL = "http://192.168.1.52:3001";
	//var restfulURL = "http://goingjesse.hopto.org:3001";
	
	
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
			
		var checkboxInitial = "";
		var checkboxUpdate = "";
		var checkboxContact = "";
		var InformBranchRadio = "";
		var EditRuleRelease ="";
		var RuleGroup="";
		
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
		//แก้ไข Inform
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
		
		if ($("#rule_group_id").val() == "Cleansing"){
			RuleGroup = 1
		}
		else if ($("#rule_group_id").val() == "Matching"){
			RuleGroup = 2
		}
			
		$.ajax({
			
			url:restfulURL+"/api/dqs_rule",
			type : "POST",
			dataType : "json",
			data : {"rule_name" : $("#rule_name").val(),
					"rule_group" :RuleGroup,
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
		var RuleGroup ="";
		
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
		
		if ($("#rule_group_id").val() == "Cleansing"){
			RuleGroup = 1
		}
		else if ($("#rule_group_id").val() == "Matching"){
			RuleGroup = 2
		}
		
		$.ajax({
			url:restfulURL+"/api/dqs_rule/"+$("#id").val(),
			type : "PUT",
			dataType : "json",
			data : {"rule_name" : $("#rule_name").val(),
				"rule_group" : RuleGroup,
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
			url:restfulURL+"/api/dqs_rule/"+ id,
			type : "get",
			dataType : "json",
			success : function(data) {
				
				$("#rule_name").val(data['rule_name']);
				
				dropdownRuleGroup(data['rule_group']);
				
				//alert(data['data_flow_id']);
				dropdownDataFlow(data['data_flow_id']);
				
				
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
	
	/*var searchFn = function(searchText) {
		$.ajax({
			url : restfulURL + "/api/dqs_rule/?rule_name__regex=/^"+searchText+"/i",
			type : "get",
			dataType : "json",
			success : function(data) {
				listRuleFn(data);
			}
		});
	}*/

	var searchAdvanceFn = function(searchText,searchDropdown) {
		$.ajax({
			url : restfulURL + "/api/dqs_rule/?rule_name__regex=/^TESTTT/i&rule_group__regex=/^2/i",
			type : "get",
			dataType : "json",
			success : function(data) {
				listRuleFn(data);
			}
		});
	}
	
	var listRuleFn = function(data) {
		
		if ($.fn.DataTable.isDataTable('#tableRule')) {
		       $('#tableRule').DataTable().destroy(); 
		}
		
		console.log(data);
		var htmlTable = "";
		
		$.each(data,function(index,indexEntry) {
		htmlTable += "<tr>";
		//htmlTable += "<td>"+ (index + 1)+ "</td>";
		if(indexEntry["rule_group"]==1){
			htmlTable += "<td>Cleansing</td>";
		}else if(indexEntry["rule_group"]==2){
			htmlTable += "<td>Matching</td>";
		}
		//htmlTable += "<td>"+ indexEntry["rule_group"]+ "</td>"; 
		htmlTable += "<td>"+ indexEntry["rule_name"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["data_flow_id"]+ "</td>";
		
		if(indexEntry["initial_flag"]==1){
			htmlTable += "<td><input type='checkbox' checked='checked' value="+ indexEntry["initial_flag"]+"></td>";
		}else if(indexEntry["initial_flag"]==0){
			htmlTable += "<td><input type='checkbox' value="+ indexEntry["initial_flag"]+"></td>";
		}
		
		if(indexEntry["update_flag"]==1){
			htmlTable += "<td><input type='checkbox' checked='checked' value="+ indexEntry["update_flag"]+"></td>";
		}else if(indexEntry["update_flag"]==0){
			htmlTable += "<td><input type='checkbox' value="+ indexEntry["update_flag"]+"></td>";
		}
		
		if(indexEntry["last_contact_flag"]==1){
			htmlTable += "<td><input type='checkbox' checked='checked' value="+ indexEntry["last_contact_flag"]+"></td>";
		}else if(indexEntry["last_contact_flag"]==0){
			htmlTable += "<td><input type='checkbox' value="+ indexEntry["last_contact_flag"]+"></td>";
		}
		
		if(indexEntry["inform_flag"]==1){
			htmlTable += "<td><input type='checkbox' checked='checked' value="+ indexEntry["inform_flag"]+"></td>";
		}else if(indexEntry["inform_flag"]==0){
			htmlTable += "<td><input type='checkbox' value="+ indexEntry["inform_flag"]+"></td>";
		}
		
		if(indexEntry["edit_rule_release_flag"]==1){
			htmlTable += "<td><input type='checkbox' checked='checked' value="+ indexEntry["edit_rule_release_flag"]+"></td>";
		}else if(indexEntry["edit_rule_release_flag"]==0){
			htmlTable += "<td><input type='checkbox' value="+ indexEntry["edit_rule_release_flag"]+"></td>";
		}

		htmlTable += "<td><i class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-warning btn-xs edit' id="+ indexEntry["_id"]+ " data-target=#addModalRule data-toggle='modal'>Edit</button>&nbsp;<button id="+indexEntry["_id"]+" class='btn btn-danger btn-xs del'>Delete</button>\"></i></td>";
		htmlTable += "</tr>";
		});
	
		$("#listRule").html(htmlTable);
		
		$('#tableRule').DataTable( { "dom": '<"top"flp>rt<"bottom"lp><"clear">' } );  
		
		//function popover
		$(".popover-edit-del").popover();
	
		//findOnd
		$("#tableRule").on("click",".popover-edit-del",function(){
			$(".edit").on("click",function() {
				
				findOneFn(this.id);
				$("#id").val(this.id);
				$("#action").val("edit");
				$("#btnSubmit").val("Edit");
			});
			
			$(".del").on("click",function() {
			
				$.ajax({
					 url:restfulURL+"/api/dqs_rule/"+ this.id,
					 type : "delete",
					 dataType:"json",
				     success:function(data){   
				    	 
				       getDataFn();
				       clearFn();
				       //return false;
					 }
				});
				
			});	
			
		});
			
	};
	
	
	var dropdownRuleGroup = function(id) {
		//alert("555");
		var selectDataflowHTML=""
		var makeRuleGroupID=""	
			
		if (id=="1"){
			makeRuleGroupID = "Cleansing"
		}else if (id=="2"){
			makeRuleGroupID = "Matching"
		}
		
		$.ajax({
			url : restfulURL + "/api/dqs_rule_group",
			type : "get",
			dataType : "json",
			success : function(data) {
				
				$.each(data,function(index,indexEntry){
					
					
					if(makeRuleGroupID==indexEntry['rule_group_name']){
						//alert(makeDataflowID+"="+indexEntry['data_flow_name']);
						selectDataflowHTML+="<option selected>"+indexEntry['rule_group_name']+"</option>"; 
					}else{
						selectDataflowHTML+="<option>"+indexEntry['rule_group_name']+"</option>";  
					}
				
				});
				//alert(selectDataflowHTML);
				$("#rule_group_id").html(selectDataflowHTML);
			}
		});
	}
	dropdownRuleGroup();
	
	var dropdownDataFlow = function(id) {
		//alert("data flow "+id);
		var selectDataflowHTML=""
		
		
		$.ajax({
			url : restfulURL + "/api/dqs_data_flow",
			type : "get",
			dataType : "json",
			success : function(data) {
				
				$.each(data,function(index,indexEntry){
					
					
					if(id==indexEntry['data_flow_name']){
						//alert(makeDataflowID+"="+indexEntry['data_flow_name']);
						selectDataflowHTML+="<option selected>"+indexEntry['data_flow_name']+"</option>"; 
					}else{
						selectDataflowHTML+="<option>"+indexEntry['data_flow_name']+"</option>";  
					}
				
				});
				//alert(selectDataflowHTML);
				$("#data_flow_id").html(selectDataflowHTML);
			}
		});
	}
	dropdownDataFlow();
	
	var getDataFn = function() {
		$.ajax({
			url : restfulURL + "/api/dqs_rule",
			type : "get",
			dataType : "json",
			success : function(data) {
				listRuleFn(data);
				//console.log(data);
			}
		});
	};
	//Call Function start
	  getDataFn();
	 	
/*	$("#btnSearch").click(function(){
		searchFn($("#searchRule").val());
		   return false;
	});*/
	
	$("#btnSearchAdvance").click(function(){
		searchAdvanceFn($("#searchAdvanceRule").val(),$("#searchDropdownRule").val());
		   return false;
	});
	
	
	
	
	$("#btnSubmit").click(function(){
		if (validationFn() == true) { 
			if ($("#action").val() == "add"|| $("#action").val() == "") {	
				if (checkUniqueFn($("#rule_name").val()) == true) { 	
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
	
	$(".btnCancle").click(function() {
		clearFn();
	});
		
});