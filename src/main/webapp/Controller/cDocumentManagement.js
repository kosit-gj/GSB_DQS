//Global variable
var golbalDataDoc=[];


// doc name start


var macthDocIdAndDocNameFn = function(data){
var dataObject=[];
var docName=[
["DocNo1-ชื่อที่ไม่ถูกต้อง(ลูกค้าบุคคล)"],
["DocN02-ชื่อนิติบุคคลตามประเภท"],
["DocNo3-คำนำหน้าภาษาไทยในระบบ"],
["DocNo4-คำนำหน้านิติบุคคลในระบบ"],
["DocNo5-คำนำหน้านิติบุคคลตามประเภท"],
["DocNo6-คำนำหน้าบุคคลภาษาไทย และภาษาอังกฤษ"],
["DocNo7-คำนำหน้านิติบุคคลภาษาไทย และภาษาอังกฤษ"],
["DocNo8-คำขึ้นต้นที่ไม่ควรมีอยู่ในที่อยู่ตามทะเบียนบ้าน"],
["DocNo9-คำขึ้นต้นที่อยู่ตามทะเบียนบ้าน"],
["DocNo10-เบอร์มือถือที่ไม่ควรบันทึก"],
["DocNo11-ค่าสถานะภาพในระบบ"],
["DocNo12-เพศกับคำนำหน้าที่ไม่ถูกต้อง"],
["DocNo13-เลขอ้างอิงตามประเภทนิติบุคคล"],
["DocNo14-Validate ค่าในระบบ CBS"],
["DocNo15-Require Field ในระบบ CBS"],
["DocNo16-รหัสไปรษณีย์ที่มีในระบบ"]
];
	
	$.each(data,function(index,indexEntry){
		$.each(docName,function(index2,indexEntry2){
			var docNo = indexEntry2[0].split("-");
				if(indexEntry['requite_doc']==docNo[0]){
					
					dataObject.push(indexEntry2);
					
				}
		});
	});
	
//	console.log(dataObject);
	return dataObject;
}
// doc name end
// get Data branch management
var getDataFn = function(page,rpp) {
	$.ajax({
		url : restfulURL + "/dqs_api/public/dqs_document",
		type : "get",
		dataType : "json",
		async:false,
		data:{"page":page,"rpp":rpp,"search":$("#paramSearchText").val(),"requite_doc":$("#paramRequiteDoc").val()},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			checkMaintenanceFn(data);
			listDocumentFn(data['data']);
			golbalDataDoc=data;
			paginationSetUpFn(golbalDataDoc['current_page'],golbalDataDoc['last_page'],golbalDataDoc['last_page']);
		}
	});
};

//Embed Parameter 
var embedParam = function(){
	var htmlParam="";
	htmlParam+="<input type='hidden' class='param_Embed' id='paramRequiteDoc' name='paramRequiteDoc' value='"+$("#listRequiteDoc").val()+"'>";
	htmlParam+="<input type='hidden' class='param_Embed' id='paramSearchText' name='paramSearchText' value='"+$("#searchText").val()+"'>";
	$(".param_Embed").remove();
	$("body").append(htmlParam);
	//embed parameter end
	//alert("search Data --> page : 1 rpp :"+$("#rpp").val());
	getDataFn(1,$("#rpp").val());

}
//Check Validation
var validationFn = function(data){
	var validate = "";
	var count = 0;
	$.each(data['data'], function(index, indexEntry) {

		if (index != undefined) {
			if (count == 0) {
				validate += "<font color='red'>*</font>" + indexEntry + "";
			} else {
				validate += "<br><font color='red'>*</font> " + indexEntry + " ";
			}
		}

		count++;
	});
	
	callFlashSlideInModal(validate,"#information","error");
};
//DropDownList Requite Doc
var dropDownListRequiteDoc = function(id,requite_id){
	var selectDataflowHTML=""
		$.ajax({
			url : restfulURL + "/dqs_api/public/dqs_document/doc_list",
			type : "get",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			aysnc:false,
			success : function(data) {
				checkMaintenanceFn(data);
				//macthDocIdAndDocNameFn(data);

				$.each(macthDocIdAndDocNameFn(data),function(index,indexEntry){
					
					
					var docNo = indexEntry[0].split("-");
					console.log(docNo[0]);
					
					if(requite_id==docNo[0]){
						selectDataflowHTML+="<option selected value='"+docNo[0]+"'>"+indexEntry[0]+"</option>"; 
					}else{
						selectDataflowHTML+="<option value='"+docNo[0]+"'>"+indexEntry[0]+"</option>";  
					}
						
					
					  
				});
				$(id).html(selectDataflowHTML);
				
			}
		});
	
};

//List Data
var listDocumentFn = function(data) {
	var htmlTable = "";

	$.each(data,function(index,indexEntry) {
	htmlTable += "<tr class='rowSearch'>";
	
		htmlTable += "<td class='columnSearch'>"+ indexEntry["id"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["requite_doc"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ notNullFn(indexEntry["attribute1"])+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ notNullFn(indexEntry["attribute2"])+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ notNullFn(indexEntry["attribute3"])+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ notNullFn(indexEntry["attribute4"])+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ notNullFn(indexEntry["attribute5"])+ "</td>";
 
	htmlTable+="<td class='objectCenter'><i class=\"fa fa-gear font-management popover-del-edit\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-warning btn-xs edit btn-gear' data-target='#managementModal' data-toggle='modal' type='button' id="+indexEntry["id"]+">Edit</button> <button class='btn btn-danger btn-xs del btn-gear' type='button' id="+indexEntry["id"]+">Delete</button>\"></i></td>";
	htmlTable += "</tr>";
	});
	$("#listDocument").html(htmlTable);

	//popover 
	$(".popover-del-edit").popover();
		
	//delete,edit
	$("#tableDocument").off("click",".popover-del-edit");
	$("#tableDocument").on("click",".popover-del-edit",function(){
			
	$(".del").click(function(){
		var id = this.id;
		$(this).parent().parent().parent().children().click();
		    
		$("#confrimModal").modal();
		$(document).off("click","#btnConfirmOK");
		$(document).on("click","#btnConfirmOK",function(){
		     $.ajax({
			      url:restfulURL+"/dqs_api/public/dqs_document/"+id,
			      type:"delete",
			      dataType:"json",
				  headers:{Authorization:"Bearer "+tokenID.token},
			      success:function(data){  
				  checkMaintenanceFn(data);
					if(data['status']==200){
						
					   callFlashSlide("Delete Successfully.");    
				       getDataFn();
				       clearFn();
				 	   $("#confrimModal").modal('hide');
				 	   
					}else if(data['status']==400){
						
						callFlashSlide(data['data'],"error");
						 $("#confrimModal").modal('hide');
						   
					}
		
     			 }
     		});
		});	
   		 
   });

   //findOnd
   		$(".edit").click(function(){	
		    $("#modalTitleRole").html("Edit New Document");
		    $("#modalDescription").html("EDIT NEW Document");
		    findOneFn(this.id);
		    $("#id").val(this.id);
		    $("#action").val("edit");
		    $("#btnSubmit").val("Edit");
			$("#btnSaveAndAnother").hide();
			$(this).parent().parent().parent().children().click();
   		});
	});
	//ปุ่ม Edit ใน table
	$("#tableDocument").on("click",".editCheckboxCloseFlag",function(){  
		var id = this.id.split("-"); 
		embedParam(id[1]);
	});
};

var findOneFn = function(id) {
	
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_document/"+id,
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			checkMaintenanceFn(data);
			dropDownListRequiteDoc("#doc_listRequite",data["requite_doc"]);
			$("#doc_attribute1").val(data["attribute1"]);
			$("#doc_attribute2").val(data["attribute2"]);
			$("#doc_attribute3").val(data["attribute3"]);
			$("#doc_attribute4").val(data["attribute4"]);
			$("#doc_attribute5").val(data["attribute5"]);
			
		}
	});
	
};

//Update
var insertFn = function(param){
	    $.ajax({
		   url:restfulURL+"/dqs_api/public/dqs_document",
	     type:"POST",
	     dataType:"json",
	     data:{
				"requite_doc"	: $("#doc_listRequite").val(),
				"attribute1"	: $("#doc_attribute1").val(),
				"attribute2"	: $("#doc_attribute2").val(),
				"attribute3"	: $("#doc_attribute3").val(),
				"attribute4"	: $("#doc_attribute4").val(),
				"attribute5"	: $("#doc_attribute5").val()
		 },
		 headers:{Authorization:"Bearer "+tokenID.token},
		 async:false,
	     success:function(data,status){
			  checkMaintenanceFn(data);
		      if(data['status']=="200"){
				if(param !="saveAndAnother"){
				   callFlashSlide("Insert Successfully.");
			       getDataFn();
			       clearFn();
			 	   $('#managementModal').modal('hide');
				}else{
					getDataFn();
					clearFn();
					callFlashSlideInModal("Insert Data is Successfully.","#information");
				}
		      }else if (data['status'] == "400") {
				validationFn(data);
				}
		     }
		    });         

	    return false;
	   };
	var updateFn = function(){
		
	   $.ajax({
		    url:restfulURL+"/dqs_api/public/dqs_document/"+$("#id").val(),
		    type:"PATCH",
		    dataType:"json",
		    data:{
				"requite_doc"	: $("#doc_listRequite").val(),
				"attribute1"	: $("#doc_attribute1").val(),
				"attribute2"	: $("#doc_attribute2").val(),
				"attribute3"	: $("#doc_attribute3").val(),
				"attribute4"	: $("#doc_attribute4").val(),
				"attribute5"	: $("#doc_attribute5").val()
			},
			headers:{Authorization:"Bearer "+tokenID.token},
		    success:function(data,status){
				checkMaintenanceFn(data);
			     if(data['status']=="200"){
			    
				    callFlashSlide("Update Successfully.");
				    $('#managementModal').modal('hide');
			        getDataFn();
			        clearFn();
	     		}else if (data['status'] == "400") {
					validationFn(data);
			  }
		
	    	}
	   });

	   return false;
	  };
var clearFn = function(){
	$("#doc_attribute1").val("");
	$("#doc_attribute2").val("");
	$("#doc_attribute3").val("");
	$("#doc_attribute4").val("");
	$("#doc_attribute5").val("");
	$("#action").val("add");
}

$(document).ready(function(){

	
	//Call getData start
	  dropDownListRequiteDoc("#listRequiteDoc");
	  getDataFn($("#pageNumber").val(),$("#rpp").val());
	  paginationSetUpFn(golbalDataDoc['current_page'],golbalDataDoc['last_page'],golbalDataDoc['last_page']);
	
	//ปุ่ม Save	
	  $("#btnSubmit").click(function() {
		  if ($("#action").val() == "add" || $("#action").val() == "") {
		  	insertFn();
		  } else {
		  	updateFn();
		  }
		  return false;
	  });
	  $("#btnSaveAndAnother").click(function() {
		  insertFn("saveAndAnother");
		  });
	  $("#btnAdd").click(function() {
		  clearFn();
		  dropDownListRequiteDoc("#doc_listRequite",$("#paramRequiteDoc").val());
		  $("#btnSaveAndAnother").show();
	  });
	  
	// Search
	$("#btnSearch").click(function(){
		//searchFn("searchText","tableDocument");
		//searchMultiFn($("#searchText").val());
		embedParam();
	});
	
	
});
