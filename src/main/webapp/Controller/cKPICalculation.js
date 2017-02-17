var dropDownListBranch = function(data){
	$.ajax ({
		url:restfulURL+"/dqs_api/public/dqs_monitoring/branch_list",
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlTable="";
			htmlTable+="<option value=\"\">Select Branch</option>";
			$.each(data,function(index,indexEntry){
				
				htmlTable+="<option value="+indexEntry["brcd"]+">"+indexEntry["desc"]+"</option>";		
			});	
		    $("#listBranch").html(htmlTable);
		}
	});
};

$(document).ready(function(){
	//Set Tooltip on parameter.
	$(document).ready(function(){
	    $('[data-toggle="tooltip"]').tooltip();
	});
	//List Branch
	dropDownListBranch();
	$("#btnCalKPI").click(function(){
		
		$.ajax ({
			url:restfulURL+"/dqs_api/public/dqs_branch/recal_kpi" ,
			type:"post" ,
			dataType:"json" ,
			data:{"ccdef":$("#listBranch").val()},
			headers:{Authorization:"Bearer "+tokenID.token},
			success:function(data){
				if(data['status']==200){
					callFlashSlide("Re-Calculate KPI is Success");
					$("#runModal").modal('hide');
				}
			}
		});
		
	});
	
	
	//click for run  recalculation.
	$("#runReCal").click(function(){
		if($("#listBranch").val()==""){
			
			callFlashSlide("Please select branch.");
			return false;
			
		}else{
			$.ajax ({
				url:restfulURL+"/dqs_api/public/dqs_branch/get_kpi_date",
				type:"get" ,
				dataType:"json" ,
				async:false,
				headers:{Authorization:"Bearer "+tokenID.token},
				success:function(data){
					var dataReturn="";
					var monthTH=["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน",
					             "พฤษาภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน",
					             "ตุลาคม","พฤจิกายน","ธันวาคม"];
					var d = data["data_start_date"];
					var month = parseInt(d.substring(6, 4));
					var year =parseInt(d.substring(0, 4))+543;
					dataReturn=monthTH[month-1]+" "+year
					$("#kpiOfMonth").html(dataReturn);
				}
			});
		}
		
	});
});