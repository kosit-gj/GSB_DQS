//DropDownList Role
var dropDownListContactType = function(){
	
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_maintenance/contact_type",
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			
			console.log(data);
		var html="";	
		html+="<select class=\"form-control input-sm listContactType\" id=\"listContactType\">";
	
		$.each(data,function(index,indexEntry){
			
			
				html+="<option  value="+indexEntry["contact_type"]+">"+indexEntry["contact_type"]+"</option>";	
				
		});	
		html+="</select>";
		
		$("#contactTypeArea").html(html);
			
		}
	});
	

};
var listDataFn = function(data){
	
	if ( $.fn.DataTable.isDataTable('#tableContactType')) {
	      $('#tableContactType').DataTable().destroy();
	     }
	
			 var htmlTable="";
			 $("#listDataContactType").empty();
			   $.each(data,function(index,indexEntry){
				/*
				    "contact_type": "B",
		            "file_name": "ciz1.txt",
		            "total_record_footer_file": null,
		            "total_record_read_file": "3",
		            "total_record_insert_table": "3",
		            "start_date_time": "2016-12-02 11:24:00.000",
		            "end_date_time": "2016-12-02 12:33:00.000",
		            "processing_time": "1h 9m"
				*/
				     htmlTable+="<tr >";
					  
					      htmlTable+="<td>"+(index+1)+"</td>";
					      htmlTable+="<td>"+indexEntry["contact_type"]+"</td>";
					      htmlTable+="<td>"+indexEntry["file_name"]+"</td>";
					   	  htmlTable+="<td>"+indexEntry["total_record_footer_file"]+"</td>";
						  htmlTable+="<td>"+indexEntry["total_record_read_file"]+"</td>";
						
						  htmlTable+="<td>"+indexEntry["total_record_insert_table"]+"</td>";
					      htmlTable+="<td>"+indexEntry["processing_time"]+"</td>";
					   	  htmlTable+="<td>"+indexEntry["start_date_time"]+"</td>";
						  htmlTable+="<td>"+indexEntry["end_date_time"]+"</td>";
						  htmlTable+="<td>"+indexEntry["processing_time"]+"</td>";
						 

				     htmlTable+="</tr>";
					
			   });
				
			  $("#listDataContactType").html(htmlTable);
			  
			
			  //DataTable
			  $('#tableContactType').DataTable( { "dom": '<"top"flp>rt<"bottom"lp><"clear">',"bSort" : false } ); 
			
	
};
var getDataFn = function() {
	//http://192.168.1.58/dqs_api/public/dqs_maintenance/import_log
	$.ajax({
		url : restfulURL+"/dqs_api/public/dqs_maintenance/import_log",
		type : "get",
		dataType : "json",
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			//console.log(data);
			listDataFn(data['data']);
			
		}
	});
};


$(document).ready(function(){
	dropDownListContactType();
	$("#import_date").datepicker();
	getDataFn();
});