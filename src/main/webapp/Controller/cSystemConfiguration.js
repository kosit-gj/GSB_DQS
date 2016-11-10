$(document).ready(
	function(){
		
		
		var restfulURL = "http://192.168.1.60:3001";
		
		
		
		/*var validationFn = function(){
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
					if($("#export_include_date_flag").val()==""){
						   		 validateText+="operation not empty\n";
						   }
					if($("#export_nof_date_delete").val()==""){
						   		 validateText+="operation not empty\n";
						   }
				   if(validateText!=""){
					    alert(validateText);
					    return false;
				   }else{
				   		return true;
				   }
			  }*/
				
		
		// function update SetAll
		var updateSetAllFn = function(){

			
			//alert($("#embed_system_config_id").val());
			
			   $.ajax({
				    url:restfulURL+"/api/dqs_system_config/"+$("#embed_system_config_id").val(),
				    type:"PUT",
				    dataType:"json",
				    data:{
							"default_kpi_date":$("#default_kpi_date").val()
						  },
				   
						success:function(data,status){
							
						    if(status=="success"){
							
						     alert("Set All");
						     setAllFn();
					    	}
					    }
				   });
			   return false;
		 };
		 
		//function update Default KPI
		var updateDefaultFn = function(){
			//alert($("#embed_system_config_id").val());
			
			   $.ajax({
				    url:restfulURL+"/api/dqs_system_config/"+$("#embed_system_config_id").val(),
				    type:"PUT",
				    dataType:"json",
				    data:{
						  "kpi_date_m1":$("#kpi_date_m1").val(),
						  "kpi_date_m2":$("#kpi_date_m2").val(),
						  "kpi_date_m3":$("#kpi_date_m3").val(),
						  "kpi_date_m4":$("#kpi_date_m4").val(),
						  "kpi_date_m5":$("#kpi_date_m5").val(),
						  "kpi_date_m6":$("#kpi_date_m6").val(),
						  "kpi_date_m7":$("#kpi_date_m7").val(),
						  "kpi_date_m8":$("#kpi_date_m8").val(),
						  "kpi_date_m9":$("#kpi_date_m9").val(),
						  "kpi_date_m10":$("#kpi_date_m10").val(),
						  "kpi_date_m11":$("#kpi_date_m11").val(),
						  "kpi_date_m12":$("#kpi_date_m12").val()},
				   
					success:function(data,status){
						
					     if(status=="success"){
					      alert("Upate Success");
					      getDataFn();
					     }
					    }
				   });
			   return false;
		 };
		
		 
		//function update Exporting File
		var updateExportFn = function(){
			
			var exportInclude = ""
				
				if($("#export_include_date_flag_y:checked").val()){
					exportInclude = 1;
				}
				else if($("#export_include_date_flag_y:checked").val()){
					exportInclude = 0;
				}
			
			    //alert($("#embed_system_config_id").val());
			
			   $.ajax({
				    url:restfulURL+"/api/dqs_system_config/"+$("#embed_system_config_id").val(),
				    type:"PUT",
				    dataType:"json",
				    data:{"export_file_path":$("#export_file_path").val(),
					     "export_citizen_max_record":$("#export_citizen_max_record").val(),
					     "export_mobile_max_record":$("#export_mobile_max_record").val(),
					     "export_include_date_flag":exportInclude,
					     "export_nof_date_delete":$("#export_nof_date_delete").val(),},
				   
					success:function(data,status){
						
					     if(status=="success"){
					      alert("Upate Success");
					      getDataFn();
					     }
					    }
				   });
			   return false;
		 };
		 
		 
		 //function update Importing File
		 var updateImportFn = function(){
				
				var importInclude = ""
					
					if($("#import_include_date_flag_y:checked").val()){
						importInclude = 1;
					}
					else if($("#import_include_date_flag_n:checked").val()){
						importInclude = 0;
					}
				
				//alert($("#embed_system_config_id").val());
				
				   $.ajax({
					    url:restfulURL+"/api/dqs_system_config/"+$("#embed_system_config_id").val(),
					    type:"PUT",
					    dataType:"json",
					    data:{"import_file_path":$("#import_file_path").val(),
						     "import_max_file_size":$("#import_max_file_size").val(),
						     "import_nof_date_delete":$("#import_nof_date_delete").val(),
						     "import_include_date_flag":importInclude,},
					   
						success:function(data,status){
							
						     if(status=="success"){
						      alert("Upate Success");
						      getDataFn();
						     }
						    }
					   });
				   return false;
			 };
		 
			 
			 //function update Warning Branch
			 var updateWarBranchFn = function(){

					
					//alert($("#embed_system_config_id").val());
					
					   $.ajax({
						    url:restfulURL+"/api/dqs_system_config/"+$("#embed_system_config_id").val(),
						    type:"PUT",
						    dataType:"json",
						    data:{"nof_contact_date":$("#nof_contact_date").val(),},
						   
							success:function(data,status){
								
							     if(status=="success"){
							      alert("Upate Success");
							      getDataFn();
							     }
							    }
						   });
					   return false;
				 };
				 
				 
				 // function update grade calculate date
				 var updateGradeCalDateFn = function(){

						
						//alert($("#embed_system_config_id").val());
						
						   $.ajax({
							    url:restfulURL+"/api/dqs_system_config/"+$("#embed_system_config_id").val(),
							    type:"PUT",
							    dataType:"json",
							    data:{"all_cust_grade_calculate_date":$("#all_cust_grade_calculate_date").val(),
									  "grade_data_source":$("#grade_data_source").val(),},
							   
								success:function(data,status){
									
								     if(status=="success"){
								      alert("Upate Success");
								      getDataFn();
								     }
								    }
							   });
						   return false;
					 };
		
		 
		// get data System Configuration
		var getDataFn = function(){
			 
				   $.ajax({
					    url:restfulURL+"/api/dqs_system_config",
					    type:"get",
					    dataType:"json",
						    success:function(data){
							
							//console.log(data['import_include_date_flag']);
							//alert(data[0]["kpi_date_m1"]);
							$("#embed_system_config_id").remove();
							$("body").append("<input type='hidden' id='embed_system_config_id' name='embed_SuperFlag' value='"+data[0]["_id"]+"'>");
							
							
							//Default KPI
							$("#default_kpi_date").val(data[0]["default_kpi_date"]);
							$("#kpi_date_m1").val(data[0]["kpi_date_m1"]);
							$("#kpi_date_m2").val(data[0]["kpi_date_m2"]);
							$("#kpi_date_m3").val(data[0]["kpi_date_m3"]);
							$("#kpi_date_m4").val(data[0]["kpi_date_m4"]);
							$("#kpi_date_m5").val(data[0]["kpi_date_m5"]);
							$("#kpi_date_m6").val(data[0]["kpi_date_m6"]);
							$("#kpi_date_m7").val(data[0]["kpi_date_m7"]);
							$("#kpi_date_m8").val(data[0]["kpi_date_m8"]);
							$("#kpi_date_m9").val(data[0]["kpi_date_m9"]);
							$("#kpi_date_m10").val(data[0]["kpi_date_m10"]);
							$("#kpi_date_m11").val(data[0]["kpi_date_m11"]);
							$("#kpi_date_m12").val(data[0]["kpi_date_m12"]);
							
							//export
							$("#export_file_path").val(data[0]["export_file_path"]);
							$("#export_citizen_max_record").val(data[0]["export_citizen_max_record"]);
							$("#export_mobile_max_record").val(data[0]["export_mobile_max_record"]);
							$("#export_nof_date_delete").val(data[0]["export_nof_date_delete"]);
							
							if(data[0]['export_include_date_flag']==1){
								$('#export_include_date_flag_y').prop('checked', true);
								$('#export_include_date_flag_n').prop('checked', false);
							}
							else if(data[0]['export_include_date_flag']==0){
								$('#export_include_date_flag_n').prop('checked', true);
								$('#export_include_date_flag_y').prop('checked', false);
							}
							
							//import
							$("#import_file_path").val(data[0]["import_file_path"]);
							$("#import_max_file_size").val(data[0]["import_max_file_size"]);
							
							if(data[0]['import_include_date_flag']==1){
								$('#import_include_date_flag_y').prop('checked', true);
								$('#import_include_date_flag_n').prop('checked', false);
							}
							else if(data[0]['import_include_date_flag']==0){
								$('#import_include_date_flag_n').prop('checked', true);
								$('#import_include_date_flag_y').prop('checked', false);
							}
							
							$("#import_nof_date_delete").val(data[0]["import_nof_date_delete"]);
							
							//Warning Branch
							$("#nof_contact_date").val(data[0]["nof_contact_date"]);
							
							//Grade Calculation Date
							$("#all_cust_grade_calculate_date").val(data[0]["all_cust_grade_calculate_date"]);
							
							
							$("#grade_data_source").val(data[0]["grade_data_source"]);
							
						}

				  });
			};
		
			//function set all table
			var setAllFn = function(){
				
				$.ajax({
					    url:restfulURL+"/api/dqs_system_config",
					    type:"get",
					    dataType:"json",
						    success:function(data){
							
							$("#kpi_date_m1").val(data[0]["default_kpi_date"]);
							$("#kpi_date_m2").val(data[0]["default_kpi_date"]);
							$("#kpi_date_m3").val(data[0]["default_kpi_date"]);
							$("#kpi_date_m4").val(data[0]["default_kpi_date"]);
							$("#kpi_date_m5").val(data[0]["default_kpi_date"]);
							$("#kpi_date_m6").val(data[0]["default_kpi_date"]);
							$("#kpi_date_m7").val(data[0]["default_kpi_date"]);
							$("#kpi_date_m8").val(data[0]["default_kpi_date"]);
							$("#kpi_date_m9").val(data[0]["default_kpi_date"]);
							$("#kpi_date_m10").val(data[0]["default_kpi_date"]);
							$("#kpi_date_m11").val(data[0]["default_kpi_date"]);
							$("#kpi_date_m12").val(data[0]["default_kpi_date"]);
						}
				});
				
			};
			
			
		//Call Function start
			
			getDataFn();
			//Start Button
			
			//ปุ่ม SetAll
			$("#btnSetAll").click(function(){
				
				
				   updateSetAllFn();
				
				  });
			
			//ปุ่ม SaveDefault
			$("#btnSaveDefault").click(function(){
				
				
				   updateDefaultFn();
				
				  });
			
			//ปุ่ม SaveExport
			$("#btnSaveExport").click(function(){
				
				
				   updateExportFn();
				
				  });
			//ปุ่ม SaveImport
			$("#btnSaveImport").click(function(){
				
				
				   updateImportFn();
				
				  });
			
			
			//ปุ่ม SaveWarBranch
			$("#btnSaveWarBranch").click(function(){
				
				
				   updateWarBranchFn();
				
				  });
			
			//ปุ่ม SaveGradeCalDate
			$("#btnSaveGradeCalDate").click(function(){
				
				
				 updateGradeCalDateFn();
				
				  });
			//End Button
			
			//Call Function End
});