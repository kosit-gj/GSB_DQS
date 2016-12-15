var dropDownListBranch = function(data){
	$.ajax ({
		url:restfulURL+"/dqs_api/public/dqs_branch" ,
		type:"get" ,
		dataType:"json" ,
		headers:{Authorization:"Bearer "+tokenID.token},
		success:function(data){
			var htmlTable="";
			$.each(data['data'],function(index,indexEntry){
				
				htmlTable+="<option value="+indexEntry["brcd"]+">"+indexEntry["desc_1"]+"</option>";		
			});	
		    $("#listBranch").html(htmlTable);
		}
	});
};

$(document).ready(function(){
	$(document).ready(function(){
	    $('[data-toggle="tooltip"]').tooltip();
	});
	dropDownListBranch();
	$("#btnCalKPI").click(function(){
		
		//http://192.168.1.58/dqs_api/public/dqs_branch/recal_kpi
		$.ajax ({
			url:restfulURL+"/dqs_api/public/dqs_branch/recal_kpi" ,
			type:"post" ,
			dataType:"json" ,
			data:{"ccdef":$("#listBranch").val()},
			headers:{Authorization:"Bearer "+tokenID.token},
			success:function(data){
				if(data['status']==200){
					callFlashSlide("Runing Calculate Kpi...");
					$("#runModal").modal('hide');
				}
			}
		});
		
	});
});