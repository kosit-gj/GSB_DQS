//สาย
//ภาค
//เขต

//line
//sector
//area

var dropDownContactType= function(id){
//	$.ajax({
//		url:"http://localhost:3001/api/make_param_contact_type",
//		type:"get",
//		dataType:"json",
//		//headers:{Authorization:"Bearer "+tokenID.token},
//		success:function(data){
	
	    var data=[{"id":"1","name":"ContactType1"},{"id":"2","name":"ContactType2"},{"id":"3","name":"ContactType3"}];
		var html="";	
		html+="<select class=\"form-control input-sm contactType\" id=\"contactType\">";
		$.each(data,function(index,indexEntry){
			if(id==indexEntry["id"]){
				html+="<option selected value="+indexEntry["id"]+">"+indexEntry["name"]+"</option>";			
			}else{
				html+="<option  value="+indexEntry["id"]+">"+indexEntry["name"]+"</option>";	
			}		
		});	
		html+="</select>";
		
		$("#listContactTypeArea").html(html);
		
//		}
//	});
};
var dropDownListProvince = function(id){
//	$.ajax({
//		url:"http://localhost:3001/api/make_param_contact_type",
//		type:"get",
//		dataType:"json",
//		//headers:{Authorization:"Bearer "+tokenID.token},
//		success:function(data){
	
	    var data=[{"id":"1","name":"Province1"},{"id":"2","name":"Province2"},{"id":"3","name":"Province3"}];
		var html="";	
		html+="<select class=\"form-control input-sm listProvince\" id=\"listProvince\">";
		$.each(data,function(index,indexEntry){
			if(id==indexEntry["id"]){
				html+="<option selected value="+indexEntry["id"]+">"+indexEntry["name"]+"</option>";			
			}else{
				html+="<option  value="+indexEntry["id"]+">"+indexEntry["name"]+"</option>";	
			}		
		});	
		html+="</select>";
		$("#listProvinceArea").html(html);
		
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
					}else if(indexEntry[8]=="level2"){
						trColor="danger";
					}else if(indexEntry[8]=="level3"){
						trColor="warning";
					}else if(indexEntry[8]=="level4"){
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
	
	var data = [["CIF1.", "บุคคล","202218125833", "063-สาขาลาดพร้าว" ,"0071-สาขอดินแดง" ,"กรุงเทพ" , "สมชาย","มั่นคง","level1"],
	            ["CIF2.", "บุคคล","202218125833", "063-สาขาลาดพร้าว" ,"0071-สาขอดินแดง" ,"กรุงเทพ" , "สมชาย","มั่นคง","level1"],
	            ["CIF3.", "บุคคล","202218125833", "063-สาขาลาดพร้าว" ,"0071-สาขอดินแดง" ,"กรุงเทพ" , "สมชาย","มั่นคง","level2"],
	            ["CIF4.", "บุคคล","202218125833", "063-สาขาลาดพร้าว" ,"0071-สาขอดินแดง" ,"กรุงเทพ" , "สมชาย","มั่นคง","level2"],
	            ["CIF5.", "บุคคล","202218125833", "063-สาขาลาดพร้าว" ,"0071-สาขอดินแดง" ,"กรุงเทพ" , "สมชาย","มั่นคง","level2"],
	            ["CIF6.", "บุคคล","202218125833", "063-สาขาลาดพร้าว" ,"0071-สาขอดินแดง" ,"กรุงเทพ" , "สมชาย","มั่นคง","level2"],
	            ["CIF7.", "บุคคล","202218125833", "063-สาขาลาดพร้าว" ,"0071-สาขอดินแดง" ,"กรุงเทพ" , "สมชาย","มั่นคง","level2"],
	            ["CIF8.", "บุคคล","202218125833", "063-สาขาลาดพร้าว" ,"0071-สาขอดินแดง" ,"กรุงเทพ" , "สมชาย","มั่นคง","level2"],
	            ["CIF9.", "บุคคล","202218125833", "063-สาขาลาดพร้าว" ,"0071-สาขอดินแดง" ,"กรุงเทพ" , "สมชาย","มั่นคง","level2"],
	            ["CIF10.", "บุคคล","202218125833", "063-สาขาลาดพร้าว" ,"0071-สาขอดินแดง" ,"กรุงเทพ" , "สมชาย","มั่นคง","level2"],
	            
	            
	            
	];
	listDataFn(data);
};



$(document).ready(function(){
	
	dropDownContactType();
	dropDownListProvince();

	
	getDataFn();
});