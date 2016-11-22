$(document).ready(
	function(){

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
				
		
		
		//function update Default KPI
		var updateDefaultFn = function(){
			//alert($("#embed_system_config_id").val());
			
			   $.ajax({
				    url:restfulURL+"/dqs_api/public/dqs_system_config/kpi_date", //+$("#embed_system_config_id").val(),
				    type:"POST",
				    dataType:"json",
				    headers:{Authorization:"Bearer "+tokenID.token},
				    data:{"default_kpi_date":$("#default_kpi_date").val(),
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
					     //alert("Upate Success");
					      callFlashSlide("Update Successfully.");
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
				else if($("#export_include_date_flag_n:checked").val()){
					exportInclude = 0;
				}
			
			    //alert(exportInclude);
			
			  $.ajax({
				    url:restfulURL+"/dqs_api/public/dqs_system_config/export_file", //+$("#embed_system_config_id").val(),
				    type:"POST",
				    dataType:"json",
				    headers:{Authorization:"Bearer "+tokenID.token},
				    data:{"export_file_path":$("#export_file_path").val(),
					     "export_citizen_max_record":$("#export_citizen_max_record").val(),
					     "export_mobile_max_record":$("#export_mobile_max_record").val(),
					     "export_include_date_flag":exportInclude,
					     "export_nof_date_delete":$("#export_nof_date_delete").val(),},
				   
					success:function(data,status){
						
					     if(status=="success"){
					      //alert("Upate Success");
					      callFlashSlide("Update Successfully.");
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
				
				alert($("#import_nof_date_delete").val());
				
				   $.ajax({
					    url:restfulURL+"/dqs_api/public/dqs_system_config/import_file",  //+$("#embed_system_config_id").val(),
					    type:"POST",
					    dataType:"json",
					    headers:{Authorization:"Bearer "+tokenID.token},
					    data:{"import_file_path":$("#import_file_path").val(),
						     "import_max_file_size":$("#import_max_file_size").val(),
						     "import_include_date_flag":importInclude,
						     "import_nof_date_delete":$("#import_nof_date_delete").val()},
						     
						success:function(data,status){
							
						     if(status=="success"){
						      //alert("Upate Success");
						      callFlashSlide("Update Successfully.");
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
						    url:restfulURL+"/dqs_api/public/dqs_system_config/warning_branch", //+$("#embed_system_config_id").val(),
						    type:"POST",
						    dataType:"json",
						    headers:{Authorization:"Bearer "+tokenID.token},
						    data:{"nof_contact_date":$("#nof_contact_date").val(),},
						   
							success:function(data,status){
								
							     if(status=="success"){
							      //alert("Upate Success");
							      callFlashSlide("Update Successfully.");
							      getDataFn();
							     }
							    }
						   });
					   return false;
				 };
				 
				 
				 // function update grade calculate date
				 var updateGradeCalDateFn = function(){

						
						//alert($("#all_cust_grade_calculate_date").val());
						
						   $.ajax({
							    url:restfulURL+"/dqs_api/public/dqs_system_config/grade_date",  //+$("#embed_system_config_id").val(),
							    type:"POST",
							    dataType:"json",
							    headers:{Authorization:"Bearer "+tokenID.token},
							    data:{"all_cust_grade_calculate_date":$("#all_cust_grade_calculate_date").val(),
									  "grade_data_source":$("#grade_data_source").val(),
									  "merge_cif_date":$("#merge_cif_date").val()},
							   
								success:function(data,status){
									
								     if(status=="success"){
								     // alert("Upate Success");
								      callFlashSlide("Update Successfully.");
								      getDataFn();
								     }
								    }
							   });
						   return false;
					 };
		
		 
		// get data System Configuration
		var getDataFn = function(){
			 
				   $.ajax({
					    url:restfulURL+"/dqs_api/public/dqs_system_config",
					    type:"GET",
					    dataType:"json",
					    headers:{Authorization:"Bearer "+tokenID.token},
						    success:function(data){
							
							//console.log(data['default_kpi_date']);
							//alert(data[0]["kpi_date_m1"]);
							$("#embed_system_config_id").remove();
							$("body").append("<input type='hidden' id='embed_system_config_id' name='embed_SuperFlag' value='"+data["config_id"]+"'>");
							
							
							//Default KPI
							$("#default_kpi_date").val(data["default_kpi_date"]);
							$("#kpi_date_m1").val(data["kpi_date_m1"]);
							$("#kpi_date_m2").val(data["kpi_date_m2"]);
							$("#kpi_date_m3").val(data["kpi_date_m3"]);
							$("#kpi_date_m4").val(data["kpi_date_m4"]);
							$("#kpi_date_m5").val(data["kpi_date_m5"]);
							$("#kpi_date_m6").val(data["kpi_date_m6"]);
							$("#kpi_date_m7").val(data["kpi_date_m7"]);
							$("#kpi_date_m8").val(data["kpi_date_m8"]);
							$("#kpi_date_m9").val(data["kpi_date_m9"]);
							$("#kpi_date_m10").val(data["kpi_date_m10"]);
							$("#kpi_date_m11").val(data["kpi_date_m11"]);
							$("#kpi_date_m12").val(data["kpi_date_m12"]);
							
							//export
							$("#export_file_path").val(data["export_file_path"]);
							$("#export_citizen_max_record").val(data["export_citizen_max_record"]);
							$("#export_mobile_max_record").val(data["export_mobile_max_record"]);
							$("#export_nof_date_delete").val(data["export_nof_date_delete"]);
							
							if(data['export_include_date_flag']==1){
								$('#export_include_date_flag_y').prop('checked', true);
								$('#export_include_date_flag_n').prop('checked', false);
							}
							else if(data['export_include_date_flag']==0){
								$('#export_include_date_flag_n').prop('checked', true);
								$('#export_include_date_flag_y').prop('checked', false);
							}
							
							//import
							$("#import_file_path").val(data["import_file_path"]);
							$("#import_max_file_size").val(data["import_max_file_size"]);
							
							if(data['import_include_date_flag']==1){
								$('#import_include_date_flag_y').prop('checked', true);
								$('#import_include_date_flag_n').prop('checked', false);
							}
							else if(data['import_include_date_flag']==0){
								$('#import_include_date_flag_n').prop('checked', true);
								$('#import_include_date_flag_y').prop('checked', false);
							}
							
							$("#import_nof_date_delete").val(data["import_nof_date_delete"]);
							
							//Warning Branch
							$("#nof_contact_date").val(data["nof_contact_date"]);
							
							//Grade Calculation Date
							var newFormatDate = data["all_cust_grade_calculate_date"].split(" ");
							newFormatDate=newFormatDate[0];
							$("#all_cust_grade_calculate_date").val(newFormatDate);
							
							//$("#grade_data_source").val(data["grade_data_source"]);
							$('select[name="grade_data_source"]').val(data["grade_data_source"]);
							
							var newFormatCifDate = data["merge_cif_date"].split(" ");
							newFormatCifDate=newFormatCifDate[0];
							$("#merge_cif_date").val(newFormatCifDate);
							
						}

				  });
			};
		
			//function set all table
			var setAllFn = function(default_kpi){
				
				$("#kpi_date_m1").val(default_kpi);
				$("#kpi_date_m2").val(default_kpi);
				$("#kpi_date_m3").val(default_kpi);
				$("#kpi_date_m4").val(default_kpi);
				$("#kpi_date_m5").val(default_kpi);
				$("#kpi_date_m6").val(default_kpi);
				$("#kpi_date_m7").val(default_kpi);
				$("#kpi_date_m8").val(default_kpi);
				$("#kpi_date_m9").val(default_kpi);
				$("#kpi_date_m10").val(default_kpi);
				$("#kpi_date_m11").val(default_kpi);
				$("#kpi_date_m12").val(default_kpi);
				
			};
			
			
		//Call Function start
			
			getDataFn();
			//Start Button
			
			//ปุ่ม SetAll
			$("#btnSetAll").click(function(){
				
				
				   setAllFn($("#default_kpi_date").val());
				
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