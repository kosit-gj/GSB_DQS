$(document).ready(
	function(){

		var restfulURL = "http://192.168.1.100:3001";
		
		 var getDataFn = function(){
				   $.ajax({
					    url:restfulURL+"/api/dqs_branch_operation",
					    type:"get",
					    dataType:"json",
						    success:function(data){
						     
						     
						     dropDownListBranchOper();
						 }
				  });
		};
		
		
		var dropDownListBranchOper = function(data){
			$.ajax ({
				url:restfulURL+"/api/dqs_branch_operation" ,
				type:"get" ,
				dataType:"json" ,
					success:function(data){
						var htmlTable="";
						$.each(data,function(index,indexEntry){
							
							htmlTable+="<option value="+indexEntry["operation_code"]+">"+indexEntry["operation_name"]+"</option>";		
						});	
						$("#listBranchOper").html(htmlTable);
					}
			});
		};
		
		getDataFn();
	});