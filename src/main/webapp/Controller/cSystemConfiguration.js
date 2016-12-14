$(document).ready(
	function(){

		var validationFn = function(){
			
			   var validateText="";
					 if($("#kpi_date_m1").val()==""){
						    	validateText+="Kpi in January is not empty"+" , ";
					 }
					if($("#kpi_date_m2").val()==""){
						    	validateText+="Kpi in February is not empty"+" , ";
					 }
					if($("#kpi_date_m3").val()==""){
						    	validateText+="Kpi in March is not empty"+" , ";
					 }
					if($("#kpi_date_m4").val()==""){
						    	validateText+="Kpi in April is not empty"+" , ";
					 }
					if($("#kpi_date_m5").val()==""){
						    	validateText+="Kpi in May is not empty"+" , ";
					 }
					if($("#kpi_date_m6").val()==""){
						    	validateText+="Kpi in June is not empty"+" , ";
					 }
					if($("#kpi_date_m7").val()==""){
						    	validateText+="Kpi in July is not empty"+" , ";
					 }
					if($("#kpi_date_m8").val()==""){
						    	validateText+="Kpi in August is not empty"+" , ";
					 }
					if($("#kpi_date_m9").val()==""){
						    	validateText+="Kpi in September is not empty"+" , ";
					 }
					if($("#kpi_date_m10").val()==""){
						    	validateText+="Kpi in October is not empty"+" , ";
					 }
					if($("#kpi_date_m11").val()==""){
						    	validateText+="Kpi in November is not empty"+" , ";
					 }
					if($("#kpi_date_m12").val()==""){
						    	validateText+="Kpi in December is not empty"+" , ";
					 }
				   if(validateText!=""){
					    callFlashSlide(validateText);
					    return false;
				   }else{
				   		return true;
				   }
				
			  };
			
		
		
		//function insert Default KPI
		var insertDefaultFn = function(){
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
					      callFlashSlide("insert Successfully.");
					      getDataFn();
					     }
					    }
				   });
			   return false;
		 };
		
		 
		//function insert Exporting File
		var insertExportFn = function(){
			
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
					      callFlashSlide("insert Successfully.");
					      getDataFn();
					     }
					    }
				   });
			   return false;
		 };
		 
		 
		 //function insert Importing File
		 var insertImportFn = function(){
				
				var importInclude = ""
					
					if($("#import_include_date_flag_y:checked").val()){
						importInclude = 1;
					}
					else if($("#import_include_date_flag_n:checked").val()){
						importInclude = 0;
					}
				
				//alert($("#import_nof_date_delete").val());
				
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
						      callFlashSlide("insert Successfully.");
						      getDataFn();
						     }
						    }
					   });
				   return false;
			 };
		 
			 
			 //function insert Warning Branch
			 var insertWarBranchFn = function(){

					
					//alert($("#embed_system_config_id").val());
					
					   $.ajax({
						    url:restfulURL+"/dqs_api/public/dqs_system_config/warning_branch", //+$("#embed_system_config_id").val(),
						    type:"POST",
						    dataType:"json",
						    headers:{Authorization:"Bearer "+tokenID.token},
						    data:{"nof_contact_date":$("#nof_contact_date").val(),},
						   
							success:function(data,status){
								
							     if(status=="success"){
							      callFlashSlide("insert Successfully.");
							      getDataFn();
							     }
							    }
						   });
					   return false;
				 };
				 
				 
				 // function insert grade calculate date
				 var insertGradeCalDateFn = function(){
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
								      callFlashSlide("insert Successfully.");
								      getDataFn();
								     }
								    }
							   });
						   return false;
					 };
					 //function insert  default role start
					 var insertDefaultRole = function(){
						 
						 //alert($("#position_branch_role_default").val());
						 //alert($("#cc_poweruser_role_default").val());
						 //alert($("#position_poweruser_role_default").val());
						 
						  $.ajax({
								    url:restfulURL+"/dqs_api/public/dqs_system_config/default_role",
								    type:"POST",
								    dataType:"json",
								    headers:{Authorization:"Bearer "+tokenID.token},
								    data:{"position_branch_role":$("#position_branch_role_default").val(),
									"cc_poweruser_role":$("#cc_poweruser_role_default").val(),
									"position_poweruser_role":$("#position_poweruser_role_default").val(),
									
								},
								   
									success:function(data,status){
										
									     if(status=="success"){
									      callFlashSlide("insert Successfully.");
									      getDataFn();
									     }
									    }
								   });
							   return false;
						 
						 
					 }
					 //function insert default role end
		
		 
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
							
							
							//Default Role Start
							$("#position_branch_role_default").val(data['position_branch_role']);
							$("#cc_poweruser_role_default").val(data['cc_poweruser_role']);
							$("#position_poweruser_role_default").val(data['position_poweruser_role']);
							//Default Role End
							
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
				 if(validationFn()==true){
				   insertDefaultFn();
				}
				return false;
			});
			
			//ปุ่ม SaveExport
			$("#btnSaveExport").click(function(){
				   insertExportFn();
			});
			//ปุ่ม SaveImport
			$("#btnSaveImport").click(function(){
				   insertImportFn();
			});
			
			//ปุ่ม SaveWarBranch
			$("#btnSaveWarBranch").click(function(){
				   insertWarBranchFn();
			});
			
			//ปุ่ม SaveGradeCalDate
			$("#btnSaveGradeCalDate").click(function(){
				 insertGradeCalDateFn();
			});
			//End Button
			
			//Defalult Role Start
			$("#btnSaveDefaultRole").click(function(){
				//alert("hello jquery ");
				insertDefaultRole();
				
			});
			//Default Role End
			
			//Call Function End
			
			//กำหนดค่า kpi ต้องเปนตัวเลข
			$(".kpi_date_m").keydown(function (e) {
				        // Allow: backspace, delete, tab, escape, enter and .
					
				        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
				             // Allow: Ctrl+A, Command+A
				            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
				             // Allow: home, end, left, right, down, up
				            (e.keyCode >= 35 && e.keyCode <= 40)) {
				                 // let it happen, don't do anything
				                 return;
				        }
				        // Ensure that it is a number and stop the keypress
				        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
				            e.preventDefault();
				        }
				});
			//กำหนดค่า kpi ไม่เกิด 28
			$(".kpi_date_m").keyup(function(){
				if($(this).val()<=28){
					//return true;
					//console.log("Y");
				}else{
					//return false;
					$(this).val("");
					//console.log("N");
					callFlashSlide("ค่า  KPI ไม่เกิน 28");
					
					
				}
			});
});