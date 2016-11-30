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

var listDataFn = function(data){
	
	if ( $.fn.DataTable.isDataTable('#reportSumIsNotOperOfCusByKpiConByPeriodTable')) {
	      $('#reportSumIsNotOperOfCusByKpiConByPeriodTable').DataTable().destroy();
	     }
	
			 var htmlTable="";
			 $("#listDataSumIsNotOperOfCusByKpiConByPeriod").empty();
			   $.each(data,function(index,indexEntry){
				var trColor="";
					if(indexEntry[16]=="level1"){
						trColor="warning";
					}else if(indexEntry[16]=="level2"){
						trColor="danger";
					}else if(indexEntry[16]=="level3"){
						trColor="warning";
					}else if(indexEntry[16]=="level4"){
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
					      htmlTable+="<td>"+indexEntry[7]+"</td>";
					      htmlTable+="<td>"+indexEntry[8]+"</td>";
					      htmlTable+="<td>"+indexEntry[9]+"</td>";
					      htmlTable+="<td>"+indexEntry[10]+"</td>";
						  htmlTable+="<td>"+indexEntry[11]+"</td>";
					      htmlTable+="<td>"+indexEntry[12]+"</td>";
					      htmlTable+="<td>"+indexEntry[13]+"</td>";
					      htmlTable+="<td>"+indexEntry[14]+"</td>";
					      htmlTable+="<td>"+indexEntry[15]+"</td>";
				     htmlTable+="</tr>";
					
			   });
				
			  $("#listDataSumIsNotOperOfCusByKpiConByPeriod").html(htmlTable);
			  
			
			  //DataTable
			  $('#reportSumIsNotOperOfCusByKpiConByPeriodTable').DataTable( {
				  "dom": '<"top"flp>rt<"bottom"lp><"clear">',
				  "order": [],
				    "columnDefs": [ {
				      "targets"  : 'no-sort',
				      "orderable": false,
				    }
				    ],
				    "bSort" : false,     
			  }); 
			
	
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
	
	var data = [["สายปฏิบัติการ1", "ผลรวม","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","level1"],
	            ["ธนาคารออมสินภาค1", "ผลรวม","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","level2"],
	            ["ธนาคารออมสินเขตห้วยขวาง", "ผลรวม","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","level3"],
	            ["รหัสสาขา", "ชื่อสาขา","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","level4"],
	            ["00", "สาขา1","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","level4"],
	            ["00", "สาขา2","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","level4"],
	            ["00", "สาขา3","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","level4"],
	            ["00", "สาขา4","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","level4"],
	            ["00", "สาขา5","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","level4"],
	            ["00", "สาขา6","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","level4"],
	            ["ธนาคารออมสินเขตบางกะปิ", "ผลรวม","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","level3"],
	            ["รหัสสาขา", "ชื่อสาขา","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","level4"],
	            ["00", "สาขา1","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","level4"],
	            ["00", "สาขา2","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","level4"],
	            ["00", "สาขา3","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","level4"],
	            ["00", "สาขา4","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","level4"],
	            ["00", "สาขา5","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","level4"],
	            ["00", "สาขา6","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","444", "200" ,"300000" ,"99.99" , "99.99","99.99","99.99","level4"],
	            
	];
	listDataFn(data);
};



$(document).ready(function(){
	dropDownListLine();
	dropDownListSector();
	dropDownListArea();
	dropDownListBranch();
	
	getDataFn();
});