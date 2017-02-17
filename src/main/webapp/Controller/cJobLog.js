/*#####Galbal Parameter User Page#######*/

var galbalDqsRoleObj=[];
var galbalRevisedCostCenterObj=[];
var galbalJobLogObj=[];

/*####Galbal Parameter User Page######*/

/*####Init Function  Start######*/
//function list data User
var embedParamStartDate = function(id){
	var count = 0;
	$.each($(".embedListStartDate").get(),function(index,indexEnry){
	//ถ้า id ที่วน == id ที่มี	
		if($(indexEnry).val()==id){
			count+=1;
		}
	});
	if(count>0){
		$("#embedListStartDate-"+id).remove();
		$("#paramEmbedJobLogArea").append("<input type='hidden' class='embedListStartDate' id='embedListStartDate-"+id+"' name='embedListStartDate' value='"+id+"'>");
	}else{
		$("#paramEmbedJobLogArea").append("<input type='hidden' class='embedListStartDate' id='embedListStartDate-"+id+"' name='embedListStartDate' value='"+id+"'>");
	}
}

var embedParamEndDate = function(id){
	var count = 0;
	$.each($(".embedListEndDate").get(),function(index,indexEnry){
	//ถ้า id ที่วน == id ที่มี	
		if($(indexEnry).val()==id){
			count+=1;
		}
	});
	
	if(count>0){
		$("#embedListEndDate-"+id).remove();
		$("#paramEmbedJobLogArea").append("<input type='hidden' class='embedListEndDate' id='embedListEndDate-"+id+"' name='embedListEndDate' value='"+id+"'>");
	}else{
		$("#paramEmbedJobLogArea").append("<input type='hidden' class='embedListEndDate' id='embedListEndDate-"+id+"' name='embedListEndDate' value='"+id+"'>");
	}
	
}

var listDataFn = function(data){

/*
schema_ref
job_name
job_begin_datetime
job_finish_datetime
data_start_date
data_end_date
*/


			
			 $("#listJobLog").empty();
		
			   $.each(data,function(index,indexEntry){
				   var htmlTable="";
					if(indexEntry['mark_flag']==0){
				     	htmlTable+="<tr class='rowSearch danger'>";
					}else{
						htmlTable+="<tr class='rowSearch'>";
					}
					      htmlTable+="<td class='columnSearch'>"+indexEntry["job_name"]+"</td>";
					      htmlTable+="<td class='columnSearch'>"+indexEntry["job_begin_datetime"]+"</td>";
					   	  htmlTable+="<td class='columnSearch'>"+indexEntry["job_finish_datetime"]+"</td>";
						 
						  htmlTable+="<td  class=\"listStartDateArea class='columnSearch'\">";
						  htmlTable+=" <input disabled  style=\"width:200px;\" class=\"form-control input-inline-table input-contact-selecttype edit-data-start-date \" id=\"listStartDate-"+indexEntry["job_name"]+"\" value=\""+indexEntry["data_start_date"]+"\"> ";
						  htmlTable+="</td>";
						  
						  htmlTable+="<td class=\"listEndDateArea class='columnSearch'\">";
						  htmlTable+=" <input disabled  style=\"width:200px;\" class=\"form-control input-inline-table input-contact-selecttype edit-data-end-date \" id=\"listEndDate-"+indexEntry["job_name"]+"\" value=\""+indexEntry["data_end_date"]+"\"> ";
						  htmlTable+="</td>";
				     htmlTable+="</tr>";
				     $("#listJobLog").append(htmlTable);
				     
				   //Binding Start Date
						$("#listStartDate-"+indexEntry["job_name"]).datepicker();
						$("#listStartDate-"+indexEntry["job_name"]).datepicker( "option", "dateFormat", "yy-mm-dd" );
						$("#listStartDate-"+indexEntry["job_name"]).val(indexEntry["data_start_date"]);
						
						$("#listEndDate-"+indexEntry["job_name"]).datepicker();
						$("#listEndDate-"+indexEntry["job_name"]).datepicker( "option", "dateFormat", "yy-mm-dd" );
						$("#listEndDate-"+indexEntry["job_name"]).val(indexEntry["data_end_date"]);
					//Binding End Date 
						
			   });
			$(".ui-datepicker").hide();
			 
			
			//start ปุ่ม Edit ใน table
			
			//Edit SuperFlag
			$(".edit-data-start-date").click(function(){
				
				var id = this.id.split("-"); 
				
				embedParamStartDate(id[1]);

				
			});
			
			//Edit Rule
			$(".edit-data-end-date").click(function(){
				
				var id = this.id.split("-"); 
				
				embedParamEndDate(id[1]);
				 
			});
			
			
			
			
	
};
//Get data User
var getDataFn = function() {

	var jobName= $("#paramEmbedJobName").val();
	var database=$("#paramEmbedDatabase").val();
		$.ajax({
			url : restfulURL + "/dqs_api/public/dqs_job_log",
			type : "post",
			dataType : "json",
			data:{
			"job_name":jobName,"database":database,
			},
			headers:{Authorization:"Bearer "+tokenID.token},
			async:false,
			success : function(data) {
				
				//galbalJobLogObj
				galbalJobLogObj=data;
				listDataFn(galbalJobLogObj);

				
			}
		});
};

//DropDownList Role
var dropDownListJob = function(paramDatabase){
	var html="";
	
	$.ajax({
		url : restfulURL + "/dqs_api/public/dqs_job_log/job_list",
		type : "get",
		dataType : "json",
		data:{"database":paramDatabase
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		async:false,
		success : function(data) {
			//console.log(data);
			html+=" <select data-toggle=\"tooltip\" title=\"Job Name\" class=\"form-control input-sm\" id=\"jobName\">";
			html+="<option  value=''>All</option>";	
			$.each(data,function(index,indexEntry){
					html+="<option  value="+indexEntry["job_name"]+">"+indexEntry["job_name"]+"</option>";	
			});	
			html+="</select>";
		}
	});
	
	
	
	return html;
};
/*####Init Function  End######*/
//function update data
var updateFn = function(){ 
	
	
	
	 var jobs = [];
	 $.each(galbalJobLogObj,function(index,indexEntry){
		 
		 var jobLogStartDate="";
		 var jobLogEndDate="";
	
		if($("#embedListStartDate-"+indexEntry['job_name']).val()!=undefined || $("#embedListEndDate-"+indexEntry['job_name']).val()!=undefined){
			if($("#embedListStartDate-"+indexEntry['job_name']).val()!=undefined){
				jobLogStartDate=$("#listStartDate-"+indexEntry['job_name']).val().split(" ")[0];
				
			}else{
				jobLogStartDate=$("#listStartDate-"+indexEntry['job_name']).val().split(" ")[0];
			}
			
			if($("#embedListEndDate-"+indexEntry['job_name']).val()!=undefined){
				jobLogEndDate=$("#listEndDate-"+indexEntry['job_name']).val();
				
			}else{
				jobLogEndDate=$("#listEndDate-"+indexEntry['job_name']).val();
			}					  
			/* 
			 "jobs: [
			  {
			     schema_ref: """",
			     job_name: """",
			     data_start_date: """",
			     data_end_date: """"
			  },...
			]"
			 */
	
		
			
			
			jobs.push({
				 schema_ref:indexEntry['schema_ref'],
				 job_name: ""+indexEntry['job_name']+"",
				 data_start_date: ""+jobLogStartDate+"",
				 data_end_date: ""+jobLogEndDate+""
			});

		}
		
	 });

	 
	  $.ajax({
		    url:restfulURL+"/dqs_api/public/dqs_job_log",
		    type:"PATCH",
		    dataType:"json",
		    data:{"jobs":jobs},
		    headers:{Authorization:"Bearer "+tokenID.token},
			async:false,
		    success:function(data,status){
			    if(data['status'] == "200") {
				callFlashSlide("Update Successfully.");
				$(".edit-data-start-date").attr("disabled","disabled");
				$(".edit-data-end-date").attr("disabled","disabled");
				$("#action").val("notEdit");
				getDataFn();
			     
			  }
		}
		});
	 		  
	return false;
 };
 var clearFn = function(){
		$("#id").val("");
		$("#action").val("add");
		$(".edit-data-start-date").attr("disabled","disabled");
		$(".edit-data-end-date").attr("disabled","disabled");
 }
//function advance search data
var advanceSearchFn = function(){
		
		var jobName=$("#jobName").val();
		var database=$("#databaseList").val();
		var htmlParam="";
		htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedJobName' name='paramEmbedJobName' value='"+jobName+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedDatabase' name='paramEmbedDatabase' value='"+database+"'>";
		$(".paramEmbed").remove();
		$("#paramEmbedJobLogArea").append(htmlParam);
		getDataFn();
		$(".display_result").show();
}
 
$(document).ready(function(){
	
	
	//call pagination 
	
	//binding tooltip.
	$(document).ready(function(){
	    $('[data-toggle="tooltip"]').tooltip();
	});

	$("#databaseList").change(function(){
		$("#listJobLogArea").html(dropDownListJob($(this).val()));
	});
	$("#databaseList").change();
	
	//#### Call Function start ####
  	//ปุ่ม Save
	$("#btnSave").click(function(){
		if($("#action").val()=="editable"){
			updateFn();
		}else{
			return false;
		}
	});
	//ปุ่ม Search
	  $("#btnSearch").click(function(){
		    //searchFn("searchText","tableUser");
			searchMultiFn($("#searchText").val());
	  });
	
	// ปุ่ม Cancel
	  $("#btnCancel").click(function(){
		   getDataFn();
		  $("#action").val("notEdit");

		});
	
	  //ปุ่ม click Edit 
	  $("#btnEdit").click(function(){
	
		$(".edit-data-start-date").removeAttr("disabled");
		$(".edit-data-end-date").removeAttr("disabled");
		$("#action").val("editable");
		//$(".editRevised").removeAttr("disabled");
	  });
	
  
	 $("#btnAdvanceSearch").click(function(){
		advanceSearchFn();
		
	 });
	 //$("#btnAdvanceSearch").click();
  	 //#### Call Function End ####
	
	  	

	
	
	
});



