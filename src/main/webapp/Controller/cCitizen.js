//binding tooltip.
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});



$(document).ready(function(){
	//set paginate start
	var paginationFn = function(page,rpp,countPage){
		//alert("hello");
		$('.pagination_top,.pagination_bottom').bootpag({
		    total: 3,
		    page: page,
		    maxVisible: rpp,
		    leaps: true,
		    //firstLastUse: true,
		    //first: '←',
		    //last: '→',
		    wrapClass: 'pagination',
		    activeClass: 'active',
		    disabledClass: 'disabled',
		    //nextClass: 'next',
		    //prevClass: 'prev',
		    next: 'next',
		    prev: 'prev',
		    //lastClass: 'last',
		    //firstClass: 'first'
		}).on("page", function(event, num){
		    getDataFn(num);
		    $(".pagingNumber").remove();
		    var htmlPageNumber= "<input type='hidden' id='pageNumber' name='pageNumber' class='pagingNumber' value='"+num+"'>";
		    $("body").append(htmlPageNumber);
		   // alert("click"+num);
		}); 
		
		$(".countPagination").change(function(){
			//alert($(this).val());
			$("#countPaginationTop").val($(this).val());
			$("#countPaginationBottom").val($(this).val());
			
			getDataFn($("pageNumber").val(),$(this).val());
			
			$(".countPage").remove();
		    var htmlCountPage= "<input type='hidden' id='countPage' name='countPage' class='countPage' value='"+$(this).val()+"'>";
		    $("body").append(htmlCountPage);
		    
		});
	}
	paginationFn();
	//set paginate end
	var validateionFn = function(data){
		var validate="";
		if(data['data']['ref_no']!=undefined){
			validate+="<font color='red'>*</font> "+data['data']['ref_no']+"<br>";
		}
		if(data['data']['pid']!=undefined){
			validate+="<font color='red'>*</font> "+data['data']['pid']+"<br>";
		}
		if(data['data']['fname']!=undefined){
			validate+="<font color='red'>*</font> "+data['data']['fname']+"<br>";
		}if(data['data']['lname']!=undefined){
			validate+="<font color='red'>*</font> "+data['data']['lname']+"<br>";
		}if(data['data']['dob']!=undefined){
			validate+="<font color='red'>*</font> "+data['data']['dob']+"<br>";
		}
		if(data['data']['ntitle']!=undefined){
			validate+="<font color='red'>*</font> "+data['data']['ntitle']+"<br>";
		}
		if(data['data']['hno']!=undefined){
			validate+="<font color='red'>*</font> "+data['data']['hno']+"<br>";
		}
		
		if(data['data']['thumbol']!=undefined){
			validate+="<font color='red'>*</font> "+data['data']['thumbol']+"<br>";
		}
		if(data['data']['amphur']!=undefined){
			validate+="<font color='red'>*</font> "+data['data']['amphur']+"<br>";
		}
		if(data['data']['province']!=undefined){
			validate+="<font color='red'>*</font> "+data['data']['province']+"<br>";
		}
		if(data['data']['flag']!=undefined){
			validate+="<font color='red'>*</font> "+data['data']['flag']+"<br>";
		}
		if(data['data']['flag_1']!=undefined){
			validate+="<font color='red'>*</font> "+data['data']['flag_1']+"<br>";
		}
		
		callFlashSlideInModal(validate);
	};
	var insertFn = function(param) {
		
		var sex = "";
			if($("#sex_citizen_men:checked").val()){
				sex = 1;
			}else if($("#sex_citizen_women:checked").val()){
				sex = 0;
			}
		var nation_citizen="";
		
			if($("#nation_citizen_thai:checked").val()){
				nation_citizen="1";
			}else{
				nation_citizen="0";
			}
			
		$.ajax({
			url:restfulURL+"/dqs_api/public/dqs_citizen_import",
			type : "POST",
			dataType : "json",
			data : {
				
				"ref_no":$("#cifno_citizen").val(),
				"pid":$("#id_citizen").val(),
				"ntitle":$("#ntitle_citizen").val(),
				"fname":$("#nfname_citizen").val(),
				"lname":$("#nlname_citizen").val(),
				"dob":$("#dob_citizen").val(),
				"sex":sex,
				"hno":$("#hno_citizen").val(),
				"moo":$("#moo_citizen").val(),
				"trok":$("#trok_citizen").val(),
				"soi":$("#soi_citizen").val(),
				"thanon":$("#thanon_citizen").val(),
				"thumbol":$("#thumbol_citizen").val(),
				"amphur":$("#amphur_citizen").val(),
				"province":$("#province_citizen").val(),
				"flag":$("#flag1_citizen").val(),
				"flag_1":$("#flag2_citizen").val(),
				"manual_add_flag":$("#manual_add_flag").val(),
				"thai_flag":nation_citizen
				
			},	
			headers:{Authorization:"Bearer "+tokenID.token},
			success : function(data) {
				if (data['status'] == "200") {
				
					   if(param !="saveAndAnother"){
						   callFlashSlide("Insert Successfully.");
					       getDataFn();
					       clearFn();
					 	   $('#ModalCitizen').modal('hide');
						}else{
							getDataFn();
							clearFn();
							callFlashSlideInModal("Insert Data is Successfully.");
						}
					   
					   
				}else if (data['status'] == "400") {
					
					validateionFn(data);
				}
			}
		});
		
	};
	
	var updateFn = function() {
		
		var sex = "";
		var nation_citizen="";
		
		if($("#sex_citizen_men:checked").val()){
			sex = 1;
		}else if($("#sex_citizen_women:checked").val()){
			sex = 0;
		}
		
		
		if($("#nation_citizen_thai:checked").val()){
			nation_citizen="1";
		}else{
			nation_citizen="0";
		}
		$.ajax({
			url:restfulURL+"/dqs_api/public/dqs_citizen_import/"+$("#id").val(),
			type : "PATCH",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			data : {
				"ref_no":$("#cifno_citizen").val(),
				"pid":$("#id_citizen").val(),
				"ntitle":$("#ntitle_citizen").val(),
				"fname":$("#nfname_citizen").val(),
				"lname":$("#nlname_citizen").val(),
				"dob":$("#dob_citizen").val(),
				"sex":sex,
				"hno":$("#hno_citizen").val(),
				"moo":$("#moo_citizen").val(),
				"trok":$("#trok_citizen").val(),
				"soi":$("#soi_citizen").val(),
				"thanon":$("#thanon_citizen").val(),
				"thumbol":$("#thumbol_citizen").val(),
				"amphur":$("#amphur_citizen").val(),
				"province":$("#province_citizen").val(),
				"flag":$("#flag1_citizen").val(),
				"flag_1":$("#flag2_citizen").val(),
				"manual_add_flag":$("#manual_add_flag").val(),
				"thai_flag":nation_citizen
				
			},	
			success : function(data) {
				if (data['status'] == "200") {
					getDataFn();
					clearFn();
					$('#ModalCitizen').modal('hide');
					callFlashSlide("Update Successfully.");
				}else if (data['status'] == "400") {
					
					validateionFn(data);
				}
			}
		});
		return false;
	};
	
	var clearFn = function() {
		$("#modalTitleRole").html("Add New Citizen");
		$("#modalDescription").html("ADD NEW CITIZEN");
		$("#id_citizen").val("");
		$("#action").val("add");
		//$("#rule_name").val("");
		$("#btnSubmit").val("Add");
		
		$("#cifno_citizen").val(""),
		$("#nfname_citizen").val(""),
		$("#nlname_citizen").val(""),
		$("#ntitle_citizen").val(""),
		//dropdownDobYear();
		//dropdownDobMouth();
		//dropdownDobDay();
		$("#hno_citizen").val("");
		$("#moo_citizen").val("");
		$("#trok_citizen").val("");
		$("#soi_citizen").val("");
		$("#thanon_citizen").val("");
		$("#thumbol_citizen").val("");
		$("#amphur_citizen").val("");
		$("#province_citizen").val("");
		$("#flag1_citizen").val("");
		$("#flag2_citizen").val("");
		
		$("#cifno_citizen").removeAttr("disabled"); 
		$("#ntitle_citizen").removeAttr("disabled"); 
		$("#nfname_citizen").removeAttr("disabled"); 
		$("#nlname_citizen").removeAttr("disabled"); 
		$("#hno_citizen").removeAttr("disabled"); 
		$("#moo_citizen").removeAttr("disabled"); 
		$("#trok_citizen").removeAttr("disabled"); 
		$("#soi_citizen").removeAttr("disabled"); 
		$("#thanon_citizen").removeAttr("disabled"); 
		$("#thumbol_citizen").removeAttr("disabled"); 
		$("#amphur_citizen").removeAttr("disabled");
		$("#province_citizen").removeAttr("disabled");
		$("#flag1_citizen").removeAttr("disabled");
		$("#flag2_citizen").removeAttr("disabled");
	};
	
	
	
	
	var findOneFn = function(id) {
		// http://192.168.1.58/dqs_api/public/dqs_citizen_import/{ref_no}
		$.ajax({
			url:restfulURL+"/dqs_api/public/dqs_citizen_import/"+ id,
			type : "get",
			dataType : "json",
			 headers:{Authorization:"Bearer "+tokenID.token},
			success : function(data) {		
			
				//data=data['data'];
			
				$("#id_citizen").val(data['pid']);
				$("#cifno_citizen").val(data['ref_no']);
				$("#nfname_citizen").val(data['fname']);
				$("#nlname_citizen").val(data['lname']);
				$("#ntitle_citizen").val(data['ntitle']);
				$("#hno_citizen").val(data['hno']);
				$("#moo_citizen").val(data['moo']);
				$("#trok_citizen").val(data['trok']);
				$("#soi_citizen").val(data['soi']);
				$("#thanon_citizen").val(data['thanon']);
				$("#thumbol_citizen").val(data['thumbol']);
				$("#amphur_citizen").val(data['amphur']);
				$("#province_citizen").val(data['province']);
				$("#dob_citizen").val(data['ndob']);
				
				//sex
				if(data['nsex']==1){
					$('#sex_citizen_men').prop('checked', true);
				}
				if(data['nsex']==0){
					$('#sex_citizen_women').prop('checked', true);
				}
				
				$("#flag1_citizen").val(data['flag']);
				
				$("#flag2_citizen").val(data['flag_1']);
				
				//nation
				if(data['thai_flag']==1){
					$('#nation_citizen_thai').prop('checked', true);
				}
				if(data['thai_flag']==0){
					$('#nation_citizen_other').prop('checked', true);
				}
				//manual_add_flag
				if(data['manual_add_flag']==1){
					$('#manual_add_flag').prop('checked', true);
				}else{
					$('#manual_add_flag').prop('checked', false);
				}
				
				
			}
		});
	};
	


	var searchAdvanceFn = function(cif_no,npid,flag_2,manual_add) {
		//embed parameter start
		var htmlParam="";
		htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedCifNo' name='paramEmbedCifNo' value='"+cif_no+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedNpid' name='paramEmbedNpid' value='"+npid+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedFlag2' name='paramEmbedFlag2' value='"+flag_2+"'>";
		htmlParam+="<input type='hidden' class='paramEmbed' id='paramEmbedManualAdd' name='paramEmbedManualAdd' value='"+manual_add+"'>";
		$(".paramEmbed").remove();
		$("body").append(htmlParam);
		//embed parameter end
		
		
		$.ajax({
			url : restfulURL + "/dqs_api/public/dqs_citizen_import",
			type : "get",
			dataType : "json",
			data:{
				"cif_no":cif_no,
				"npid":npid,
				"flag_2":flag_2
			},
			headers:{Authorization:"Bearer "+tokenID.token},
			success : function(data) {
				listCitizenFn(data['data']);
			}
		});
	};
	
	var listCitizenFn = function(data) {
		
		
		if ($.fn.DataTable.isDataTable('#tableCitizen')) {
		       $('#tableCitizen').DataTable().destroy(); 
		}
		
	
		console.log(data);
		var htmlTable = "";
		var sexed ="";
		var manualAdd="";
		$.each(data,function(index,indexEntry) {
		
		if (indexEntry["sex"]==1){
			sexed = "ชาย";
		}else if (indexEntry["sex"]==0){
			sexed = "หญิง";
		}
		if (indexEntry["manual_add_flag"]==1){
			manualAdd = "<input disabled type='checkbox' name='manual_add' id='manual_add' checked value='1'>";
		}else if (indexEntry["manual_add_flag"]==0){
			manualAdd = "<input disabled type='checkbox' name='manual_add' id='manual_add'  value='0'>";
		}
		
		
			
		htmlTable += "<tr>";
		htmlTable += "<td>"+ indexEntry["cif"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["npid"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["ntitle"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["fname"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["lname"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["dob"]+ "</td>";
		htmlTable += "<td>"+sexed+"</td>";
		htmlTable += "<td>"+manualAdd+"</td>";
		
		htmlTable += "<td><i class=\"fa fa-cog font-gear popover-edit-del\" data-html=\"true\" data-toggle=\"popover\" data-placement=\"top\" data-content=\"<button class='btn btn-warning btn-xs edit' id="+ indexEntry["cif"]+ " data-target=#ModalCitizen data-toggle='modal'>Edit</button>&nbsp;<button id="+indexEntry["cif"]+" class='btn btn-danger btn-xs del'>Delete</button>\"></i></td>";
		htmlTable += "</tr>";
		});
	
		$("#listCitizen").html(htmlTable);
		
		//$('#tableCitizen').DataTable( { "dom": '<"top"flp>rt<"bottom"lp><"clear">','bSort':false } ); 
		//$('#tableCitizen').DataTable( { "dom": '<"top"f>rt<"bottom"><"clear">','bSort':false } ); 
		
		
		
		
		
		
		
		$("#tableCitizen_wrapper").click(function(){
			$(".popover-edit-del").popover();
		});
		
		//function popover
		$(".popover-edit-del").popover();
		
		$("#tableCitizen").off("click",".popover-edit-del");
		//findOnd
		$("#tableCitizen").on("click",".popover-edit-del",function(){
			
			$(".edit").on("click",function() {
				
				$("#modalTitleRole").html("Edit Citizen");
				$("#modalDescription").html("EDIT CITIZEN");
				
				$(this).parent().parent().parent().children().click();
				$(".text_add_edit").text("EDIT FILE");
				$("#btnAddAnother").hide();
				$("#cifno_citizen").attr("disabled","disabled"); 
				//$("#ntitle_citizen").attr("disabled","disabled"); 
				//$("#nfname_citizen").attr("disabled","disabled"); 
				//$("#nlname_citizen").attr("disabled","disabled"); 
				//$("#hno_citizen").attr("disabled","disabled"); 
				//$("#moo_citizen").attr("disabled","disabled"); 
				//$("#trok_citizen").attr("disabled","disabled"); 
				//$("#soi_citizen").attr("disabled","disabled"); 
				//$("#thanon_citizen").attr("disabled","disabled"); 
				//$("#thumbol_citizen").attr("disabled","disabled"); 
				//$("#amphur_citizen").attr("disabled","disabled");
				//$("#province_citizen").attr("disabled","disabled");
				//$("#flag1_citizen").attr("disabled","disabled");
				//$("#flag2_citizen").attr("disabled","disabled");
				
				findOneFn(this.id);
				$("#id").val(this.id);
				$("#action").val("edit");
				$("#btnSubmit").val("Edit");		
				
				
			});
			
			$(".del").on("click",function(){
				$(this).parent().parent().parent().children().click();
				 if(confirm("Do you want to delete this file?")){
					$.ajax({
						 url:restfulURL+"/dqs_api/public/dqs_citizen_import/"+ this.id,
						 type : "delete",
						 dataType:"json",
						 headers:{Authorization:"Bearer "+tokenID.token},
					     success:function(data){      
					       
					       getDataFn();
					       clearFn();
		
						 }
					});
				 }
			});	
		
		});
			
	};
	
	var getDataFn = function(page,rpp){

//		$('#example').DataTable( {
//			//"processing": true,
//	        "serverSide": true,
//		    ajax: {
//		        url:"./json/testJson.txt",
//		        headers:{Authorization:"Bearer "+tokenID.token},
//		        type: 'get'
//		    }
//		} );
		
		
		$.ajax({
			url : restfulURL + "/dqs_api/public/dqs_citizen_import",
			type : "get",
			dataType : "json",
			data:{"page":page,"rpp":rpp},
			headers:{Authorization:"Bearer "+tokenID.token},
			async:false,
			success : function(data) {
				listCitizenFn(data['data']);
				//total
				$('.pagination_top,.pagination_bottom').bootpag({total: data['last_page'], maxVisible: 10});
				//console.log(data);
			}
		});
		
	};
	//Call Function start
	  getDataFn();
	 	
	$("#btnSearch").click(function(){
		searchFn($("#searchCitizen").val());
		   return false;
	});
	
	$("#btnSearchAdvance").click(function(){
		
		//cif_no
		//npid
		//flag_2
		//manual_add
		/*
		alert($("#cif_no").val());
		alert($("#npid").val());
		alert($("#flag_2").val());
		alert($("#manual_add").val());
		*/
		searchAdvanceFn($("#cif_no").val(),$("#npid").val(),$("#flag_2").val());
		
		return false;
	});
	
	$("#btnAddCitizen").click(function(){
		clearFn();
		$(".text_add_edit").text("ADD FILE");
		//Binding Date Picker Start. 	
		$("#dob_citizen").datepicker();
	    $("#dob_citizen").datepicker( "option", "dateFormat", "yymmdd" );
	    $("#btnAddAnother").show();
		//Binding Date Picker End.
	});

	$("#btnSubmit").click(function(){
		if ($("#action").val() == "add"|| $("#action").val() == "") {
			insertFn();
		}else{
			updateFn();
		}
		return false;
	});
	
	$("#btnAddAnother").click(function(){
		insertFn("saveAndAnother");
	});
	
	$(".btnCancle").click(function() {
		clearFn();
	});
	
	
	
	//Autocomplete Search Start
	////http://192.168.1.58/dqs_api/public/dqs_citizen_import/npid
	$("#npid").autocomplete({
        source: function (request, response) {
        	$.ajax({
				 url:restfulURL+"/dqs_api/public/dqs_citizen_import/npid",
				 type:"post",
				 dataType:"json",
				 headers:{Authorization:"Bearer "+tokenID.token},
				 data:{"q":request.npid},
				 async:false,
                 error: function (xhr, textStatus, errorThrown) {
                        alert('Error: ' + xhr.responseText);
                    },
				 success:function(data){
					
						response($.map(data, function (item) {
                            return {
                                llabel: item.npid,
                                value: item.npid
                            };
                        }));
					
				}
				});
        	
        }
    });
   
	//Autocomplete Search End
	
	
	
	
	
	

		
});