var makeData={
		"ข้อมูลบัญชีเงินฝากทั้งหมด-OBADEP201611091.TXT":[["1","","0091-สาขาลาดพร้าว","010-สาขาดินแดง","1939900156392","20/06/1900","มีลูกค้าที่เสียชีวิต มาทำธุรกกรรม(สินเชื่อ)"],["2","","009-สาขาลาดพร้าว","010-สาขาดินแดง","1939900156392","20/06/1900","มีลูกค้าที่เสียชีวิต มาทำธุรกกรรม(สินเชื่อ)"]],
		"ข้อมูลบัญชีเงินฝากทั้งหมด-OBADEP201611092.TXT":[["1","","0092-สาขาลาดพร้าว","010-สาขาดินแดง","1939900156392","20/06/1900","มีลูกค้าที่เสียชีวิต มาทำธุรกกรรม(สินเชื่อ)"],["2","","009-สาขาลาดพร้าว","010-สาขาดินแดง","1939900156392","20/06/1900","มีลูกค้าที่เสียชีวิต มาทำธุรกกรรม(สินเชื่อ)"]],
		"ข้อมูลบัญชีเงินฝากทั้งหมด-OBADEP201611093.TXT":[["1","","0093-สาขาลาดพร้าว","010-สาขาดินแดง","1939900156392","20/06/1900","มีลูกค้าที่เสียชีวิต มาทำธุรกกรรม(สินเชื่อ)"],["2","","009-สาขาลาดพร้าว","010-สาขาดินแดง","1939900156392","20/06/1900","มีลูกค้าที่เสียชีวิต มาทำธุรกกรรม(สินเชื่อ)"]],
		"ข้อมูลบัญชีเงินฝากทั้งหมด-OBADEP201611094.TXT":[["1","","0094-สาขาลาดพร้าว","010-สาขาดินแดง","1939900156392","20/06/1900","มีลูกค้าที่เสียชีวิต มาทำธุรกกรรม(สินเชื่อ)"],["2","","009-สาขาลาดพร้าว","010-สาขาดินแดง","1939900156392","20/06/1900","มีลูกค้าที่เสียชีวิต มาทำธุรกกรรม(สินเชื่อ)"]],
		"ข้อมูลบัญชีเงินฝากทั้งหมด-OBADEP201611095.TXT":[["1","","0095-สาขาลาดพร้าว","010-สาขาดินแดง","1939900156392","20/06/1900","มีลูกค้าที่เสียชีวิต มาทำธุรกกรรม(สินเชื่อ)"],["2","","009-สาขาลาดพร้าว","010-สาขาดินแดง","1939900156392","20/06/1900","มีลูกค้าที่เสียชีวิต มาทำธุรกกรรม(สินเชื่อ)"]]
		};
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
	//console.log(data);
	if ( $.fn.DataTable.isDataTable('#mainTableReject')) {
	      $('#mainTableReject').DataTable().destroy();
	     }
	
			 var htmlTable="";
			 $("#listMainReject").empty();
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
										htmlTable+="<th>CIF</th>";
										htmlTable+="<th>Own Branch</th>";
										htmlTable+="<th>Last Contact Branch</th>";
										htmlTable+="<th>Citizen ID</th>";
										htmlTable+="<th>Birth Date</th>";
										htmlTable+="<th>Reject Detail</th>";
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
											htmlTable+="<td><div class='text-inline-table'>"+indexEntry2[5]+"</div></td>";
											htmlTable+="<td><div class='text-inline-table'>"+indexEntry2[6]+"</div></td>";
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
				
			  $("#listMainReject").html(htmlTable);
			  
			
			  //DataTable
			  $('#mainTableReject').DataTable( { "dom": '<"top"lp>rt<"bottom"lp><"clear">' } ); 
			
	
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
	
	dropDownListContactType();
	getDataFn();
	if ( $.fn.DataTable.isDataTable('#mainTableReject')) {
	      $('#mainTableReject').DataTable().destroy();
	     }
	
	//DataTable
	$('#mainTableReject').DataTable( { "dom": '<"top"flp>rt<"bottom"lp><"clear">' } );
	
	
});