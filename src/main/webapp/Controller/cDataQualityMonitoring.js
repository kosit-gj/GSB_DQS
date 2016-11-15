
$(document).ready(function(){
	//alert("hello jquery");
	$(".btn-explain").click(function(){
		$("#modalDetail").modal('hide');
		$("#exPlainModal").modal();
	});
	
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
	
	var updateFn = function() {		
		$.ajax({
			url:restfulURL+"/api/dqs_citizen_import/"+$("#id").val(),
			type : "PUT",
			dataType : "json",
			data : {"pid" : $("#cifno_citizen").val(),
				"nfname" : $("#nfname_citizen").val(),
				"nlname" : $("#nlname_citizen").val(),
				"ntitle" : $("#ntitle_citizen").val(),
				"sex" : sex ,
				"ndob": ndob,
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
		$("#day_citizen_area").html(selectDobDayHTML);
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
		$("#month_citizen_area").html(selectDobMonthHTML);
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
		$("#year_citizen_area").html(selectDobYearHTML);
			
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
				
				$("#id_citizen").val(data['id']);
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
	
	var findOneDataFn = function(id) {
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
				
				htmlTable += "<input type='text' id='cif_id_hidden' value='"+data["cif"]+"'>";
				
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
		console.log(data);
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
		
		$(".modalDetail").click(function(){
			alert("test");
			findOneDataFn(this.id);
			$("#id").val(this.id);
			
			var crf=$(this).parent().parent().parent().children().get()[1];
			var crfID=$(crf).text();
			//console.log($(crf).text());
			
			getDataMakeRuleFn(crfID);
		});
	};
	
	var listMakeDetailRuleFn = function(data) {
		console.log(data);
		var htmlTable = "";
		
		//$("#cif_id_hidden").val()
		
		$.each(data,function(index,indexEntry) {
			htmlTable += "<tr>";
			htmlTable += "<td>"+ (index + 1)+ "</td>";
			htmlTable += "<td>"+ indexEntry["rule_group"]+ "</td>";
			htmlTable += "<td>"+ indexEntry["rule"]+ "</td>";
			htmlTable += "<td>"+ indexEntry["day"]+ "</td>";
			
			if(indexEntry["kpi_flag"]==1){
				htmlTable += "<td><input type=\"checkbox\" class='' id=kpiFlagCheckbox-"+indexEntry["_id"]+" checked='checked' ></td>";
			}else if(indexEntry["kpi_flag"]==0){
				htmlTable += "<td><input type=\"checkbox\" class='' id=kpiFlagCheckbox-"+indexEntry["_id"]+" ></td>";
			}
			
			htmlTable += "<td><select><option>"+ indexEntry["validate_status"]+"</opion></select></td>";
			
			if(indexEntry["cif_no"]==1){
				htmlTable += "<td><input type=\"checkbox\" class='' id=cifNoCheckbox-"+indexEntry["_id"]+" checked='checked' ></td>";
			}else if(indexEntry["cif_no"]==0){
				htmlTable += "<td><input type=\"checkbox\" class='' id=cifNoCheckbox-"+indexEntry["_id"]+" ></td>";
			}
			
			
			htmlTable += "</tr>";
		});
		$("#tableDataMakeRuleQuality").html(htmlTable);	 
		
		$('#tableMakeRuleQuality').DataTable( { "dom": '<"top"flp>rt<"bottom"lp><"clear">' } ); 
		
		
	};
	
	var getDataFn = function() {
		$.ajax({
			url : restfulURL + "/api/make_data_quality_monitoring",
			type : "get",
			dataType : "json",
			success : function(data) {
				listDataQualityFn(data);
				console.log(data);
			}
		});
	};
	//Call Function start
	  getDataFn();
	  
	  var getDataMakeRuleFn = function(id) {
			$.ajax({
				url : restfulURL + "/api/make_dqs_inital_validate/?cif__regex=/^"+id+"/i",
				type : "get",
				dataType : "json",
				success : function(data) {
					listMakeDetailRuleFn(data);
					console.log(data);
				}
			});
		};
		//Call Function start
		  
	 	
	$("#btnSearch").click(function(){
		searchFn($("#searchCitizen").val());
		   return false;
	});
	
	$("#btnSearchAdvance").click(function(){
		searchAdvanceFn($("#searchAdvanceRule").val());
		   return false;
	});
	
	
	

	$("#btnSave").click(function(){
		
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