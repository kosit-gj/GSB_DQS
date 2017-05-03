//Global variable
var galbalDataCitizen=[];
//binding tooltip.
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});
function numbersonly(e){
    var unicode=e.charCode? e.charCode : e.keyCode
    if (unicode!=8){ //if the key isn't the backspace key (which we should allow)
        if (unicode<48||unicode>57) //if not a number
            return false //disable key press
    }
}
var getDataFn = function(page,rpp){
	
	var cif_no= $("#paramEmbedCifNo").val();
	var npid= $("#paramEmbedNpid").val();
	var flag_2= $("#paramEmbedFlag2").val();
	var manual_add= $("#paramEmbedManualAdd").val();

	$.ajax({
		url : restfulURL + "/dqs_api/public/dqs_citizen_import",
		type : "get",
		dataType : "json",
		data:{"page":page,"rpp":rpp,
			"cif_no":cif_no,
			"npid":npid,
			"flag_2":flag_2,
			"manual_add_flag":manual_add	
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success : function(data) {
			checkMaintenanceFn(data);
			listCitizenFn(data['data']);
			//total
			galbalDataCitizen=data;
			paginationSetUpFn(galbalDataCitizen['current_page'],galbalDataCitizen['last_page'],galbalDataCitizen['last_page']);
		}
	});
};

var listCitizenFn = function(data) {	
	var htmlTable = "";
	var sexed ="";
	var manualAdd="";
	$.each(data,function(index,indexEntry) {
		if (indexEntry["nsex"]==1){
			sexed = "ชาย";
		}else if (indexEntry["nsex"]==2){
			sexed = "หญิง";
		}else{
			sexed = "อื่นๆ";
		}
		if (indexEntry["manual_add_flag"]==1){
			manualAdd = "<input disabled type='checkbox' name='manual_add' id='manual_add' checked value='1'>";
		}else if (indexEntry["manual_add_flag"]==0){
			manualAdd = "<input disabled type='checkbox' name='manual_add' id='manual_add'  value='0'>";
		}
		htmlTable += "<tr class='rowSearch'>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["cif"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["npid"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["ntitle"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["nfname"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["nlname"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["ndob"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+sexed+"</td>";
		htmlTable += "<td class='objectCenter'>"+manualAdd+"</td>";
		
		htmlTable += "<td class='objectCenter'><i class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-warning btn-xs edit' id="+ indexEntry["cif"]+ " data-target=#ModalCitizen data-toggle='modal'>Edit</button>&nbsp;<button id="+indexEntry["cif"]+" class='btn btn-danger btn-xs del'>Delete</button>\"></i></td>";
		htmlTable += "</tr>";
	});

	$("#listCitizen").html(htmlTable);
	$("#tableCitizen_wrapper").click(function(){
		$(".popover-edit-del").popover();
	});
	
	//function popover
	$(".popover-edit-del").popover();
	
	$("#tableCitizen").off("click",".popover-edit-del");
	//findOnd
	$("#tableCitizen").on("click",".popover-edit-del",function(){
		
		$(".edit").on("click",function() {
			
			$("#modalTitleRole").html("Edit Citizen");
			$("#modalDescription").html("EDIT CITIZEN");
			
			$(this).parent().parent().parent().children().click();
			$(".text_add_edit").text("EDIT FILE");
			$("#btnAddAnother").hide();
			$("#cifno_citizen").attr("disabled","disabled"); 
			$("#ntitle_citizen").attr("disabled","disabled"); 
			$("#nfname_citizen").attr("disabled","disabled"); 
			$("#nlname_citizen").attr("disabled","disabled"); 
			$("#hno_citizen").attr("disabled","disabled"); 
			$("#moo_citizen").attr("disabled","disabled"); 
			$("#trok_citizen").attr("disabled","disabled"); 
			$("#soi_citizen").attr("disabled","disabled"); 
			$("#thanon_citizen").attr("disabled","disabled"); 
			$("#thumbol_citizen").attr("disabled","disabled"); 
			$("#amphur_citizen").attr("disabled","disabled");
			$("#province_citizen").attr("disabled","disabled");
			$("#flag1_citizen").attr("disabled","disabled");
			$("#flag2_citizen").attr("disabled","disabled");
			$('#sex_citizen_other').attr("disabled","disabled");
			
			//Binding Date Picker Start. 	
			//$("#dob_citizen").datepicker();
		    //$("#dob_citizen").datepicker( "option", "dateFormat", "yymmdd" );
		    //$(".ui-datepicker").hide();
		    			
			findOneFn(this.id);
			$("#id").val(this.id);
			$("#action").val("edit");
			$("#btnSubmit").val("Edit");		

			jQuery('.numberOnly').keyup(function () { 
			    this.value = this.value.replace(/[^0-9\.]/g,'');
			});
//			$(".numberOnly").keydown(function (e) {
//				        // Allow: backspace, delete, tab, escape, enter and .
//					
//				        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
//				             // Allow: Ctrl+A, Command+A
//				            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
//				             // Allow: home, end, left, right, down, up
//				            (e.keyCode >= 35 && e.keyCode <= 40)) {
//				                 // let it happen, don't do anything
//				                 return;
//				        }
//				        // Ensure that it is a number and stop the keypress
//				        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
//				            e.preventDefault();
//				        }
//				});
			
		});
		
		$(".del").on("click",function(){
			var id = this.id;
			$(this).parent().parent().parent().children().click();
			$("#confrimModal").modal();
			$(document).off("click","#btnConfirmOK");
			$(document).on("click","#btnConfirmOK",function(){
				$.ajax({
					 url:restfulURL+"/dqs_api/public/dqs_citizen_import/"+id,
					 type : "delete",
					 dataType:"json",
					 headers:{Authorization:"Bearer "+tokenID.token},
				     success:function(data){    
				    	 checkMaintenanceFn(data);
					     if(data['status']==200){					    	 
					       callFlashSlide("Delete Successfully.");  
					       getDataFn($("#pageNumber").val(),$("#rpp").val());
					       clearFn();
					       $("#confrimModal").modal('hide');
					       
					     }
					 }
				});
				
			});
			
		});	
	
	});
		
};
//Action Search for Edit. 
var findOneFn = function(id) {
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_citizen_import/"+ id,
		type : "get",
		dataType : "json",
		 headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {		
			checkMaintenanceFn(data);
			$("#id_citizen").val(data['npid']);
			$("#cifno_citizen").val(data['ref_no']);
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
			$("#dob_citizen").val(data['ndob']);
			
			$("#createBy").html(data['created_by']);
			$("#createDateTime").html(data['created_dttm']);
			$("#updateBy").html(data['updated_by']);
			$("#updateDateTime").html(data['updated_dttm']);
			
			//sex
			if(data['nsex']==1){
				$('#sex_citizen_men').prop('checked', true);
			}else if(data['nsex']==2){
				$('#sex_citizen_women').prop('checked', true);
			}else{
				$('#sex_citizen_other').prop('checked', true);
				$('#sex_citizen_other').val(data['nsex']);
			}
			
			//flag
			$("#flag1_citizen").val(data['flag']);
			
			$("#flag2_citizen").val(data['flag_1']);
			
			//nation
			if(data['thai_flag']==1){
				$('#nation_citizen_thai').prop('checked', true);
			}
			if(data['thai_flag']==0){
				$('#nation_citizen_other').prop('checked', true);
			}
			
			//manual_add_flag
			if(data['manual_add_flag']==1){
				$('#manual_add_flag').prop('checked', true);
			}else{
				$('#manual_add_flag').prop('checked', false);
			}
		}
	});
};
//Check Validation
var validationFn = function(data){
	var validate="";
	if(data['data']['ref_no']!=undefined){
		validate+="<font color='red'>*</font> "+data['data']['ref_no']+"<br>";
	}
	if(data['data']['npid']!=undefined){
		validate+="<font color='red'>*</font> "+data['data']['npid']+"<br>";
	}
	if(data['data']['fname']!=undefined){
		validate+="<font color='red'>*</font> "+data['data']['fname']+"<br>";
	}if(data['data']['lname']!=undefined){
		validate+="<font color='red'>*</font> "+data['data']['lname']+"<br>";
	}if(data['data']['dob']!=undefined){
		validate+="<font color='red'>*</font> "+data['data']['dob']+"<br>";
	}
	if(data['data']['ntitle']!=undefined){
		validate+="<font color='red'>*</font> "+data['data']['ntitle']+"<br>";
	}if(data['data']['sex']!=undefined){
		validate+="<font color='red'>*</font> "+data['data']['sex']+"<br>";
	}
	if(data['data']['hno']!=undefined){
		validate+="<font color='red'>*</font> "+data['data']['hno']+"<br>";
	}
	
	if(data['data']['thumbol']!=undefined){
		validate+="<font color='red'>*</font> "+data['data']['thumbol']+"<br>";
	}
	if(data['data']['amphur']!=undefined){
		validate+="<font color='red'>*</font> "+data['data']['amphur']+"<br>";
	}
	if(data['data']['province']!=undefined){
		validate+="<font color='red'>*</font> "+data['data']['province']+"<br>";
	}
	if(data['data']['flag']!=undefined){
		validate+="<font color='red'>*</font> "+data['data']['flag']+"<br>";
	}
	if(data['data']['flag_1']!=undefined){
		validate+="<font color='red'>*</font> "+data['data']['flag_1']+"<br>";
	}
	
	callFlashSlideInModal(validate,"#information","error");
};
//Insert
var insertFn = function(param) {
	
	var sex = "";
		if($("#sex_citizen_men:checked").val()){
			sex = 1;
		}
		if($("#sex_citizen_women:checked").val()){
			sex = 2;
		}
		
	var nation_citizen="";
	
		if($("#nation_citizen_thai:checked").val()){
			nation_citizen="1";
		}else{
			nation_citizen="0";
		}
		
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_citizen_import",
		type : "POST",
		dataType : "json",
		data : {
			
			"ref_no":$("#cifno_citizen").val(),
			"npid":$("#id_citizen").val(),
			"ntitle":$("#ntitle_citizen").val(),
			"fname":$("#nfname_citizen").val(),
			"lname":$("#nlname_citizen").val(),
			"dob":$("#dob_citizen").val(),
			"sex":sex,
			"hno":$("#hno_citizen").val(),
			"moo":$("#moo_citizen").val(),
			"trok":$("#trok_citizen").val(),
			"soi":$("#soi_citizen").val(),
			"thanon":$("#thanon_citizen").val(),
			"thumbol":$("#thumbol_citizen").val(),
			"amphur":$("#amphur_citizen").val(),
			"province":$("#province_citizen").val(),
			"flag":$("#flag1_citizen").val(),
			"flag_1":$("#flag2_citizen").val(),
			"manual_add_flag":$("#manual_add_flag").val(),
			"thai_flag":nation_citizen
			
		},	
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			checkMaintenanceFn(data);
			if (data['status'] == "200") {
			
				   if(param !="saveAndAnother"){
					   callFlashSlide("Insert Successfully.");
				       getDataFn($("#pageNumber").val(),$("#rpp").val());
				       clearFn();
				 	   $('#ModalCitizen').modal('hide');
					}else{
						getDataFn($("#pageNumber").val(),$("#rpp").val());
						clearFn();
						callFlashSlideInModal("Insert Data is Successfully.","#information");
					}
				   
				   
			}else if (data['status'] == "400") {
				
				validationFn(data);
			}
		}
	});
	
};
//Update
var updateFn = function() {
	
	var sex = "";
	var nation_citizen="";
	
	if($("#sex_citizen_men:checked").val()){
		sex = 1;
	}else if($("#sex_citizen_women:checked").val()){
		sex = 2;
	}else{
		sex = $("#sex_citizen_other").val();
	}
	
	
	if($("#nation_citizen_thai:checked").val()){
		nation_citizen="1";
	}else{
		nation_citizen="0";
	}
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_citizen_import/"+$("#id").val(),
		type : "PATCH",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		data : {
			"ref_no":$("#cifno_citizen").val(),
			"npid":$("#id_citizen").val(),
			"ntitle":$("#ntitle_citizen").val(),
			"fname":$("#nfname_citizen").val(),
			"lname":$("#nlname_citizen").val(),
			"dob":$("#dob_citizen").val(),
			"sex":sex,
			"hno":$("#hno_citizen").val(),
			"moo":$("#moo_citizen").val(),
			"trok":$("#trok_citizen").val(),
			"soi":$("#soi_citizen").val(),
			"thanon":$("#thanon_citizen").val(),
			"thumbol":$("#thumbol_citizen").val(),
			"amphur":$("#amphur_citizen").val(),
			"province":$("#province_citizen").val(),
			"flag":$("#flag1_citizen").val(),
			"flag_1":$("#flag2_citizen").val(),
			"manual_add_flag":$("#manual_add_flag").val(),
			"thai_flag":nation_citizen
			
			
		},	
		success : function(data) {
			checkMaintenanceFn(data);
			if (data['status'] == "200") {
		
				getDataFn($("#pageNumber").val(),$("#rpp").val());
				//getDataFn(1,$("#rpp").val());
				clearFn();
				$('#ModalCitizen').modal('hide');
				callFlashSlide("Update Successfully.");
			}else if (data['status'] == "400") {
				validationFn(data);
			}
		}
	});
	return false;
};
//Clear
var clearFn = function() {
	
	$("#information").hide();
	$("#modalTitleRole").html("Add New Citizen");
	$("#modalDescription").html("ADD NEW CITIZEN");
	$("#id_citizen").val("");
	$("#action").val("add");
	//$("#rule_name").val("");
	$("#btnSubmit").val("Add");
	
	$("#dob_citizen").val("");
	$("#cifno_citizen").val("");
	$("#nfname_citizen").val("");
	$("#nlname_citizen").val("");
	$("#ntitle_citizen").val("");

	$("#hno_citizen").val("");
	$("#moo_citizen").val("");
	$("#trok_citizen").val("");
	$("#soi_citizen").val("");
	$("#thanon_citizen").val("");
	$("#thumbol_citizen").val("");
	$("#amphur_citizen").val("");
	$("#province_citizen").val("");
	$("#flag1_citizen").val("");
	$("#flag2_citizen").val("");
	$('#sex_citizen_other').val("");
	
	$("#cifno_citizen").removeAttr("disabled"); 
	$("#ntitle_citizen").removeAttr("disabled"); 
	$("#nfname_citizen").removeAttr("disabled"); 
	$("#nlname_citizen").removeAttr("disabled"); 
	$("#hno_citizen").removeAttr("disabled"); 
	$("#moo_citizen").removeAttr("disabled"); 
	$("#trok_citizen").removeAttr("disabled"); 
	$("#soi_citizen").removeAttr("disabled"); 
	$("#thanon_citizen").removeAttr("disabled"); 
	$("#thumbol_citizen").removeAttr("disabled"); 
	$("#amphur_citizen").removeAttr("disabled");
	$("#province_citizen").removeAttr("disabled");
	$("#flag1_citizen").removeAttr("disabled");
	$("#flag2_citizen").removeAttr("disabled");
	$(".information").hide();
};
//SearchAdvance
var searchAdvanceFn = function(cif_no,npid,flag_2,manual_add) {
	//embed parameter start
	var htmlParam="";
	htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedCifNo' name='paramEmbedCifNo' value='"+cif_no+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedNpid' name='paramEmbedNpid' value='"+npid+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedFlag2' name='paramEmbedFlag2' value='"+flag_2+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedManualAdd' name='paramEmbedManualAdd' value='"+manual_add+"'>";
	$(".paramEmbed").remove();
	$("body").append(htmlParam);
	getDataFn(1,$("#rpp").val());
};


$(document).ready(function(){
	
	$("#btnSearch").click(function(){
		 searchMultiFn($("#searchText").val());
	});
	/*
	$("#btnSearchAdvance").click(function(){
		searchAdvanceFn($("#cif_no").val(),$("#npid").val(),$("#flag_2").val(),$("#manual_add").val());
		$("#pageNumber").val(1);
		return false;
	});
	*/
	$("#btnSearchAdvance").click(function(){
		
		
		if($("#cif_no").val()=="" && $("#npid").val()==""){
			
			callFlashSlide("CIF No. or ID cannot be emptied.");  
			
		}else{
			
			searchAdvanceFn($("#cif_no").val(),$("#npid").val(),$("#flag_2").val(),$("#manual_add").val());
			$("#pageNumber").val(1);
			
		}
		
		
		
		return false;
	});
	
	
	//$("#btnSearchAdvance").click();
	$("#btnAddCitizen").click(function(){
		clearFn();
		$(".text_add_edit").text("ADD FILE");
		//Binding Date Picker Start. 	
		//$("#dob_citizen").datepicker();
	    //$("#dob_citizen").datepicker( "option", "dateFormat", "yymmdd" );
	    //$(".ui-datepicker").hide();
	    $("#btnAddAnother").show();
	    $('#sex_citizen_other').attr("disabled","disabled");
		//Binding Date Picker End.
	    //Number Only Text Fields.
	    

	    jQuery('.numberOnly').keyup(function () { 
		    this.value = this.value.replace(/[^0-9\.]/g,'');
		});
	    
//		$(".numberOnly").keydown(function (e) {
//			        // Allow: backspace, delete, tab, escape, enter and .
//				
//			        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
//			             // Allow: Ctrl+A, Command+A
//			            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
//			             // Allow: home, end, left, right, down, up
//			            (e.keyCode >= 35 && e.keyCode <= 40)) {
//			                 // let it happen, don't do anything
//			                 return;
//			        }
//			        // Ensure that it is a number and stop the keypress
//			        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
//			            e.preventDefault();
//			        }
//			});
		
		//Set User Information
		$("#createBy").html(tokenID.data['full_name']);
		$("#createDateTime").html(currentDateTimeFn());
		$("#updateBy").html("-");
		$("#updateDateTime").html("-");
	});
	$("#btnSubmit").click(function(){
		if ($("#action").val() == "add"|| $("#action").val() == "") {
			insertFn();
		}else{
			updateFn();
		}
		return false;
	});
	
	$("#btnAddAnother").click(function(){
		insertFn("saveAndAnother");
	});
	
	$(".btnCancle").click(function() {
		clearFn();
	});
	
	//Autocomplete Search Start
	$("#npid").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+"/dqs_api/public/dqs_citizen_import/npid",
				 type:"post",
				 dataType:"json",
				 headers:{Authorization:"Bearer "+tokenID.token},
				 data:{"q":request.term},
				 //async:false,
                 error: function (xhr, textStatus, errorThrown) {
                        console.log('Error: ' + xhr.responseText);
                    },
				 success:function(data){
					    checkMaintenanceFn(data);
						response($.map(data, function (item) {
                            return {
                                llabel: item.npid,
                                value: item.npid
                            };
                        }));
					
				},
				beforeSend:function(){
					$("body").mLoading('hide');	
				}
				
				});
        }
    });
   
	//Autocomplete Search End
	

	jQuery('.numberOnly').keyup(function () { 
	    this.value = this.value.replace(/[^0-9\.]/g,'');
	});
	

});