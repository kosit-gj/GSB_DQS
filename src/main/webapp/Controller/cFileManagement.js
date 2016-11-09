$(document).ready(function(){
	
	var restfulURL = "http://192.168.1.60:3001";
	//var restfulURL = "http://192.168.1.100:3001";
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
		
		/////////////////////-Dropdown Contact-////////////////////////
		var valueContatType = "";
		$.each($(".embed_contactType").get(),function(index,indexEntry){
			var id = $(indexEntry).val();
			
			//alert($("#contacttype-"+id).val());
			
			if($("#contacttype-"+id).val()== "Email"){
				valueContatType = "1";
			}else if($("#contacttype-"+id).val()== "Telephone"){
				valueContatType = "2";
			}else if($("#contacttype-"+id).val()== "Home"){
				valueContatType = "3";
			}else if($("#contacttype-"+id).val()== "Office"){
				valueContatType = "4";
			}
			
			//alert(valueContatType);
			
			$.ajax({
				url:restfulURL+"/api/dqs_file/"+id,
				type : "PUT",
				dataType : "json",
				data : {"contact_type" : valueContatType},
				//data : {"contact_type" : $("#contacttype-"+id).val()},
				success : function(data) {
					if (data = "success") {
						//alert("Update Success");
						//getDataFn();
						//clearFn();
						//$('#addModalRule').modal('hide');
					}
				}
			});
			
		});
		
		////////////////////////-CheckBox KPI-//////////////////////////////
		
		var kpiflagCheckbox = "";
		
		$.each($(".embed_kpiflag").get(),function(index,indexEntry){
		
			var id=$(indexEntry).val();
			if($("#kpiCheckbox-"+id).prop('checked')){ 
				kpiflagCheckbox = 1;
	        }else{ 
	        	kpiflagCheckbox = 0;
	        }
			//alert(closeflagCheckbox);
			$.ajax({
				url:restfulURL+"/api/dqs_file/"+id,
				type : "PUT",
				dataType : "json",
				data : {"kpi_flag" :kpiflagCheckbox},
				async:false,
				success : function(data) {
					if (data = "success") {
						//console.log("Upate Success");
					}
				}
			});
			
		});
		
		//////////////////////////-CheckBox Last Contact-////////////////////////////
		
		var lastcontactCheckbox = "";
		
		$.each($(".embed_lastcontact").get(),function(index,indexEntry){
		
			var id=$(indexEntry).val();
			if($("#lastContactCheckbox-"+id).prop('checked')){ 
	        	lastcontactCheckbox = 1;
	        }else{ 
	        	lastcontactCheckbox = 0;
	        }
			//alert(closeflagCheckbox);
			$.ajax({
				url:restfulURL+"/api/dqs_file/"+id,
				type : "PUT",
				dataType : "json",
				data : {"last_contact_flag" :lastcontactCheckbox},
				async:false,
				success : function(data) {
					if (data = "success") {
						//console.log("Upate Success");
					}
				}
			});
		
		});
		
		///////////////////////////-CheckBox Delete-///////////////////////////
		
		var closeflagCheckbox = "";
		
		$.each($(".embed_closeflag").get(),function(index,indexEntry){
		
			var id=$(indexEntry).val();
			if($("#sourceFileDeleteCheckbox-"+id).prop('checked')){ 
	        	closeflagCheckbox = 1;
	        }else{ 
	        	closeflagCheckbox = 0;
	        }
			//alert(closeflagCheckbox);
			$.ajax({
				url:restfulURL+"/api/dqs_file/"+id,
				type : "PUT",
				dataType : "json",
				data : {"source_file_delete_flag" :closeflagCheckbox},
				async:false,
				success : function(data) {
					if (data = "success") {
						//console.log("Upate Success");
					}
				}
			});
			
		});
		
		//////////////////////////-Input Day-////////////////////////////
		
		$.each($(".embed_dateFile").get(),function(index,indexEntry){
			
			//alert($(indexEntry).val());
			var id = $(indexEntry).val();
					
			$.ajax({
				url:restfulURL+"/api/dqs_file/"+id,
				type : "PUT",
				dataType : "json",
				data : {"nof_date_date":$("#dateFileManage-"+id).val()},
				async:false,
				success : function(data) {
					if (data = "success") {
						$(".embed_dateFile").remove(); 
						//console.log("Upate Success");
						//alert("Upate Success");
					} 
				}
			});
			
		});
		
		///////////////////////////-Input Seq-///////////////////////////
		 
		$.each($(".embed_seqFile").get(),function(index,indexEntry){
			
			//alert($(indexEntry).val());
			var id = $(indexEntry).val();
					
			$.ajax({
				url:restfulURL+"/api/dqs_file/"+id,
				type : "PUT",
				dataType : "json",
				data : {"processing_seq":$("#seqFileManage-"+id).val()}, 
				async:false,
				success : function(data) {
					if (data = "success") { 
						$(".embed_seqFile").remove();
						//console.log("Upate Success");
						//alert("Upate Success");
					} 
				}
			});
			
		});
		
		alert("Upate Success");
		getDataFn();
		clearFn();

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
		//clear ฟังก์ชัน  data ข้อมูลเก่าทิ้ง 
		$("#dataFileManagement").empty();
		
		$.each(data,function(index,indexEntry) {
		var htmlTable = "";		
		htmlTable += "<tr>"; 
		htmlTable+="<td><input disabled class=\"form-control input-inline-table input-seq seqFile\" type=\"text\" name=\"seqFileManage\" id=seqFileManage-"+indexEntry["_id"]+" value="+indexEntry["processing_seq"]+">";
		htmlTable += "<td>"+ indexEntry["file_name"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["source_file_path"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["target_file_path"]+ "</td>";	
		
		htmlTable+="<td><select disabled class=\"form-control input-inline-table selectContact\" id=contacttype-"+indexEntry["_id"]+"></select></td>";	
		
		if(indexEntry["kpi_flag"]==1){
			htmlTable += "<td><input disabled type=\"checkbox\" class='editkpiCheckbox' id=kpiCheckbox-"+indexEntry["_id"]+" checked='checked' ></td>";
		}else if(indexEntry["kpi_flag"]==0){
			htmlTable += "<td><input disabled type=\"checkbox\" class='editkpiCheckbox' id=kpiCheckbox-"+indexEntry["_id"]+" ></td>";
		}	 
		
		if(indexEntry["last_contact_flag"]==1){
			htmlTable += "<td><input disabled type=\"checkbox\" class='editlastContact' id=lastContactCheckbox-"+indexEntry["_id"]+" checked='checked' ></td>";
		}else if(indexEntry["last_contact_flag"]==0){
			htmlTable += "<td><input disabled type=\"checkbox\" class='editlastContact' id=lastContactCheckbox-"+indexEntry["_id"]+" ></td>";
		}	
		
		if(indexEntry["source_file_delete_flag"]==1){
			htmlTable += "<td><input disabled type=\"checkbox\" class='editCheckboxCloseFlag' id=sourceFileDeleteCheckbox-"+indexEntry["_id"]+" checked='checked' ></td>";
		}else if(indexEntry["source_file_delete_flag"]==0){
			htmlTable += "<td><input disabled type=\"checkbox\" class='editCheckboxCloseFlag' id=sourceFileDeleteCheckbox-"+indexEntry["_id"]+" ></td>";
		}
		
		htmlTable+="<td><input disabled class=\"form-control input-inline-table input-seq dateFile\" type=\"text\" name=\"\" id=dateFileManage-"+indexEntry["_id"]+" value="+indexEntry["nof_date_date"]+">";
		
		htmlTable +="</tr>";
		
		$("#dataFileManagement").append(htmlTable);
		dropdownContactType(indexEntry["contact_type"],indexEntry["_id"]);
		});
		
		
		
		//function popover
		//$(".popover-edit-del").popover();
		
		//click ที่ checkox Close แล้ว แยกไอดี ส่งไปฝัง(embed) 
		$(".selectContact").click(function(){		
			var id = this.id.split("-"); 
			embedParamSelectContact(id[1]);
			//alert(id[1]);		
		});
		
		//click ที่ checkox Close แล้ว แยกไอดี ส่งไปฝัง(embed) 
		$(".editkpiCheckbox").click(function(){		
			var id = this.id.split("-"); 
			embedParamCheckboxKPI(id[1]);
			//alert(id[1]);		
		});
		
		//click ที่ checkox Close แล้ว แยกไอดี ส่งไปฝัง(embed) 
		$(".editlastContact").click(function(){		
			var id = this.id.split("-"); 
			embedParamCheckboxContact(id[1]);
			//alert(id[1]);		
		});
		
		//click ที่ checkox Close แล้ว แยกไอดี ส่งไปฝัง(embed) 
		$(".editCheckboxCloseFlag").click(function(){		
			var id = this.id.split("-"); 
			embedParamCheckboxDelete(id[1]);
			//alert(id[1]);		
		});
		
		//click ที่ seq แล้ว แยกไอดี ส่งไปฝัง(embed) 
		$(".seqFile").click(function(){		
			var id = this.id.split("-"); 
			embedParamSeq(id[1]);
			//alert(id[1]);		
		});
		//click ที่ date แล้ว แยกไอดี ส่งไปฝัง(embed) 
		$(".dateFile").click(function(){		
			var id = this.id.split("-"); 
			embedParamDate(id[1]);
			//alert(id[1]);		
		});
	
	};
	
	/*var dropdownContactType = function(param_id){
		
		//alert(param_id);
		
		var HTML="";
		
		$.ajax({
			url:restfulURL+"/api/make_param_contact_type/",
			type : "get",
			dataType : "json",
			async:false,
			success : function(data) {	

				$.each(data,function(index,indexEntry){
					alert(param_id);
					if(param_id==indexEntry['param_contact_id']){
						HTML+="<option selected>"+indexEntry['param_contact_type']+"</option>";  
					}else{
						HTML+="<option>"+indexEntry['param_contact_type']+"</option>";  
					}
					   
				});
			
			}
		});
		
		//alert(selectDobMonthHTML);
		$(".selectContact").html(HTML);
	}*/
	
	var dropdownContactType = function(param_type,param_id){
		//alert("paramTYPE"+param_type);
		$.ajax ({
			url:restfulURL+"/api/make_param_contact_type" ,
			type:"get" ,
			dataType:"json" ,
			async:false,
				success:function(data){
					
					var htmlTable="";
					
					$.each(data,function(index,indexEntry){
						//alert( "contactID"+indexEntry['param_contact_id']);
						if(param_type==indexEntry['param_contact_id']){
						//	alert(param_type);
							
							htmlTable+="<option selected>"+indexEntry['param_contact_type']+"</option>";  
						}else{
							htmlTable+="<option>"+indexEntry['param_contact_type']+"</option>";  
						}
						
						
						});	
					//alert(htmlTable);
				
					$("#contacttype-"+param_id).html(htmlTable);
				}
		});
	};
	
	//ปุ่ม Save
	$("#btnSave").click(function(){
        updateFn();	
	});
	
	// Click แล้ว ฝังข้อมูล
	var embedParamSelectContact = function(id){
		//alert(id);
		var count = 0;
		
		$.each($(".embed_contactType").get(),function(index,indexEnry){
		//ถ้า id ที่วน == id ที่มี	
			if($(indexEnry).val()==id){
				count+=1;
			}
		});
		
		if(count>0){
			$("#embed_contactType-"+id).remove();
			$("body").append("<input type='hidden' class='embed_contactType' id='embed_contactType-"+id+"' name='embed_contactType-"+id+"' value='"+id+"'>");
		}else{
			$("body").append("<input type='hidden' class='embed_contactType' id='embed_contactType-"+id+"' name='embed_contactType-"+id+"' value='"+id+"'>");
		}
		
	}
	
	// Click แล้ว ฝังข้อมูล
	var embedParamCheckboxKPI = function(id){
		//alert(id);
		var count = 0;
		
		$.each($(".embed_kpiflag").get(),function(index,indexEnry){
		//ถ้า id ที่วน == id ที่มี	
			if($(indexEnry).val()==id){
				count+=1;
			}
		});
		
		if(count>0){
			$("#embed_kpiflag-"+id).remove();
			$("body").append("<input type='hidden' class='embed_kpiflag' id='embed_kpiflag-"+id+"' name='embed_kpiflag-"+id+"' value='"+id+"'>");
		}else{
			$("body").append("<input type='hidden' class='embed_kpiflag' id='embed_kpiflag-"+id+"' name='embed_kpiflag-"+id+"' value='"+id+"'>");
		}
		
	}
	
	// Click แล้ว ฝังข้อมูล
	var embedParamCheckboxContact = function(id){
		//alert(id);
		var count = 0;
		
		$.each($(".embed_lastcontact").get(),function(index,indexEnry){
		//ถ้า id ที่วน == id ที่มี	
			if($(indexEnry).val()==id){
				count+=1;
			}
		});
		
		if(count>0){
			$("#embed_lastcontact-"+id).remove();
			$("body").append("<input type='hidden' class='embed_lastcontact' id='embed_lastcontact-"+id+"' name='embed_lastcontact-"+id+"' value='"+id+"'>");
		}else{
			$("body").append("<input type='hidden' class='embed_lastcontact' id='embed_lastcontact-"+id+"' name='embed_lastcontact-"+id+"' value='"+id+"'>");
		}
		
	}
	
	// Click แล้ว ฝังข้อมูล
	var embedParamCheckboxDelete = function(id){
		//alert(id);
		var count = 0;
		
		$.each($(".embed_closeflag").get(),function(index,indexEnry){
		//ถ้า id ที่วน == id ที่มี	
			if($(indexEnry).val()==id){
				count+=1;
			}
		});
		
		if(count>0){
			$("#embed_closeflag-"+id).remove();
			$("body").append("<input type='hidden' class='embed_closeflag' id='embed_closeflag-"+id+"' name='embed_closeflag-"+id+"' value='"+id+"'>");
		}else{
			$("body").append("<input type='hidden' class='embed_closeflag' id='embed_closeflag-"+id+"' name='embed_closeflag-"+id+"' value='"+id+"'>");
		}
		
	}
	
	// Click แล้ว ฝังข้อมูล
	var embedParamSeq = function(id){
		//alert(id);
		var count = 0;
		
		$.each($(".embed_seqFile").get(),function(index,indexEnry){
		//ถ้า id ที่วน == id ที่มี	
			if($(indexEnry).val()==id){
				count+=1;
			}
		});
		
		if(count>0){
			$("#embed_seqFileManage").remove();
			$("body").append("<input type='hidden' class='embed_seqFile' id='embed_seqFileManage' name='embed_seqFileManage-"+id+"' value='"+id+"'>");
		}else{
			$("body").append("<input type='hidden' class='embed_seqFile' id='embed_seqFileManage' name='embed_seqFileManage-"+id+"' value='"+id+"'>");
		}	
	};
	
	// Click แล้ว ฝังข้อมูล
	var embedParamDate = function(id){
		//alert(id);
		var count = 0;
		
		$.each($(".embed_dateFile").get(),function(index,indexEnry){
		//ถ้า id ที่วน == id ที่มี	
			if($(indexEnry).val()==id){
				count+=1;
			}
		});
		
		if(count>0){
			$("#embed_dateFileManage").remove();
			$("body").append("<input type='hidden' class='embed_dateFile' id='embed_dateFileManage' name='embed_dateFileManage-"+id+"' value='"+id+"'>");
		}else{
			$("body").append("<input type='hidden' class='embed_dateFile' id='embed_dateFileManage' name='embed_dateFileManage-"+id+"' value='"+id+"'>");
		}	
	};
	
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
	
	$("#btnCancle").click(function() {
		clearFn();
		getDataFn();
	});
	
	$("#btnEdit").click(function() {
		$(".seqFile").removeAttr("disabled");
		$(".dateFile").removeAttr("disabled");
		$(".editCheckboxCloseFlag").removeAttr("disabled");
		$(".editlastContact").removeAttr("disabled");
		$(".editkpiCheckbox").removeAttr("disabled"); 
		$(".selectContact").removeAttr("disabled"); 
		
		
	});
});