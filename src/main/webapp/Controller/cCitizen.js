$(document).ready(function(){

	var restfulURL = "http://192.168.1.100:3001"; 
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
	
	/*var insertFn = function() {
			
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
			
			url:restfulURL+"/api/dqs_rule",
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
	};*/
	
	var updateFn = function() {
		
		$.ajax({
			url:restfulURL+"/api/dqs_citizen_import/"+$("#id").val(),
			type : "PUT",
			dataType : "json",
			data : {"pid" : $("#cifno_citizen").val(),
				"nfname" : $("#nfname_citizen").val(),
				"nlname" : $("#nlname_citizen").val(),
				"ntitle" : $("#ntitle_citizen").val(),
				"hno" : $("#hno_citizen").val(),
				"moo" : $("#moo_citizen").val(),
				"trok" : $("#trok_citizen").val(),
				"soi" : $("#soi_citizen").val(),
				"thanon" : $("#thanon_citizen").val(),
				"thumbol" : $("#thumbol_citizen").val(),
				"amphur" : $("#amphur_citizen").val(),
				"province" : $("#province_citizen").val(),
				"flag1" : $("#flag1_citizen").val(),
				"flag2" : $("#flag2_citizen").val(),
				

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
	
	var dropdownDobDay = function(day){
		
		var selectDobDayHTML="";
		
		$.ajax({
			url:restfulURL+"/api/make_param_day",
			type : "get",
			dataType : "json",
			async:false,
			success : function(data) {	
				selectDobDayHTML+="<select class=\"form-control input-inline-table-citizen input-inline-table-citizen\" id=\"day_citizen\">";
				$.each(data,function(index,indexEntry){
						
					if(day==indexEntry['day']){
						selectDobDayHTML+="<option selected>"+indexEntry['day']+"</option>";  
					}else{
						selectDobDayHTML+="<option>"+indexEntry['day']+"</option>";  
					}
					   
				});
				selectDobDayHTML+="</select>";
			}
		});
		
		//alert(selectDobMonthHTML);
		$("#day_citizen").html(selectDobDayHTML);
	}
	
	var dropdownDobMouth = function(param_month_id){
		
		var selectDobMonthHTML="";
		
		$.ajax({
			url:restfulURL+"/api/make_param_month",
			type : "get",
			dataType : "json",
			async:false,
			success : function(data) {	
				selectDobMonthHTML+="<select class=\"form-control input-inline-table-citizen\" id=\"month_citizen\">";
				$.each(data,function(index,indexEntry){
						
					if(param_month_id==indexEntry['month_id']){
						selectDobMonthHTML+="<option selected>"+indexEntry['month_name']+"</option>";  
					}else{
						selectDobMonthHTML+="<option>"+indexEntry['month_name']+"</option>";  
					}
					   
				});
				selectDobMonthHTML+="</select>";
			}
		});
		
		//alert(selectDobMonthHTML);
		$("#month_citizen").html(selectDobMonthHTML);
	}
	
	
	
	
	var dropdownDobYear = function(param_year){
		
		var selectDobYearHTML="";

		$.ajax({
			url:restfulURL+"/api/make_param_year",
			type : "get",
			dataType : "json",
			async:false,
			success : function(data) {	
				selectDobYearHTML+="<select class=\"form-control input-inline-table-citizen input-contact-citizen\" id=\"year_citizen\">";
				$.each(data,function(index,indexEntry){
					if(param_year==indexEntry['param_year']){
						selectDobYearHTML+="<option selected>"+indexEntry['param_year']+"</option>";  
					}else{
						selectDobYearHTML+="<option>"+indexEntry['param_year']+"</option>";  
					}
				});
				selectDobYearHTML+="</select>";
			}
		});
		
		//alert(selectDobYearHTML);
		$("#year_citizen").html(selectDobYearHTML);
			
	}
	
	var findOneFn = function(id) {
		// http://localhost:3000/find-user/58035b7cb4566c158bcecacf
		$.ajax({
			url:restfulURL+"/api/dqs_citizen_import/"+ id,
			type : "get",
			dataType : "json",
			success : function(data) {		
				
				var dob = data['ndob'].toString(); 
				
				var dobYear = dob.substring(4); 
				var dobMouth = dob.substring(2,4);
				var dobDay = dob.substring(0,2);
				
				dropdownDobYear(dobYear);
				dropdownDobMouth(dobMouth);
				dropdownDobDay(dobDay); 
			
				$("#cifno_citizen").val(data['pid']);
				$("#nfname_citizen").val(data['nfname']);
				$("#nlname_citizen").val(data['nlname']);
				$("#ntitle_citizen").val(data['ntitle']);
				$("#hno_citizen").val(data['hno']);
				$("#moo_citizen").val(data['moo']);
				$("#trok_citizen").val(data['trok']);
				$("#soi_citizen").val(data['soi']);
				$("#thanon_citizen").val(data['thanon']);
				$("#thumbol_citizen").val(data['thumbol']);
				$("#amphur_citizen").val(data['amphur']);
				$("#province_citizen").val(data['province']);
				
				//sex
				if(data['sex']==1){
					$('#sex_citizen_men').prop('checked', true);
				}
				if(data['sex']==0){
					$('#sex_citizen_women').prop('checked', true);
				}
				
				$("#flag1_citizen").val(data['flag1']);
				$("#flag2_citizen").val(data['flag2']);
				
				//nation
				/*if(data['nation']==1){
					$('#nation_citizen_thai').prop('checked', true);
				}
				if(data['nation']==0){
					$('#nation_citizen_other').prop('checked', true);
				}*/
				
			}
		});
	};
	
	var searchFn = function(searchText) {
		$.ajax({
			url : restfulURL + "/api/dqs_citizen_import/?nfname__regex=/^"+searchText+"/i",
			type : "get",
			dataType : "json",
			success : function(data) {
				listCitizenFn(data);
			}
		});
	}

	var searchAdvanceFn = function(searchText) {
		$.ajax({
			url : restfulURL + "/api/dqs_rule/?rule_name__regex=/^"+searchText+"/i",
			type : "get",
			dataType : "json",
			success : function(data) {
				listRuleFn(data);
			}
		});
	}
	
	var listCitizenFn = function(data) {
		console.log(data);
		var htmlTable = "";
		
		$.each(data,function(index,indexEntry) {
		htmlTable += "<tr>";
		htmlTable += "<td>"+ indexEntry["pid"]+ "</td>";
		htmlTable += "<td>"+ (index + 1)+ "</td>";
		htmlTable += "<td>"+ indexEntry["ntitle"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["nfname"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["nlname"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["ndob"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["nsex"]+ "</td>";

		htmlTable += "<td><i class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-warning btn-xs edit' id="+ indexEntry["_id"]+ " data-target=#editModalCitizen data-toggle='modal'>Edit</button>&nbsp;<button id="+indexEntry["_id"]+" class='btn btn-danger btn-xs del'>Delete</button>\"></i></td>";
		htmlTable += "</tr>";
		});
	
		$("#listCitizen").html(htmlTable);
		
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
					 url:restfulURL+"/api/dqs_citizen_import/"+ this.id,
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
			url : restfulURL + "/api/dqs_citizen_import",
			type : "get",
			dataType : "json",
			success : function(data) {
				listCitizenFn(data);
				console.log(data);
			}
		});
	};
	//Call Function start
	  getDataFn();
	 	
	$("#btnSearch").click(function(){
		searchFn($("#searchCitizen").val());
		   return false;
	});
	
	$("#btnSearchAdvance").click(function(){
		searchAdvanceFn($("#searchAdvanceRule").val());
		   return false;
	});
	

	$("#btnSubmit").click(function(){
		
		updateFn();
		/*if (validationFn() == true) { 
			
			if ($("#action").val() == "add"|| $("#action").val() == "") {
				if(checkUniqueFn($("#rule_name").val()) == true) { 	
					insertFn();
				}else{
					alert("name is not unique.");
				}
			}else{
				if(checkUniqueFn($("#rule_name").val()) == true) {
					updateFn();
				}else{
					alert("name is not unique.");
				}
			}
		}*/
		return false;
	});
	
	$(".btnCancle").click(function() {
		clearFn();
	});
		
});