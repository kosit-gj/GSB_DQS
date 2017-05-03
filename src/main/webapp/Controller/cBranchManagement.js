//Global variable
var golbalDataBranch=[];
// get Data branch management
var getDataFn = function(page,rpp) {
	$.ajax({
		url : restfulURL + "/dqs_api/public/dqs_branch",
		type : "get",
		dataType : "json",
		async:false,
		data:{"page":page,"rpp":rpp},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			checkMaintenanceFn(data);
			listBranchFn(data['data']);
			golbalDataBranch=data;
			paginationSetUpFn(golbalDataBranch['current_page'],golbalDataBranch['last_page'],golbalDataBranch['last_page']);
		}
	});
};

//Embed Parameter 
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

//List Data
var listBranchFn = function(data) {
	var htmlTable = "";

	$.each(data,function(index,indexEntry) {
	htmlTable += "<tr class='rowSearch'>";
	
		htmlTable += "<td class='columnSearch'>"+ indexEntry["brcd"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["desc"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["ccdef"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["regdesc"]+ "</td>";
		htmlTable += "<td class='columnSearch'>"+ indexEntry["distdesc"]+ "</td>";
	
	if(indexEntry["close_flag"]==1){
		htmlTable += "<td class='objectCenter'><input type=\"checkbox\" disabled class=\"editCheckboxCloseFlag\" id=closeCheckbox-"+indexEntry["brcd"]+" checked='checked' ></td>";
	}else if(indexEntry["close_flag"]==0){
		htmlTable += "<td class='objectCenter'><input type=\"checkbox\" disabled class=\"editCheckboxCloseFlag\" id=closeCheckbox-"+indexEntry["brcd"]+" ></td>";
	}	 
	
	htmlTable += "</tr>";
	});
	$("#listBranch").html(htmlTable);
	//function popover
	$(".popover-edit-del").popover();
	
	//ปุ่ม Edit ใน table
	$("#tableBranch").on("click",".editCheckboxCloseFlag",function(){  
		var id = this.id.split("-"); 
		embedParam(id[1]);
	});
};

//List Error Function Start
var listErrorFn =function(data){
	var errorData="";
	
	$.each(data['error'],function(index,indexEntry){
		if(index==0){
			if(indexEntry['brcd']!=undefined){
				errorData+="BRCD:"+indexEntry['brcd']+" Message: "+indexEntry['message'];
			}
		}else{
			if(indexEntry['brcd']!=undefined){
				errorData+="<br> BRCD:"+indexEntry['brcd']+" Message: "+indexEntry['message'];
			}
		}
	});
	
	return errorData;
}
//List Error Function End

//Update
var updateFn = function() {
	
	var closeflagCheckbox = "";
	var embed_closeflag="";
	var embed_closeflag_obj="";
	var branches=[];
	embed_closeflag_obj=$(".embed_closeflag").get();
	$.each($(".embed_closeflag").get(),function(index,indexEntry){
		
		var id=$(indexEntry).val();
		if($("#closeCheckbox-"+id).prop('checked')){ 
        	closeflagCheckbox = 1;
        }else{ 
        	closeflagCheckbox = 0;
        }
		branches.push({"brcd":id,"close_flag":closeflagCheckbox});
	});

    
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_branch",
		type : "PATCH",
		dataType : "json",
		data : {"branches" :branches},
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			checkMaintenanceFn(data);
			if (data['status'] == "200" && data['data']['error'].length==0) {
				callFlashSlide("Update Successfully.");
				getDataFn($("#pageNumber").val(),$("#rpp").val());
				
				
				
			}else{
				
				callFlashSlide(listErrorFn(data['data']),"error");
				
			}
		}
	});

	return false;
};
var clearFn = function(){
	$("#action").val("");
}

$(document).ready(function(){

	
	//Call getData start
	  getDataFn($("#pageNumber").val(),$("#rpp").val());
	  paginationSetUpFn(golbalDataBranch['current_page'],golbalDataBranch['last_page'],golbalDataBranch['last_page']);
	
	//ปุ่ม Save
	$("#btnSubmit").click(function(){
		if ($("#action").val() == "edit"){	
				updateFn();
		}else{
			return false;
		}
	});
	  
	//Search
	$("#btnSearch").click(function(){
		//searchFn("searchText","tableBranch");
		searchMultiFn($("#searchText").val());

	});
	//Action Cancel Button
	$("#btnCancle").click(function(){
		getDataFn($("#pageNumber").val(),$("#rpp").val());
		clearFn();
	});
	
	//Action Branch Operation Management
	$("#btnEditBranchOperation").click(function(){
		$(".editCheckboxCloseFlag").removeAttr("disabled");
		$("#action").val("edit");
	});
	
});
