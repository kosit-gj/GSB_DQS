
$(document).ready(function(){
	//alert("hello jquery");
	$(".btn-explain").click(function(){
		$("#modalDetail").modal('hide');
		
		$("#exPlainModal").modal();
	});
});