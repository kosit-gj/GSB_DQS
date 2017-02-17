var golbalData =[];
//binding tooltip.
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});

var dropDownListProvince = function(){
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_operation_report/province_list",
		type:"get",
		dataType:"json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
	
	   // var data=[{"id":"1","name":"Province1"},{"id":"2","name":"Province2"},{"id":"3","name":"Province3"}];
		var html="";	
		html+="<select class=\"form-control input-sm listProvince\" id=\"listProvince\">";
		html+="<option selected value=''>All Province</option>";
		$.each(data,function(index,indexEntry){
			
				html+="<option  value="+indexEntry["province_code"]+">"+indexEntry["province_name"]+"</option>";	
					
		});	
		html+="</select>";
		$("#listProvinceArea").html(html);
		
		}
	});
};

var listDataFn = function(data){


var htmlTable="";
var count2="";
var count=1;
$("#listData").empty();
var mergeCIF=[];
   $.each(data['data'],function(index,indexEntry){

	
	if(jQuery.inArray(indexEntry['merge_id'],mergeCIF) == -1){
		mergeCIF.push(indexEntry['merge_id']);
		htmlTable+="<tr class='tr-"+count+"'>";
		count2=count;
	}else{
		htmlTable+="<tr class='tr-"+count2+"'>";
		count++;
	}
	
	      htmlTable+="<td>"+indexEntry['cif_no']+"</td>";
	      htmlTable+="<td>"+indexEntry['cust_type']+"</td>";
	      htmlTable+="<td>"+indexEntry['citizen_id']+"</td>";
	   	  htmlTable+="<td>"+indexEntry['own_branch_name']+"</td>";
		  htmlTable+="<td>"+indexEntry['contact_branch_name']+"</td>";
		  htmlTable+="<td>"+indexEntry['province_name']+"</td>";
	      htmlTable+="<td>"+indexEntry['cust_name']+"</td>";
	      htmlTable+="<td>"+indexEntry['cust_surname']+"</td>";
		      
	     htmlTable+="</tr>";
	     
});
$("#listData").html(htmlTable);
//Set row color.
$("#reportSumIsNotOperOfCusByKpiConByPeriodTable tr").each(function(){
	var tr="";
	tr = $(this).attr("class").split("-");
	tr=tr[1];
	
	if(tr%2){
		$(this).addClass("warning");
	}else{
		$(this).addClass("");
	}
	
});

	
};
var getDataFn = function() {
	
	var paramEmbedListCusType=$("#paramEmbedListCusType").val();
	var paramEmbedListProvince=$("#paramEmbedListProvince").val();
	var paramEmbedName=$("#paramEmbedName").val();
	var paramEmbedSurname=$("#paramEmbedSurname").val();
	
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_operation_report/merge_cif",
		type : "get",
		dataType : "json",
		data:{
			cust_type:paramEmbedListCusType,
			province:paramEmbedListProvince,
			name:paramEmbedName,
			surname:paramEmbedSurname
		},
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {
			listDataFn(data);
		}
	});
	

};

var searchAdvanceFn = function(){
	//embed parameter start
	var htmlParam="";
	htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedListCusType' name='paramEmbedListCusType' value='"+$("#listCusType").val()+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedListProvince' name='paramEmbedListProvince' value='"+$("#listProvince").val()+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedName' name='paramEmbedName' value='"+$("#name").val()+"'>";
	htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedSurname' name='paramEmbedSurname' value='"+$("#surName").val()+"'>";
	

	$(".paramEmbedArea").empty();
	$(".paramEmbedArea").append(htmlParam);
	getDataFn();
	//getDataFn(1,$("#rpp").val());
}


$(document).ready(function(){
	//dropDownListContactType();
	dropDownListCusType();
	//dropDownContactType();
	dropDownListProvince();

	
	//getDataFn();
	$("#btnAdvanceSearch").click(function(){
		searchAdvanceFn();
		$(".display_result").show();
	});
	//$("#btnAdvanceSearch").click();
	
	//Export
	$("#exportToExcel").click(function(){
		
		var paramEmbedListCusType=$("#paramEmbedListCusType").val();
		var paramEmbedListProvince=$("#paramEmbedListProvince").val();
		var paramEmbedName=$("#paramEmbedName").val();
		var paramEmbedSurname=$("#paramEmbedSurname").val();
		
		
		var param="";
		param+="&cust_type="+paramEmbedListCusType;
		param+="&province="+paramEmbedListProvince;
		param+="&name="+paramEmbedName;
		param+="&surname="+paramEmbedSurname;
		
		$("form#formExportToExcel ").attr("action",restfulURL+"/dqs_api/public/dqs_operation_report/merge_cif/export?token="+tokenID.token+""+param);
		$("form#formExportToExcel ").submit();
	});
	
	
	//Auto Complete  Name start
	$("#name").autocomplete({
      source: function (request, response) {
    	 // http://192.168.1.58/dqs_api/public/dqs_operation_report/auto_name
      	 $.ajax({
				    url:restfulURL+"/dqs_api/public/dqs_operation_report/auto_name",
				    type:"get",
				    dataType:"json",
					headers:{Authorization:"Bearer "+tokenID.token},
					data:{"q":request.term},
					//async:false,
					error: function (xhr, textStatus, errorThrown) {
						console.log('Error: ' + xhr.responseText);
                    },
				    success:function(data){
					
						response($.map(data, function (item) {
                          return {
                        	  
                        	  label: item.cust_name,
                              value: item.cust_name
                          }
                      }));
					
				    },
					beforeSend:function(){
						$("body").mLoading('hide');	
					}
				   });
      	
      }
  });
	//Auto Complete  Name end
	
	//Auto Complete  Surname start
	$("#surName").autocomplete({
      source: function (request, response) {
    	 //http://192.168.1.58/dqs_api/public/dqs_operation_report/auto_surname
      	 $.ajax({
				    url:restfulURL+"/dqs_api/public/dqs_operation_report/auto_surname",
				    type:"get",
				    dataType:"json",
					headers:{Authorization:"Bearer "+tokenID.token},
					data:{"q":request.term},
					//async:false,
                  error: function (xhr, textStatus, errorThrown) {
                      console.log('Error: ' + xhr.responseText);
                  },
				    success:function(data){
					
						response($.map(data, function (item) {
                          return {
                        	  
                        	  label: item.cust_surname,
                              value: item.cust_surname
                          }
                      }));
					
				    },
					beforeSend:function(){
						$("body").mLoading('hide');	
					}
				   });
      	
      }
  });
	//Auto Complete  Surname end
	
});