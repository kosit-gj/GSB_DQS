//สาย
//ภาค
//เขต

//line
//sector
//area

var dropDownListLine = function(id){
//	$.ajax({
//		url:"http://localhost:3001/api/make_param_contact_type",
//		type:"get",
//		dataType:"json",
//		//headers:{Authorization:"Bearer "+tokenID.token},
//		success:function(data){
	
	    var data=[{"id":"1","line_name":"สาย1"},{"id":"2","line_name":"สาย2"},{"id":"3","line_name":"สาย"}];
		var html="";	
		html+="<select class=\"form-control input-sm listLine\" id=\"listLine\">";
		$.each(data,function(index,indexEntry){
			if(id==indexEntry["id"]){
				html+="<option selected value="+indexEntry["id"]+">"+indexEntry["line_name"]+"</option>";			
			}else{
				html+="<option  value="+indexEntry["id"]+">"+indexEntry["line_name"]+"</option>";	
			}		
		});	
		html+="</select>";
		$("#listLineArea").html(html);
		
//		}
//	});
};
var dropDownListSector = function(id){
//	$.ajax({
//		url:"http://localhost:3001/api/make_param_contact_type",
//		type:"get",
//		dataType:"json",
//		//headers:{Authorization:"Bearer "+tokenID.token},
//		success:function(data){
	
	    var data=[{"id":"1","sector_name":"ภาค1"},{"id":"2","sector_name":"ภาค2"},{"id":"3","sector_name":"ภาค3"}];
		var html="";	
		html+="<select class=\"form-control input-sm lisSector\" id=\"lisSector\">";
		$.each(data,function(index,indexEntry){
			if(id==indexEntry["id"]){
				html+="<option selected value="+indexEntry["id"]+">"+indexEntry["sector_name"]+"</option>";			
			}else{
				html+="<option  value="+indexEntry["id"]+">"+indexEntry["sector_name"]+"</option>";	
			}		
		});	
		html+="</select>";
		$("#listSectorArea").html(html);
		
//		}
//	});
};
var dropDownListArea = function(id){
//	$.ajax({
//		url:"http://localhost:3001/api/make_param_contact_type",
//		type:"get",
//		dataType:"json",
//		//headers:{Authorization:"Bearer "+tokenID.token},
//		success:function(data){
	
	    var data=[{"id":"1","sector_area":"เขต1"},{"id":"2","sector_area":"เขต2"},{"id":"3","sector_area":"เขต3"}];
		var html="";	
		html+="<select class=\"form-control input-sm lisSector\" id=\"listArea\">";
		$.each(data,function(index,indexEntry){
			if(id==indexEntry["id"]){
				html+="<option selected value="+indexEntry["id"]+">"+indexEntry["sector_area"]+"</option>";			
			}else{
				html+="<option  value="+indexEntry["id"]+">"+indexEntry["sector_area"]+"</option>";	
			}		
		});	
		html+="</select>";
		$("#listAreaArea").html(html);
		
//		}
//	});
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
var dropDownListYear = function(id){
//	$.ajax({
//		url:"http://localhost:3001/api/make_param_contact_type",
//		type:"get",
//		dataType:"json",
//		//headers:{Authorization:"Bearer "+tokenID.token},
//		success:function(data){
	
	    var data=[{"id":"1","name":"2559"},{"id":"2","name":"2558"},{"id":"3","name":"2557"}];
		var html="";	
		html+="<select class=\"form-control input-sm listYear\" id=\"listYear\">";
		$.each(data,function(index,indexEntry){
			if(id==indexEntry["id"]){
				html+="<option selected value="+indexEntry["id"]+">"+indexEntry["name"]+"</option>";			
			}else{
				html+="<option  value="+indexEntry["id"]+">"+indexEntry["name"]+"</option>";	
			}		
		});	
		html+="</select>";
		$("#listYearArea").html(html);
		
//		}
//	});
};
var dropDownListMonth = function(id){
//	$.ajax({
//		url:"http://localhost:3001/api/make_param_contact_type",
//		type:"get",
//		dataType:"json",
//		//headers:{Authorization:"Bearer "+tokenID.token},
//		success:function(data){
	
	    var data=[{"id":"1","name":"มกราคม"},{"id":"2","name":"กุมภาพันธ์"},{"id":"3","name":"มีนาคม"}];
		var html="";	
		html+="<select class=\"form-control input-sm listMonth\" id=\"listMonth\">";
		$.each(data,function(index,indexEntry){
			if(id==indexEntry["id"]){
				html+="<option selected value="+indexEntry["id"]+">"+indexEntry["name"]+"</option>";			
			}else{
				html+="<option  value="+indexEntry["id"]+">"+indexEntry["name"]+"</option>";	
			}		
		});	
		html+="</select>";
		$("#listMonthArea").html(html);
		
//		}
//	});
};
var listDataFn = function(data){
	
	if ( $.fn.DataTable.isDataTable('#cusSumByBranchReportTable')) {
	      $('#cusSumByBranchReportTable').DataTable().destroy();
	     }
	
			 var htmlTable="";
			 $("#listDataCusSubByBranch").empty();
			   $.each(data,function(index,indexEntry){
				var trColor="";
					if(indexEntry[7]=="level1"){
						trColor="warning";
					}else if(indexEntry[7]=="level2"){
						trColor="danger";
					}else if(indexEntry[7]=="level3"){
						trColor="warning";
					}else if(indexEntry[7]=="level4"){
						trColor="danger";
					}else if(indexEntry[7]=="level5"){
						trColor="";
					}
					
				     htmlTable+="<tr class="+trColor+">";
					  
					      htmlTable+="<td>"+indexEntry[0]+"</td>";
					      htmlTable+="<td>"+indexEntry[1]+"</td>";
					      htmlTable+="<td>"+indexEntry[2]+"</td>";
					   	  htmlTable+="<td>"+indexEntry[3]+"</td>";
						  htmlTable+="<td>"+indexEntry[4]+"</td>";
						
						  htmlTable+="<td>"+indexEntry[5]+"</td>";
					      htmlTable+="<td>"+indexEntry[6]+"</td>";
					 
						
						 

				     htmlTable+="</tr>";
					
			   });
				
			  $("#listDataCusSubByBranch").html(htmlTable);
			  
			
			  //DataTable
			  $('#cusSumByBranchReportTable').DataTable( { "dom": '<"top"flp>rt<"bottom"lp><"clear">' } ); 
			
	
};
var getDataFn = function() {
//	$.ajax({
//		url : "http://localhost:3001/api/make_import_log_report",
//		type : "get",
//		dataType : "json",
//		//headers:{Authorization:"Bearer "+tokenID.token},
//		success : function(data) {
//			listDataFn(data);
//		}
//	});
	
	var data = [["ทั้งประเทศ", "ผลรวม","444", "200" ,"300000" ,"99.99" , "99.99","level1"],
	            ["สายปฏิบัติการ", "ผลรวม","444", "200" ,"300000" ,"99.99" , "99.99","level2"],
	            ["ธนาคารออมสินภาค 1 ", "ผลรวม","444", "200" ,"300000" ,"99.99" , "99.99","level3"],
	            ["ธนาออมสินห้วยขวาง", "ผลรวม","444", "200" ,"300000" ,"99.99" , "99.99","level4"],
	            ["รหัสสาขา", "ผลรวม","444", "200" ,"300000" ,"99.99" , "99.99","level5"],
	            ["00", "ผลรวม","444", "200" ,"300000" ,"99.99" , "99.99","level5"],
	            ["00", "ผลรวม","444", "200" ,"300000" ,"99.99" , "99.99","level5"],
	            ["00", "ผลรวม","444", "200" ,"300000" ,"99.99" , "99.99","level5"],
	            ["00", "ผลรวม","444", "200" ,"300000" ,"99.99" , "99.99","level5"],
	];
	listDataFn(data);
};



$(document).ready(function(){
	dropDownListLine();
	dropDownListSector();
	dropDownListArea();
	dropDownListBranch();
	dropDownListYear();
	dropDownListMonth();
	getDataFn();
});