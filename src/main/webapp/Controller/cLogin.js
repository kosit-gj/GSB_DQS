$(document).ready(function(){
	//alert("hello jquery");
	//administrator,gj255902!
	//sessionStorage.token="";
	
	$("#btnSubmit").click(function(){
		
		//alert($("#userName").val());
		//alert($("#password").val());
		
		localStorage.setItem("lastname", "Smith");
		localStorage.getItem("lastname"); 
		//localStorage.removeItem("lastname");
		sessionStorage.full_name="kosit";
		console.log(sessionStorage.username);
		
		
		$.ajax({
			url:"http://192.168.1.58/dqs_api/public/session",
			type:"POST",
			dataType:"text",
			data:{"user_name":$("#userName").val(),"password":$("#password").val()},
			error: function(jqXHR, textStatus, errorThrown) {
				
				console.log(jqXHR.statusText);

			},
			success:function(data){
				
				//tokenID=data;
				console.log(data);
				localStorage.setItem("tokenID",data);
				
				//console.log(eval("("+localStorage.getItem("tokenID")+")"));
				window.location.href = "./"; 
			}
		})
		
			
		return false;
	});
	
	
	
	
});