$(document).ready(function(){
	
	$("#btnSubmit").click(function(){
		
		
		//171.96.201.91
		$.ajax({
			url:"http://171.96.201.91/dqs_api/public/session",
			type:"POST",
			dataType:"text",
			data:{"user_name":$("#userName").val(),"password":$("#password").val()},
			error: function(jqXHR, textStatus, errorThrown) {
				
				//console.log(jqXHR.statusText);
				$("#information").html("<font color='red'>***</font> invalid credentials.").show();

			},
			success:function(data){
				
				localStorage.setItem("tokenID",data);
				window.location.href = "./"; 

				
			}
		})
		
			
		return false;
	});
	
	
	
	
});