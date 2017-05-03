var checkMaintenanceFnLogin = function(data){
	var dataJson = eval("("+data+")");
	if(dataJson['maintenance']==1 ){
		
		sessionStorage.setItem("tokenID",null);
		window.location.href = "./maintenance.html"; 
		return false;
	}else{
		
		sessionStorage.setItem("tokenID",data);
		window.location.href = "./"; 
		return true;
	}
	
}


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
			type:"POST",
			dataType:"text",
			data:{"user_name":$("#userName").val(),"password":$("#password").val()},
			error: function(jqXHR, textStatus, errorThrown) {
				$("#information").html("<font color='red'>*</font>invalid credentials.").show();

			},
			success:function(data){
				
				//console.log(data);
				checkMaintenanceFnLogin(data);
				
				
			}
		})			
		return false;
	});
	
});