$(document).ready(
	function(){
		
		
		var restfulURL = "http://192.168.1.100:3001";
		
		
		
				var validationFn = function(){
					   var validateText="";
						   if($("#export_file_path").val()==""){
						    	validateText+="name not empty\n";
						   }
							if($("#export_citizen_max_record").val()==""){
						   		 validateText+="operation not empty\n";
						   }
							if($("#export_mobile_max_record").val()==""){
								   		 validateText+="operation not empty\n";
								   }
							/*if($("#export_include_date_flag").val()==""){
								   		 validateText+="operation not empty\n";
								   }*/
							if($("#export_nof_date_delete").val()==""){
								   		 validateText+="operation not empty\n";
								   }
						   if(validateText!=""){
							    alert(validateText);
							    return false;
						   }else{
						   		return true;
						   }
					  }
			
			 var insertFn = function(){
					
					    $.ajax({
						     url:restfulURL+"/api/dqs_system_config",
						     type:"POST",
						     dataType:"json",
						     data:{"export_file_path":$("#export_file_path").val(),
								   "export_citizen_max_record":$("#export_citizen_max_record").val(),
								   "export_mobile_max_record":$("#export_mobile_max_record").val(),
								   "export_include_date_flag":$("#export_include_date_flag").val(),
								   "export_nof_date_delete":$("#export_nof_date_delete").val(),},
						     
							success:function(data,status){
						      //alert(data);
						      //console.log(data);
						      console.log(status);
							      if(status=="success"){
							       alert("Insert Success");
							       getDataFn();
							       clearFn();
							      }
							   }
					    });         
					
					    return false;
			 		};
					
		
			 var updateFn = function(){
						
					   $.ajax({
						    url:restfulURL+"/api/dqs_region/"+$("#id").val(),
						    type:"PUT",
						    dataType:"json",
						    data:{"export_file_path":$("#export_file_path").val(),
							     "export_citizen_max_record":$("#export_citizen_max_record").val(),
							     "export_mobile_max_record":$("#export_mobile_max_record").val(),
							     "export_include_date_flag":$("#export_include_date_flag").val(),
							     "export_nof_date_delete":$("#export_nof_date_delete").val(),},
						    success:function(data,status){
						     //alert(data);
							     if(status=="success"){
							      alert("Upate Success");
							      getDataFn();
							     }
							    }
						   });
					   return false;
				 };
		
				 var findOneFn = function(id){
						   //http://localhost:3000/find-user/58035b7cb4566c158bcecacf
						   $.ajax({
							    url:restfulURL+"/api/dqs_region/"+id,
							    type:"get",
							    dataType:"json",
							    success:function(data){
							      $("#region_name").val(data['region_name']);
								  $("#operation_id").val(data['operation_id']);
						    	}
						   });
					  }; 
				
		  var listDataFn = function(data){
			
			   console.log(data);
			   var htmlTable="";
			   $.each(data,function(index,indexEntry){
			    //console.log(indexEntry);
				     htmlTable+="<tr >";
					      htmlTable+="<td>"+indexEntry["kpi_date_m1"]+"</td>";
					      htmlTable+="<td><input class=\"form-control input-inline-table input-seq\" type=\"text\" name=\"\" id=\"\" value="+indexEntry["default_kpi_date"]+"></td>";
					   	  htmlTable+="<td>"+indexEntry["kpi_date_m2"]+"</td>";
						  htmlTable+="<td><input class=\"form-control input-inline-table input-seq\" type=\"text\" name=\"\" id=\"\" value="+indexEntry["default_kpi_date"]+"></td>";
						  htmlTable+="<td>"+indexEntry["kpi_date_m3"]+" </td>";
						  htmlTable+="<td><input class=\"form-control input-inline-table input-seq\" type=\"text\" name=\"\" id=\"\" value="+indexEntry["default_kpi_date"]+"></td>";
					htmlTable+="</tr>";
				    htmlTable+="<tr >";
					      htmlTable+="<td>"+indexEntry["kpi_date_m4"]+"</td>";
					      htmlTable+="<td><input class=\"form-control input-inline-table input-seq\" type=\"text\" name=\"\" id=\"\" value="+indexEntry["default_kpi_date"]+"></td>";
					   	  htmlTable+="<td>"+indexEntry["kpi_date_m5"]+"</td>";
						  htmlTable+="<td><input class=\"form-control input-inline-table input-seq\" type=\"text\" name=\"\" id=\"\" value="+indexEntry["default_kpi_date"]+"></td>";
						  htmlTable+="<td>"+indexEntry["kpi_date_m6"]+" </td>";
						  htmlTable+="<td><input class=\"form-control input-inline-table input-seq\" type=\"text\" name=\"\" id=\"\" value="+indexEntry["default_kpi_date"]+"></td>";
					htmlTable+="</tr>";
				  	htmlTable+="<tr >";
					      htmlTable+="<td>"+indexEntry["kpi_date_m7"]+"</td>";
					      htmlTable+="<td><input class=\"form-control input-inline-table input-seq\" type=\"text\" name=\"\" id=\"\" value="+indexEntry["default_kpi_date"]+"></td>";
					   	  htmlTable+="<td>"+indexEntry["kpi_date_m8"]+"</td>";
						  htmlTable+="<td><input class=\"form-control input-inline-table input-seq\" type=\"text\" name=\"\" id=\"\" value="+indexEntry["default_kpi_date"]+"></td>";
						  htmlTable+="<td>"+indexEntry["kpi_date_m9"]+" </td>";
						  htmlTable+="<td><input class=\"form-control input-inline-table input-seq\" type=\"text\" name=\"\" id=\"\" value="+indexEntry["default_kpi_date"]+"></td>";
					htmlTable+="</tr>";
				  	htmlTable+="<tr >";
					      htmlTable+="<td>"+indexEntry["kpi_date_m10"]+"</td>";
					      htmlTable+="<td><input class=\"form-control input-inline-table input-seq\" type=\"text\" name=\"\" id=\"\" value="+indexEntry["default_kpi_date"]+"></td>";
					   	  htmlTable+="<td>"+indexEntry["kpi_date_m11"]+"</td>";
						  htmlTable+="<td><input class=\"form-control input-inline-table input-seq\" type=\"text\" name=\"\" id=\"\" value="+indexEntry["default_kpi_date"]+"></td>";
						  htmlTable+="<td>"+indexEntry["kpi_date_m12"]+" </td>";
						  htmlTable+="<td><input class=\"form-control input-inline-table input-seq\" type=\"text\" name=\"\" id=\"\" value="+indexEntry["default_kpi_date"]+"></td>";
					htmlTable+="</tr>";
					
			   });
			
			  $("#listSystem").html(htmlTable);
			   
		}

		
		 var getDataFn = function(){
				   $.ajax({
					    url:restfulURL+"/api/dqs_system_config",
					    type:"get",
					    dataType:"json",
						    success:function(data){
						     
						     listDataFn(data);
						 }
				  });
			};
		
			
			
			getDataFn();
			
			$("#btnSubmit").click(function(){
				   if(validationFn()==true){
					    if($("#action").val()=="add" || $("#action").val()=="" ){

					      	insertFn();
					  }
				   }
				   		return false;
				  });
});