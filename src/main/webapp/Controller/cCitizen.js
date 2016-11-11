$(document).ready(function(){

	var restfulURL = "http://192.168.1.49:3001"; 
	//var restfulURL = "http://goingjesse.hopto.org:3001";
	
	
	/*var checkUniqueFn = function(text) {
		 http://localhost:3000/api/products?name__regex=/^test/i 
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
	
	}*/
	var insertFn = function() {
		
		var sex = ""
			if($("#sex_citizen_men:checked").val()){
				sex = 1;
			}else if($("#sex_citizen_women:checked").val()){
				sex = 0;
			}
		
		var month_citizen = ""
			if($("#month_citizen").val()=="มกราคม"){
				month_citizen = "01";
			}else if($("#month_citizen").val()=="กุมภาพันธ์"){
				month_citizen = "02";
			}else if($("#month_citizen").val()=="มีนาคม"){
				month_citizen = "03";
			}else if($("#month_citizen").val()=="เมษายน"){
				month_citizen = "04";
			}else if($("#month_citizen").val()=="พฤษภาคม"){
				month_citizen = "05";
			}else if($("#month_citizen").val()=="มิถุนายน"){
				month_citizen = "06";
			}else if($("#month_citizen").val()=="กรกฎาคม"){
				month_citizen = "07";
			}else if($("#month_citizen").val()=="สิงหาคม"){
				month_citizen = "08";
			}else if($("#month_citizen").val()=="กันยายน"){
				month_citizen = "09";
			}else if($("#month_citizen").val()=="ตุลาคม"){
				month_citizen = "10";
			}else if($("#month_citizen").val()=="พฤศจิกายน"){
				month_citizen = "11";
			}else if($("#month_citizen").val()=="ธันวาคม"){
				month_citizen = "12";
			}
		
		var day_citizen = ""
			if($("#day_citizen").val()==1){
				day_citizen = "01";
			}else if($("#day_citizen").val()==2){
				day_citizen = "02";
			}else if($("#day_citizen").val()==3){
				day_citizen = "03";
			}else if($("#day_citizen").val()==4){
				day_citizen = "04";
			}else if($("#day_citizen").val()==5){
				day_citizen = "05";
			}else if($("#day_citizen").val()==6){
				day_citizen = "06";
			}else if($("#day_citizen").val()==7){
				day_citizen = "07";
			}else if($("#day_citizen").val()==8){
				day_citizen = "08";
			}else if($("#day_citizen").val()==9){
				day_citizen = "09";
			}else if($("#day_citizen").val()>=10){
				day_citizen = $("#day_citizen").val();
			}
		
		var ndob = day_citizen+""+month_citizen+""+$("#year_citizen").val();
		
		$.ajax({
			url:restfulURL+"/api/dqs_citizen_import/",
			type : "POST",
			dataType : "json",
			data : {"pid" : $("#cifno_citizen").val(),
				"nfname" : $("#nfname_citizen").val(),
				"nlname" : $("#nlname_citizen").val(),
				"ntitle" : $("#ntitle_citizen").val(),
				"ndob": ndob,
				"sex" :  sex,
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
					alert("Insert Success");
					getDataFn();
					clearFn();
					$('#ModalCitizen').modal('hide');
				}
			}
		});
		
	}
	
	var updateFn = function() {
		
		var sex = ""
			
		if($("#sex_citizen_men:checked").val()){
			sex = 1;
		}else if($("#sex_citizen_women:checked").val()){
			sex = 0;
		}
		
		var month_citizen = ""
			if($("#month_citizen").val()=="มกราคม"){
				month_citizen = "01";
			}else if($("#month_citizen").val()=="กุมภาพันธ์"){
				month_citizen = "02";
			}else if($("#month_citizen").val()=="มีนาคม"){
				month_citizen = "03";
			}else if($("#month_citizen").val()=="เมษายน"){
				month_citizen = "04";
			}else if($("#month_citizen").val()=="พฤษภาคม"){
				month_citizen = "05";
			}else if($("#month_citizen").val()=="มิถุนายน"){
				month_citizen = "06";
			}else if($("#month_citizen").val()=="กรกฎาคม"){
				month_citizen = "07";
			}else if($("#month_citizen").val()=="สิงหาคม"){
				month_citizen = "08";
			}else if($("#month_citizen").val()=="กันยายน"){
				month_citizen = "09";
			}else if($("#month_citizen").val()=="ตุลาคม"){
				month_citizen = "10";
			}else if($("#month_citizen").val()=="พฤศจิกายน"){
				month_citizen = "11";
			}else if($("#month_citizen").val()=="ธันวาคม"){
				month_citizen = "12";
			}
		
		var day_citizen = ""
			if($("#day_citizen").val()==1){
				day_citizen = "01";
			}else if($("#day_citizen").val()==2){
				day_citizen = "02";
			}else if($("#day_citizen").val()==3){
				day_citizen = "03";
			}else if($("#day_citizen").val()==4){
				day_citizen = "04";
			}else if($("#day_citizen").val()==5){
				day_citizen = "05";
			}else if($("#day_citizen").val()==6){
				day_citizen = "06";
			}else if($("#day_citizen").val()==7){
				day_citizen = "07";
			}else if($("#day_citizen").val()==8){
				day_citizen = "08";
			}else if($("#day_citizen").val()==9){
				day_citizen = "09";
			}else if($("#day_citizen").val()>=10){
				day_citizen = $("#day_citizen").val();
			}
		
		var ndob = day_citizen+""+month_citizen+""+$("#year_citizen").val();
			
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
					$('#ModalCitizen').modal('hide');
				}
			}
		});
		return false;
	};
	
	var clearFn = function() {
		$("#id").val("");
		$("#action").val("add");
		//$("#rule_name").val("");
		$("#btnSubmit").val("Add");
		
		$("#cifno_citizen").val(""),
		$("#nfname_citizen").val(""),
		$("#nlname_citizen").val(""),
		$("#ntitle_citizen").val(""),
		dropdownDobYear();
		dropdownDobMouth();
		dropdownDobDay();
		$("#hno_citizen").val(""),
		$("#moo_citizen").val(""),
		$("#trok_citizen").val(""),
		$("#soi_citizen").val(""),
		$("#thanon_citizen").val(""),
		$("#thumbol_citizen").val(""),
		$("#amphur_citizen").val(""),
		$("#province_citizen").val(""),
		$("#flag1_citizen").val(""),
		$("#flag2_citizen").val("")
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
	
	var listCitizenFn = function(data) {
		console.log(data);
		var htmlTable = "";
		var sexed =""
		$.each(data,function(index,indexEntry) {
		
		if (indexEntry["sex"]==1){
			sexed = "ชาย"
		}else if (indexEntry["sex"]==0){
			sexed = "หญิง"
		}
			
		htmlTable += "<tr>";
		htmlTable += "<td>"+ indexEntry["pid"]+ "</td>";
		htmlTable += "<td>"+ (index + 1)+ "</td>";
		htmlTable += "<td>"+ indexEntry["ntitle"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["nfname"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["nlname"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["ndob"]+ "</td>";
		htmlTable += "<td>"+sexed+"</td>";

		htmlTable += "<td><i class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-warning btn-xs edit' id="+ indexEntry["_id"]+ " data-target=#ModalCitizen data-toggle='modal'>Edit</button>&nbsp;<button id="+indexEntry["_id"]+" class='btn btn-danger btn-xs del'>Delete</button>\"></i></td>";
		htmlTable += "</tr>";
		});
	
		$("#listCitizen").html(htmlTable);
		
		$('#tableCitizen').DataTable( { "dom": '<"top"flp>rt<"bottom"lp><"clear">' } ); 
		
		//get 3 fuction in add citizen
		dropdownDobYear();
		dropdownDobMouth();
		dropdownDobDay();
		
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
	
	$("#btnAddCitizen").click(function(){
		clearFn();
	})

	$("#btnSubmit").click(function(){
		if ($("#action").val() == "add"|| $("#action").val() == "") {
			insertFn();
		}else{
			updateFn();
		}
		//updateFn();
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