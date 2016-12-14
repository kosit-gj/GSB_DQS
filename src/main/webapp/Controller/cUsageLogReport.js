//binding tooltip.
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});
var makeData={
		"Branch: สาขาแฟชั่นไอส์แลนด์":[["1","01/09/2016","4340264","พนักงาน 1","Branch Management"],["2","01/09/2016","4340264","พนักงาน 1","Branch Management"]],
		"Branch: สาขาพระราม3":[["1","01/09/2016","4340264","พนักงาน 1","Branch Management"],["2","01/09/2016","4340264","พนักงาน 1","Branch Management"]],
		"Branch: สาขาพหลโยธิน":[["1","01/09/2016","4340264","พนักงาน 1","Branch Management"],["2","01/09/2016","4340264","พนักงาน 1","Branch Management"]],
		"Branch: สาขารามอินทรา":[["1","01/09/2016","4340264","พนักงาน 1","Branch Management"],["2","01/09/2016","4340264","พนักงาน 1","Branch Management"]],
		"Branch: สาขาแฟชั่นพระราม2":[["1","01/09/2016","4340264","พนักงาน 1","Branch Management"],["2","01/09/2016","4340264","พนักงาน 1","Branch Management"]]
		};

var dropDownListBranch = function(id){
//	$.ajax({
//		url:"http://localhost:3001/api/make_param_contact_type",
//		type:"get",
//		dataType:"json",
//		//headers:{Authorization:"Bearer "+tokenID.token},
//		success:function(data){
	
	    var data=[{"id":"1","name":"สาขา1"},{"id":"2","name":"สาขา2"},{"id":"3","name":"สาขา3"}];
		var html="";	
		html+="<select class=\"form-control input-sm listBranch\" id=\"listBranch\">";
		$.each(data,function(index,indexEntry){
			if(id==indexEntry["id"]){
				html+="<option selected value="+indexEntry["id"]+">"+indexEntry["name"]+"</option>";			
			}else{
				html+="<option  value="+indexEntry["id"]+">"+indexEntry["name"]+"</option>";	
			}		
		});	
		html+="</select>";
		
		$("#listBranchArea").html(html);
		
//		}
//	});
};
var listDataFn = function(data){
	//console.log(data);
	if ( $.fn.DataTable.isDataTable('#mainTableUsageLog')) {
	      $('#mainTableUsageLog').DataTable().destroy();
	     }
	
			 var htmlTable="";
			 $("#listMainUsageLog").empty();
			   $.each(data,function(index,indexEntry){
				
				    htmlTable+="<tr>";
						htmlTable+="<td>";
							htmlTable+="<div class=\"ibox float-e-margins\">";
								htmlTable+="<div class=\"ibox-title\">";
									htmlTable+="<h5>"+index+"</h5>";
								htmlTable+="</div>";
								htmlTable+="<div class=\"ibox-content\" style='padding: 0 0px 0px;'>";
								//SUB TABLE HERE..
								
								htmlTable+="<table class=\"table\">";
								htmlTable+="<thead>";
									htmlTable+="<tr  class=\"active\">";
										htmlTable+="<th>No.</th>";
										htmlTable+="<th>Usage Date</th>";
										htmlTable+="<th>Personnel Id</th>";
										htmlTable+="<th>Personnel Name</th>";
										htmlTable+="<th>Menu</th>";
										
									htmlTable+="</tr>";
								htmlTable+="</thead>";
									htmlTable+="<tbody>";
									//LOOP START
									 $.each(indexEntry,function(index2,indexEntry2){
										htmlTable+="<tr>";
											htmlTable+="<td><div class='text-inline-table'>"+indexEntry2[0]+"</div></td>";
											htmlTable+="<td><div class='text-inline-table'>"+indexEntry2[1]+"</div></td>";
											htmlTable+=" <td><div class='text-inline-table'>"+indexEntry2[2]+"</div></td>";
											htmlTable+="<td><div class='text-inline-table'>"+indexEntry2[3]+"</div></td>";  
											htmlTable+="<td><div class='text-inline-table'>"+indexEntry2[4]+"  </div></td>";
											
										htmlTable+="</tr>";
									});
									//LOOP END
								htmlTable+="</tbody>";
							htmlTable+=" </table>";
		                       //SUB TABLE HERE..
							
								htmlTable+="</div>";
							htmlTable+="</div>";
						htmlTable+="</td>";
					htmlTable+="</tr>";
					
			   });
				
			  $("#listMainUsageLog").html(htmlTable);
			  
			
			  //DataTable
			  $('#mainTableUsageLog').DataTable( { "dom": '<"top"lp>rt<"bottom"lp><"clear">' } ); 
			
	
};
var getDataFn = function() {
//	$.ajax({
//		url : "http://localhost:3001/api/make_import_log_report",
//		type : "get",
//		dataType : "json",
//		//headers:{Authorization:"Bearer "+tokenID.token},
//		success : function(data) {
//			//console.log(data);
//			listDataFn(data);
//			
//		}
//	});
	listDataFn(makeData)
	
};

$(document).ready(function(){
	
	dropDownListBranch();
	getDataFn();
	if ( $.fn.DataTable.isDataTable('#mainTableUsageLog')) {
	      $('#mainTableUsageLog').DataTable().destroy();
	     }
	
	//DataTable
	$('#mainTableUsageLog').DataTable( { "dom": '<"top"flp>rt<"bottom"lp><"clear">' } );
	
	
});