//Global Parameter Start
var golbalDataRule=[];
var golbalData=[];
var explainFilesStatus=true;
//Global Parameter End

//set paginate local start
var paginationSetUpFn2 = function(pageIndex,pageButton,pageTotal){
	if(pageTotal==0){
		pageTotal=1
	}
	$('.pagination_top2,.pagination_bottom2').off("page");
	$('.pagination_top2,.pagination_bottom2').bootpag({
	    total: pageTotal,//page Total
	    page: pageIndex,//page index
	    maxVisible: 5,//จำนวนปุ่ม
	    leaps: true,
	    firstLastUse: true,
	    first: '←',
	    last: '→',
	    wrapClass: 'pagination',
	    activeClass: 'active',
	    disabledClass: 'disabled',
	    nextClass: 'next',
	    prevClass: 'prev',
	    next: 'next',
	    prev: 'prev',
	    lastClass: 'last',
	    firstClass: 'first'
	}).on("page", function(event, num){
		var rpp=10;
		if($("#rpp2").val()==undefined){
			rpp=10;
		}else{
			rpp=$("#rpp2").val();
		}
		
		findOneFn($("#validate_header_id").val(),num,rpp);
		
	    $(".pagingNumber2").remove();
	    var htmlPageNumber= "<input type='hidden' id='pageNumber2' name='pageNumber2' class='pagingNumber2' value='"+num+"'>";
	    
	    $("#paramPagingDetail").html(htmlPageNumber);
	   
	}); 

	$(".countPagination2").off("change");
	$(".countPagination2").on("change",function(){

		$("#countPaginationTop2").val($(this).val());
		$("#countPaginationBottom2").val($(this).val());
		
		//getDataFn(1,$(this).val());
		findOneFn($("#validate_header_id").val(),1,$(this).val());
		
		$(".rpp2").remove();
		$(".pagingNumber2").remove();
	    var htmlRrp= "<input type='hidden' id='rpp2' name='rpp2' class='rpp2' value='"+$(this).val()+"'>";
	    	htmlRrp+= "<input type='hidden' id='pageNumber2' name='pageNumber2' class='pagingNumber2' value='1'>";
		  
	    $("#paramPagingDetail").html(htmlRrp);
	});
}
//set paginate local end

var statusIconFn = function(explain_status,validate_header_id){
	var explain_status=explain_status.split("-");
	var icon="";
	explain_status=explain_status[0];
	if(explain_status==1){
		icon = "&nbsp;&nbsp;<i id="+validate_header_id+" class='fa fa-paperclip font-management modalExplain' data-target='#addModal' data-toggle='modal'></i>";
		
	}else if(explain_status==2){
		icon = "&nbsp;&nbsp;<i id="+validate_header_id+" class='fa fa-check-circle font-management font-icon-green modalExplain' data-target='#addModal' data-toggle='modal'></i>";
		
	}else if(explain_status==3){
		//icon = "&nbsp;&nbsp;<button type=\"button\" id="+validate_header_id+" class=\"btn btn-danger-red  btn-circle-status modalExplain\"><i class=\"fa fa-times\"></i></button>";
		icon = "&nbsp;&nbsp;<i id="+validate_header_id+" class='fa fa-times-circle font-management font-icon-red modalExplain' data-target='#addModal' data-toggle='modal'></i>";
		
	}
	else if(explain_status==4){
		icon = "&nbsp;&nbsp;<i id="+validate_header_id+" class='fa fa fa-warning font-management modalExplain font-icon-orange' data-target='#addModal' data-toggle='modal'></i>";
		
	}
	return icon;
}
// List Branch
var dropDownListBranch = function(id){
	$.ajax({
						
		url:restfulURL+"/dqs_api/public/dqs_monitoring/branch_list",
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
		checkMaintenanceFn(data);
		var html="";	
		html+="<select class=\"form-control input-sm listBranch\" id=\"listBranch\">";
		html+="<option selected='selected' value=''> All Branch </option>";
		
		$.each(data,function(index,indexEntry){
			
				html+="<option  value="+indexEntry["brcd"]+">"+indexEntry["desc"]+"</option>";	
					
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
		checkMaintenanceFn(data);
		var html="";	
		html+="<select class=\"form-control input-sm listBranch\" id=\"listCusType\">";
		html+="<option selected='selected' value=''> All Customer Type</option>";
		
		$.each(data,function(index,indexEntry){
			
				html+="<option  value="+indexEntry["gsbccode"]+">"+indexEntry["desc"]+"</option>";	
					
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
		checkMaintenanceFn(data);
		//console.log(data);
	   // var data=[{"id":"1","name":"สาขา1"},{"id":"2","name":"สาขา2"},{"id":"3","name":"สาขา3"}];
		var html="";	
		html+="<select class=\"form-control input-sm listRule\" id=\"listRule\">";
		html+="<option selected='selected' value=''> All Rule</option>";
		
		$.each(data,function(index,indexEntry){
			html+="<option  value="+indexEntry["rule_id"]+">"+indexEntry["rule_name"]+"</option>";		
		});	
		html+="</select>";
		$("#listRuleArea").html(html);
		
		}
		
	});
};


var updateFn = function(){
	
	  var validate_header_id="";
	  var rules = [];
	  $.each(golbalDataRule['data'],function(index,indexEntry){
	  
	  var no_doc_flag = "";
	  //var initial_validate_id="";
	  var validate_id="";
	  
	  if($("#embedParamSearchProcessType").val()=='Initial'){
		  validate_id=indexEntry['initial_validate_id'];
	  }else{
		  validate_id=indexEntry['validate_id'];
	  }
	  
	  
	  if($("#embed_nodoc-"+validate_id).val()!=undefined )
	  {
		  if($("#no_doc_checkbox-"+validate_id).prop('checked')){ 
			  	no_doc_flag = 1;
	        }else{ 
	        	no_doc_flag = 0;
	        }
		   
		  
		  if($("#embedParamSearchProcessType").val()=='Initial'){
			   rules.push({
				   initial_validate_id:validate_id,
				   no_doc_flag: no_doc_flag
				   
			   });
		  }else{
			  rules.push({
				   validate_id:validate_id,
				   no_doc_flag: no_doc_flag
				   
			   });
		  }
	  }
	  
	  });
	  //console.log(rules);
	//http://192.168.1.58/dqs_api/public/dqs_monitoring/branch/{validate_header_id}
	  
	  if($("#validate_header_id").val()==""){
			validate_header_id=$("#explain_id").val();
		}else{
			validate_header_id=$("#validate_header_id").val();
		}
	  
	$.ajax({
	    url:restfulURL+"/dqs_api/public/dqs_monitoring/branch/"+validate_header_id,
	    type:"PATCH",
	    dataType:"json",
	    data:{"process_type":$("#embedParamSearchProcessType").val(),"rules":rules},
	    headers:{Authorization:"Bearer "+tokenID.token},
	    async:false,
	    success:function(data,status){
	     //console.log(data);
	     checkMaintenanceFn(data);
	     if(data['status']=="200"){
	    	  callFlashSlideInModal("Update Successfully.","#information");
	      	  //findOneFn($("#validate_header_id").val());
	      	  findOneFn($("#validate_header_id").val(),$("#pageNumber2").val(),$("#rpp2").val());
	  	
	      }
	   }
	});

	
	
};




updateExplainFn = function(id){
	var validate_header_id="";
	var explain_status = ""	
		if($("#cdmd_explain_no_explanation:checked").val()){
			explain_status = 1;
		}else if($("#cdmd_explain_waiting:checked").val()){
			explain_status = 2;
		}else if($("#cdmd_explain_approve:checked").val()){
			explain_status = 3;
		}else if($("#cdmd_explain_not_approved:checked").val()){
			explain_status = 4;
		}

	//http://192.168.1.58/dqs_api/public/dqs_monitoring/branch/{validate_header_id}/explain
	/*
	process_type,
	explain_remark,
	explain_status
	*/
	  if($("#validate_header_id").val()==""){
			validate_header_id=$("#explain_id").val();
		}else{
			validate_header_id=$("#validate_header_id").val();
		}
	  
	$.ajax({
		url : restfulURL + "/dqs_api/public/dqs_monitoring/branch/"+id+"/explain",							
		type : "PATCH",
		dataType : "json",
		data :{"process_type":$("#embedParamSearchProcessType").val(),
			"explain_remark":$("#explain_remark").val(),
			"explain_status":explain_status
			},
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
		checkMaintenanceFn(data);
			if(data['status']==200){
				
				//callFlashSlide("Update Successfully.");  
				callFlashSlideInModal("Update Successfully.","#information2");
				
				getDataExplainFn(validate_header_id);
				if(explainFilesStatus == true){
					setTimeout(function(){$("#exPlainModal").modal('hide');},1000);
				}else{
					explainFilesStatus = true;
				}
				
				
			}else if(data['status']==400){
				
				if(data['data']!=undefined){
					callFlashSlideInModal(data['data'],"#information2","error");
					
					getDataExplainFn(validate_header_id);
				}else{
				callFlashSlideInModal(data['data']['explain_remark'],"#information2","error");
				
				getDataExplainFn(validate_header_id);
				//getDataExplainFn($("#validate_header_id_hidden").val());
				}
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

var findOneFn = function(id,page,rpp) {

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
		data:{
			"page":page,"rpp":rpp,
			"process_type":$("#embedParamSearchProcessType").val(),
			
			contact_branch_code:$("#embedParamSearchBranch").val(),
			start_validate_date:$("#embedParamSearchStartValidateDate").val(),
			end_validate_date:$("#embedParamSearchEndValidateDate").val(),
			cif_no:$("#embedParamSearchCifNo").val(),
			cust_type_code:$("#embedParamSearchListCusType").val(),
			rule_group:$("#embedParamSearchRuleGroup").val(),
			rule_id:$("#embedParamSearchListRule").val(),
			validate_status:$("#embedParamSearchValidateStatus").val(),
			customer_flag:$("#embedParamSearchIsCustomer").val(),
			explain_status:$("#embedParamSearchExplainStatus").val(),
			affiliation_flag:$("#embedParamSearchIsAffiliation").val(),
			
		
		},
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			checkMaintenanceFn(data);
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
			//htmlTable +="<div class='box1'><b>#Rule</b> : "+data["rules"]+"</div>";
			htmlTable +="<div class='box1' id='countRuleArea'></div>";
			htmlTable +="</div>";
			
			htmlTable +="<div class='label-detail'>";
			//htmlTable +="<div class='box1'><b>#Maxdays</b> : "+data["maxdays"]+"</div>";
			htmlTable +="<div class='box1' id='countMaxdaysArea'></div>";
			htmlTable +="</div>";
			
			
			htmlTable +="<br style='clear:both'>";
							
			$("#detail_id").html(htmlTable);
			listDetailRuleFn(dataRuleList['data']);
			golbalDataRule=dataRuleList;
			
			$("#countRuleArea").html("<b>#Rule</b>&nbsp;:&nbsp;" +$("#embed_param_count_rule").val());
			$("#countMaxdaysArea").html("<b>#Maxdays</b>&nbsp;:&nbsp;" +$("#embed_param_count_maxdays").val());
			
			
			paginationSetUpFn2(golbalDataRule['current_page'],golbalDataRule['last_page'],golbalDataRule['last_page']);
			
		}
	});
};
var listDataQualityFn = function(data) {

	var htmlTable = "";	
	$.each(data,function(index,indexEntry) {
		/*
		if(indexEntry['kpi_flag']==1 && indexEntry['complete_flag']==0){
			htmlTable += "<tr class='rowSearch danger'>";
		}else{
			htmlTable += "<tr class='rowSearch'>";
		}*/
		htmlTable += "<tr class='rowSearch'>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry['seq']+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["cif_no"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["cust_full_name"]+ "</td>";
		var validate_date = indexEntry["validate_date"].split(" ");
		validate_date=validate_date[0];
		htmlTable += "<td class='columnSearch'>"+validate_date+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["contact_branch_name"]+ "</td>";
		
		var contact_date = indexEntry["contact_date"].split(" ");
		contact_date=contact_date[0];
		
		htmlTable += "<td class='columnSearch'>"+contact_date+ "</td>";
		
		var transaction_date = indexEntry["transaction_date"].split(" ");
		transaction_date=transaction_date[0];
		
		htmlTable += "<td class='columnSearch'>"+transaction_date+ "</td>";
		
		
	
		if($("#embedParamSearchProcessType").val()=='Initial'){
			
			htmlTable += "<td class=\"countRules-"+indexEntry["validate_initial_header_id"]+"\">"+ indexEntry["rules"]+ "</td>";
			htmlTable += "<td class=\"countMaxDays-"+indexEntry["validate_initial_header_id"]+"\" >"+ indexEntry["maxdays"]+ "</td>";	
			
			htmlTable += "<td>"; 
			htmlTable += "<input type='hidden' id='explain_status-"+indexEntry["validate_initial_header_id"]+"' name='explain_status' value='"+indexEntry["explain_status"]+"'>";
			htmlTable += "<div class='text-inline-table'><i class='fa fa fa-search font-management modalDetail' data-target='#modalDetail' data-toggle='modal' id="+indexEntry["validate_initial_header_id"]+"></i>";
			htmlTable += statusIconFn(indexEntry["explain_status"],indexEntry["validate_initial_header_id"]);
			
			htmlTable += "</div></td>";
		}else{
			
			
			htmlTable += "<td class=\"countRules-"+indexEntry["validate_header_id"]+"\">"+ indexEntry["rules"]+ "</td>";
			htmlTable += "<td class=\"countMaxDays-"+indexEntry["validate_header_id"]+"\" >"+ indexEntry["maxdays"]+ "</td>";	
			
			
			
			htmlTable += "<td>"; 
			htmlTable += "<input type='hidden' id='explain_status-"+indexEntry["validate_header_id"]+"' name='explain_status' value='"+indexEntry["explain_status"]+"'>";
			htmlTable += "<div class='text-inline-table'><i class='fa fa fa-search font-management modalDetail' data-target='#modalDetail' data-toggle='modal' id="+indexEntry["validate_header_id"]+"></i>";
			htmlTable += statusIconFn(indexEntry["explain_status"],indexEntry["validate_header_id"]);
			
			htmlTable += "</div></td>";
		}
		
		htmlTable += "</tr>";
	});
	$("#listDataQuality").html(htmlTable);	

	//*******click แล้ว clear ข้อมูล ด้วย********
	$(".modalDetail").click(function(){
		golbalDataRule=[];
		//clear param paging start
		$("#paramPagingDetail").empty();
		$("#countPaginationTop2").val("10");
		$("#countPaginationBottom2").val("10");
		//clear param paging end
		$("#iconStatusDetailPage").html(statusIconFn($("#explain_status-"+this.id).val(),this.id));
		
		//Embed Param for Display on Detail page Start
		$("#embed_param_count_rule").val($(".countRules-"+this.id).text());
		$("#embed_param_count_maxdays").val($(".countMaxDays-"+this.id).text());
		//Embed Param for Display on Detail page End
		
		findOneFn(this.id);
		$("#validate_header_id").val(this.id);
		

	});
	
	//click to explain page start
	$(".modalExplain").click(function(){
		$("#explain_files_attachment").val("");
		$("#explain_files").empty();
		$("#exPlainModal").modal();
		getDataExplainFn(this.id);
		$("#explain_id").val(this.id);
		//$("#validate_header_id").val(this.id);
	});
	//click to explain page end
	
};

var listDetailRuleFn = function(data) {
	

	$("#tableDataMakeRuleQuality").empty();
	$.each(data,function(index,indexEntry) {
		var htmlTable = "";
		htmlTable += "<tr class='rowSearchdetail'>";
		htmlTable += "<td class='columnSearchdetail'>"+ indexEntry['seq']+ "</td>";
		htmlTable += "<td class='columnSearchdetail'>"+ indexEntry["rule_group"]+ "</td>";
		htmlTable += "<td class='columnSearchdetail'>"+ indexEntry["rule_name"]+ "</td>";
		htmlTable += "<td class='columnSearchdetail'>"+ notNullFn(indexEntry["days"])+ "</td>";
		

		var validate_id="";
		if($("#embedParamSearchProcessType").val()=="Initial"){
			validate_id=indexEntry["initial_validate_id"];
		}else{
			validate_id=indexEntry["validate_id"];
		}

		if(indexEntry["kpi_flag"]==1){
			htmlTable += "<td><input disabled type=\"checkbox\" class='kpi_checkbox' id=kpiFlagCheckbox-"+validate_id+" checked='checked' ></td>";
		}else if(indexEntry["kpi_flag"]==0){
			htmlTable += "<td><input disabled type=\"checkbox\" class='kpi_checkbox' id=kpiFlagCheckbox-"+validate_id+" ></td>";
		}
		
		htmlTable+="<td><select disabled class=\"form-control input-inline-table validate_status\" id=validate_status-"+validate_id+"></select></td>";	
		
		if(indexEntry["no_doc_flag"]==1){
			htmlTable += "<td style='text-align:center'><input type='hidden' class='warning-"+validate_id+"' value='"+indexEntry["warning"]+"'><input disabled type=\"checkbox\" class='no_doc_checkbox' id=no_doc_checkbox-"+validate_id+" checked='checked' ></td>";
		}else if(indexEntry["no_doc_flag"]==0){
			htmlTable += "<td style='text-align:center'><input type='hidden' class='warning-"+validate_id+"' value='"+indexEntry["warning"]+"'><input disabled type=\"checkbox\" class='no_doc_checkbox' id=no_doc_checkbox-"+validate_id+" ></td>";
		}
		
		
		htmlTable += "</tr>";
		
		$("#tableDataMakeRuleQuality").append(htmlTable);
	
		dropDownListValidateStatus(indexEntry["validate_status"],validate_id);
	});
		 
	
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
		var warning = $(this).parent().children().val();
		//alert(warning);
		if(warning==1){
			
			if($(this).prop("checked")==true){
				callFlashSlideInModal("ลูกค้าเพิ่งมาติดต่อควรมีเอกสาร","#information");
			}
		}
	});
};
var delFileFn = function(validate_header_id,explain_file_id){
	$.ajax({
		url : restfulURL + "/dqs_api/public/dqs_monitoring/branch/"+validate_header_id+"/explain/"+explain_file_id+"",
		type : "DELETE",
		dataType : "json",
		async:false,
		data:{"process_type":$("#embedParamSearchProcessType").val()},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			
			checkMaintenanceFn(data);
			if(data['status']==200){
				$("#explain_file-"+explain_file_id).remove();
				$("#path_file-"+explain_file_id).remove();
				//console.log("Test validate_header_id : "+validate_header_id);
				//getDataExplainFn(validate_header_id);
				if($("#explain_files").text().trim()==""){
					//set status is cdmd_explain_no_explanation.
					$("#cdmd_explain_no_explanation").prop("checked",true);
					$("#cdmd_explain_waiting").prop("checked",false);
					$("#cdmd_explain_approve").prop("checked",false);
					$("#cdmd_explain_not_approved").prop("checked",false);
					explainFilesStatus = false;
					$("#btnSaveExplain").click();
				}
			}
			
		}
	});
}

var fineOneExplainFn = function(data){
	var validate = "";
	var validateStatus= true;
	var validateStatusTemp = true;
	var count = 0;
	/* explain_status  start*/
	var explain_status = data['explain_status'].split("-");
	explain_status=explain_status[0];

	if(explain_status==1){
		$('#cdmd_explain_waiting').prop('checked', true);
		
	}
	
	if(explain_status==2){
		$('#cdmd_explain_approve').prop('checked', true);
	}
	
	if(explain_status==3){
		$('#cdmd_explain_not_approved').prop('checked', true);
	}
	
	if(explain_status==4){
		$('#cdmd_explain_no_explanation').prop('checked', true);
	}
	/* explain_status  end*/
	
	/* Attachment Start*/
	var html_explain_files="";
	
	$.each(data['explain_files'],function(index,indexEntry){
		
		try {
			$.ajax({
				url : restfulURL +"/dqs_api/public/"+indexEntry['file_path'],
				dataType : "json",
				async:false,
				crossDomain:true,
				success : function(data1) {
					//alert(data1);
					checkMaintenanceFn(data1);
					if(data1['status']==404){
						if(index==0){
							html_explain_files+="<a class='not-active' target=\"_blank\" id='path_file-"+indexEntry['explain_file_id']+"' href=\""+restfulURL+"/dqs_api/public/"+indexEntry['file_path']+"\">"+indexEntry['file_path']+"</a>";
							html_explain_files+=" <a href='#' class='delFile' id='explain_file-"+indexEntry['explain_file_id']+"' ><i style='color:red' class=\"fa fa-trash \"></i></a> <br style=\"clear:both\">";
						}else{
							html_explain_files+="  <a class='not-active' target=\"_blank\" id='path_file-"+indexEntry['explain_file_id']+"' href=\""+restfulURL+"/dqs_api/public/"+indexEntry['file_path']+"\">"+indexEntry['file_path']+"</a>";
							html_explain_files+=" <a href='#' class='delFile' id='explain_file-"+indexEntry['explain_file_id']+"' ><i style='color:red' class=\"fa fa-trash \"></i></a> <br style=\"clear:both\">";
						}
						validateStatus=false;
						validateStatusTemp=false;
						count++;
					}
				}
			});
		}
		catch(err) {
			
		}finally {
			if(validateStatusTemp == true){
				if(index==0){
					html_explain_files+="<a target=\"_blank\" id='path_file-"+indexEntry['explain_file_id']+"' href=\""+restfulURL+"/dqs_api/public/"+indexEntry['file_path']+"\">"+indexEntry['file_path']+"</a>";
					html_explain_files+=" <a href='#' class='delFile' id='explain_file-"+indexEntry['explain_file_id']+"' ><i style='color:red' class=\"fa fa-trash \"></i></a> <br style=\"clear:both\">";
				}else{
					html_explain_files+="  <a target=\"_blank\" id='path_file-"+indexEntry['explain_file_id']+"' href=\""+restfulURL+"/dqs_api/public/"+indexEntry['file_path']+"\">"+indexEntry['file_path']+"</a>";
					html_explain_files+=" <a href='#' class='delFile' id='explain_file-"+indexEntry['explain_file_id']+"' ><i style='color:red' class=\"fa fa-trash \"></i></a> <br style=\"clear:both\">";
				}
			}
			validateStatusTemp=true;
			
	    }
		
		

		
		
		$("#explain_files").html(html_explain_files);
	});
	/* Attachment End*/
	
	/*approve_user start*/
	$("#approve_user").html(data['approve_user']);
	/*approve_user end*/
	
	/*approve_user start*/
	$("#approve_dttm").html(data['approve_dttm']);
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
	
	//Del File
	$(".delFile").click(function(){
		var validate_header_id="";
		var explain_file_id = this.id;
		explain_file_id= explain_file_id.split("-");
		explain_file_id=explain_file_id[1];
		if($('#cdmd_explain_waiting').prop('checked', true)){
			if($("#validate_header_id").val()==""){
				validate_header_id=$("#explain_id").val();
			}else{
				validate_header_id=$("#validate_header_id").val();
			}
			delFileFn(validate_header_id,explain_file_id);
			getDataFn($("#pageNumber").val(),$("#rpp").val());
		}else{
			callFlashSlideInModal("Can't delete.","#information3");
		}
		return false;
	});
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



var getDataFn = function(page,rpp) {
	
	$.ajax({
		url : restfulURL + "/dqs_api/public/dqs_monitoring/branch",
		type : "get",
		dataType : "json",
		async:false,
		data:{"page":page,"rpp":rpp,
			
			contact_branch_code:$("#embedParamSearchBranch").val(),
			start_validate_date:$("#embedParamSearchStartValidateDate").val(),
			end_validate_date:$("#embedParamSearchEndValidateDate").val(),
			cif_no:$("#embedParamSearchCifNo").val(),
			cust_type_code:$("#embedParamSearchListCusType").val(),
			rule_group:$("#embedParamSearchRuleGroup").val(),
			rule_id:$("#embedParamSearchListRule").val(),
			//risk:$("#embedParamSearchRisk").val(),
			validate_status:$("#embedParamSearchValidateStatus").val(),
			customer_flag:$("#embedParamSearchIsCustomer").val(),
			explain_status:$("#embedParamSearchExplainStatus").val(),
			affiliation_flag:$("#embedParamSearchIsAffiliation").val(),
			process_type:$("#embedParamSearchProcessType").val()
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			checkMaintenanceFn(data);
			listDataQualityFn(data['data']);
			$("#resultLabelArea").html(data['total']);
			golbalData= data;
			paginationSetUpFn(golbalData['current_page'],golbalData['last_page'],golbalData['last_page']);
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
		data:{"process_type":$("#embedParamSearchProcessType").val()},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			checkMaintenanceFn(data);
			fineOneExplainFn(data);
			getDataFn($("#pageNumber").val(),$("#rpp").val());
			
		}
	});
};

var firstDayInMonthFn = function(){
	var d = new Date();
	var month = d.getMonth()+1;
	var day = d.getDate();
	
	var output = d.getFullYear() + '-' +
	    ((''+	month).length<2 ? '0' : '') + month + '-01';
	   
	//console.log(output);
	return output;
}
var currentDateFn = function(){
	var d = new Date();
	var month = d.getMonth()+1;
	var day = d.getDate();
	
	var output = d.getFullYear() + '-' +
	    ((''+month).length<2 ? '0' : '') + month + '-';
	    if(day==1){
	    	output+= ((''+day).length<2 ? '0' : '') + day;
	    }else{
	    	 output+= ((''+day).length<2 ? '0' : '') + (day-1);	
	    }
	
	//console.log(output);
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
	  //start upload file
	  //uploadFiles(event);
	  
	  //set status is waiting.
		$("#cdmd_explain_no_explanation").prop("checked",false);
		$("#cdmd_explain_waiting").prop("checked",true);
		$("#cdmd_explain_approve").prop("checked",false);
		$("#cdmd_explain_not_approved").prop("checked",false);
		
	}
	
	$('form#explainForm').on('submit', uploadFiles);
	function uploadFiles(event)
	{
		var validate_header_id="";
		if(!$("#explain_files_attachment").val()){
			return false;
		
		}
	  event.stopPropagation(); // Stop stuff happening
	  event.preventDefault(); // Totally stop stuff happening

		// Create a formdata object and add the files
		var data = new FormData();
		//console.log(data);
		jQuery_1_1_3.each(files, function(key, value)
		{
			data.append(key, value);
			data.append("process_type",$("#embedParamSearchProcessType").val());
		});

		//http://192.168.1.58/dqs_api/public/dqs_monitoring/branch/{validate_header_id}/explain
		if($("#validate_header_id").val()==""){
			validate_header_id=$("#explain_id").val();
		}else{
			validate_header_id=$("#validate_header_id").val();
		}
		//Auau
		//alert(validate_header_id);
		jQuery_1_1_3.ajax({
			url:restfulURL+"/dqs_api/public/dqs_monitoring/branch/"+validate_header_id+"/explain",
			type: 'POST',
			data: data,
			cache: false,
			dataType: 'json',
			processData: false, // Don't process the files
			contentType: false, // Set content type to false as jQuery will tell the server its a query string request
			headers:{Authorization:"Bearer "+tokenID.token},
			async:false,
			success: function(data, textStatus, jqXHR)
			{
				//console.log(data);
				if(data['status']==200 && data['data'].length>0){
					
					//callFlashSlideInModal("Upload Successfully.","#information3");
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
		$("#explain_files").empty();
		$("#explain_files_attachment").val("");
		$("#exPlainModal").modal();
	});

	//paramenter start
	dropDownListBranch();
	dropDownListCusType();
	dropDownListRule();

	$("#start_validate_date").datepicker();
    $("#start_validate_date").datepicker( "option", "dateFormat", "yy-mm-dd" );
    $("#start_validate_date").val(firstDayInMonthFn());
    
    $("#end_validate_date").datepicker();
    $("#end_validate_date").datepicker( "option", "dateFormat", "yy-mm-dd" );
    $("#end_validate_date").val(currentDateFn());
    $(".ui-datepicker").hide();
    
	//parameter end
	
	
	//Call Function start
	$("#btnSearch").click(function(){
		//searchFn("searchText","tableDataQuality");
		searchMultiFn($("#searchText").val());
	});
	$("#btnSearchDetail").click(function(){
		searchMultiFn($("#searchTextDetail").val(),"detail");
		//searchMultiFn($("#searchText").val());
	});
	

	$("#btnSearchAdvance").click(function(){
		
		//check calendar is not between month other.
		var start_validate_date=$("#start_validate_date").val();
		var end_validate_date=$("#end_validate_date").val();
		var from_month="";
		var to_month="";
		start_validate_date = start_validate_date.split("-");
		from_month=start_validate_date[1];
		
		end_validate_date = end_validate_date.split("-");
		to_month=end_validate_date[1];
		
		
		if(from_month!=to_month){
			callFlashSlide("Please choose the date within the same month."); 
			return false;
		}
		
		
		
		
		/*Embed Param Search Start*/
		$(".embedParamSearch").remove();
		$("#embedParamArea").append("<input type='hidden' value='"+$("#listBranch").val()+"' id='embedParamSearchBranch' name='embedParamSearchBranch' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#listBranch option:selected").text()+"' id='embedParamSearchBranchName' name='embedParamSearchBranchName' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#start_validate_date").val()+"' id='embedParamSearchStartValidateDate' name='embedParamSearchStartValidateDate' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#end_validate_date").val()+"' id='embedParamSearchEndValidateDate' name='embedParamSearchEndValidateDate' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#cif_no").val()+"' id='embedParamSearchCifNo' name='embedParamSearchCifNo' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#listCusType").val()+"' id='embedParamSearchListCusType' name='embedParamSearchListCusType' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#processType").val()+"' id='embedParamSearchProcessType' name='embedParamSearchProcessType' class='embedParamSearch'>");
		
		$("#embedParamArea").append("<input type='hidden' value='"+$("#rule_group").val()+"' id='embedParamSearchRuleGroup' name='embedParamSearchRuleGroup' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#listRule").val()+"' id='embedParamSearchListRule' name='embedParamSearchListRule' class='embedParamSearch'>");
		//$("#embedParamArea").append("<input type='hidden' value='"+$("#validate_status").val()+"' id='embedParamSearchValidateStatus' name='embedParamSearchValidateStatus' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#is_customer").val()+"' id='embedParamSearchIsCustomer' name='embedParamSearchIsCustomer' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#explain_status").val()+"' id='embedParamSearchExplainStatus' name='embedParamSearchExplainStatus' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#is_affiliation").val()+"' id='embedParamSearchIsAffiliation' name='embedParamSearchIsAffiliation' class='embedParamSearch'>");
		/*Embed Param Search Start*/
		
		
		$("#branchNameLabelArea").html($("#embedParamSearchBranchName").val());
		getDataFn(1,$("#rpp").val());
		$("#cifListArea").show();
		//$(".countPagination").val(10);
		return false;
	});
	//$("#btnSearchAdvance").click();
	
	$("#btnSubmit").click(function(){
		updateFn(); 
	});
	
	$("#btnEdit").click(function() {
		$(".no_doc_checkbox").removeAttr("disabled");
	});
	
	$("#btnCancle").click(function() {
		var id = $("#validate_header_id_hidden").val();
		//findOneFn(id);
		findOneFn(id,$("#pageNumber2").val(),$("#rpp2").val());
	});
	
	$("#btn-explain").click(function() {
		//Auau
		//console.log($("#validate_header_id_hidden").val());
		getDataExplainFn($("#validate_header_id_hidden").val());
		$("#explain_id").val($("#validate_header_id_hidden").val());
	});
	
	$("#btnSaveExplain").click(function() {

		setTimeout(function(){
			$("#validate_header_id").val("");
			//console.log("explain_id :"+$("#explain_id").val());
			//console.log("validate_header_id :"+$("#validate_header_id").val());
			updateExplainFn($("#explain_id").val());
			
			
		},1000);
		
		
		
		
	});
	
	//Export
	$("#exportToExcel").click(function(){
		
		var param="";
		param+="&contact_branch_code="+$("#embedParamSearchBranch").val();
		param+="&start_validate_date="+$("#embedParamSearchStartValidateDate").val();
		param+="&end_validate_date="+$("#embedParamSearchEndValidateDate").val();
		param+="&cif_no="+$("#embedParamSearchCifNo").val();
		param+="&cust_type_code="+$("#embedParamSearchListCusType").val();
		param+="&rule_group="+$("#embedParamSearchRuleGroup").val();
		param+="&rule_id="+$("#embedParamSearchListRule").val();
		//param+="&validate_status="+$("#embedParamSearchValidateStatus").val();
		param+="&customer_flag="+$("#embedParamSearchIsCustomer").val();
		param+="&explain_status="+$("#embedParamSearchExplainStatus").val();
		param+="&affiliation_flag="+$("#embedParamSearchIsAffiliation").val();
		param+="&process_type="+$("#embedParamSearchProcessType").val();
		
		$("form#formExportToExcel").attr("action",restfulURL+"/dqs_api/public/dqs_monitoring/branch/export?token="+tokenID.token+""+param);
		$("form#formExportToExcel").submit();
	});
	
	//กำหนดค่า CIF ต้องเปนตัวเลข
//		$("#cif_no").keydown(function (e) {
//		        // Allow: backspace, delete, tab, escape, enter and .
//			
//		        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
//		             // Allow: Ctrl+A, Command+A
//		            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
//		             // Allow: home, end, left, right, down, up
//		            (e.keyCode >= 35 && e.keyCode <= 40)) {
//		                 // let it happen, don't do anything
//		                 return;
//		        }
//		        // Ensure that it is a number and stop the keypress
//		        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
//		            e.preventDefault();
//		        }
//		});
		
		//Not Number Start
		jQuery('.numberOnly').keyup(function () { 
		    this.value = this.value.replace(/[^0-9\.]/g,'');
		});
		//Not Number End
		
		

});
