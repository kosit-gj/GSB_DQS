//galbol parameter start

var golbalContactType=[];

//galbol parameter end

//get 1 ครั้งและเก็บค่า ใน golbalContactType ให้โปรแกรมเรียกใช้ได้ตลอด 
var getContactType= function(){
	$.ajax ({
		url:restfulURL+"/dqs_api/public/dqs_file/contact_type" ,
		type:"get" ,
		dataType:"json" ,
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
			success:function(data){
				//console.log(data);
				
				golbalContactType=data;
			}
	});
}
getContactType();
$(document).ready(function(){
	
	var updateFn = function() {
		
		/////////////////////-Dropdown Contact-////////////////////////
		var valueContatType = "";
		$.each($(".embed_contactType").get(),function(index,indexEntry){
			
			var id = $(indexEntry).val();
			
			//alert($("#contacttype-"+id).val());
			
			if($("#contacttype-"+id).val()== "เปิดบัญชีเงินฝาก"){
				valueContatType = "1";
			}else if($("#contacttype-"+id).val()== "เปิดบัญชีใหม่สินเชื่อ"){
				valueContatType = "2";
			}
			
			//alert(valueContatType);
			
			$.ajax({
				url:restfulURL+"/api/dqs_file/"+id,
				type : "PUT",
				dataType : "json",
				data : {"contact_type" : valueContatType},
				async:false,
				headers:{Authorization:"Bearer "+tokenID.token},
				success : function(data) {
					if (data = "success") {
						
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
				headers:{Authorization:"Bearer "+tokenID.token},
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
				headers:{Authorization:"Bearer "+tokenID.token},
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
				headers:{Authorization:"Bearer "+tokenID.token},
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
				headers:{Authorization:"Bearer "+tokenID.token},
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
				headers:{Authorization:"Bearer "+tokenID.token},
				success : function(data) {
					if (data = "success") { 
						$(".embed_seqFile").remove();
						//console.log("Upate Success");
						//alert("Upate Success");
					} 
				}
			});
			
		});
		
		//$(".alert-success").fadeTo(1000,2000).slideUp(500);
		
		getDataFn();
		clearFn();

		return false;
	
	};
	
	var clearFn = function() {
		//$("#id").val("");
		$("#action").val("");
		//$("#rule_name").val("");
		//$("#btnSubmit").val("Add");
	}
	
	var findOneFn = function(id) {
		// http://localhost:3000/find-user/58035b7cb4566c158bcecacf
		$.ajax({
			url:restfulURL+"/api/dqs_file/"+ id,
			type : "get",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			success : function(data) {
				$("#branchOperationName").val(data['desc']);
			}
		});
	};
	
	/*var searchFn = function(searchText) {
		$.ajax({
			url : restfulURL + "/api/dqs_file/?file_name__regex=/^"+searchText+"/i",
			type : "get",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			success : function(data) {
				listFileFn(data);
			}
		});
	}*/
	
	var listFileFn = function(data) {
		
		if ($.fn.DataTable.isDataTable('#tableFile')) {
		       $('#tableFile').DataTable().destroy(); 
		}
		
		console.log(data);
		//clear ฟังก์ชัน  data ข้อมูลเก่าทิ้ง 
		$("#dataFileManagement").empty();
		
		/*
		"data":[{"file_id":"4",
			"processing_seq":"2",
			"file_name":"File 2",
			"source_file_path":"source\/file2\/path",
			"target_file_path":"target\/file2\/path",
			"contact_type":"SAVING",
			"kpi_flag":"0",
			"last_contact_flag":"0",
			"source_file_delete_flag":"0",
			"nof_date_delete":"12"}
			*/
		
		
		
		$.each(data,function(index,indexEntry) {
		var htmlTable = "";		
		htmlTable += "<tr>"; 
		htmlTable+="<td><input disabled class=\" input-inline-table input-seq seqFile\" type=\"text\" name=\"seqFileManage\" id=seqFileManage-"+indexEntry["file_id"]+" value="+indexEntry["processing_seq"]+">";
		htmlTable += "<td>"+ indexEntry["file_name"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["source_file_path"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["target_file_path"]+ "</td>";	
		
		htmlTable+="<td><select disabled class=\"form-control input-inline-table selectContact\" id=contacttype-"+indexEntry["file_id"]+"></select></td>";	
		
		if(indexEntry["kpi_flag"]==1){
			htmlTable += "<td><input disabled type=\"checkbox\" class='editkpiCheckbox' id=kpiCheckbox-"+indexEntry["file_id"]+" checked='checked' ></td>";
		}else if(indexEntry["kpi_flag"]==0){
			htmlTable += "<td><input disabled type=\"checkbox\" class='editkpiCheckbox' id=kpiCheckbox-"+indexEntry["file_id"]+" ></td>";
		}	 
		
		if(indexEntry["last_contact_flag"]==1){
			htmlTable += "<td><input disabled type=\"checkbox\" class='editlastContact' id=lastContactCheckbox-"+indexEntry["file_id"]+" checked='checked' ></td>";
		}else if(indexEntry["last_contact_flag"]==0){
			htmlTable += "<td><input disabled type=\"checkbox\" class='editlastContact' id=lastContactCheckbox-"+indexEntry["file_id"]+" ></td>";
		}	
		
		if(indexEntry["source_file_delete_flag"]==1){
			htmlTable += "<td><input disabled type=\"checkbox\" class='editCheckboxCloseFlag' id=sourceFileDeleteCheckbox-"+indexEntry["file_id"]+" checked='checked' ></td>";
		}else if(indexEntry["source_file_delete_flag"]==0){
			htmlTable += "<td><input disabled type=\"checkbox\" class='editCheckboxCloseFlag' id=sourceFileDeleteCheckbox-"+indexEntry["file_id"]+" ></td>";
		}
		
		htmlTable+="<td><input disabled class=\" input-inline-table input-seq dateFile\" type=\"text\" name=\"\" id=dateFileManage-"+indexEntry["file_id"]+" value="+indexEntry["nof_date_delete"]+">";
		
		htmlTable +="</tr>";
		
		$("#dataFileManagement").append(htmlTable);
		dropdownContactType(golbalContactType,indexEntry["contact_type"],indexEntry["file_id"]);
		});
		
		
		$('#tableFile').DataTable( { "dom": '<"top"flp>rt<"bottom"lp><"clear">',"bSort" : false } );
		//function popover
		//$(".popover-edit-del").popover();
		//$("#tableBranch").on("click",".editCheckboxCloseFlag",function()
		
		//click ที่ checkox Close แล้ว แยกไอดี ส่งไปฝัง(embed) 
		$('#tableFile').on("click",".selectContact",function(){		
			var id = this.id.split("-"); 
			embedParamSelectContact(id[1]);
			//alert(id[1]);		
		});
		
		//click ที่ checkox Close แล้ว แยกไอดี ส่งไปฝัง(embed) 
		$('#tableFile').on("click",".editkpiCheckbox",function(){	
			var id = this.id.split("-"); 
			embedParamCheckboxKPI(id[1]);
			//alert(id[1]);		
		});
		
		//click ที่ checkox Close แล้ว แยกไอดี ส่งไปฝัง(embed) 
		$('#tableFile').on("click",".editlastContact",function(){		
			var id = this.id.split("-"); 
			embedParamCheckboxContact(id[1]);
			//alert(id[1]);		
		});
		
		//click ที่ checkox Close แล้ว แยกไอดี ส่งไปฝัง(embed) 
		$('#tableFile').on("click",".editCheckboxCloseFlag",function(){	
			var id = this.id.split("-"); 
			embedParamCheckboxDelete(id[1]);
			//alert(id[1]);		
		});
		
		//click ที่ seq แล้ว แยกไอดี ส่งไปฝัง(embed) 
		$('#tableFile').on("click",".seqFile",function(){		
			var id = this.id.split("-"); 
			embedParamSeq(id[1]);
			//alert(id[1]);		
		});
		//click ที่ date แล้ว แยกไอดี ส่งไปฝัง(embed) 
		$('#tableFile').on("click",".dateFile",function(){		
			var id = this.id.split("-"); 
			embedParamDate(id[1]);
			//alert(id[1]);		
		});
	
	};
	
	
	var dropdownContactType = function(data,param_type,param_id){
			
		var htmlTable="";
		
		$.each(data,function(index,indexEntry){
			
			if(param_type==indexEntry['contact_type']){
				htmlTable+="<option selected>"+indexEntry['contact_type']+"</option>";  
			}else{
				htmlTable+="<option>"+indexEntry['contact_type']+"</option>";  
			}
			
		});	
		$("#contacttype-"+param_id).html(htmlTable);
	};

	
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
			url : restfulURL + "/dqs_api/public/dqs_file",
			type : "get",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			success : function(data) {
				listFileFn(data['data']);
				//console.log(data);
			}
		});
	};
	
	//Call Function start
	  getDataFn();
	
	/*$("#btnSearch").click(function(){
		searchFn($("#searchFileName").val());
		return false;
	});*/
	
	
	/*$("#btnSave").click(function(){
        updateFn();	
	});*/
	
	//ปุ่ม Save
	$("#btnSubmit").click(function(){
		if ($("#action").val() == "edit") {	
				updateFn();
		}else{
			return false;
		}
	});
	
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
		$("#action").val("edit");
		
	});
});