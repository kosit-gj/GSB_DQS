var golbalData =[];
//binding tooltip.
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});



var listDataFn = function(data){

var htmlTable="";
var tel = data['aph'];
var rowSpanNum = data['cif'].length;
//console.log(tel +" - Length :"+rowSpanNum);
$("#listData").empty();
var mergeCIF=[];
   $.each(data['cif'],function(index,indexEntry){
	//console.log(index);
	if(index == 0){
		htmlTable+="<tr>";
		htmlTable+="<td rowspan='"+rowSpanNum+"'>"+tel+"</td>";
		htmlTable+="<td>"+data['cif'][index]['acn']+"</td>";
	    htmlTable+="<td>"+data['cif'][index]['nam']+"</td>";
	    htmlTable+="</tr>";
	}else{
		htmlTable+="<tr>";
		htmlTable+="<td>"+data['cif'][index]['acn']+"</td>";
	    htmlTable+="<td>"+data['cif'][index]['nam']+"</td>";
	    htmlTable+="</tr>";
	}
	     
});
$("#listData").html(htmlTable);
	
};
var getDataFn = function() {
	
	var paramEmbedTel=$("#paramEmbedTel").val();

	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_operation_report/duplicate_sms",
		type : "get",
		dataType : "json",
		data:{
			aph:paramEmbedTel
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			//console.log(data);
			checkMaintenanceFn(data);
			listDataFn(data);
		}
	});
	

};

var searchAdvanceFn = function(){
	//embed parameter start
	var htmlParam="";
	htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedTel' name='paramEmbedTel' value='"+$("#tel").val()+"'>";

	

	$(".paramEmbedArea").empty();
	$(".paramEmbedArea").append(htmlParam);
	getDataFn();
	//getDataFn(1,$("#rpp").val());
}
function numbersonly(e){
    var unicode=e.charCode? e.charCode : e.keyCode
    if (unicode!=8){ //if the key isn't the backspace key (which we should allow)
        if (unicode<48||unicode>57) //if not a number
            return false //disable key press
    }
}

$(document).ready(function(){


	
	//getDataFn();
	$("#btnAdvanceSearch").click(function(){
		searchAdvanceFn();
		$(".display_result").show();
	});
	//$("#btnAdvanceSearch").click();
	
	
	

});