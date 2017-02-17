//Global Parameter Start
var golbalContactType=[];
var golbalDataFile=[];
//Global Parameter End

//get data branch management
var getDataFn = function(page,rpp) {
	$.ajax({
		url : restfulURL + "/dqs_api/public/dqs_file",
		type : "get",
		dataType : "json",
		async:false,
		data:{"page":page,"rpp":rpp},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			listFileFn(data['data']);
			golbalDataFile=data;
			paginationSetUpFn(golbalDataFile['current_page'],golbalDataFile['last_page'],golbalDataFile['last_page']);
		}
	});
};
var listFileFn = function(data) {
	//clear ฟังก์ชัน  data ข้อมูลเก่าทิ้ง 
	$("#dataFileManagement").empty();
	var processing_seq="";
	$.each(data,function(index,indexEntry) {
	if(indexEntry["processing_seq"]==null){
		processing_seq="";
	}else{
		processing_seq=indexEntry["processing_seq"];
	}
	var htmlTable = "";		
	htmlTable += "<tr class='rowSearch'>"; 
	htmlTable+="<td><input disabled class=\" input-inline-table input-seq seqFile numberOnly\" type=\"text\" name=\"seqFileManage\" id=seqFileManage-"+indexEntry["file_id"]+" value="+processing_seq+">";
	htmlTable += "<td class='columnSearch'>"+ indexEntry["file_name"]+ "</td>";
	htmlTable += "<td class='columnSearch'>"+ indexEntry["source_file_path"]+ "</td>";
	htmlTable += "<td class='columnSearch'>"+ indexEntry["target_file_path"]+ "</td>";	
	htmlTable+="<td class='objectCenter'><select disabled class=\"form-control input-inline-table selectContact\" id=contacttype-"+indexEntry["file_id"]+"></select></td>";		
	if(indexEntry["kpi_flag"]==1){
		htmlTable += "<td class='objectCenter'><input disabled type=\"checkbox\" class='editkpiCheckbox' id=kpiCheckbox-"+indexEntry["file_id"]+" checked='checked' ></td>";
	}else if(indexEntry["kpi_flag"]==0){
		htmlTable += "<td class='objectCenter'><input disabled type=\"checkbox\" class='editkpiCheckbox' id=kpiCheckbox-"+indexEntry["file_id"]+" ></td>";
	}	 
	if(indexEntry["last_contact_flag"]==1){
		htmlTable += "<td class='objectCenter'><input disabled type=\"checkbox\" class='editlastContact' id=lastContactCheckbox-"+indexEntry["file_id"]+" checked='checked' ></td>";
	}else if(indexEntry["last_contact_flag"]==0){
		htmlTable += "<td class='objectCenter'><input disabled type=\"checkbox\" class='editlastContact' id=lastContactCheckbox-"+indexEntry["file_id"]+" ></td>";
	}	
	if(indexEntry["source_file_delete_flag"]==1){
		htmlTable += "<td class='objectCenter'><input disabled type=\"checkbox\" class='editCheckboxCloseFlag' id=sourceFileDeleteCheckbox-"+indexEntry["file_id"]+" checked='checked' ></td>";
	}else if(indexEntry["source_file_delete_flag"]==0){
		htmlTable += "<td class='objectCenter'><input disabled type=\"checkbox\" class='editCheckboxCloseFlag' id=sourceFileDeleteCheckbox-"+indexEntry["file_id"]+" ></td>";
	}
	htmlTable+="<td class='objectCenter'><input disabled class=\" input-inline-table input-seq dateFile numberOnly\" type=\"text\" name=\"\" id=dateFileManage-"+indexEntry["file_id"]+" value="+indexEntry["nof_date_delete"]+">";
	htmlTable +="</tr>";
	
	$("#dataFileManagement").append(htmlTable);
	dropdownContactType(golbalContactType,indexEntry["contact_type"],indexEntry["file_id"]);
	});
	
	//click ที่ checkox Close แล้ว แยกไอดี ส่งไปฝัง(embed) 
	$('#tableFile').on("click",".selectContact",function(){		
		var id = this.id.split("-"); 
		embedParamSelectContact(id[1]);	
	});
	
	//click ที่ checkox Close แล้ว แยกไอดี ส่งไปฝัง(embed) 
	$('#tableFile').on("click",".editkpiCheckbox",function(){	
		var id = this.id.split("-"); 
		embedParamCheckboxKPI(id[1]);	
	});
	
	//click ที่ checkox Close แล้ว แยกไอดี ส่งไปฝัง(embed) 
	$('#tableFile').on("click",".editlastContact",function(){		
		var id = this.id.split("-"); 
		embedParamCheckboxContact(id[1]);	
	});
	
	//click ที่ checkox Close แล้ว แยกไอดี ส่งไปฝัง(embed) 
	$('#tableFile').on("click",".editCheckboxCloseFlag",function(){	
		var id = this.id.split("-"); 
		embedParamCheckboxDelete(id[1]);	
	});
	//click ที่ seq แล้ว แยกไอดี ส่งไปฝัง(embed) 
	$('#tableFile').on("click",".seqFile",function(){		
		var id = this.id.split("-"); 
		embedParamSeq(id[1]);	
	});
	//click ที่ date แล้ว แยกไอดี ส่งไปฝัง(embed) 
	$('#tableFile').on("click",".dateFile",function(){		
		var id = this.id.split("-"); 
		embedParamDate(id[1]);
	});
	//Number Only Text Fields.
//	$(".numberOnly").keydown(function (e) {
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
//call contact drop down
getContactType();

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
	var count = 0;
	$.each($(".embed_seqFile").get(),function(index,indexEnry){
	//ถ้า id ที่วน == id ที่มี	
		if($(indexEnry).val()==id){
			count+=1;
		}
	});
	if(count>0){
		$("#embed_seqFileManage-"+id).remove();
		$("body").append("<input type='hidden' class='embed_seqFile' id='embed_seqFileManage-"+id+"' name='embed_seqFileManage-"+id+"' value='"+id+"'>");
	}else{
		$("body").append("<input type='hidden' class='embed_seqFile' id='embed_seqFileManage-"+id+"' name='embed_seqFileManage-"+id+"' value='"+id+"'>");
	}	
};
// Click แล้ว ฝังข้อมูล
var embedParamDate = function(id){
	var count = 0;
	$.each($(".embed_dateFile").get(),function(index,indexEnry){
	//ถ้า id ที่วน == id ที่มี	
		if($(indexEnry).val()==id){
			count+=1;
		}
	});
	if(count>0){
		$("#embed_dateFileManage-"+id).remove();
		$("body").append("<input type='hidden' class='embed_dateFile' id='embed_dateFileManage-"+id+"' name='embed_dateFileManage-"+id+"' value='"+id+"'>");
	}else{
		$("body").append("<input type='hidden' class='embed_dateFile' id='embed_dateFileManage-"+id+"' name='embed_dateFileManage-"+id+"' value='"+id+"'>");
	}	
};
var updateFn = function() {
	var file_list = [];
	  $.each(golbalDataFile['data'],function(index,indexEntry){
	  var processing_seq = "";
	  var contact_type = "";
	  var kpi_flag = "";
	  var last_contact_flag = "";
	  var source_file_delete_flag = "";
	  var nof_date_delete = "";
	 
	  if($("#embed_seqFileManage-"+indexEntry['file_id']).val()!=undefined 
		|| $("#embed_contactType-"+indexEntry['file_id']).val()!=undefined
		|| $("#embed_kpiflag-"+indexEntry['file_id']).val()!=undefined
		|| $("#embed_lastcontact-"+indexEntry['file_id']).val()!=undefined
		|| $("#embed_closeflag-"+indexEntry['file_id']).val()!=undefined
		|| $("#embed_dateFileManage-"+indexEntry['file_id']).val()!=undefined)
	  {
	  	   //send value Seq
		   processing_seq=$("#seqFileManage-"+indexEntry['file_id']).val();
		   //send value ContactType 
		   contact_type=$("#contacttype-"+indexEntry['file_id']).val();
		   //send value KPI 
		   if($("#kpiCheckbox-"+indexEntry['file_id']).prop('checked')){ 
			   kpi_flag = 1;
	        }else{ 
	        	kpi_flag = 0;
	        }
		   //send value LastContact
		   if($("#lastContactCheckbox-"+indexEntry['file_id']).prop('checked')){ 
			   last_contact_flag = 1;
	        }else{ 
	           last_contact_flag = 0;
	        }
		   //send value Delete
		   if($("#sourceFileDeleteCheckbox-"+indexEntry['file_id']).prop('checked')){ 
			   source_file_delete_flag = 1;
	        }else{ 
	        	source_file_delete_flag = 0;
	        }
		   //send value Days
		   nof_date_delete=$("#dateFileManage-"+indexEntry['file_id']).val();
		   file_list.push({
			    processing_seq:""+processing_seq+"",
			   //processing_seq:null,
			   	file_id: ""+indexEntry['file_id']+"",
			   	contact_type: ""+contact_type+"",
			   	kpi_flag: ""+kpi_flag+"",
			   	last_contact_flag: ""+last_contact_flag+"",
			   	source_file_delete_flag: ""+source_file_delete_flag+"",
			   	nof_date_delete: ""+nof_date_delete+"",
		   });
	  }
	  });
	  
	  $.ajax({
	      url:restfulURL+"/dqs_api/public/dqs_file",
	      type:"PATCH",
	      dataType:"json",
	      data:{"file_list":file_list},
	      headers:{Authorization:"Bearer "+tokenID.token},
	      async:false,
	      success:function(data,status){
	        if(data['status']=="200" && data['data']['error'].length==0){
	        	callFlashSlide("Update Successfully.");
	        	getDataFn($("#pageNumber").val(),$("#rpp").val());
	    		clearFn();
	        }else{
	        	callFlashSlide("Error.");
	        }
	     }
	  });
	  
	return false;
};
	
var clearFn = function() {
	
	$("#action").val("");
	
}
$(document).ready(function(){
	
	var findOneFn = function(id) {
		$.ajax({
			url:restfulURL+"/dqs_api/public/dqs_file/"+ id,
			type : "get",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			success : function(data) {
				$("#branchOperationName").val(data['desc']);
			}
		});
	};
	
	//Call Function start
	  getDataFn();
	  paginationSetUpFn(golbalDataFile['current_page'],golbalDataFile['last_page'],golbalDataFile['last_page']);
	
	$("#btnSearch").click(function(){
		searchMultiFn($("#searchText").val());
	});
	//ปุ่ม Save
	$("#btnSubmit").click(function(){
		if ($("#action").val() == "edit") {	
				updateFn();
		}else{
			return false;
		}
	});
	//Cancel Action
	$("#btnCancle").click(function() {
		clearFn();
		getDataFn($("#pageNumber").val(),$("#rpp").val());
	});
	//Cancel Action
	//Edit Action
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