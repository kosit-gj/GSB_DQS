//binding tooltip.
var golbalData=[];
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});


var updateLostFileFn = function(lostFileCode){
	
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_incident/file",
		type : "PATCH",
		dataType : "json",	
		data:{
			file_list:lostFileCode
			},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			//console.log(data);
			if(data['status']==200){
				callFlashSlide("Update success.");
				getDataLostFileFn();
			}
		}
	});
	
}
var updateJobFailFn = function(jobFailCode){
	
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_incident/job",
		type : "PATCH",
		dataType : "json",	
		data:{
			jobs:jobFailCode
			},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			//console.log(data);
			if(data['status']==200){
				callFlashSlide("Update success.");
				getDataJobFailFn();
			}
		}
	});
	
}
var listDataLostFileFn = function(data){
	
	 var htmlTable="";
	 $("#listMainLostFile").empty();
	   $.each(data,function(index,indexEntry){
		/*
		 	"id": "1",
	        "log_dttm": "2017-03-21 14:32:45.943",
	        "file_id": "1",
	        "contact_type": "ลูกค้าจากระบบ CBS",
	        "source_file_path": "/CIS/",
	        "fixed_flag": null
		*/
		/*Log Date 	Contact Type		Source Path		Filename		Fixed*/
		htmlTable+="<tr>";
		
		if(indexEntry['fixed_flag']=="1"){
			htmlTable+="<td class='object-center'><input type='checkbox' checked='checked' name='lostFile-"+indexEntry['id']+"' id='lostFile-"+indexEntry['id']+"' class='lostFile' value='"+indexEntry['fixed_flag']+"'></td>";
			
		}else{
			htmlTable+="<td class='object-center'><input type='checkbox' name='lostFile-"+indexEntry['id']+"' id='lostFile-"+indexEntry['id']+"' class='lostFile' value='"+indexEntry['fixed_flag']+"'></td>";
			
		}
			htmlTable+="<td>"+indexEntry['log_dttm']+"</td>";
			htmlTable+="<td>"+indexEntry['contact_type']+"</td>";
			htmlTable+="<td>"+indexEntry['source_file_path']+"</td>";
			htmlTable+="<td>"+indexEntry['filename']+"</td>";
			htmlTable+="<td>"+indexEntry['updated_by']+"</td>";
			htmlTable+="<td>"+indexEntry['updated_dttm']+"</td>";
			
		htmlTable+="</tr>";
			
	   });
		
	  $("#listMainLostFile").html(htmlTable);
			  
			
			  
};
var listDataJobFailFn = function(data){
	
	 var htmlTable="";
	 $("#listMainJobfail").empty();
	   $.each(data,function(index,indexEntry){
		var key_id="";
		if(indexEntry['object_key']!=undefined){
			
			if(indexEntry['fixed_flag']=="1"){
				key_id+="<td class='object-center'><input type='checkbox' checked='checked' name='jobFail-object_key-"+indexEntry['object_key']+"' id='jobFail-object_key-"+indexEntry['object_key']+"' class='jobFail' value='"+indexEntry['object_key']+"'></td>";
			}else{
				key_id+="<td class='object-center'><input type='checkbox' name='jobFail-object_key-"+indexEntry['object_key']+"' id='jobFail-object_key-"+indexEntry['object_key']+"' class='jobFail' value='"+indexEntry['object_key']+"'></td>";
			}

			
		}else if(indexEntry['id']!=undefined){
			if(indexEntry['fixed_flag']=="1"){
				key_id+="<td class='object-center'><input type='checkbox' checked='checked' name='jobFail-id-"+indexEntry['object_key']+"' id='jobFail-id-"+indexEntry['object_key']+"' class='jobFail' value='"+indexEntry['id']+"'></td>";
			}else{
				key_id+="<td class='object-center'><input type='checkbox' name='jobFail-id-"+indexEntry['object_key']+"' id='jobFail-id-"+indexEntry['object_key']+"' class='jobFail' value='"+indexEntry['id']+"'></td>";
			}
				
		}
		
		htmlTable+="<tr>";
			htmlTable+=key_id;
			htmlTable+="<td>"+indexEntry['service']+"</td>";
			htmlTable+="<td>"+indexEntry['start_time']+"</td>";
			htmlTable+="<td>"+indexEntry['end_time']+"</td>";
			htmlTable+="<td>"+indexEntry['error_file_path']+"</td>";
			htmlTable+="<td>"+indexEntry['updated_by']+"</td>";
			htmlTable+="<td>"+indexEntry['updated_dttm']+"</td>";
			
		htmlTable+="</tr>";
			
	   });
		
	  $("#listMainJobfail").html(htmlTable);
			  
			
			  
};
var getDataLostFileFn = function(){
	

	var logStartDate = $("#embedParamLogStartDate").val();
	var logEndDate = $("#embedParamLogEndDate").val();

	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_incident/file",
		type : "post",
		dataType : "json",
		data:{
			"log_start":logStartDate,"log_end":logEndDate
			},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			//console.log(data);
			listDataLostFileFn(data);
		}
	});
	
	
}
var getDataJobFailFn = function() {
	
	var serviceName= $("#embedParamServiceName").val();
	var jobFailStartDate = $("#embedParamJobFailStartDate").val();
	var jobfailEndDate = $("#embedParamJobFailEndDate").val();
	
	
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_incident/job",
		type : "post",
		dataType : "json",
		data:{
			"service":serviceName,"start_time":jobFailStartDate ,"end_time":jobfailEndDate
			},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			//console.log(data);
			listDataJobFailFn(data);
		}
	});

	
};

var searchAdvanceLostFile = function(){

	var htmlParameter="";
	htmlParameter+="<input type='hidden' id='embedParamLogStartDate' name='embedParamLogStartDate' class='embedParam' value='"+$("#logStartDate").val()+"' >";
	htmlParameter+="<input type='hidden' id='embedParamLogEndDate' name='embedParamLogEndDate' class='embedParam' value='"+$("#logEndDate").val()+"' >";
	
	//logEndDate
	$(".embedParam").remove();
	$("#embedParamAreaLostFile").append(htmlParameter);
	getDataLostFileFn();

}

var searchAdvanceJobFail = function(){

	var htmlParameter="";
	htmlParameter+="<input type='hidden' id='embedParamServiceName' name='embedParamServiceName' class='embedParam' value='"+$("#searviceName").val()+"' >";
	htmlParameter+="<input type='hidden' id='embedParamJobFailStartDate' name='embedParamJobFailStartDate' class='embedParam' value='"+$("#jobfailStartDate").val()+"' >";
	htmlParameter+="<input type='hidden' id='embedParamJobFailEndDate' name='embedParamJobfailEndDate' class='embedParam' value='"+$("#jobfailEndDate").val()+"' >";
	$(".embedParam").remove();
	$("#embedParamAreaJobFail").append(htmlParameter);
	getDataJobFailFn();

}




$(document).ready(function(){
	
	/*#################### Lost File Start ####################*/
		
	//parameter log date start
	$("#logStartDate").datepicker();
    $("#logStartDate").datepicker( "option", "dateFormat", "yy-mm-dd" );
    $("#logStartDate").val(currentDateFn2());
    
    $("#logEndDate").datepicker();
    $("#logEndDate").datepicker( "option", "dateFormat", "yy-mm-dd" );
    $("#logEndDate").val(currentDateFn2());
	//parameter date end
    
	//Search Data Here..
	$("#btnSearchAdvanceLostFile").click(function(){
		searchAdvanceLostFile();
	});
	$("#btnSearchAdvanceLostFile").click();
	//Search Data Here..
	
	
	//Update Lost File Start
	$("#btnUpdteLostFile").click(function(){
		
			var id="";
			var lostFileCode=[];
			
			$.each($(".lostFile").get(),function(index,indexEntry){
				
			
				id=$(indexEntry).attr("id").split('-');
				id=id[1];

				if($(indexEntry).is(":checked")){
					lostFileCode.push({id:id,fixed_flag:"1"});
				}else{
					lostFileCode.push({id:id,fixed_flag:"0"});
				}
			});

			if(lostFileCode.length==0){
				callFlashSlide("Please choose File for Update.");
				return false;
			}else{
			
				//console.log(lostFileCode);				
				updateLostFileFn(lostFileCode);
				
			}
		
		
		
	});
	//Update Lost File End
	
	/*#################### Lost File End ####################*/
	
	
	
	/*#################### Job Fail Start ####################*/
	
    $("#jobfailStartDate").datepicker();
    $("#jobfailStartDate").datepicker( "option", "dateFormat", "yy-mm-dd" );
    $("#jobfailStartDate").val(currentDateFn2());
    $(".ui-datepicker").hide();
    
    $("#jobfailEndDate").datepicker();
    $("#jobfailEndDate").datepicker( "option", "dateFormat", "yy-mm-dd" );
    $("#jobfailEndDate").val(currentDateFn2());
    $(".ui-datepicker").hide();
    
    //searchAdvanceJobFail()
  //Search Data Here..
	$("#btnSearchAdvanceJobFail").click(function(){
		searchAdvanceJobFail();
	});
	$("#btnSearchAdvanceJobFail").click();
	$("#btnUpdteJobFail").click(function(){
		
		var idObject="";
		var id="";
		var key="";
		var jobFailCode=[];
		$.each($(".jobFail").get(),function(index,indexEntry){
			idObject=$(indexEntry).attr("id").split('-');
			id=idObject[2];
			key=idObject[1];
//			console.log($(indexEntry).attr("id"));
//			console.log(id);
//			console.log(key);
		
			
			if($(indexEntry).is(":checked")){
				if(key=='object_key'){
					jobFailCode.push({object_key:id,fixed_flag:"1"});
				}else{
					jobFailCode.push({id:id,fixed_flag:"1"});
				}
				
			}else{
				if(key=='object_key'){
					jobFailCode.push({object_key:id,fixed_flag:"0"});
				}else{
					jobFailCode.push({id:id,fixed_flag:"0"});
				}
			}
		});

		if(jobFailCode.length==0){
			callFlashSlide("Please choose File for Update.");
			return false;
		}else{			
			//console.log(jobFailCode);
			updateJobFailFn(jobFailCode);
			
		}
		
	});
	
	//Export
	$("#exportToExcel").click(function(){
		
		var paramServiceName=$("#embedParamServiceName").val();
		var paramJobFailStartDate=$("#embedParamJobFailStartDate").val();
		var paramJobFailEndDate=$("#embedParamJobFailEndDate").val();
	
		
		
		var param="";
		param+="&service="+paramServiceName;
		param+="&start_time="+paramJobFailStartDate;
		param+="&end_time="+paramJobFailEndDate;

		
		$("form#formExportToExcel ").attr("action",restfulURL+"/dqs_api/public/dqs_incident/job/export?token="+tokenID.token+""+param);
		$("form#formExportToExcel ").submit();
	});
    
    /*#################### Job Fail End ####################*/
    

	
	
	
	
});