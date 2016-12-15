//binding tooltip.
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});
var makeData={
		"ข้อมูลบัญชีเงินฝากทั้งหมด-OBADEP201611091.TXT":[["1","","0091-สาขาลาดพร้าว","010-สาขาดินแดง","1939900156392","20/06/1900","มีลูกค้าที่เสียชีวิต มาทำธุรกกรรม(สินเชื่อ)"],["2","","009-สาขาลาดพร้าว","010-สาขาดินแดง","1939900156392","20/06/1900","มีลูกค้าที่เสียชีวิต มาทำธุรกกรรม(สินเชื่อ)"]],
		"ข้อมูลบัญชีเงินฝากทั้งหมด-OBADEP201611092.TXT":[["1","","0092-สาขาลาดพร้าว","010-สาขาดินแดง","1939900156392","20/06/1900","มีลูกค้าที่เสียชีวิต มาทำธุรกกรรม(สินเชื่อ)"],["2","","009-สาขาลาดพร้าว","010-สาขาดินแดง","1939900156392","20/06/1900","มีลูกค้าที่เสียชีวิต มาทำธุรกกรรม(สินเชื่อ)"]],
		"ข้อมูลบัญชีเงินฝากทั้งหมด-OBADEP201611093.TXT":[["1","","0093-สาขาลาดพร้าว","010-สาขาดินแดง","1939900156392","20/06/1900","มีลูกค้าที่เสียชีวิต มาทำธุรกกรรม(สินเชื่อ)"],["2","","009-สาขาลาดพร้าว","010-สาขาดินแดง","1939900156392","20/06/1900","มีลูกค้าที่เสียชีวิต มาทำธุรกกรรม(สินเชื่อ)"]],
		"ข้อมูลบัญชีเงินฝากทั้งหมด-OBADEP201611094.TXT":[["1","","0094-สาขาลาดพร้าว","010-สาขาดินแดง","1939900156392","20/06/1900","มีลูกค้าที่เสียชีวิต มาทำธุรกกรรม(สินเชื่อ)"],["2","","009-สาขาลาดพร้าว","010-สาขาดินแดง","1939900156392","20/06/1900","มีลูกค้าที่เสียชีวิต มาทำธุรกกรรม(สินเชื่อ)"]],
		"ข้อมูลบัญชีเงินฝากทั้งหมด-OBADEP201611095.TXT":[["1","","0095-สาขาลาดพร้าว","010-สาขาดินแดง","1939900156392","20/06/1900","มีลูกค้าที่เสียชีวิต มาทำธุรกกรรม(สินเชื่อ)"],["2","","009-สาขาลาดพร้าว","010-สาขาดินแดง","1939900156392","20/06/1900","มีลูกค้าที่เสียชีวิต มาทำธุรกกรรม(สินเชื่อ)"]]
		};
//DropDownList Role
var dropDownListContactType = function(){
	
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_maintenance/contact_type",
		type:"get",
		dataType:"json",
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			
		//	console.log(data);
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
	//console.log(data);
	if ( $.fn.DataTable.isDataTable('#mainTableReject')){
	      $('#mainTableReject').DataTable().destroy();
	     }
			 var htmlTable="";
			 $("#listMainReject").empty();
			   $.each(data['group'],function(index,indexEntry){
				
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
									//birth_date,cif_no,citizen_id,contact_branch,contact_branch_code,file_name,own_branch,own_branch_code,reject_date,reject_desc
									 $.each(indexEntry['items'],function(index2,indexEntry2){
										htmlTable+="<tr>";
											htmlTable+="<td><div class='text-inline-table'>"+(index+1)+"</div></td>";
											htmlTable+="<td><div class='text-inline-table'>"+indexEntry2['cif_no']+"</div></td>";
											htmlTable+=" <td><div class='text-inline-table'>"+indexEntry2['own_branch']+"</div></td>";
											htmlTable+="<td><div class='text-inline-table'>"+indexEntry2['contact_branch_code']+"</div></td>";  
											htmlTable+="<td><div class='text-inline-table'>"+indexEntry2['citizen_id']+"  </div></td>";
											htmlTable+="<td><div class='text-inline-table'>"+indexEntry2['birth_date']+"</div></td>";
											htmlTable+="<td><div class='text-inline-table'>"+indexEntry2['reject_desc']+"</div></td>";
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
var getDataFn = function(contactType,rejectStartDate,rejectEndDate) {
	

	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_maintenance/reject_log",
		type : "get",
		dataType : "json",
		//data:{"contact_type":contactType,"reject_start_date":rejectStartDate ,"reject_end_date":rejectEndDate},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			//console.log(data);
			listDataFn(data);
			
		}
	});
	//listDataFn(makeData)
	
};

var searchAdvance = function(){

	var htmlParameter="";
	htmlParameter+="<input type='hidden' id='embedParamListContactType' name='embedParamListContactType' class='embedParam' value='"+$("#listContactType").val()+"' >";
	htmlParameter+="<input type='hidden' id='embedParamRejectStartDate' name='embedParamRejectStartDate' class='embedParam' value='"+$("#rejectStartDate").val()+"' >";
	htmlParameter+="<input type='hidden' id='embedParamRejectEndDate' name='embedParamRejectEndDate' class='embedParam' value='"+$("#rejectEndDate").val()+"' >";
	$(".embedParam").remove();
	$("body").append(htmlParameter);
	getDataFn($("#listContactType").val(),$("#rejectStartDate").val(),$("#rejectEndDate").val());
}

$(document).ready(function(){
	
	

	
	dropDownListContactType();
	
	
	
	//parameter date start
	$("#rejectStartDate").datepicker();
    $("#rejectStartDate").datepicker( "option", "dateFormat", "yy/mm/dd" );
    $("#rejectStartDate").val(firstDayInMonthFn());
    
    $("#rejectEndDate").datepicker();
    $("#rejectEndDate").datepicker( "option", "dateFormat", "yy/mm/dd" );
    $("#rejectEndDate").val(firstDayInMonthFn());
    $(".ui-datepicker").hide();
    
    
	//parameter date end
	getDataFn();
	if ( $.fn.DataTable.isDataTable('#mainTableReject')) {
	      $('#mainTableReject').DataTable().destroy();
	     }
	
	//DataTable
	$('#mainTableReject').DataTable( { "dom": '<"top"flp>rt<"bottom"lp><"clear">' } );
	
	//Search Data Here..
	$("#btnSearch").click(function(){
		searchAdvance();
	});
	//Search Data Here..
	
});