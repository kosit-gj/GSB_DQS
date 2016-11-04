$(document).ready(function(){

	var restfulURL = "http://192.168.1.100:3001";
	//var restfulURL = "http://goingjesse.hopto.org:3001";
	
	/*var checkUniqueFn = function(text) {
		 http://localhost:3000/api/products?name__regex=/^test/i 
		var unique = false;
		$.ajax({
			url : restfulURL +"/api/dqs_file?name_filde="+text+"",
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
	
	}*/
	
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
			
			url:restfulURL+"/api/dqs_file",
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
		
		/*var closeflagCheckbox = "";
		var embed_closeflag="";*/
		
		/*var embed_closeflag_obj="";
	
		embed_closeflag_obj=$(".embed_closeflag").get();*/
		
		$.each($(".seqFileManage").get(),function(index,indexEntry){
			alert($(indexEntry).val());
			var id=$(indexEntry).val();
			//alert($(indexEntry).attr("id"));
			/*if($("#closeCheckbox-"+id).prop('checked')){ 
	        	closeflagCheckbox = 1;
	        }else{ 
	        	closeflagCheckbox = 0;
	        }*/
			
			$.ajax({
				url:restfulURL+"/api/dqs_file/"+id,
				type : "PUT",
				dataType : "json",
				data : {"process_seq":$("#seqFileManage").val()},
				async:false,
				success : function(data) {
					if (data = "success") {
						//console.log("Upate Success");
						alert("Upate Success");
					}
				}
			});

		});
		/*alert("Upate Success");
		getDataFn();
		clearFn();
		$('#addModalRule').modal('hide');*/
		
		
		//console.log($(".embed_closeflag").get());
		
		
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
			url:restfulURL+"/api/dqs_file/"+ id,
			type : "get",
			dataType : "json",
			success : function(data) {
				$("#branchOperationName").val(data['desc']);
			}
		});
	};
	
	var searchFn = function(searchText) {
		$.ajax({
			url : restfulURL + "/api/dqs_file/?file_name__regex=/^"+searchText+"/i",
			type : "get",
			dataType : "json",
			success : function(data) {
				listFileFn(data);
			}
		});
	}
	
	var dropdownCheckbox = function(id) {
		$.ajax({
			url : restfulURL + "/api/dqs_file/?rule_name__regex=/^"+searchText+"/i",
			type : "get",
			dataType : "json",
			success : function(data) {
				listFileFn(data);
			}
		});
	}
	
	var listFileFn = function(data) {
		console.log(data);
		var htmlTable = "";
		//var close = $(indexEntry["close_flag"]);

		$.each(data,function(index,indexEntry) {
		htmlTable += "<tr>"; 
		//htmlTable += "<td>"+ (index + 1)+ "</td>"; 
		htmlTable+="<td><input class=\"form-control input-inline-table input-seq seqFile\" type=\"text\" name=\"\" id=seq-"+indexEntry["_id"]+" value="+indexEntry["processing_seq"]+">";
		//htmlTable += "<td>"+ indexEntry["processing_seq"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["file_name"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["source_file_path"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["target_file_path"]+ "</td>";
		
		if(indexEntry["contact_type"]==1){
		htmlTable+="<td><select class=\"form-control input-inline-table select-contact\" id=contacttype-"+indexEntry["_id"]+"><option selected >contact ON</option> <option>contact OFF</option></select></td>";
		}else if (indexEntry["contact_type"]==0){
		htmlTable+="<td><select class=\"form-control input-inline-table select-contact\" id=contacttype-"+indexEntry["_id"]+"><option  >contact ON</option> <option selected>contact OFF</option></select></td>";
		}
		//htmlTable += "<td>"+ indexEntry["contact_type"]+ "</td>";
		
		if(indexEntry["kpi_flag"]==1){
			htmlTable += "<td><input type=\"checkbox\" class=\"editCheckboxCloseFlag\" id=kpiCheckbox-"+indexEntry["_id"]+" checked='checked' ></td>";
		}else if(indexEntry["kpi_flag"]==0){
			htmlTable += "<td><input type=\"checkbox\" class=\"editCheckboxCloseFlag\" id=kpiCheckbox-"+indexEntry["_id"]+" ></td>";
		}	 
		
		if(indexEntry["last_contact_flag"]==1){
			htmlTable += "<td><input type=\"checkbox\" class=\"editCheckboxCloseFlag\" id=lastContactCheckbox-"+indexEntry["_id"]+" checked='checked' ></td>";
		}else if(indexEntry["last_contact_flag"]==0){
			htmlTable += "<td><input type=\"checkbox\" class=\"editCheckboxCloseFlag\" id=lastContactCheckbox-"+indexEntry["_id"]+" ></td>";
		}	
		
		if(indexEntry["source_file_delete_flag"]==1){
			htmlTable += "<td><input type=\"checkbox\" class=\"editCheckboxCloseFlag\" id=sourceFileCheckbox-"+indexEntry["_id"]+" checked='checked' ></td>";
		}else if(indexEntry["source_file_delete_flag"]==0){
			htmlTable += "<td><input type=\"checkbox\" class=\"editCheckboxCloseFlag\" id=sourceFileCheckbox-"+indexEntry["_id"]+" ></td>";
		}	
		
		htmlTable+="<td><input class=\"form-control input-inline-table input-seq\" type=\"text\" name=\"\" id=seq-"+indexEntry["_id"]+" value="+indexEntry["nof_date_date"]+">";
		//htmlTable += "<td>"+ indexEntry["nof_date_date"]+ "</td>";
		
		htmlTable += "</tr>";
		});
		
		$("#dataFileManagement").html(htmlTable);
		
		//function popover
		$(".popover-edit-del").popover();
		
		//ปุ่ม Edit ใน table
		$(".editCheckboxCloseFlag").click(function(){
			var id = this.id.split("-"); 
			embedParam(id[1]);
		});
		
		$(".seqFile").click(function(){
			var id = this.id.split("-"); 
			embedParam(id[1]);
			alert(id[1]);
		});
		
		//ปุ่ม Save
		$("#btnSave").click(function(){
	        updateFn();
			
			
			
		});
			
	};
	// Click แล้ว ฝังข้อมูล
	var embedParam = function(id){
		//alert(id);
		var count = 0;
		
		$.each($(".seqFileManage").get(),function(index,indexEnry){
		//ถ้า id ที่วน == id ที่มี	
			if($(indexEnry).val()==id){
				count+=1;
			}
		});
		
		if(count>0){
			$("#seqFileManage-"+id).remove();
			$("body").append("<input type='hidden' class='seqFileManage' id='seqFileManage' name='seqFileManage-"+id+"' >");
		}else{
			$("body").append("<input type='hidden' class='seqFileManage' id='seqFileManage' name='seqFileManage-"+id+"' >");
		}
		
	}
	
	// get ของ branch management
	var getDataFn = function() {
		$.ajax({
			url : restfulURL + "/api/dqs_file",
			type : "get",
			dataType : "json",
			success : function(data) {
				listFileFn(data);
				console.log(data);
			}
		});
	};
	
	//Call Function start
	  getDataFn();
	
	$("#btnSearch").click(function(){
		searchFn($("#searchFileName").val());
		return false;
	});
	
	/*$("#btnSubmit").click(function(){
		if (validationFn() == true) {
			if ($("#action").val() == "add"|| $("#action").val() == "") {
				if (checkUniqueFn($("#rule_name").val()) == true) { 	
						insertFn();
					} else {
						alert("name is not unique.");
					}
			}else{
				if(checkUniqueFn($("#rule_name").val()) == true) {
					updateFn();
				}else{
					alert("name is not unique.");
				}
			}
		}
		return false;
	});*/
	
	$(".btnCancle").click(function() {
		clearFn();
	});
	
	$("#btnEditBranchOperation").click(function() {
		getDataBranchOperationFn();
	});
});