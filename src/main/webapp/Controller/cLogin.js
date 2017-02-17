$(document).ready(function(){
	
	$( document ).ajaxStart(function() {
		$("body").mLoading();
	});
	$( document ).ajaxStop(function() {
		$("body").mLoading('hide');
	});
	
	$("#btnSubmit").click(function(){
		$.ajax({
			
			url:restfulURL+"/dqs_api/public/session",
			//url:"http://10.15.100.12/dqs_api/public/session",
			type:"POST",
			dataType:"text",
			data:{"user_name":$("#userName").val(),"password":$("#password").val()},
			error: function(jqXHR, textStatus, errorThrown) {
				$("#information").html("<font color='red'>*</font>invalid credentials.").show();

			},
			success:function(data){
				//console.log(data);
				//localStorage.setItem("tokenID",data);
				sessionStorage.setItem("tokenID",data);
				window.location.href = "./"; 

				
			}
		})			
		return false;
	});
	
});