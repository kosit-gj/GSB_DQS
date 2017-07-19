$(document).ready(function(){
	

	
	var searchFn = function(searchText) {
		//embed parameter start
		var htmlParam="";
		htmlParam+="<input type='hidden' class='paramEmbed' id='param_Customer' name='param_Customer' value='"+$("#searchText").val()+"'>";
		$(".paramEmbed").remove();
		$("body").append(htmlParam);
		//embed parameter end
	}
	


	var listCustomerFn = function(data) {
		//console.log(data);
		var num=1;
		var checkTable="thead";
		var htmlTable = "";
		var htmlThead="<thead><tr>";
		var htmlTbody="<tbody><tr>";

		$.each(data,function(index,indexEntry) {
			//console.log(num % 2);
			//console.log(data.length);
			if(num == 1){
				htmlThead+= "<th style='width:50%'>"+index+ " : "+indexEntry+"</td>";
			}
			else if(checkTable == "thead" && num !=1){
				htmlThead+= "<th>"+index+ " : "+indexEntry+"</td>";
				if(num % 2 == 0){ 
					htmlThead +="</tr></thead>";
					htmlTable += htmlThead;
					htmlThead="<thead><tr>";
					checkTable="tbody";
				}
			}
			else if(checkTable == "tbody"){
				htmlTbody+= "<td>"+index+ " : "+indexEntry+"</td>";
				if(num % 2 == 0){ 
					htmlTbody +="</tr></tbody>";
					htmlTable += htmlTbody;
					htmlTbody="<tbody><tr>";
					checkTable="thead";
				}
			}
			num++;
		});
		//alert(htmlTable);
		
		$("#tableCustomer").html(htmlTable);

		
		
	};
	
	var getDataFn = function() {
		$.ajax({
			url : restfulURL + "/dqs_api/public/dqs_customer",
			type : "get",
			data : {"cif_no" : $("#param_Customer").val()},
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			success : function(data) {
				checkMaintenanceFn(data);
				//console.log(data);
				//alert(data.toSource());
				listCustomerFn(data);
			}
		});
	};
	//Call Function start
	  
	  $("#btnSearch").click(function(){
		  searchFn();
		  getDataFn();
	  });
	  $("#btnSearch").click();
	 
	  $("#exportFile").click(function(){
			$("form#formExport").attr("action",restfulURL+"/dqs_api/public/dqs_customer/export?cif_no="+$("#param_Customer").val()+"&token="+tokenID.token);
		});
	  $('.numberOnly').keypress(function (evt) { 
			 var charCode = (evt.which) ? evt.which : event.keyCode;
			 var number = this.value.split('.');
			 if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
			    return false;
			 }
			    //just one dot
			 if(number.length>0 && charCode == 46){
			    return false;
			 }
			 return true;
		});

	
});