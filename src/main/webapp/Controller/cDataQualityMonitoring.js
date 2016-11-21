
$(document).ready(function(){
	//alert("hello jquery");
	$(".btn-explain").click(function(){
		$("#modalDetail").modal('hide');
		$("#exPlainModal").modal();
	});

	var restfulURL = "http://192.168.1.48:3001";  
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
				//console.log(data);
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
	
	var updateFn = function(){
		
		//ID ของ CIF ที่ฝังอยู่ เอามาใส่ตัวแปร id
		var id = $("#validate_header_id_hidden").val();
		
		////////////////////////-CheckBox KPI-//////////////////////////////	
		
		var kpiFlagCheckbox = "";
		
		$.each($(".embed_kpiflag").get(),function(index,indexEntry){
		
			var id=$(indexEntry).val();
			if($("#kpiFlagCheckbox-"+id).prop('checked')){ 
				kpiFlagCheckbox = 1;
	        }else{ 
	        	kpiFlagCheckbox = 0;
	        }
		
			$.ajax({
				url:restfulURL+"/api/make_dqs_inital_validate/"+id,
				type : "PUT",
				dataType : "json",
				data : {"kpi_flag" :kpiFlagCheckbox},
				async:false,
				success : function(data) {
					if (data = "success") {
						//console.log("Upate Success");
					}
				}
			});
			
		});
		
		////////////////////////-CheckBox No Doc-//////////////////////////////
		
		var noDocCheckbox = "";
		
		$.each($(".embed_nodoc").get(),function(index,indexEntry){
		
			var id=$(indexEntry).val();
			if($("#no_doc_checkbox-"+id).prop('checked')){ 
				noDocCheckbox = 1;
	        }else{ 
	        	noDocCheckbox = 0;
	        }
			
			$.ajax({
				url:restfulURL+"/api/make_dqs_inital_validate/"+id,
				type : "PUT",
				dataType : "json",
				data : {"no_doc" :noDocCheckbox},
				async:false,
				success : function(data) {
					if (data = "success") {
						//console.log("Upate Success");
					}
				}
			});
			
		});
		
		/////////////////////-Dropdown Validate Status-////////////////////////
		
		$.each($(".embed_validate_status").get(),function(index,indexEntry){
			
			var id = $(indexEntry).val();
			
			$.ajax({
				url:restfulURL+"/api//make_dqs_inital_validate/"+id,
				type : "PUT",
				dataType : "json",
				//data : {"contact_type" : valueContatType},
				data : {"validate_status" : $("#validate_status-"+id).val()},
				async:false,
				success : function(data) {
					if (data = "success") {
						//console.log(data)
					}
				}
			});
			
		});
		
		getDataMakeRuleFn(id);
		
	};
	
	
	updateExplainFn = function(id){
		
		var approve = ""	
			if($("#cdmd_explain_no_explanation:checked").val()){
				approve = 1;
			}else if($("#cdmd_explain_pending:checked").val()){
				approve = 2;
			}else if($("#cdmd_explain_approve:checked").val()){
				approve = 3;
			}else if($("#cdmd_explain_not_allowed:checked").val()){
				approve = 4;
			}
		//alert(approve);
		
		$.ajax({
			url : restfulURL + "/api/make_data_quality_monitoring/"+id,							
			type : "PUT",
			dataType : "json",
			data : {"cdmd":approve},	
			success : function(data) {
				alert("สำเร็จ");
			}
		});
		return false;
	}

	/*var searchAdvanceFn = function(searchText) {
		$.ajax({
			url : restfulURL + "/api/dqs_rule/?rule_name__regex=/^"+searchText+"/i",
			type : "get",
			dataType : "json",
			success : function(data) {
				//listRuleFn(data);
			}
		});
	}*/
	
	var findOneFn = function(id) {
		//console.log(data);
		var htmlTable = "";
		$.ajax({
			url:restfulURL+"/api/make_data_quality_monitoring/"+id,
			type : "get",
			dataType : "json",
			async:false,
			success : function(data) {	
				
				htmlTable += "<div class='label-detail'>";
				htmlTable += "<div class='box1'><b>CIF</b> : "+data["cif"]+"</div>";
				htmlTable += "</div>";
				
				htmlTable += "<input type='hidden' id='validate_header_id_hidden' value='"+data["_id"]+"'>";
				
				htmlTable +="<div class='label-detail'>";
				htmlTable +="<div class='box2'><b>Name</b> : "+data["customername"]+"</div>";
				htmlTable +="</div>";
         	
				htmlTable +="<div class='label-detail'>";
				htmlTable +="<div class='box3'><b>Customer Type</b> : "+data["customertype"]+"</div>";
				htmlTable +="</div>";
         	
				htmlTable +="<div class='label-detail'>";
				htmlTable +="<div class='box4'><b>Branch</b> : "+data["lastcontactbranch"]+"</div>";
				htmlTable +="</div>";
         	
				htmlTable +="<div class='label-detail'>";
				htmlTable +="<div class='box5'><b>Last Contact Date</b> : "+data["lasttransbranch"]+"</div>";
				htmlTable +="</div>";
				htmlTable +="<br style='clear:both'>";
								
				$("#detail_id").html(htmlTable);
			}
		});
	};
	
	var listDataQualityFn = function(data) {
		
		// Destroy DataTable
		if ($.fn.DataTable.isDataTable('#tableDataQuality')) {
			$('#tableDataQuality').DataTable().destroy(); 
		}
		
		//console.log(data);
		var htmlTable = "";
		
		$.each(data,function(index,indexEntry) {
			htmlTable += "<tr>";
			htmlTable += "<td>"+ (index + 1)+ "</td>";
			htmlTable += "<td>"+ indexEntry["cif"]+ "</td>";
			htmlTable += "<td>"+ indexEntry["customername"]+ "</td>";
			htmlTable += "<td>"+ indexEntry["customertype"]+ "</td>";
			htmlTable += "<td>"+ indexEntry["lastcontactbranch"]+ "</td>";
			htmlTable += "<td>"+ indexEntry["lastcontactdate"]+ "</td>";
			htmlTable += "<td>"+ indexEntry["lasttransbranch"]+ "</td>";
			htmlTable += "<td>"+ indexEntry["rule"]+ "</td>";
			htmlTable += "<td>"+ indexEntry["maxday"]+ "</td>";
			htmlTable += "<td><div class='text-inline-table'><i class='fa fa fa-search font-management modalDetail' data-target='#modalDetail' data-toggle='modal' id="+indexEntry["_id"]+"></i>&nbsp;&nbsp;<i class='fa fa-paperclip font-management modalPaperchip' data-target='#addModal' data-toggle='modal'></i></div></td>";  
			htmlTable += "</tr>";
		});
		$("#listDataQuality").html(htmlTable);	
		
		$('#tableDataQuality').DataTable( { "dom": '<"top"flp>rt<"bottom"lp><"clear">' } ); 
		
		//*******click แล้ว clear ข้อมูล ด้วย********
		$(".modalDetail").click(function(){
			
			
			findOneFn(this.id);
			$("#id").val(this.id);
			
			/*var crf=$(this).parent().parent().parent().children().get()[1];
			
			var crfID=$(crf).text();*/
			//console.log($(crf).text());
			
			//getDataMakeRuleFn(crfID);
			getDataMakeRuleFn(this.id);
			
		});
	};
	
	var listMakeDetailRuleFn = function(data) {
		
		// Destroy DataTable
		if ($.fn.DataTable.isDataTable('#tableMakeRuleQuality')) {
			$('#tableMakeRuleQuality').DataTable().destroy(); 
		}
		
		//console.log(data);
		var htmlTable = "";
		
		//$("#validate_header_id_hidden").val()
		
		$.each(data,function(index,indexEntry) {
			htmlTable += "<tr>";
			htmlTable += "<td>"+ (index + 1)+ "</td>";
			htmlTable += "<td>"+ indexEntry["rule_group"]+ "</td>";
			htmlTable += "<td>"+ indexEntry["rule"]+ "</td>";
			htmlTable += "<td>"+ indexEntry["day"]+ "</td>";
			
			if(indexEntry["kpi_flag"]==1){
				htmlTable += "<td><input disabled type=\"checkbox\" class='kpi_checkbox' id=kpiFlagCheckbox-"+indexEntry["_id"]+" checked='checked' ></td>";
			}else if(indexEntry["kpi_flag"]==0){
				htmlTable += "<td><input disabled type=\"checkbox\" class='kpi_checkbox' id=kpiFlagCheckbox-"+indexEntry["_id"]+" ></td>";
			}
			
			htmlTable+="<td><select disabled class=\"form-control input-inline-table validate_status\" id=validate_status-"+indexEntry["_id"]+"></select></td>";	
			
			if(indexEntry["no_doc"]==1){
				htmlTable += "<td><input disabled type=\"checkbox\" class='no_doc_checkbox' id=no_doc_checkbox-"+indexEntry["_id"]+" checked='checked' ></td>";
			}else if(indexEntry["no_doc"]==0){
				htmlTable += "<td><input disabled type=\"checkbox\" class='no_doc_checkbox' id=no_doc_checkbox-"+indexEntry["_id"]+" ></td>";
			}
			
			htmlTable += "</tr>";
			
			$("#tableDataMakeRuleQuality").html(htmlTable);
			 
			//alert(indexEntry["validate_status"]);
			dropDownListValidateStatus(indexEntry["validate_status"],indexEntry["_id"]);
		});
			 
		$('#tableMakeRuleQuality').DataTable( { "dom": '<"top"flp>rt<"bottom"lp><"clear">' } ); 
		
		//click ที่ checkox KPI แล้ว แยกไอดี ส่งไปฝัง(embed) 
		$(".kpi_checkbox").click(function(){	
			var id = this.id.split("-"); 
			embedParamCheckboxKPI(id[1]);
			//alert(id[1]);		
		});
		
		//click ที่ dropdown validate แล้ว แยกไอดี ส่งไปฝัง(embed) 
		$(".validate_status").click(function(){		
			var id = this.id.split("-"); 
			embedParamValidateStatus(id[1]);
			//alert(id[1]);		
		});
		
		//click ที่ checkox KPI แล้ว แยกไอดี ส่งไปฝัง(embed) 
		$(".no_doc_checkbox").click(function(){	
			var id = this.id.split("-"); 
			embedParamCheckboxNoDoc(id[1]);
			//alert(id[1]);		
		});
	};
	
	var fineOneExplainFn = function(data){
		//console.log(data[0]['cdmd']);
		if(data[0]['cdmd']==1){
			$('#cdmd_explain_no_explanation').prop('checked', true);
		}
		if(data[0]['cdmd']==2){
			$('#cdmd_explain_pending').prop('checked', true);
		}
		if(data[0]['cdmd']==3){
			$('#cdmd_explain_approve').prop('checked', true);
		}
		if(data[0]['cdmd']==4){
			$('#cdmd_explain_not_allowed').prop('checked', true);
		}
	}
	
	// Click แล้ว ฝังข้อมูล
	var embedParamValidateStatus = function(id){
		//alert(id);
		var count = 0;
		
		$.each($(".embed_validate_status").get(),function(index,indexEnry){
		//ถ้า id ที่วน == id ที่มี	
			if($(indexEnry).val()==id){
				count+=1;
			}
		});
		
		if(count>0){
			$("#embed_validate_status-"+id).remove();
			$("body").append("<input type='hidden' class='embed_validate_status' id='embed_validate_status-"+id+"' name='embed_validate_status-"+id+"' value='"+id+"'>");
		}else{
			$("body").append("<input type='hidden' class='embed_validate_status' id='embed_validate_status-"+id+"' name='embed_validate_status-"+id+"' value='"+id+"'>");
		}
		
	}
	
	// Click แล้ว ฝังข้อมูล
	var embedParamCheckboxKPI = function(id){

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
	var embedParamCheckboxNoDoc = function(id){

		var count = 0;	
		$.each($(".embed_nodoc").get(),function(index,indexEnry){
		//ถ้า id ที่วน == id ที่มี	
			if($(indexEnry).val()==id){
				count+=1;
			}
		});
		if(count>0){
			$("#embed_nodoc-"+id).remove();
			$("body").append("<input type='hidden' class='embed_nodoc' id='embed_nodoc-"+id+"' name='embed_nodoc-"+id+"' value='"+id+"'>");
		}else{
			$("body").append("<input type='hidden' class='embed_nodoc' id='embed_nodoc-"+id+"' name='embed_nodoc-"+id+"' value='"+id+"'>");
		}
		
	}
	
	//DropDownValidate
	var dropDownListValidateStatus = function(name,id){
		//alert(name);
		$.ajax ({
			url:restfulURL+"/api/make_param_validate_status",
			type:"get" ,
			dataType:"json" ,
				success:function(data){
					var htmlTable="";
					$.each(data,function(index,indexEntry){
						if(name==indexEntry["validate_status_name"]){
							htmlTable+="<option value="+indexEntry["validate_status_name"]+" selected>"+indexEntry["validate_status_name"]+"</option>";		
						}else{
							htmlTable+="<option value="+indexEntry["validate_status_name"]+">"+indexEntry["validate_status_name"]+"</option>";		
						}
					});	
					$("#validate_status-"+id).html(htmlTable);
				}
		});
	};
	
	var getDataFn = function() {
		$.ajax({
			url : restfulURL + "/api/make_data_quality_monitoring",
			type : "get",
			dataType : "json",
			success : function(data) {
				listDataQualityFn(data);
				//console.log(data);
			}
		});
	};
	//Call Function start
	  getDataFn();
	  
	var getDataMakeRuleFn = function(id) {
		$.ajax({
			url : restfulURL + "/api/make_dqs_inital_validate/?validate_header_id__regex=/^"+id+"/i",
			type : "get",
			dataType : "json",
			async:false,
			success : function(data) {
				listMakeDetailRuleFn(data);
				//console.log(data);
			}
		});
	};
	
	var getDataMakeExplainFn = function(id) {
		//alert(id);
		$.ajax({
			url : restfulURL + "/api/make_data_quality_monitoring/",
			type : "get",
			dataType : "json",
			async:false,
			success : function(data) {
				fineOneExplainFn(data);
				//console.log(data);
			}
		});
	};
	
	$("#btnSearch").click(function(){
		searchFn($("#searchCitizen").val());
		return false;
	});
	
	$("#btnSearchAdvance").click(function(){
		searchAdvanceFn($("#searchAdvanceRule").val());
		return false;
	});

	$("#btnSubmit").click(function(){
		alert("save");
		updateFn(); 
	});
	
	$("#btnEdit").click(function() {
		$(".kpi_checkbox").removeAttr("disabled");
		$(".no_doc_checkbox").removeAttr("disabled");
		$(".validate_status").removeAttr("disabled");	
	});
	
	$("#btnCancle").click(function() {
		var id = $("#validate_header_id_hidden").val();
		getDataMakeRuleFn(id);
	});
	
	$(".btn-explain").click(function() {
		getDataMakeExplainFn($("#validate_header_id_hidden").val());
		$("#explain_id").val($("#validate_header_id_hidden").val());
	});
	
	$("#btnSaveExplain").click(function() {
		updateExplainFn($("#explain_id").val());
	});

});
