//DropDownList Role
var dropDownListContactType = function(id){
	
	$.ajax({
		url:"http://localhost:3001/api/make_param_contact_type",
		type:"get",
		dataType:"json",
		//headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			
		//	console.log(data);
		var html="";	
		html+="<select class=\"form-control input-sm listContactType\" id=\"listContactType\">";
	
		$.each(data,function(index,indexEntry){
			if(id==indexEntry["_id"]){
				html+="<option selected value="+indexEntry["_id"]+">"+indexEntry["contact_type"]+"</option>";			
			}else{
				html+="<option  value="+indexEntry["_id"]+">"+indexEntry["contact_type"]+"</option>";	
			}		
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
				  	"No":"6",
					"contact_type":"ข้อมูลลูกค้าจากระบบ CBS",
					"file_name":"OBACIF20161109.TXT",
					"footer_rows":"2",
					"read_rows":"87",
					"write_rows":"87",
					"import_date":"09/112016",
					"start_date_time":"19.00",
					"end_date_time":"22.00",
					"":"3h 0m"
				*/
				     htmlTable+="<tr >";
					  
					      htmlTable+="<td>"+indexEntry["No"]+"</td>";
					      htmlTable+="<td>"+indexEntry["contact_type"]+"</td>";
					      htmlTable+="<td>"+indexEntry["file_name"]+"</td>";
					   	  htmlTable+="<td>"+indexEntry["footer_rows"]+"</td>";
						  htmlTable+="<td>"+indexEntry["read_rows"]+"</td>";
						
						  htmlTable+="<td>"+indexEntry["write_rows"]+"</td>";
					      htmlTable+="<td>"+indexEntry["import_date"]+"</td>";
					   	  htmlTable+="<td>"+indexEntry["start_date_time"]+"</td>";
						  htmlTable+="<td>"+indexEntry["end_date_time"]+"</td>";
						  htmlTable+="<td>"+indexEntry["proccesing_time"]+"</td>";
						 

				     htmlTable+="</tr>";
					
			   });
				
			  $("#listDataContactType").html(htmlTable);
			  
			
			  //DataTable
			  $('#tableContactType').DataTable( { "dom": '<"top"flp>rt<"bottom"lp><"clear">' } ); 
			
	
};
var getDataFn = function() {
	$.ajax({
		url : "http://localhost:3001/api/make_import_log_report",
		type : "get",
		dataType : "json",
		//headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			//console.log(data);
			listDataFn(data);
			
		}
	});
};


$(document).ready(function(){
	dropDownListContactType();
	getDataFn();
});