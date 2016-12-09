var golbalDataRole=[];	


	
// Click แล้ว ฝังข้อมูล
	var embedParamInitialFlagInline = function(id){
		//alert(id);
		var count = 0;
		
		$.each($(".embed_initial_flag_inline").get(),function(index,indexEnry){
		//ถ้า id ที่วน == id ที่มี	
			if($(indexEnry).val()==id){
				count+=1;
			}
		});
		
		if(count>0){
			$("#embed_initial_flag_inline-"+id).remove();
			$("body").append("<input type='hidden' class='embed_initial_flag_inline' id='embed_initial_flag_inline-"+id+"' name='embed_initial_flag_inline-"+id+"' value='"+id+"'>");
		}else{
			$("body").append("<input type='hidden' class='embed_initial_flag_inline' id='embed_initial_flag_inline-"+id+"' name='embed_initial_flag_inline-"+id+"' value='"+id+"'>");
		}
		
	}
	var embedParamUpdateFlagInline = function(id){
		//alert(id);
		var count = 0;
		
		$.each($(".embed_update_flag_inline").get(),function(index,indexEnry){
		//ถ้า id ที่วน == id ที่มี	
			if($(indexEnry).val()==id){
				count+=1;
			}
		});
		
		if(count>0){
			$("#embed_update_flag_inline-"+id).remove();
			$("body").append("<input type='hidden' class='embed_update_flag_inline' id='embed_update_flag_inline-"+id+"' name='embed_update_flag_inline-"+id+"' value='"+id+"'>");
		}else{
			$("body").append("<input type='hidden' class='embed_update_flag_inline' id='embed_update_flag_inline-"+id+"' name='embed_update_flag_inline-"+id+"' value='"+id+"'>");
		}
		
	}
	
	var embedParamLastContactFlagInline = function(id){
		//alert(id);
		var count = 0;
		
		$.each($(".embed_last_contact_flag_inline").get(),function(index,indexEnry){
		//ถ้า id ที่วน == id ที่มี	
			if($(indexEnry).val()==id){
				count+=1;
			}
		});
		
		if(count>0){
			$("#embed_last_contact_flag_inline-"+id).remove();
			$("body").append("<input type='hidden' class='embed_last_contact_flag_inline' id='embed_last_contact_flag_inline-"+id+"' name='embed_last_contact_flag_inline-"+id+"' value='"+id+"'>");
		}else{
			$("body").append("<input type='hidden' class='embed_last_contact_flag_inline' id='embed_last_contact_flag_inline-"+id+"' name='embed_last_contact_flag_inline-"+id+"' value='"+id+"'>");
		}
		
	}
	
	var embedParamInformFlagInline = function(id){
		//alert(id);
		var count = 0;
		
		$.each($(".embed_inform_flag_inline").get(),function(index,indexEnry){
		//ถ้า id ที่วน == id ที่มี	
			if($(indexEnry).val()==id){
				count+=1;
			}
		});
		
		if(count>0){
			$("#embed_inform_flag_inline-"+id).remove();
			$("body").append("<input type='hidden' class='embed_inform_flag_inline' id='embed_inform_flag_inline-"+id+"' name='embed_inform_flag_inline-"+id+"' value='"+id+"'>");
		}else{
			$("body").append("<input type='hidden' class='embed_inform_flag_inline' id='embed_inform_flag_inline-"+id+"' name='embed_inform_flag_inline-"+id+"' value='"+id+"'>");
		}
		
	}
	var embedParamEditRuleReleaseFlagInline = function(id){
		//alert(id);
		var count = 0;
		
		$.each($(".embed_edit_rule_release_flag_inline").get(),function(index,indexEnry){
		//ถ้า id ที่วน == id ที่มี	
			if($(indexEnry).val()==id){
				count+=1;
			}
		});
		
		if(count>0){
			$("#embed_edit_rule_release_flag_inline-"+id).remove();
			$("body").append("<input type='hidden' class='embed_edit_rule_release_flag_inline' id='embed_edit_rule_release_flag_inline-"+id+"' name='embed_edit_rule_release_flag_inline-"+id+"' value='"+id+"'>");
		}else{
			$("body").append("<input type='hidden' class='embed_edit_rule_release_flag_inline' id='embed_edit_rule_release_flag_inline-"+id+"' name='embed_edit_rule_release_flag_inline-"+id+"' value='"+id+"'>");
		}
		
	}
	
	
$(document).ready(function(){


	
	var checkUniqueFn = function(text) {
		/* http://localhost:3000/api/products?name__regex=/^test/i */
		var unique = false;
		$.ajax({
			url : restfulURL +"/dqs_api/public/dqs_rule?rule_name="+text+"",
			type : "get",
			dataType : "json",
			async : false,
			headers:{Authorization:"Bearer "+tokenID.token},
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
	
	var insertFn = function(param) {
			
		var checkboxInitial = "";
		var checkboxUpdate = "";
		var checkboxContact = "";
		var InformBranchRadio = "";
		var EditRuleRelease ="";
		var RuleGroup="";
		
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
		//แก้ไข Inform
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
		
			url:restfulURL+"/dqs_api/public/dqs_rule",
			type : "POST",
			dataType : "json",
			data : {"rule_name" : $("#rule_name").val(),
					"rule_group" :$("#rule_group_id").val() ,
					"data_flow_id" : $("#data_flow_id").val(),
					"initial_flag" : checkboxInitial,
					"update_flag" : checkboxUpdate,
					"last_contact_flag" : checkboxContact,
					"inform_flag" : InformBranchRadio,
					"edit_rule_release_flag" : EditRuleRelease
			},
			headers:{Authorization:"Bearer "+tokenID.token},
			success : function(data) {
				if (data['status'] == 200) {

			
					
					if(param !="saveAndAnother"){
						   callFlashSlide("Insert Successfully.");
					       getDataFn();
					       clearFn();
					 	   $('#addModalRule').modal('hide');	
						}else{
							getDataFn();
							clearFn();
							callFlashSlideInModal("Insert Data is Successfully.");
					}
					
					
					
				}else if (data['status'] == 400) {
					
					var validate="";
					if(data['data']['rule_name']!=undefined){
						validate+="<font color='red'>*</font> "+data['data']['rule_name']+"<br>";
					}
					if(data['data']['inform_flag']!=undefined){
						validate+="<font color='red'>*</font> "+data['data']['inform_flag']+"<br>";
					}
					if(data['data']['edit_rule_release_flag']!=undefined){
						validate+="<font color='red'>*</font> "+data['data']['edit_rule_release_flag']+"<br>";
					}
					callFlashSlideInModal(validate);
					
					
				}
			}
		});
		return false;
	};
	
	var updateFn = function() {
		
		var checkboxInitial = "";
		var checkboxUpdate = "";
		var checkboxContact = "";
		var InformBranchRadio = "";
		var EditRuleRelease ="";
		var RuleGroup ="";
		
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
			url:restfulURL+"/dqs_api/public/dqs_rule/"+$("#id").val(),
			type : "PATCH",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			data : {"rule_name" : $("#rule_name").val(),
				"rule_group" : $("#rule_group_id").val(),
				"data_flow_id" : $("#data_flow_id").val(),
				"initial_flag" : checkboxInitial,
				"update_flag" : checkboxUpdate,
				"last_contact_flag" : checkboxContact,
				"inform_flag" : InformBranchRadio,
				"edit_rule_release_flag" : EditRuleRelease
			},
			success : function(data) {
				if (data['status'] == 200) {
					callFlashSlide("Update Successfully.");
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
	
	var findOneFn = function(id) {
		/*
		 {"rule_id":"1","rule_name":"Rule Number 1.1","rule_group":"Mapping","data_flow_id":"1","initial_flag"
:"0","update_flag":"0","last_contact_flag":"0","inform_flag":"0","edit_rule_release_flag":"0"}
		 */
		$.ajax({
			url:restfulURL+"/dqs_api/public/dqs_rule/"+ id,
			type : "get",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			success : function(data) {
				
				$("#rule_name").val(data['rule_name']);
				
				$("select#rule_group_id").val(data['rule_group'].trim());
				$("select#data_flow_id").val(data['data_flow_id'].trim());
				
				//processType
				$('.processType').prop('checked', false);

				if(data['initial_flag']==1){
					$('#checkboxInitial').prop('checked', true);
				}
				
				if(data['update_flag']==1){
					$('#checkboxUpdate').prop('checked', true);
				}
				
				if(data['last_contact_flag']==1){
					$('#checkboxContact').prop('checked', true);
				}
				//inform Branch 
				if(data['inform_flag']==1){
					$('#InformBranchRadioTrue').prop('checked', true);
				}
				if(data['inform_flag']==0){
					$('#InformBranchRadioFalse').prop('checked', true);
				}
				//Edit Rule Release
				if(data['edit_rule_release_flag']==1){
					$('#EditRuleReleaseTrue').prop('checked', true);
				}
				if(data['edit_rule_release_flag']==0){
					$('#EditRuleReleaseFalse').prop('checked', true);
				}
				
			}
		});
		
	};


	var searchAdvanceFn = function(paramRuleGroup,paramRuleName,paramInitial,paramUpdate,paramLastContact) {
		//http://192.168.1.58/dqs_api/public/dqs_rule
		/*
		 "page,
			rpp,
			rule_group,
			rule_name,
			initial_flag,
			update_flag,
			last_contact_flag
			"
		 */
		$.ajax({
			url : restfulURL + "/dqs_api/public/dqs_rule",
			type : "get",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			data:{
				"rule_group":paramRuleGroup,
				"rule_name":paramRuleName,
				"initial_flag":paramInitial,
				"update_flag":paramUpdate,
				"last_contact_flag":paramLastContact
			},
			success : function(data) {
				if(data['data']!=""){
				listRuleFn(data);
				}
			}
		});
	}
	
	var listRuleFn = function(data) {
		
		if ($.fn.DataTable.isDataTable('#tableRule')) {
		       $('#tableRule').DataTable().destroy(); 
		}
		
	/*
{"rule_id":"1","rule_group":"Mapping","rule_name":"Rule Number 1.1","data_flow_name"
:"Test Flow","initial_flag":"0","update_flag":"0","last_contact_flag":"0","inform_flag":"0",
"edit_rule_release_flag"
:"0"}
	 */
		var htmlTable = "";
		
		$.each(data,function(index,indexEntry) {
		htmlTable += "<tr>";
//
		htmlTable += "<td>"+ indexEntry["rule_group"]+ "</td>"; 
		htmlTable += "<td>"+ indexEntry["rule_name"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["data_flow_name"]+ "</td>";
		
		if(indexEntry["initial_flag"]==1){
			htmlTable += "<td><input id=\"initial_flag_inline-"+indexEntry["rule_id"]+"\" class=\"initial_flag_inline\" disabled type='checkbox' checked='checked' value="+ indexEntry["initial_flag"]+"></td>";
		}else if(indexEntry["initial_flag"]==0){
			htmlTable += "<td><input id=\"initial_flag_inline-"+indexEntry["rule_id"]+"\" class=\"initial_flag_inline\" disabled type='checkbox' value="+ indexEntry["initial_flag"]+"></td>";
		}
		
		if(indexEntry["update_flag"]==1){
			htmlTable += "<td><input id=\"update_flag_inline-"+indexEntry["rule_id"]+"\" class=\"update_flag_inline\" disabled type='checkbox' checked='checked' value="+ indexEntry["update_flag"]+"></td>";
		}else if(indexEntry["update_flag"]==0){
			htmlTable += "<td><input id=\"update_flag_inline-"+indexEntry["rule_id"]+"\" class=\"update_flag_inline\" disabled type='checkbox' value="+ indexEntry["update_flag"]+"></td>";
		}
		
		if(indexEntry["last_contact_flag"]==1){
			htmlTable += "<td><input id=\"last_contact_flag_inline-"+indexEntry["rule_id"]+"\" class=\"last_contact_flag_inline\" disabled type='checkbox' checked='checked' value="+ indexEntry["last_contact_flag"]+"></td>";
		}else if(indexEntry["last_contact_flag"]==0){
			htmlTable += "<td><input id=\"last_contact_flag_inline-"+indexEntry["rule_id"]+"\" class=\"last_contact_flag_inline\" disabled type='checkbox' value="+ indexEntry["last_contact_flag"]+"></td>";
		}
		
		if(indexEntry["inform_flag"]==1){
			htmlTable += "<td><input id=\"inform_flag_inline-"+indexEntry["rule_id"]+"\" class=\"inform_flag_inline\" disabled type='checkbox' checked='checked' value="+ indexEntry["inform_flag"]+"></td>";
		}else if(indexEntry["inform_flag"]==0){
			htmlTable += "<td><input id=\"inform_flag_inline-"+indexEntry["rule_id"]+"\" class=\"inform_flag_inline\" disabled type='checkbox' value="+ indexEntry["inform_flag"]+"></td>";
		}
		
		if(indexEntry["edit_rule_release_flag"]==1){
			htmlTable += "<td><input id=\"edit_rule_release_flag_inline-"+indexEntry["rule_id"]+"\" class=\"edit_rule_release_flag_inline\" disabled type='checkbox' checked='checked' value="+ indexEntry["edit_rule_release_flag"]+"></td>";
		}else if(indexEntry["edit_rule_release_flag"]==0){
			htmlTable += "<td><input id=\"edit_rule_release_flag_inline-"+indexEntry["rule_id"]+"\" class=\"edit_rule_release_flag_inline\" disabled type='checkbox' value="+ indexEntry["edit_rule_release_flag"]+"></td>";
		}

		htmlTable += "<td><i class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-warning btn-xs btn-gear edit' id="+ indexEntry["rule_id"]+ " data-target=#addModalRule data-toggle='modal'>Edit</button>&nbsp;<button id="+indexEntry["rule_id"]+" class='btn btn-danger btn-xs btn-gear del'>Delete</button>\"></i></td>";
		htmlTable += "</tr>";
		});
	
		$("#listRule").html(htmlTable);
		
		$('#tableRule').DataTable( { "dom": '<"top"flp>rt<"bottom"lp><"clear">' ,"bSort" : false } );  
		
		//function popover
		$(".popover-edit-del").popover();
	
		//findOnd
		$("#tableRule").off("click",".popover-edit-del");
		$("#tableRule").on("click",".popover-edit-del",function(){
			$(".edit").on("click",function() {
				
				findOneFn(this.id);
				$("#id").val(this.id);
				$("#action").val("edit");
				$("#btnSubmit").val("Edit");
			});
			
			$(".del").on("click",function() {
				
				$.ajax({
					 url:restfulURL+"/dqs_api/public/dqs_rule/"+ this.id,
					 type : "delete",
					 dataType:"json",
					 headers:{Authorization:"Bearer "+tokenID.token},
				     success:function(data){   
				    	if(data['status']==200){
				    		getDataFn();
				    		clearFn();
				    		callFlashSlide("Delete Successfully.");
				    	}
				       //return false;
					 }
				});
				
			});	
			
		});
		
		//embedParam
		$('#tableRule').on("click",".initial_flag_inline",function(){		
			var id = this.id.split("-"); 
			embedParamInitialFlagInline(id[1]);
		});
		$('#tableRule').on("click",".update_flag_inline",function(){		
			var id = this.id.split("-"); 
			embedParamUpdateFlagInline(id[1]);
		});
		
		$('#tableRule').on("click",".last_contact_flag_inline",function(){		
			var id = this.id.split("-"); 
			embedParamLastContactFlagInline(id[1]);
		});
		$('#tableRule').on("click",".inform_flag_inline",function(){		
			var id = this.id.split("-"); 
			embedParamInformFlagInline(id[1]);
		});
		$('#tableRule').on("click",".edit_rule_release_flag_inline",function(){		
			var id = this.id.split("-"); 
			embedParamEditRuleReleaseFlagInline(id[1]);
		});
		
		
	};
	
	
	var dropdownRuleGroup = function(id) {
		//alert("555");
		var selectDataflowHTML=""
		var makeRuleGroupID=""	
			
		if (id=="1"){
			makeRuleGroupID = "Cleansing"
		}else if (id=="2"){
			makeRuleGroupID = "Matching"
		}
		
		$.ajax({
			url : restfulURL + "/dqs_api/public/dqs_rule_group",
			type : "get",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			success : function(data) {
				
				$.each(data,function(index,indexEntry){
					
					
					if(makeRuleGroupID==indexEntry['rule_group_name']){
						//alert(makeDataflowID+"="+indexEntry['data_flow_name']);
						selectDataflowHTML+="<option selected>"+indexEntry['rule_group_name']+"</option>"; 
					}else{
						selectDataflowHTML+="<option>"+indexEntry['rule_group_name']+"</option>";  
					}
				
				});
				//alert(selectDataflowHTML);
				$("#rule_group_id").html(selectDataflowHTML);
			}
		});
	}
	//dropdownRuleGroup();
	
	var dropdownDataFlow = function(id) {
		//alert("data flow "+id);
		var selectDataflowHTML=""
		$.ajax({
			url : restfulURL + "/dqs_api/public/dqs_data_flow",
			type : "get",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			aysnc:false,
			success : function(data) {
				
				$.each(data,function(index,indexEntry){
					
					
					if(id==indexEntry['data_flow_name']){
						//alert(makeDataflowID+"="+indexEntry['data_flow_name']);
						selectDataflowHTML+="<option value="+indexEntry['data_flow_id']+" selected>"+indexEntry['data_flow_name']+"</option>"; 
					}else{
						selectDataflowHTML+="<option value="+indexEntry['data_flow_id']+" >"+indexEntry['data_flow_name']+"</option>";  
					}
				
				});
				//alert(selectDataflowHTML);
				$("#data_flow_id").html(selectDataflowHTML);
			}
		});
	}
	dropdownDataFlow();
	
	var getDataFn = function() {
		$.ajax({
			url : restfulURL + "/dqs_api/public/dqs_rule",
			type : "get",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			success : function(data) {
				
				listRuleFn(data['data']);
				golbalDataRole=data['data'];
				//console.log(data['data']);
			}
		});
	};
	//Call Function start
	  getDataFn();
	 	
	/*	
    $("#btnSearch").click(function(){
		searchFn($("#searchRule").val());
		   return false;
	});*/
	  
	  
	//Auto Complete Rule Name start
		$("#ruleName").autocomplete({
          source: function (request, response) {
        	 
          	 $.ajax({
					    url:restfulURL+"/dqs_api/public/dqs_rule/rule_name",
					    type:"get",
					    dataType:"json",
						headers:{Authorization:"Bearer "+tokenID.token},
						data:{"q":request.term},
						async:false,
                      error: function (xhr, textStatus, errorThrown) {
                          alert('Error: ' + xhr.responseText);
                      },
					    success:function(data){
						
  						response($.map(data, function (item) {
                              return {
//                                  label: item.rule_id+"-"+item.rule_name,
//                                  value: item.rule_id+"-"+item.rule_name
                            	  
                            	  label: item.rule_name,
                                  value: item.rule_name
                              }
                          }));
						
					    }
					   });
          	
          }
      });
		//Auto Complete Rule Name end
		
	
	$("#btnSearchAdvance").click(function(){
		var paramInitial="";
		var paramUpdate="";
		var paramLastContact="";
		
		console.log($("#checkboxInitialSearch").is(":checked"));
		if($("#checkboxInitialSearch").is(":checked")){
			paramInitial=1;
		}else{
			paramInitial=0;
		}
		
		if($("#checkboxUpdateSearch").is(":checked")){
			paramUpdate=1;
		}else{
			paramUpdate=0;
		}
		
		if($("#checkboxContactSearch").is(":checked")){
			paramLastContact=1;
		}else{
			paramLastContact=0;
		}
		
		searchAdvanceFn($("#ruleGroup").val(),$("#ruleName").val(),paramInitial,paramUpdate,paramLastContact);
		   return false;
	});
	
	
	
	
	$("#btnSubmit").click(function(){
		
		//if (validationFn() == true) { 
			if ($("#action").val() == "add"|| $("#action").val() == "") {	
				//if (checkUniqueFn($("#rule_name").val()) == true) { 	
					insertFn();
	//				}else{
	//					alert("name is not unique.");
	//				}
			}else{			
				updateFn();
			}
		//}
		return false;
	});
	
	$("#btnSaveAndAnother").click(function(){
		//alert("btnSaveAndAnother");
		insertFn("saveAndAnother");
		
	});
	
	
	
	$(".btnCancle").click(function() {
		clearFn();
	});
	
	$("#btnEditFlag").click(function() {
		
		$(".initial_flag_inline").removeAttr("disabled");
		$(".update_flag_inline").removeAttr("disabled");
		$(".last_contact_flag_inline").removeAttr("disabled");
		$(".inform_flag_inline").removeAttr("disabled");
		$(".edit_rule_release_flag_inline").removeAttr("disabled"); 
		$("#action").val("edit");
		
		
	});
	
	var updateFlagFn = function() {
		
	
			
			var rules = [];
			  $.each(golbalDataRole,function(index,indexEntry){
			  
			  
			  var initial_flag_inline = "";
			  var update_flag_inline = "";
			  var last_contact_flag_inline = "";
			  var inform_flag_inline = "";
			  var edit_rule_release_flag_inline = "";
			 
			  if($("#embed_initial_flag_inline-"+indexEntry['rule_id']).val()!=undefined 
				|| $("#embed_update_flag_inline-"+indexEntry['rule_id']).val()!=undefined
				|| $("#embed_last_contact_flag_inline-"+indexEntry['rule_id']).val()!=undefined
				|| $("#embed_inform_flag_inline-"+indexEntry['rule_id']).val()!=undefined
				|| $("#embed_edit_rule_release_flag_inline-"+indexEntry['rule_id']).val()!=undefined
				)
			  {
				  
			  	
			 
				   //send value KPI 
				   if($("#initial_flag_inline-"+indexEntry['rule_id']).prop('checked')){ 
					   initial_flag_inline = 1;
			        }else{ 
			        	initial_flag_inline = 0;
			        }
				   
				   //send value LastContact
				   if($("#update_flag_inline-"+indexEntry['rule_id']).prop('checked')){ 
					   update_flag_inline = 1;
			        }else{ 
			        	update_flag_inline = 0;
			        }
				   
				   //send value Delete
				   if($("#last_contact_flag_inline-"+indexEntry['rule_id']).prop('checked')){ 
					   last_contact_flag_inline = 1;
			        }else{ 
			        	last_contact_flag_inline = 0;
			        }
				   
				   //send value Delete
				   if($("#inform_flag_inline-"+indexEntry['rule_id']).prop('checked')){ 
					   inform_flag_inline = 1;
			        }else{ 
			        	inform_flag_inline = 0;
			        }
				   
				   //send value Delete
				   if($("#edit_rule_release_flag_inline-"+indexEntry['rule_id']).prop('checked')){ 
					   edit_rule_release_flag_inline = 1;
			        }else{ 
			        	edit_rule_release_flag_inline = 0;
			        }
				   
		
					  
				   rules.push({
					   rule_id: ""+indexEntry['rule_id']+"",
					   initial_flag:""+initial_flag_inline+"",
					   update_flag: ""+update_flag_inline+"",
					   last_contact_flag: ""+last_contact_flag_inline+"",
					   inform_flag: ""+inform_flag_inline+"",
					   edit_rule_release_flag: ""+edit_rule_release_flag_inline+"",
					   	
				   });
			  }
			  
			  });
			 // console.log(rules);
			
			  $.ajax({
			      url:restfulURL+"/dqs_api/public/dqs_rule",
			      type:"PATCH",
			      dataType:"json",
			      data:{"rules":rules},
			      headers:{Authorization:"Bearer "+tokenID.token},
			      async:false,
			      success:function(data,status){
			     
			        if(status=="success"){
			        	callFlashSlide("Update Successfully.");
			        	getDataFn();
			    		clearFn();
			        }
			     }
			  });
			  
			return false;
		
		};
	$("#btnSubmitFlag").click(function(){
		
		updateFlagFn();
	});
	$("#btnCancleFlag").click(function(){
		 getDataFn();
	});
		
});