//console.log(sessionStorage.tokenID);

$(document).ready(function(){

	$("#calData").click(function(){
		
		
		//console.log(tokenID);
		$.ajax({
			url:"http://192.168.1.58/dqs_api/public/dqs_role",
			//url:"http://192.168.1.100:3100/dqs_api/public/dqs_branch?token="+tokenID.token,
			type:"GET",
			dataType:"json",
			headers:{Authorization:"Bearer "+tokenID.token},
			//data:{token:tokenID.token},
			success:function(data){
				console.log(data);
			},
			error: function(jqXHR, textStatus, errorThrown) {
			    if('error'==textStatus){
			    	window.location.reload(true);
			    }
			    //alert(errorThrown);
			   // console.log(jqXHR);
			}
			
		});
		
		
		
	});
	
	
	
	
});