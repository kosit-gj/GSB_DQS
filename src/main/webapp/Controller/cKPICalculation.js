$(document).ready(
	function(){

		var restfulURL = "http://192.168.1.49:3001";
		
		 var getDataFn = function(){
				   $.ajax({
					    url:restfulURL+"/api/dqs_branch",
					    type:"get",
					    dataType:"json",
						    success:function(data){
						     
						     
						     dropDownListBranch();
						 }
				  });
		};
		
		
		var dropDownListBranch = function(data){
			$.ajax ({
				url:restfulURL+"/api/dqs_branch" ,
				type:"get" ,
				dataType:"json" ,
					success:function(data){
						var htmlTable="";
						$.each(data,function(index,indexEntry){
							
							htmlTable+="<option value="+indexEntry["brcd"]+">"+indexEntry["desc"]+"</option>";		
						});	
						$("#listBranch").html(htmlTable);
					}
			});
		};
		
		getDataFn();
	});