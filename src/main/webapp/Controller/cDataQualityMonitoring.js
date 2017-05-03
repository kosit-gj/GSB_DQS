//Global Variable 
var golbalDataRule=[];
var golbalData=[];



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
	    
	    $("#paramPagingDetail").append(htmlPageNumber);
	   
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
		   
	    $("#paramPagingDetail").append(htmlRrp);
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
		//fa fa-times-circle
		icon = "&nbsp;&nbsp;<i id="+validate_header_id+" class='fa fa-times-circle font-management font-icon-red modalExplain' data-target='#addModal' data-toggle='modal'></i>";
		//icon = "&nbsp;&nbsp;<button type=\"button\" id="+validate_header_id+" class=\"btn btn-danger-red  btn-circle-status modalExplain\"><i class=\"fa fa-times\"></i></button>";
	}
	else if(explain_status==4){
		icon = "&nbsp;&nbsp;<i id="+validate_header_id+" class='fa fa fa-warning font-management modalExplain font-icon-orange' data-target='#addModal' data-toggle='modal'></i>";		
	}
	return icon;
}

//List Branch
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
		html+="<option selected='selected'  value=''> All Branch</option>";
		
		$.each(data,function(index,indexEntry){
			
				html+="<option  value="+indexEntry["brcd"]+">"+indexEntry["desc"]+"</option>";	
					
		});	
		html+="</select>";
		$("#listBranchArea").html(html);
		
		}
		
	});
};


//List Rule
var dropDownListRule = function(id){
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_monitoring/rule",
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success:function(data){
		checkMaintenanceFn(data);
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

//Update
var updateFn = function(){

	  var rules = [];
	 
	  $.each(golbalDataRule['data'],function(index,indexEntry){ 
	  var kpi_flag = "";
	  var validate_status = "";
	  var validate_id="";
	  if($("#embedParamSearchProcessType").val()=='Initial'){
		  validate_id=indexEntry['initial_validate_id'];
	  }else{
		  validate_id=indexEntry['validate_id'];
	  }
	  if($("#embed_kpiflag-"+validate_id).val()!=undefined 
		|| $("#embed_validate_status-"+validate_id).val()!=undefined
	  )
	  {
	  	   //send value Seq
		  validate_status=$("#validate_status-"+validate_id).val();
		 if(validate_status == null){
			 validate_status = "incomplete";
		 }
		 //console.log(validate_status);
		   //send value KPI 
		   if($("#kpiFlagCheckbox-"+validate_id).prop('checked')){ 
			    kpi_flag = 1;
	        }else{ 
	        	kpi_flag = 0;
	        }
		   
		   if($("#embedParamSearchProcessType").val()=='Initial'){
			   rules.push({
				   validate_status:""+validate_status+"",
				   kpi_flag: ""+kpi_flag+"",
				   initial_validate_id:validate_id
					   
			   });
		   }else{
			   rules.push({
				   validate_status:""+validate_status+"",
				   kpi_flag: ""+kpi_flag+"",
				   validate_id:validate_id
			   });
		   }
		   
		   
	  }
	  
	  });

	$.ajax({
	    url:restfulURL+"/dqs_api/public/dqs_monitoring/cdmd/"+$("#validate_header_id").val(),
	    type:"PATCH",
	    dataType:"json",
	    data:{"rules":rules,"process_type":$("#embedParamSearchProcessType").val()},
	    headers:{Authorization:"Bearer "+tokenID.token},
	    async:false,
	    success:function(data,status){
	    // console.log(data);
	    checkMaintenanceFn(data);
	      if(data['status']=="200"){
	      
		      	callFlashSlideInModal("Update Successfully.","#information");
		      	//listDetailRuleFn(golbalDataRule);
		      	findOneFn($("#validate_header_id").val(),$("#pageNumber2").val(),$("#rpp2").val());
		      	//findOneFn($("#validate_header_id").val());
	
	      }else if(data['status']=="400"){
	    	  
	    	  	callFlashSlideInModal("Error.","#information");
	    	  	
	      }
	   }
	});	
};

//Update Explain
updateExplainFn = function(id){
	
	var explain_status = "";
	var embed_explain_status="";
		if($("#cdmd_explain_no_explanation:checked").val()){
			explain_status = "4-Not Explain";
		}else if($("#cdmd_explain_waiting:checked").val()){
			explain_status = "1-Waiting";
		}else if($("#cdmd_explain_approve:checked").val()){
			explain_status = "2-Approved";
		}else if($("#cdmd_explain_not_approved:checked").val()){
			explain_status = "3-Not Approved";
		}
		embed_explain_status=explain_status.split("-");
		embed_explain_status=embed_explain_status[0];
	if($("#embed_explain_status").val()==embed_explain_status){
		
		data={"process_type":$("#embedParamSearchProcessType").val(),
				"explain_remark":$("#explain_remark").val(),
				"explain_status":''
				};
	}else{
		data={"process_type":$("#embedParamSearchProcessType").val(),
				"explain_remark":$("#explain_remark").val(),
				"explain_status":explain_status
				};
	}
	$.ajax({
		url : restfulURL + "/dqs_api/public/dqs_monitoring/cdmd/"+id+"/explain",							
		type : "PATCH",
		dataType : "json",
		data :data,
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			checkMaintenanceFn(data);
			if(data['status']==200){
				//alert(data['warning']);
				if(data['warning']==""){
					$("#cdmd_explain_approve").prop("disabled",true);
					$("#cdmd_explain_not_approved").prop("disabled",true);
					callFlashSlideInModal("Update Successfully.","#information2");
					getDataFn($("#pageNumber").val(),$("#rpp").val());
					setTimeout(function(){$("#exPlainModal").modal('hide');},1000);
				}else{
					callFlashSlideInModal(data['warning'],"#information2","error");
					$("#btn-explain").click();
				}
			}else if(data['status']==400){
				var errorMessage="";
				if(data['data']['explain_remark']!=undefined){
					errorMessage+=data['data']['explain_remark']
				}
				
				if(data['data']['explain_status']!=undefined){
					errorMessage+=data['data']['explain_status']
				}
				
				callFlashSlideInModal(errorMessage,"#information2","error");
				
				var validate_header_id="";
				if($("#validate_header_id_hidden").val()!=undefined || $("#validate_header_id_hidden").val()!=""){
					validate_header_id=$("#validate_header_id_hidden").val();
				}else{
					validate_header_id=$("#explain_id").val();
				}
				getDataExplainFn(validate_header_id);
				
			}
			
		}
	});
	return false;
}

//search for edit
var findOneFn = function(id,page,rpp) {

	var htmlTable = "";
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_monitoring/cdmd/"+id,
		type : "get",
		dataType : "json",
		async:false,
		data:{
			"page":page,"rpp":rpp,
			"process_type":$("#embedParamSearchProcessType").val(),
			

			contact_branch_code:$("#embedParamSearchBranch").val(),
			start_validate_date:$("#embedParamSearchStartValidateDate").val(),
			end_validate_date:$("#embedParamSearchEndValidateDate").val(),
			cif_no:$("#embedParamSearchCifNo").val(),
			cust_full_name:$("#embedParamSearchCustFullName").val(),
			cust_type_code:$("#embedParamSearchListCusType").val(),
			rule_group:$("#embedParamSearchRuleGroup").val(),
			rule_id:$("#embedParamSearchListRule").val(),
			risk:$("#embedParamSearchRisk").val(),
			validate_status:$("#embedParamSearchValidateStatus").val(),
			customer_flag:$("#embedParamSearchIsCustomer").val(),
			death_flag:$("#embedParamSearchIsDeath").val(),
			personnel_flag:$("#embedParamSearchIsPersonel").val(),
			employee_flag:$("#embedParamSearchIsEmployee").val(),
			explain_status:$("#embedParamSearchExplainStatus").val(),
			affiliation_flag:$("#embedParamSearchIsAffiliation").val(),
			inform_flag:$("#embedParamSearchInformBranch").val(),
			release_flag:$("#embedParamSearchIsReleased").val()
			
			
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {	
			checkMaintenanceFn(data);
			//console.log(data['own_branch_name']);
			var dataRuleList=data['rule_list'];
			data=data['header'];
			htmlTable += "<div class='label-detail'>";
			htmlTable += "<div class='box1'><b>Branch</b> : "+data['own_branch_name']+"</div>";
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
			//htmlTable +="<div class='box1' id='countRuleArea'><b>#Rule</b> : "+data["rules"]+"</div>";
			htmlTable +="<div class='box1' id='countRuleArea'></div>";
			
			htmlTable +="</div>";
			
			htmlTable +="<div class='label-detail'>";
			//htmlTable +="<div class='box1' id='countMaxdaysArea'><b>#Maxdays</b> : "+data["maxdays"]+"</div>";
			htmlTable +="<div class='box1' id='countMaxdaysArea'></div>";
			
			htmlTable +="</div>";
			htmlTable +="<br style='clear:both'>";		
			$("#detail_id").html(htmlTable);
			listDetailRuleFn(dataRuleList['data']);
			golbalDataRule=dataRuleList;
			//alert($("#embed_param_count_rule").val());
			$("#countRuleArea").html("<b>#Rule</b>&nbsp;:&nbsp;" +$("#embed_param_count_rule").val());
			$("#countMaxdaysArea").html("<b>#Maxdays</b>&nbsp;:&nbsp;" +$("#embed_param_count_maxdays").val());
			
			
			paginationSetUpFn2(golbalDataRule['current_page'],golbalDataRule['last_page'],golbalDataRule['last_page']);
		}
	});
};
//List Data Quality
var listDataQualityFn = function(data) {

	var htmlTable = "";
	$.each(data,function(index,indexEntry) {
		/*if(indexEntry['kpi_flag']==1 && indexEntry['complete_flag']==0){
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
			htmlTable += "<td class='columnSearch countRules-"+indexEntry["validate_initial_header_id"]+"'>"+ indexEntry["rules"]+ "</td>";
			htmlTable += "<td class='columnSearch countMaxDays-"+indexEntry["validate_initial_header_id"]+"'>"+ indexEntry["maxdays"]+ "</td>";	
			
			htmlTable += "<td>"; 
			htmlTable += "<input type='hidden' id='explain_status-"+indexEntry["validate_initial_header_id"]+"' name='explain_status' value='"+indexEntry["explain_status"]+"'>";
			htmlTable += "<div class='text-inline-table'><i class='fa fa fa-search font-management modalDetail' data-target='#modalDetail' data-toggle='modal' id="+indexEntry["validate_initial_header_id"]+"></i>";
			htmlTable += statusIconFn(indexEntry["explain_status"],indexEntry["validate_initial_header_id"]);
			
			htmlTable += "</div></td>";
		}else{
			htmlTable += "<td class='columnSearch countRules-"+indexEntry["validate_header_id"]+"'>"+ indexEntry["rules"]+ "</td>";
			htmlTable += "<td class='columnSearch countMaxDays-"+indexEntry["validate_header_id"]+"'>"+ indexEntry["maxdays"]+ "</td>";	
			
			
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
		$("#explain_files").empty();
		$("#exPlainModal").modal();
		getDataExplainFn(this.id);
		$("#explain_id").val(this.id);
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
			htmlTable += "<td><input disabled type=\"checkbox\" class='kpi_checkbox editAble' id=kpiFlagCheckbox-"+validate_id+" checked='checked'  value='1' ></td>";
		}else if(indexEntry["kpi_flag"]==0){
			htmlTable += "<td><input disabled type=\"checkbox\" class='kpi_checkbox notEditAble' id=kpiFlagCheckbox-"+validate_id+" value='0'></td>";
		}
		htmlTable+="<td><select disabled class=\"form-control input-inline-table validate_status\" id=validate_status-"+validate_id+"></select></td>";	
		
		if(indexEntry["no_doc_flag"]==1){
			htmlTable += "<td style='text-align:center'><input disabled type=\"checkbox\" class='no_doc_checkbox' id=no_doc_checkbox-"+validate_id+" checked='checked' ></td>";
		}else if(indexEntry["no_doc_flag"]==0){
			htmlTable += "<td style='text-align:center'><input disabled type=\"checkbox\" class='no_doc_checkbox' id=no_doc_checkbox-"+validate_id+" ></td>";
		}
		htmlTable += "</tr>";

		$("#tableDataMakeRuleQuality").append(htmlTable);	 
		dropDownListValidateStatus(indexEntry["validate_status"],validate_id);
	});
	
	//click ที่ checkox KPI แล้ว แยกไอดี ส่งไปฝัง(embed) 
	$(".kpi_checkbox").click(function(){
		 
		if($(this).hasClass("editAble")){
			var id = this.id.split("-"); 
			embedParamCheckboxKPI(id[1]);
		}else{
			//alert("not ok");
			return false;
		}
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
	var validate = "";
	var validateStatus= true;
	var validateStatusTemp = true;
	var count = 0;
	/* explain_status  start*/
	var explain_status = data['explain_status'].split("-");
	explain_status=explain_status[0];
	
	if(explain_status==1){
		$('#cdmd_explain_waiting').prop('checked', true);
		$('#cdmd_explain_approve').removeAttr('disabled');
		$('#cdmd_explain_not_approved').removeAttr('disabled');
	}
	
	if(explain_status==2){
		$('#cdmd_explain_approve').prop('checked', true);
		$('#cdmd_explain_approve').attr('disabled', 'disabled');
		$('#cdmd_explain_not_approved').attr('disabled', 'disabled');
	}
	
	if(explain_status==3){
		$('#cdmd_explain_not_approved').prop('checked', true);
		$('#cdmd_explain_approve').attr('disabled', 'disabled');
		$('#cdmd_explain_not_approved').attr('disabled', 'disabled');
	}
	
	if(explain_status==4){
		
		$('#cdmd_explain_no_explanation').prop('checked', true);
		$('#cdmd_explain_approve').attr('disabled', 'disabled');
		$('#cdmd_explain_not_approved').attr('disabled', 'disabled');
	}

	var radioExplanation = $("input[name='radioExplanation']:checked").val();
	
	$("input[name='radioAppove']").click(function(){
	
		if(radioExplanation==4){
			callFlashSlideInModal("Not edit.","#information2");
			return false;
		}
	});
	
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
					checkMaintenanceFn(data1);
					if(data1['status']==404){
						if(index==0){
							html_explain_files+="<a class='not-active' target=\"_blank\" href=\""+restfulURL+"/dqs_api/public/"+indexEntry['file_path']+"\">"+indexEntry['file_path']+"</a> <br style=\"clear:both\">";
						}else{
							html_explain_files+=" , <a class='not-active' target=\"_blank\" href=\""+restfulURL+"/dqs_api/public/"+indexEntry['file_path']+"\">"+indexEntry['file_path']+"</a><br style=\"clear:both\">";
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
					html_explain_files+="<a target=\"_blank\" href=\""+restfulURL+"/dqs_api/public/"+indexEntry['file_path']+"\">"+indexEntry['file_path']+"</a> <br style=\"clear:both\">";
				}else{
					html_explain_files+=" , <a target=\"_blank\" href=\""+restfulURL+"/dqs_api/public/"+indexEntry['file_path']+"\">"+indexEntry['file_path']+"</a><br style=\"clear:both\">";
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
	
	/*explain_user start*/
	$("#explain_user").html(data['explain_user']);
	/*explain_user end*/
	
	/*explain_dttm start*/
	$("#explain_dttm").html(data['explain_dttm']);
	/*explain_dttm end*/
	
	/*explain_remark start*/
	$("#explain_remark").val(data['explain_remark']);
	/*explain_remark end*/
	
	/*embed param status start*/
	$("#embed_explain_status").val(explain_status);
	/*embed param status end*/
	
	
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
	var validateStatus=["incomplete","wrong","complete","correct","transfer"];
		var htmlDropdownList="";
		$.each(validateStatus,function(index,indexEntry){
			
			if(name==indexEntry){
				htmlDropdownList+="<option value="+indexEntry+" selected>"+indexEntry+"</option>";	
			}else{
				htmlDropdownList+="<option  value="+indexEntry+">"+indexEntry+"</option>";		
			}
		});	
		$("#validate_status-"+id).html(htmlDropdownList);
		
		
		if(name=="incomplete"  || name=="wrong" ){
			$("#validate_status-"+id).addClass("editAble");
		}else{
			$("#validate_status-"+id).addClass("notEditAble");
			
		}
		if($("#validate_status-"+id).val()=="incomplete" || $("#validate_status-"+id).val()=="wrong"){
			$("#validate_status-"+id+" option[value=\"correct\"]").prop('disabled', false);
			$("#validate_status-"+id+" option[value=\"incomplete\"]").prop('disabled', true);
			$("#validate_status-"+id+" option[value=\"wrong\"]").prop('disabled', true);
			$("#validate_status-"+id+" option[value=\"complete\"]").prop('disabled', true);
			$("#validate_status-"+id+" option[value=\"transfer\"]").prop('disabled', true);
			
		}
		
		
};

var getDataFn = function(page,rpp) {

	$.ajax({
		url : restfulURL + "/dqs_api/public/dqs_monitoring/cdmd",
		type : "get",
		dataType : "json",
		data:{"page":page,"rpp":rpp,
			
			contact_branch_code:$("#embedParamSearchBranch").val(),
			start_validate_date:$("#embedParamSearchStartValidateDate").val(),
			end_validate_date:$("#embedParamSearchEndValidateDate").val(),
			cif_no:$("#embedParamSearchCifNo").val(),
			cust_full_name:$("#embedParamSearchCustFullName").val(),
			cust_type_code:$("#embedParamSearchListCusType").val(),
			rule_group:$("#embedParamSearchRuleGroup").val(),
			rule_id:$("#embedParamSearchListRule").val(),
			risk:$("#embedParamSearchRisk").val(),
			validate_status:$("#embedParamSearchValidateStatus").val(),
			customer_flag:$("#embedParamSearchIsCustomer").val(),
			death_flag:$("#embedParamSearchIsDeath").val(),
			personnel_flag:$("#embedParamSearchIsPersonel").val(),
			employee_flag:$("#embedParamSearchIsEmployee").val(),
			explain_status:$("#embedParamSearchExplainStatus").val(),
			affiliation_flag:$("#embedParamSearchIsAffiliation").val(),
			inform_flag:$("#embedParamSearchInformBranch").val(),
			release_flag:$("#embedParamSearchIsReleased").val(),
			process_type:$("#embedParamSearchProcessType").val()
			
			
			},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			checkMaintenanceFn(data);
			listDataQualityFn(data['data']);
			$("#resultLabelArea").html(data['total']);
			golbalData=data;
			paginationSetUpFn(golbalData['current_page'],golbalData['last_page'],golbalData['last_page']);
		}
	});
};

var getDataExplainFn = function(id) {
	$.ajax({
		url : restfulURL + "/dqs_api/public/dqs_monitoring/cdmd/"+id+"/explain",
		type : "get",
		dataType : "json",
		data:{"process_type":$("#embedParamSearchProcessType").val()},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success : function(data) {
			checkMaintenanceFn(data);
			fineOneExplainFn(data);
			
		}
	});
};

$(document).ready(function(){
	
	$(document).ready(function(){
	    $('[data-toggle="tooltip"]').tooltip();
	});
	$(".btn-explain").click(function(){
		$("#exPlainModal").modal();
	});
	
	//Number Only Text Fields.
	
//	$(".numberOnly").keydown(function (e) {
//	        // Allow: backspace, delete, tab, escape, enter and .
//		
//	        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
//	             // Allow: Ctrl+A, Command+A
//	            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
//	             // Allow: home, end, left, right, down, up
//	            (e.keyCode >= 35 && e.keyCode <= 40)) {
//	                 // let it happen, don't do anything
//	                 return;
//	        }
//	        // Ensure that it is a number and stop the keypress
//	        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
//	            e.preventDefault();
//	        }
//	});
	
	
	
	//Drop down List
	dropDownListBranch();
	dropDownListCusType();
	dropDownListRule();
	
	//Date Picker
	$("#start_validate_date").datepicker();
    $("#start_validate_date").datepicker( "option", "dateFormat", "yy-mm-dd" );
    $("#start_validate_date").val(firstDayInMonthFn());
   
    $("#end_validate_date").datepicker();
    $("#end_validate_date").datepicker( "option", "dateFormat", "yy-mm-dd" );
    $("#end_validate_date").val(currentDateFn());
    $(".ui-datepicker").hide();
    
    //Quick Search
	$("#btnSearch").click(function(){
		searchMultiFn($("#searchText").val());
	});
	
	$("#btnSearchDetail").click(function(){
		searchMultiFn($("#searchTextDetail").val(),"detail");
		//searchMultiFn($("#searchText").val());
	});
	
	//Embed Parameter
	$("#btnSearchAdvance").click(function(){

		$(".embedParamSearch").remove();
		$("#embedParamArea").append("<input type='hidden' value='"+$("#listBranch").val()+"' id='embedParamSearchBranch' name='embedParamSearchBranch' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#listBranch option:selected").text()+"' id='embedParamSearchBranchName' name='embedParamSearchBranchName' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#start_validate_date").val()+"' id='embedParamSearchStartValidateDate' name='embedParamSearchStartValidateDate' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#end_validate_date").val()+"' id='embedParamSearchEndValidateDate' name='embedParamSearchEndValidateDate' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#cif_no").val()+"' id='embedParamSearchCifNo' name='embedParamSearchCifNo' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#cust_full_name").val()+"' id='embedParamSearchCustFullName' name='embedParamSearchCustFullName' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#listCusType").val()+"' id='embedParamSearchListCusType' name='embedParamSearchListCusType' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#processType").val()+"' id='embedParamSearchProcessType' name='embedParamSearchProcessType' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#rule_group").val()+"' id='embedParamSearchRuleGroup' name='embedParamSearchRuleGroup' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#listRule").val()+"' id='embedParamSearchListRule' name='embedParamSearchListRule' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#risk").val()+"' id='embedParamSearchRisk' name='embedParamSearchRisk' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#validate_status").val()+"' id='embedParamSearchValidateStatus' name='embedParamSearchValidateStatus' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#is_customer").val()+"' id='embedParamSearchIsCustomer' name='embedParamSearchIsCustomer' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#is_death").val()+"' id='embedParamSearchIsDeath' name='embedParamSearchIsDeath' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#is_personel").val()+"' id='embedParamSearchIsPersonel' name='embedParamSearchIsPersonel' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#is_employee").val()+"' id='embedParamSearchIsEmployee' name='embedParamSearchIsEmployee' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#explain_status").val()+"' id='embedParamSearchExplainStatus' name='embedParamSearchExplainStatus' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#is_affiliation").val()+"' id='embedParamSearchIsAffiliation' name='embedParamSearchIsAffiliation' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#inform_branch").val()+"' id='embedParamSearchInformBranch' name='embedParamSearchInformBranch' class='embedParamSearch'>");
		$("#embedParamArea").append("<input type='hidden' value='"+$("#is_released").val()+"' id='embedParamSearchIsReleased' name='embedParamSearchIsReleased' class='embedParamSearch'>");
		
		$("#branchNameLabelArea").html($("#embedParamSearchBranchName").val());
		getDataFn(1,$("#rpp").val());
		//$(".countPagination").val(10);
		$("#cifListArea").show();
		return false;
	});
	//Advance Search Action.
	//$("#btnSearchAdvance").click();
	
	//Update Action
	$("#btnSubmit").click(function(){
		updateFn(); 
	});
	
	//Button Edit
	$("#btnEdit").click(function() {
		
		
		//$(".validate_status").removeAttr("disabled");
		$(".editAble").removeAttr("disabled");
		//$(".kpi_checkbox").removeAttr("disabled");
		
	});
	//Cancel Action
	$("#btnCancle").click(function() {
		var id = $("#validate_header_id_hidden").val();
		//$(".countPagination2").val(10);
		findOneFn(id,$("#pageNumber2").val(),$("#rpp2").val());
	});
	//Explain Action
	$("#btn-explain").click(function() {
		
		getDataExplainFn($("#validate_header_id_hidden").val());
		$("#explain_id").val($("#validate_header_id_hidden").val());
	});
	
	//Save Explain Action
	$("#btnSaveExplain").click(function() {
		  var radioExplanation = $("input[name='cdmd_explain_status']:checked").val();
			if(radioExplanation==4){
				callFlashSlideInModal("Not save.","#information2");
				return false;
			}else{
				updateExplainFn($("#explain_id").val());
			}
	});
	
	//Export
	$("#exportToExcel").click(function(){
		
		var param="";
		
		param+="&contact_branch_code="+$("#embedParamSearchBranch").val();
		param+="&start_validate_date="+$("#embedParamSearchStartValidateDate").val();
		param+="&end_validate_date="+$("#embedParamSearchEndValidateDate").val();
		param+="&cif_no="+$("#embedParamSearchCifNo").val();
		param+="&cust_full_name="+$("#embedParamSearchCustFullName").val();
		param+="&cust_type_code="+$("#embedParamSearchListCusType").val();
		param+="&rule_group="+$("#embedParamSearchRuleGroup").val();
		param+="&rule_id="+$("#embedParamSearchListRule").val();
		param+="&risk="+$("#embedParamSearchRisk").val();
		param+="&validate_status="+$("#embedParamSearchValidateStatus").val();
		param+="&customer_flag="+$("#embedParamSearchIsCustomer").val();
		param+="&death_flag="+$("#embedParamSearchIsDeath").val();
		param+="&personnel_flag="+$("#embedParamSearchIsPersonel").val();
		param+="&employee_flag="+$("#embedParamSearchIsEmployee").val();
		param+="&explain_status="+$("#embedParamSearchExplainStatus").val();
		param+="&affiliation_flag="+$("#embedParamSearchIsAffiliation").val();
		param+="&inform_flag="+$("#embedParamSearchInformBranch").val();
		param+="&release_flag="+$("#embedParamSearchIsReleased").val();
		param+="&process_type="+$("#embedParamSearchProcessType").val();
		
		$("form#formExportToExcel").attr("action",restfulURL+"/dqs_api/public/dqs_monitoring/cdmd/export?token="+tokenID.token+""+param);
		$("form#formExportToExcel").submit();
		
		
	});
	
//	//กำหนดค่า CIF ต้องเปนตัวเลข
//	$("#cif_no").keydown(function (e) {
//	        // Allow: backspace, delete, tab, escape, enter and .
//		
//	        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
//	             // Allow: Ctrl+A, Command+A
//	            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
//	             // Allow: home, end, left, right, down, up
//	            (e.keyCode >= 35 && e.keyCode <= 40)) {
//	                 // let it happen, don't do anything
//	                 return;
//	        }
//	        // Ensure that it is a number and stop the keypress
//	        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
//	            e.preventDefault();
//	        }
//	});
	
//	//กำหนดค่า risk ต้องเปนตัวเลข
//	$("#risk").keydown(function (e) {
//	        // Allow: backspace, delete, tab, escape, enter and .
//		
//	        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
//	             // Allow: Ctrl+A, Command+A
//	            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
//	             // Allow: home, end, left, right, down, up
//	            (e.keyCode >= 35 && e.keyCode <= 40)) {
//	                 // let it happen, don't do anything
//	                 return;
//	        }
//	        // Ensure that it is a number and stop the keypress
//	        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
//	            e.preventDefault();
//	        }
//	});
	
	
	//Not Number Start
	jQuery('.numberOnly').keyup(function () { 
	    this.value = this.value.replace(/[^0-9\.]/g,'');
	});
	//Not Number End

});
