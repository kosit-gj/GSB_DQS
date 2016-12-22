$(document).ready(
	function(){

		var restfulURL = "http://192.168.1.49:3001";
		
		
		 var listDataFn = function(data){
				
				   console.log(data);
				   var htmlTable="";
				   $.each(data,function(index,indexEntry){
				    //console.log(indexEntry);
					     htmlTable+="<tr >";
						   	  htmlTable+="<td>"+indexEntry["cust_type"]+"</td>";
							  htmlTable+="<td>"+indexEntry["id"]+"</td>";
							  htmlTable+="<td>"+indexEntry["branch"]+"</td>";
						   	  htmlTable+="<td>"+indexEntry["province"]+"</td>";
							  htmlTable+="<td>"+indexEntry["name"]+"</td>";
							  htmlTable+="<td>"+indexEntry["surname"]+"</td>";
						   	  htmlTable+="<td>"+indexEntry["cif_no"]+"</td>";
						 htmlTable+="</tr>";
				   });
				
				   $("#listMergeCIFReport").html(htmlTable);
				
				//DataTable
				 // $('#tableMergeCIFReport').DataTable( { "dom": '<"top"flp>rt<"bottom"lp><"clear">' } );
		 }
		 
		 
			  var getDataFn = function(){
				   $.ajax({
					    url:restfulURL+"/api/make_merge_cif_report",
					    type:"get",
					    dataType:"json",
						    success:function(data){
						     listDataFn(data);
						
						     dropDownListCustType();
						 }
				  });
			};
			
			//DropDownList Customer type
			var dropDownListCustType = function(data){
				$.ajax ({
					url:restfulURL+"/api/make_param_customer_type" ,
					type:"get" ,
					dataType:"json" ,
						success:function(data){
							var htmlTable="";
							$.each(data,function(index,indexEntry){
								
								htmlTable+="<option value="+indexEntry["_id"]+">"+indexEntry["param_customer_type"]+"</option>";		
							});	
							$("#listCustType").html(htmlTable);
						}
				});
			};
		
			
			getDataFn();
});