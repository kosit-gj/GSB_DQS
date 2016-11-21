$(document).ready(function(){

	var restfulURL = "http://192.168.1.48:3001";
	
	/*var checkUniqueFn = function(text) {
		 http://localhost:3000/api/products?name__regex=/^test/i 
		var unique = false;
		$.ajax({
			url : restfulURL +"/api/dqs_branch?name_filde="+text+"",
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
			
			url:restfulURL+"/api/dqs_branch",
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
		
		var closeflagCheckbox = "";
		var embed_closeflag="";
		var embed_closeflag_obj="";
		embed_closeflag_obj=$(".embed_closeflag").get();
		
		$.each($(".embed_closeflag").get(),function(index,indexEntry){
			
			var id=$(indexEntry).val();
			
			if($("#closeCheckbox-"+id).prop('checked')){ 
	        	closeflagCheckbox = 1;
	        }else{ 
	        	closeflagCheckbox = 0;
	        }
			
			$.ajax({
				url:restfulURL+"/api/dqs_branch/"+id,
				type : "PUT",
				dataType : "json",
				data : {"close_flag" :closeflagCheckbox},
				async:false,
				success : function(data) {
					if (data = "success") {
						
					}
				}
			});

		});
		$(".alert-success").fadeTo(1000,2000).slideUp(500);

		getDataFn();
		clearFn();
		
		$('#addModalRule').modal('hide');
		
		console.log($(".embed_closeflag").get());
	
		return false;
	};
	
	var clearFn = function(){
		$("#action").val("");
	}
	
	var findOneFn = function(id) {
		// http://localhost:3000/find-user/58035b7cb4566c158bcecacf
		$.ajax({
			url:restfulURL+"/api/dqs_branch/"+ id,
			type : "get",
			dataType : "json",
			success : function(data) {
				$("#branchOperationName").val(data['desc']);
			}
		});
	};
	
	var searchFn = function(searchText) {
		$.ajax({
			url : restfulURL + "/api/dqs_branch/?desc__regex=/^"+searchText+"/i",
			type : "get",
			dataType : "json",
			success : function(data) {
				listBranchFn(data);
			}
		});
	}
	
	var dropdownCheckbox = function(id) {
		$.ajax({
			url : restfulURL + "/api/dqs_branch/?rule_name__regex=/^"+searchText+"/i",
			type : "get",
			dataType : "json",
			success : function(data) {
				listBranchFn(data);
			}
		});
	}
	
	var listBranchFn = function(data) {
		
		if ($.fn.DataTable.isDataTable('#tableBranch')) {
			$('#tableBranch').DataTable().destroy(); 
		}
		
		console.log(data);
		var htmlTable = "";
		//var close = $(indexEntry["close_flag"]);

		$.each(data,function(index,indexEntry) {
		htmlTable += "<tr>";
		//htmlTable += "<td>"+ (index + 1)+ "</td>";
		htmlTable += "<td>"+ indexEntry["brcd"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["desc"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["ccdef"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["region"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["dist"]+ "</td>";
		
		if(indexEntry["close_flag"]==1){
			htmlTable += "<td><input type=\"checkbox\" disabled class=\"editCheckboxCloseFlag\" id=closeCheckbox-"+indexEntry["_id"]+" checked='checked' ></td>";
		}else if(indexEntry["close_flag"]==0){
			htmlTable += "<td><input type=\"checkbox\" disabled class=\"editCheckboxCloseFlag\" id=closeCheckbox-"+indexEntry["_id"]+" ></td>";
		}	 
		
		//htmlTable += "<td><button class='btn btn-warning btn-xs editCheckboxCloseFlag' type='button' id="+indexEntry["_id"]+">Edit</button></td>";
		htmlTable += "</tr>";
		});
		
		$("#listBranch").html(htmlTable);
		
		$('#tableBranch').DataTable({ "dom": '<"top"flp>rt<"bottom"lp><"clear">' }); 
		
		/*$(".paginate_button").on("click",function(){
			alert("click");
		})*/
		
		//function popover
		$(".popover-edit-del").popover();
		
		//ปุ่ม Edit ใน table
		$("#tableBranch").on("click",".editCheckboxCloseFlag",function(){  
			
			var id = this.id.split("-"); 
			
			//alert(id[1]);
			embedParam(id[1]);
			//$("#embed_closeflag_id").remove();	
			//$("body").append("<input type='hidden' class='embed_closeflag' id='embed_closeflag-"+id[1]+"' name='embed_closeflag-"+id[1]+"' value='"+id[1]+"'>");	
		});
		
	};
	var embedParam = function(id){
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
	
	// get ของ branch management
	var getDataFn = function() {
		$.ajax({
			url : restfulURL + "/api/dqs_branch",
			type : "get",
			dataType : "json",
			success : function(data) {
				listBranchFn(data);
				console.log(data);
			}
		});
	};

	//Call Function start
	  getDataFn();
	
	//ปุ่ม Save
	$("#btnSubmit").click(function(){
		if ($("#action").val() == "edit"){	
				updateFn();
		}else{
			return false;
		}
	});
	  
	$("#btnSearch").click(function(){
		searchFn($("#searchBranch").val());
		return false;
	});

	$("#btnCancle").click(function(){
		getDataFn();
		clearFn();
	});
	
	$("#btnEditBranchOperation").click(function(){
		$(".editCheckboxCloseFlag").removeAttr("disabled");
		$("#action").val("edit");
	});
});
