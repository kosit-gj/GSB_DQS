$(document).ready(
	function(){

		var restfulURL = "http://192.168.1.52:3001";
		
		
		
		//function update data
		 var updateFn = function(){
				
			 
			 //update super_flag
			 $.each($(".embed_Super_Flagg").get(),function(index,indexEntry){
					var id=$(indexEntry).val();
					
				 $.ajax({
					    url:restfulURL+"/api/dqs_user/"+id,
					    type:"PUT",
					    dataType:"json",
					    data:{"super_flag":$("#operation-"+id).val()},
					    success:function(data,status){
					     //alert(data);
						     if(status=="success"){
							$(".embed_Super_Flagg").remove();

						     }
						  }
					});
			 });
			 
			 //update role_id
			 $.each($(".embed_Role").get(),function(index,indexEntry){
					var id=$(indexEntry).val();
					
					//alert($("#listRole-"+id).val());
					
				 $.ajax({
					    url:restfulURL+"/api/dqs_user/"+id,
					    type:"PUT",
					    dataType:"json",
					    data:{"role_id":$("#listRole-"+id).val()},
					    success:function(data,status){
					     //alert(data);
						     if(status=="success"){
							
							//$(".embed_Role").remove();

						     }
						  }
					});
			 });
			 
			 
			 //update revised_cost_center
			 /*$.each($(".embed_Revised").get(),function(index,indexEntry){
					var id=$(indexEntry).val();
					
					//alert($("#listRole-"+id).val());
					
				 $.ajax({
					    url:restfulURL+"/api/dqs_user/"+id,
					    type:"PUT",
					    dataType:"json",
					    data:{"revised_cost_center":$("#Revised-"+id).val()},
					    success:function(data,status){
					     //alert(data);
						     if(status=="success"){
							
							//$(".embed_Revised").remove();

						     }
						  }
					});
			 });*/
			 
			      alert("Upate Success");
			      getDataFn();
			      clearFn();
				  
				return false;
			 };

			 
			 
			 /*var clearFn = function(){
					
					   $("#id").val("");
					   $("#action").val("add");
			}
			 */
			 
			 //function search data
			  var searchFn = function(searchText){
				   /* http://localhost:3000/api/products?name__regex=/^test/i */
				    
				   $.ajax({
				    url:restfulURL+"/api/dqs_user/?user_name__regex=/^"+searchText+"/i",
				    type:"get",
				    dataType:"json",
				    success:function(data){
				
				     listDataFn(data);
				    }
				   });
				   
				  }
			
			var advanceSearchFn = function(searchName,searchOwnCost,searchRevisedCost){
				   /* http://localhost:3000/api/products?name__regex=/^test/i */
				    
				   $.ajax({
				    url:restfulURL+"/api/dqs_user/?user_name__regex=/^Nann/i&role_id__regex=/^5822cd8839b88f125485ea73/i&super_flag__regex=/^Line/i",
				    type:"get",
				    dataType:"json",
				    success:function(data){
				
				     listDataFn(data);
				    }
				   });
				   
				  }
			
			//function list data User
			  var listDataFn = function(data){
				
				
				if ( $.fn.DataTable.isDataTable('#tableUser')) {
				      $('#tableUser').DataTable().destroy();
				     }
				
						//  console.log(data);
						   var htmlTable="";
						 $("#listUser").empty();
						   $.each(data,function(index,indexEntry){
							
						    //console.log(indexEntry);
							     htmlTable+="<tr >";
								     /* htmlTable+="<td>"+(index+1)+"</td>";*/
								      htmlTable+="<td>"+indexEntry["user_name"]+"</td>";
								      htmlTable+="<td>"+indexEntry["position"]+"</td>";
								   	  htmlTable+="<td>"+indexEntry["own_cost_center"]+"</td>";
								
								
									  htmlTable+="<td>"+indexEntry["revised_cost_center"]+"</td>";
									
									  /*htmlTable+="<td>";
										if(indexEntry["revised_cost_center"] == "Revised Cost Center 1"){
											 htmlTable+="<select disabled class=\"form-control input-inline-table input-contact-selecttype editRevised\" id=Revised-"+indexEntry["_id"]+"><option selected >Revised Cost Center 1</option> <option>Revised Cost Center 2</option></select>";
										}else{
											 htmlTable+="<select disabled class=\"form-control input-inline-table input-contact-selecttype editRevised\" id=Revised-"+indexEntry["_id"]+"><option>Revised Cost Center 1</option> <option selected >Revised Cost Center 2</option></select>";
										}
									  htmlTable+="</td>";*/
									
									
									  //htmlTable+="<td>"+indexEntry["role_id"]+" </td>";
									  
									  htmlTable+="<td>";
										  htmlTable+="<select disabled class=\"form-control input-inline-table input-contact-selecttype editListRole \" id=\"listRole-"+indexEntry["_id"]+"\">"+listDataRole(indexEntry["role_id"])+"</select>";
									  htmlTable+="</td>";
									  
									  
									  htmlTable+="<td>";
										if(indexEntry["super_flag"] == "All Branch"){
											 htmlTable+="<select disabled class=\"form-control input-inline-table input-contact-selecttype editSuperFlag\" id=operation-"+indexEntry["_id"]+"><option selected >All Branch</option> <option>Line</option></select>";
										}else{
											 htmlTable+="<select disabled class=\"form-control input-inline-table input-contact-selecttype editSuperFlag\" id=operation-"+indexEntry["_id"]+"><option>All Branch</option> <option selected >Line</option></select>";
										}
							          htmlTable+="</td>"; 
									  
									  /*htmlTable+="<td>";
										  if(indexEntry["super_flag"]){
											  htmlTable+="<select class=\"form-control input-inline-table input-contact-selecttype  editSuperFlag\" id=\"listBranchOper-"+indexEntry["_id"]+"\">"+listBranchOper(indexEntry["_id"])+"</select>";
										  }else{
											  htmlTable+="<select class=\"form-control input-inline-table input-contact-selecttype  editSuperFlag\" id=\"listBranchOper-"+indexEntry["_id"]+"\">"+listBranchOper(indexEntry["_id"])+"</select>";
										  }
									  htmlTable+="</td>";*/
									  
							     htmlTable+="</tr>";
								
						   });
						
						  $("#listUser").html(htmlTable);
						
						//DataTable
						  $('#tableUser').DataTable( { "dom": '<"top"flp>rt<"bottom"lp><"clear">' } ); 
						
						
						//start ปุ่ม Edit ใน table
						
						//Edit SuperFlag
						$("#tableUser").on("click",".editSuperFlag",function(){
							
							var id = this.id.split("-"); 
							
							embedParam(id[1]);
							
						});
						
						//Edit Rule
						$("#tableUser").on("click",".editListRole",function(){
							
							var id = this.id.split("-"); 
							
							embedParamRole(id[1]);
							
						});
						
						
						//Edit Revised
						/*$(".editRevised").click(function(){
							
							var id = this.id.split("-"); 
							
							embedParamRevised(id[1]);
							
						});*/
						
						//end ปุ่ม Edit ใน table
				
			};
			
			//ฝัง id เพื่อเรียกใช้งาน  editSuperFlag
			var embedParam = function(id){
				//alert(id);
				var count = 0;
				
				$.each($(".embed_Super_Flagg").get(),function(index,indexEnry){
				//ถ้า id ที่วน == id ที่มี	
					if($(indexEnry).val()==id){
						count+=1;
					}
				});
				
				if(count>0){
					$("#embed_SuperFlag-"+id).remove();
					$("body").append("<input type='hidden' class='embed_Super_Flagg' id='embed_SuperFlag-"+id+"' name='embed_SuperFlag' value='"+id+"'>");
				}else{
					$("body").append("<input type='hidden' class='embed_Super_Flagg' id='embed_SuperFlag-"+id+"' name='embed_SuperFlag' value='"+id+"'>");
				}
				
			}
			
			//ฝัง id เพื่อเรียกใช้งาน  editListRole
			var embedParamRole = function(id){
				//alert(id);
				var count = 0;
				
				$.each($(".embed_Role").get(),function(index,indexEnry){
				//ถ้า id ที่วน == id ที่มี	
					if($(indexEnry).val()==id){
						count+=1;
					}
				});
				
				if(count>0){
					$("#embed_listRole-"+id).remove();
					$("body").append("<input type='hidden' class='embed_Role' id='embed_listRole-"+id+"' name='embed_listRole' value='"+id+"'>");
				}else{
					$("body").append("<input type='hidden' class='embed_Role' id='embed_listRole-"+id+"' name='embed_listRole' value='"+id+"'>");
				}
				
			}
			
			/*var embedParamRevised = function(id){
				//alert(id);
				var count = 0;
				
				$.each($(".embed_Revised").get(),function(index,indexEnry){
				//ถ้า id ที่วน == id ที่มี	
					if($(indexEnry).val()==id){
						count+=1;
					}
				});
				
				if(count>0){
					$("#embed_listRevised-"+id).remove();
					$("body").append("<input type='hidden' class='embed_Revised' id='embed_listRevised-"+id+"' name='embed_listRevised' value='"+id+"'>");
				}else{
					$("body").append("<input type='hidden' class='embed_Revised' id='embed_listRevised-"+id+"' name='embed_listRevised' value='"+id+"'>");
				}
				
			}*/
			
			//Get data User
			var getDataFn = function() {
						$.ajax({
							url : restfulURL + "/api/dqs_user",
							type : "get",
							dataType : "json",
							success : function(data) {

								listDataFn(data);
								dropDownListRole();
							}
						});
					};
		
			//DropDownList Role
			var dropDownListRole = function(data){
				$.ajax ({
					url:restfulURL+"/api/dqs_role" ,
					type:"get" ,
					dataType:"json" ,
						success:function(data){
							var htmlTable="";
							$.each(data,function(index,indexEntry){
								
								htmlTable+="<option value="+indexEntry["_id"]+">"+indexEntry["role_name"]+"</option>";		
							});	
							$("#listRole").html(htmlTable);
						}
				});
			};
			
			
			//List Role in table
			var listDataRole = function(id){
				
				var htmlTable="";
				$.ajax ({
					url:restfulURL+"/api/dqs_role" ,
					type:"get" ,
					dataType:"json" ,
					async:false,
						success:function(data){
							
							$.each(data,function(index,indexEntry){
								//alert(id+"=="+indexEntry["_id"]);
								
								if(id==indexEntry["_id"]){
									htmlTable+="<option selected value="+indexEntry["_id"]+">"+indexEntry["role_name"]+"</option>";			
								}else{
									htmlTable+="<option  value="+indexEntry["_id"]+">"+indexEntry["role_name"]+"</option>";	
									}
								
								});	
							
						}
				});
				return htmlTable;
			};
			
		/*	//DropDownList	Branch Operation
			var listBranchOper = function(){
				var htmlTable="";
				$.ajax ({
					url:restfulURL+"/api/dqs_branch_operation" ,
					type:"get" ,
					dataType:"json" ,
					async:false,
						success:function(data){
							
							$.each(data,function(index,indexEntry){
								
								htmlTable+="<option value="+indexEntry["operation_code"]+">"+indexEntry["operation_name"]+"</option>";			
							});	
							
							
							//$("#listBranchOper-"+id).html(htmlTable);
						}
				});
				return htmlTable;
			};*/
		
			
			
			//Call Function start
		  getDataFn();

		  	//ปุ่ม Save Region
			$("#btnSave").click(function(){
		        updateFn();
		       // alert("btnSave");
			});
			
			//ปุ่ม Search Region
			  $("#btnSearch").click(function(){
				   searchFn($("#searchText").val());
				   return false;
			  });
			
			//ปุ่ม Advance Search

			  $("#btnAdvanceSearch").click(function(){
				   advanceSearchFn($("#searchName").val(),$("#listRole").val(),$("#searchSuperFlag").val());
				   return false;
			  });
			
			// ปุ่ม Cancel Region
			  $("#btnCancel").click(function(){
				  getDataFn();
				});
			
			  //ปุ่ม click Edit to table
			  $("#btnEdit").click(function(){
				$(".editSuperFlag").removeAttr("disabled");
				$(".editListRole").removeAttr("disabled");
				//$(".editRevised").removeAttr("disabled");
			  });
	  
	  //Call Function End
});


