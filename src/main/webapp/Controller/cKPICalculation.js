$(document).ready(
	function(){

		
		 var getDataFn = function(){
				   $.ajax({
					    url:restfulURL+"/dqs_api/public/dqs_branch",
					    type:"get",
					    dataType:"json",
					    headers:{Authorization:"Bearer "+tokenID.token},
						    success:function(data){
								dropDownListBranch();
						 }
				  });
		};
		
		
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
		
		getDataFn();
	});