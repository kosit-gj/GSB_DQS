var golbalDataRule=[];
var dropDownListBranch = function(id){
	$.ajax({
						
		url:restfulURL+"/dqs_api/public/dqs_monitoring/branch_list",
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){

		var html="";	
		html+="<select class=\"form-control input-sm listBranch\" id=\"listBranch\">";
		html+="<option value='all'> All Branch</option>";
		
		$.each(data,function(index,indexEntry){
			if(id==indexEntry["id"]){
				html+="<option selected value="+indexEntry["brcd"]+">"+indexEntry["desc_1"]+"</option>";			
			}else{
				html+="<option  value="+indexEntry["brcd"]+">"+indexEntry["desc_1"]+"</option>";	
			}		
		});	
		html+="</select>";
		$("#listBranchArea").html(html);
		
		}
		
	});
};
//listCustomerTypeArea

var dropDownListCusType = function(id){
	
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_monitoring/cust_type",
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){

		var html="";	
		html+="<select class=\"form-control input-sm listBranch\" id=\"listCusType\">";
		html+="<option value='all'> All Customer Type</option>";
		
		$.each(data,function(index,indexEntry){
			if(id==indexEntry["id"]){
				html+="<option selected value="+indexEntry["brcd"]+">"+indexEntry["desc_1"]+"</option>";			
			}else{
				html+="<option  value="+indexEntry["brcd"]+">"+indexEntry["desc_1"]+"</option>";	
			}		
		});	
		html+="</select>";
		$("#listCusTypeArea").html(html);
		}
		
	});
};

//http://192.168.1.58/dqs_api/public/dqs_monitoring/rule
var dropDownListRule = function(id){
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_monitoring/rule",
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
	
		console.log(data);
	   // var data=[{"id":"1","name":"สาขา1"},{"id":"2","name":"สาขา2"},{"id":"3","name":"สาขา3"}];
		var html="";	
		html+="<select class=\"form-control input-sm listRule\" id=\"listRule\">";
		html+="<option value='all'> All Rule</option>";
		
		$.each(data,function(index,indexEntry){
			if(id==indexEntry["id"]){
				html+="<option selected value="+indexEntry["rule_id"]+">"+indexEntry["rule_name"]+"</option>";			
			}else{
				html+="<option  value="+indexEntry["rule_id"]+">"+indexEntry["rule_name"]+"</option>";	
			}		
		});	
		html+="</select>";
		$("#listRuleArea").html(html);
		
		}
		
	});
};


var updateFn = function(){
	

	
	/*
	"process_type,
	rules: [
	  {
	     kpi_flag: """",
	     validate_status: """"
	  },....
	]"
	 */
	  var rules = [];
	  $.each(golbalDataRule,function(index,indexEntry){
	 // console.log(indexEntry);
	  

	  var no_doc_flag = "";
	  var initial_validate_id="";
	  
	 
	  if($("#embed_nodoc-"+indexEntry['validate_id']).val()!=undefined )
	  {
		  
	  	 
		  if($("#no_doc_checkbox-"+indexEntry['validate_id']).prop('checked')){ 
			  	no_doc_flag = 1;
	        }else{ 
	        	no_doc_flag = 0;
	        }
		   
		  
		  
		   rules.push({
			   no_doc_flag: no_doc_flag,
			   validate_id:"1"
		   });
	  }
	  
	  });
	  
	//http://192.168.1.58/dqs_api/public/dqs_monitoring/branch/{validate_header_id}
	$.ajax({
	    url:restfulURL+"/dqs_api/public/dqs_monitoring/branch/"+$("#id").val(),
	    type:"PATCH",
	    dataType:"json",
	    data:{"rules":rules,"process_type":$("#embedParamSearchProcessType").val()},
	    headers:{Authorization:"Bearer "+tokenID.token},
	    async:false,
	    success:function(data,status){
	     console.log(data);
	     if(data['status']=="200"){
	    	 callFlashSlideInModal("Update Successfully.");
	      	 findOneFn($("#id").val());
	  	
	      }
	   }
	});

	
	
};




updateExplainFn = function(id){
	
	var explain_status = ""	
		if($("#cdmd_explain_no_explanation:checked").val()){
			explain_status = 1;
		}else if($("#cdmd_explain_pending:checked").val()){
			explain_status = 2;
		}else if($("#cdmd_explain_approve:checked").val()){
			explain_status = 3;
		}else if($("#cdmd_explain_not_allowed:checked").val()){
			explain_status = 4;
		}

	//http://192.168.1.58/dqs_api/public/dqs_monitoring/branch/{validate_header_id}/explain
	/*
	process_type,
	explain_remark,
	explain_status
	*/
	$.ajax({
		url : restfulURL + "/dqs_api/public/dqs_monitoring/branch/"+id+"/explain",							
		type : "PATCH",
		dataType : "json",
		data :{"process_type":$("#embedParamSearchProcessType").val(),
			"explain_remark":$("#explain_remark").val(),
			//"explain_status":explain_status
			},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			if(data['status']==200){

				callFlashSlideInModal("Update Successfully.","#information2");
				getDataExplainFn($("#validate_header_id_hidden").val());
				
			}else if(data['status']==400){
				
				callFlashSlideInModal(data['data']['explain_remark'],"#information2");
				getDataExplainFn($("#validate_header_id_hidden").val());
				
			}
			
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

	///dqs_api/public/dqs_monitoring/cdmd/1
	/*
	{"header":{"own_branch_name":"Nawamin","cif_no":"11","cust_full_name":"John Doe",
	"cust_type_desc":"Personnal","validate_date":"2016-12-11 00:00:00.000",
	"contact_branch_name":"Rama 9","contact_date":"2016-12-13 00:00:00.000",
	"transaction_date":"2016-12-10 00:00:00.000","maxdays":"2","rules":"1"},
	"rule_list":{"total":1,"per_page":10,"current_page":1,"last_page":1,
	"next_page_url":null,"prev_page_url":null,"from":1,"to":1,"data":[{"validate_id":"1",
	"rule_id":"1","rule_group":"Cleansing","rule_name":"rule no 1","kpi_flag":"0","days":"0",
	"validate_status":"correct","no_doc_flag":"1"}]}}
	*/
	var htmlTable = "";
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_monitoring/branch/"+id,
		type : "get",
		dataType : "json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {	
			var dataRuleList=data['rule_list'];
			data=data['header'];
			htmlTable += "<div class='label-detail'>";
			htmlTable += "<div class='box1'><b>Branch</b> : "+data["own_branch_name"]+"</div>";
			htmlTable += "</div>";
			
			htmlTable += "<div class='label-detail'>";
			htmlTable += "<div class='box1'><b>CIF</b> : "+data["cif_no"]+"</div>";
			htmlTable += "</div>";
			
			htmlTable += "<input type='hidden' id='validate_header_id_hidden' value='"+id+"'>";
			
			htmlTable +="<div class='label-detail'>";
			htmlTable +="<div class='box1'><b>Name</b> : "+data["cust_full_name"]+"</div>";
			htmlTable +="</div>";
     	
			htmlTable +="<div class='label-detail'>";
			htmlTable +="<div class='box1'><b>Customer Type</b> : "+data["cust_type_desc"]+"</div>";
			htmlTable +="</div>";
     	
			
			var validate_date=data["validate_date"].split(" ");
			validate_date=validate_date[0];
			htmlTable +="<div class='label-detail'>";
			htmlTable +="<div class='box1'><b>Validate Date</b> : "+validate_date+"</div>";
			htmlTable +="</div>";
			
			
			
			htmlTable +="<div class='label-detail'>";
			htmlTable +="<div class='box1'><b>Last Contact Branch</b> : "+data["contact_branch_name"]+"</div>";
			htmlTable +="</div>";
     	
			
			var contact_date=data["contact_date"].split(" ");
			contact_date=contact_date[0];
			
			htmlTable +="<div class='label-detail'>";
			htmlTable +="<div class='box1'><b>Last Contact Date</b> : "+contact_date+"</div>";
			htmlTable +="</div>";
			
			var transaction_date=data["transaction_date"].split(" ");
			transaction_date=transaction_date[0];
			
			htmlTable +="<div class='label-detail'>";
			htmlTable +="<div class='box1'><b>Last Trans Date</b> : "+transaction_date+"</div>";
			htmlTable +="</div>";
			
			htmlTable +="<div class='label-detail'>";
			htmlTable +="<div class='box1'><b>#Rule</b> : "+data["rules"]+"</div>";
			htmlTable +="</div>";
			
			htmlTable +="<div class='label-detail'>";
			htmlTable +="<div class='box1'><b>#Maxdays</b> : "+data["maxdays"]+"</div>";
			htmlTable +="</div>";
			
			
			htmlTable +="<br style='clear:both'>";
							
			$("#detail_id").html(htmlTable);
			
			//console.log(dataRuleList['data']);
			listDetailRuleFn(dataRuleList['data']);
			golbalDataRule=dataRuleList['data'];
		}
	});
};
var listDataQualityFn = function(data) {
	
	// Destroy DataTable
	if ($.fn.DataTable.isDataTable('#tableDataQuality')) {
		$('#tableDataQuality').DataTable().destroy(); 
	}
	/*
	{"validate_header_id":"1","cif_no":"11","cust_full_name":"John Doe","validate_date"
		:"2016-12-11 00:00:00.000","explain_status":"1","contact_branch_name":"Rama 9","contact_date":"2016-12-13
		 00:00:00.000","transaction_date":"2016-12-10 00:00:00.000","maxdays":"2","rules":"1"}
	 */
	var htmlTable = "";
	
	$.each(data,function(index,indexEntry) {
		htmlTable += "<tr>";
		htmlTable += "<td>"+ (index + 1)+ "</td>";
		htmlTable += "<td>"+ indexEntry["cif_no"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["cust_full_name"]+ "</td>";
		var validate_date = indexEntry["validate_date"].split(" ");
		validate_date=validate_date[0];
		htmlTable += "<td>"+validate_date+ "</td>";
		htmlTable += "<td>"+ indexEntry["contact_branch_name"]+ "</td>";
		
		var contact_date = indexEntry["contact_date"].split(" ");
		contact_date=contact_date[0];
		
		htmlTable += "<td>"+contact_date+ "</td>";
		
		var transaction_date = indexEntry["transaction_date"].split(" ");
		transaction_date=transaction_date[0];
		
		htmlTable += "<td>"+transaction_date+ "</td>";
		htmlTable += "<td>"+ indexEntry["rules"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["maxdays"]+ "</td>";	
		htmlTable += "<td><div class='text-inline-table'><i class='fa fa fa-search font-management modalDetail' data-target='#modalDetail' data-toggle='modal' id="+indexEntry["validate_header_id"]+"></i>&nbsp;&nbsp;<i class='fa fa-paperclip font-management modalPaperchip' data-target='#addModal' data-toggle='modal'></i></div></td>";  
		htmlTable += "</tr>";
	});
	$("#listDataQuality").html(htmlTable);	
	
	$('#tableDataQuality').DataTable( { "dom": '<"top"flp>rt<"bottom"lp><"clear">' ,"bSort" : false} ); 
	
	//*******click แล้ว clear ข้อมูล ด้วย********
	$(".modalDetail").click(function(){

		findOneFn(this.id);
		$("#id").val(this.id);
		
	});
};

var listDetailRuleFn = function(data) {
	
	// Destroy DataTable
	if ($.fn.DataTable.isDataTable('#tableMakeRuleQuality')) {
		$('#tableMakeRuleQuality').DataTable().destroy(); 
	}
	
	//console.log(data);
	var htmlTable = "";
	/*
		[{"validate_id":"1",
		"rule_id":"1","rule_group":"Cleansing","rule_name":"rule no 1","kpi_flag":"0","days":"0",
		"validate_status":"correct","no_doc_flag":"1"}]
	*/
	$.each(data,function(index,indexEntry) {
		htmlTable += "<tr>";
		htmlTable += "<td>"+ (index + 1)+ "</td>";
		htmlTable += "<td>"+ indexEntry["rule_group"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["rule_name"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["days"]+ "</td>";
		//htmlTable += "<td>"+ indexEntry["kpi_flag"]+ "</td>";
		
		if(indexEntry["kpi_flag"]==1){
			htmlTable += "<td><input disabled type=\"checkbox\" class='kpi_checkbox' id=kpiFlagCheckbox-"+indexEntry["validate_id"]+" checked='checked' ></td>";
		}else if(indexEntry["kpi_flag"]==0){
			htmlTable += "<td><input disabled type=\"checkbox\" class='kpi_checkbox' id=kpiFlagCheckbox-"+indexEntry["validate_id"]+" ></td>";
		}
		
		htmlTable+="<td><select disabled class=\"form-control input-inline-table validate_status\" id=validate_status-"+indexEntry["validate_id"]+"></select></td>";	
		
		if(indexEntry["no_doc_flag"]==1){
			htmlTable += "<td><input disabled type=\"checkbox\" class='no_doc_checkbox' id=no_doc_checkbox-"+indexEntry["validate_id"]+" checked='checked' ></td>";
		}else if(indexEntry["no_doc_flag"]==0){
			htmlTable += "<td><input disabled type=\"checkbox\" class='no_doc_checkbox' id=no_doc_checkbox-"+indexEntry["validate_id"]+" ></td>";
		}
		
		
		htmlTable += "</tr>";
		
		$("#tableDataMakeRuleQuality").html(htmlTable);
		 
		//alert(indexEntry["validate_status"]);
		dropDownListValidateStatus(indexEntry["validate_status"],indexEntry["validate_id"]);
	});
		 
	$('#tableMakeRuleQuality').DataTable( { "dom": '<"top"flp>rt<"bottom"lp><"clear">',"bSort" : false } ); 
	
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
	/* 
	approve_dttm
	approve_user
	explain_dttm
	explain_remark
	explain_status
	explain_user
	explain_files->explain_file_id,file_path,validate_header_id
	 */
	
	/* explain_status  start*/
	var explain_status = data['explain_status'].split("-");
	explain_status=explain_status[0];
	if(explain_status==1){
		$('#cdmd_explain_no_explanation').prop('checked', true);
	}
	if(explain_status==2){
		$('#cdmd_explain_pending').prop('checked', true);
	}
	if(explain_status==3){
		$('#cdmd_explain_approve').prop('checked', true);
	}
	if(explain_status==4){
		$('#cdmd_explain_not_allowed').prop('checked', true);
	}
	/* explain_status  end*/
	
	/* Attachment Start*/
	var html_explain_files="";
	$.each(data['explain_files'],function(index,indexEntry){
		if(index==0){
			//http://171.96.201.91/dqs_api/public/dqs_monitoring/cdmd
			html_explain_files+="<a target=\"_blank\" href=\""+restfulURL+"/dqs_api/public/"+indexEntry['file_path']+"\">"+indexEntry['file_path']+"</a>";
		}else{
			html_explain_files+=" , <a target=\"_blank\" href=\""+restfulURL+"/dqs_api/public/"+indexEntry['file_path']+"\">"+indexEntry['file_path']+"</a>";
		}
		
		$("#explain_files").html(html_explain_files);
	});
	/* Attachment End*/
	
	/*approve_user start*/
	$("#approve_user").html(data['approve_user']);
	/*approve_user end*/
	
	/*explain_dttm start*/
	$("#explain_dttm").html(data['explain_dttm']);
	/*explain_dttm end*/
	
	/*explain_remark start*/
	$("#explain_remark").val(data['explain_remark']);
	/*explain_remark end*/
	
	
	
	/*explain_user start*/
	$("#explain_user").html(data['explain_user']);
	/*explain_user end*/

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

	var validateStatus=["All","incomplete","wrong","complete","correct","transfer"];
	
		var htmlDropdownList="";
		$.each(validateStatus,function(index,indexEntry){
			
			if(name==indexEntry){
				htmlDropdownList+="<option value="+indexEntry+" selected>"+indexEntry+"</option>";		
			}else{
				htmlDropdownList+="<option value="+indexEntry+">"+indexEntry+"</option>";		
			}
		});	
		$("#validate_status-"+id).html(htmlDropdownList);
	
};



var getDataFn = function() {
	//http://192.168.1.58/dqs_api/public/dqs_monitoring/cdmd
	$.ajax({
		url : restfulURL + "/dqs_api/public/dqs_monitoring/branch",
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			listDataQualityFn(data['data']);
			$("#resultLabelArea").html(data['total']);
			
			//console.log(data);
		}
	});
};



var getDataExplainFn = function(id) {
	//http://192.168.1.58/dqs_api/public/dqs_monitoring/cdmd/{validate_header_id}/explain
	$.ajax({
		url : restfulURL + "/dqs_api/public/dqs_monitoring/branch/"+id+"/explain",
		type : "get",
		dataType : "json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			fineOneExplainFn(data);
			//console.log(data);
		}
	});
};

var firstDayInMonthFn = function(){
	var d = new Date();
	var month = d.getMonth()+1;
	var day = d.getDate();
	
	var output = d.getFullYear() + '/' +
	    ((''+	month).length<2 ? '0' : '') + month + '/01';
	   
	console.log(output);
	return output;
}
var currentDateFn = function(){
	var d = new Date();
	var month = d.getMonth()+1;
	var day = d.getDate();
	
	var output = d.getFullYear() + '/' +
	    ((''+month).length<2 ? '0' : '') + month + '/';
	    if(day==1){
	    	output+= ((''+day).length<2 ? '0' : '') + day;
	    }else{
	    	 output+= ((''+day).length<2 ? '0' : '') + (day-1);	
	    }
	
	console.log(output);
	return output;
}





$(document).ready(function(){
	
	
	//####  FILE IMPORT MOBILE START #### 
	// Variable to store your files
	var files;
	// Add events
	$('#explain_files_attachment').on('change', prepareUpload);

	// Grab the files and set them to our variable
	function prepareUpload(event)
	{
	  files = event.target.files;
	}
	$('form#explainForm').on('submit', uploadFiles);

	// Catch the form submit and upload the files
	function uploadFiles(event)
	{
	  event.stopPropagation(); // Stop stuff happening
	  event.preventDefault(); // Totally stop stuff happening

		// Create a formdata object and add the files
		var data = new FormData();
		console.log(data);
		jQuery_1_1_3.each(files, function(key, value)
		{
			data.append(key, value);
			data.append("process_type",$("#embedParamSearchProcessType").val());
		});

		//http://192.168.1.58/dqs_api/public/dqs_monitoring/branch/{validate_header_id}/explain
		jQuery_1_1_3.ajax({
			url:restfulURL+"/dqs_api/public/dqs_monitoring/branch/"+$("#validate_header_id_hidden").val()+"/explain",
			type: 'POST',
			data: data,
			cache: false,
			dataType: 'json',
			processData: false, // Don't process the files
			contentType: false, // Set content type to false as jQuery will tell the server its a query string request
			headers:{Authorization:"Bearer "+tokenID.token},
			success: function(data, textStatus, jqXHR)
			{
				console.log(data);
				if(data['status']==200 && data['data'].length>0){
					
					callFlashSlideInModal("Upload Successfully.","#information3");
					$('#explain_files_attachment').val("");
				}else{
					
					callFlashSlideInModal("Can't Upload file .","#information3");
				}
			},
			error: function(jqXHR, textStatus, errorThrown)
			{
				// Handle errors here
				//console.log('ERRORS: ' + textStatus);
				callFlashSlideInModal('ERRORS: ' + textStatus,"#information3");
				// STOP LOADING SPINNER
			}
		});
		

		return false;
	}	
	//### FILE IMPORT MOBILE END ###
	
	
	$(document).ready(function(){
	    $('[data-toggle="tooltip"]').tooltip();
	});
	
	$(".btn-explain").click(function(){
		$("#modalDetail").modal('hide');
		$("#exPlainModal").modal();
	});

	//paramenter start
	dropDownListBranch();
	
	dropDownListCusType();
	
	dropDownListRule();
	

	$("#start_validate_date").datepicker();
    $("#start_validate_date").datepicker( "option", "dateFormat", "yy/mm/dd" );
    $("#start_validate_date").val(firstDayInMonthFn());
    
   
    $("#end_validate_date").datepicker();
    $("#end_validate_date").datepicker( "option", "dateFormat", "yy/mm/dd" );
    $("#end_validate_date").val(currentDateFn());
    $(".ui-datepicker").hide();
    
//	$("#start_validate_date").click(function(){
//		
//		$("#start_validate_date").datepicker();
//	    $("#start_validate_date" ).datepicker( "option", "dateFormat", "yy/mm/dd" );
//	    $("#start_validate_date").val(firstDayInMonthFn());
//	    
//	});
//	$("#end_validate_date").click(function(){
//		
//		$("#end_validate_date").datepicker();
//	    $("#end_validate_date" ).datepicker( "option", "dateFormat", "yy/mm/dd" );
//	    $("#end_validate_date").val(currentDateFn());
//	    
//	});
	
	//parameter end
	
	
	//Call Function start
	 //getDataFn();
	
	
	$("#btnSearch").click(function(){
		searchFn($("#searchCitizen").val());
		return false;
	});
	
	
	$("#btnSearchAdvance").click(function(){
		
		
		$(".embedParamSearch").remove();
		$("#embedParamArea").append("<input type='hidden' value='"+$("#listBranch").val()+"' id='embedParamSearchBranch' name='embedParamSearchBranch' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#listBranch option:selected").text()+"' id='embedParamSearchBranchName' name='embedParamSearchBranchName' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#processType").val()+"' id='embedParamSearchProcessType' name='embedParamSearchProcessType' class='embedParamSearch'>");
		//searchAdvanceFn($("#searchAdvanceRule").val());
		$("#branchNameLabelArea").html($("#embedParamSearchBranchName").val());
		getDataFn();
		$("#cifListArea").show();
		return false;
	});
	$("#btnSearchAdvance").click();
	
	$("#btnSubmit").click(function(){
		//alert("save");
		updateFn(); 
	});
	
	$("#btnEdit").click(function() {
		//$(".kpi_checkbox").removeAttr("disabled");
		$(".no_doc_checkbox").removeAttr("disabled");
		//$(".validate_status").removeAttr("disabled");	
	});
	
	$("#btnCancle").click(function() {
		var id = $("#validate_header_id_hidden").val();
	
	});
	
	


	$("#btn-explain").click(function() {
		getDataExplainFn($("#validate_header_id_hidden").val());
		$("#explain_id").val($("#validate_header_id_hidden").val());
	});
	
	$("#btnSaveExplain").click(function() {
		updateExplainFn($("#validate_header_id_hidden").val());
	});

});
