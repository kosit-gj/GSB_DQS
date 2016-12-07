var updateFn = function() {
		
		var closeflagCheckbox = "";
		var embed_closeflag="";
		var embed_closeflag_obj="";
		embed_closeflag_obj=$(".embed_closeflag").get();
		
		$.each($(".embed_closeflag").get(),function(index,indexEntry){
			//alert($(indexEntry).val());
			var id=$(indexEntry).val();
			//alert($(indexEntry).attr("id"));
			if($("#closeCheckbox-"+id).prop('checked')){ 
	        	closeflagCheckbox = 1;
	        }else{ 
	        	closeflagCheckbox = 0;
	        }
			alert(closeflagCheckbox);
			$.ajax({
				url:restfulURL+"/api/dqs_branch/"+id,
				type : "PUT",
				dataType : "json",
				data : {"close_flag" :closeflagCheckbox},
				async:false,
				headers:{Authorization:"Bearer "+tokenID.token},
				success : function(data) {
					if (data = "success") {
						//console.log("Upate Success");
						
					}
				}
			});

		});
		alert("Upate Success");
		getDataFn();
		clearFn();
		$('#addModalRule').modal('hide');
		
		console.log($(".embed_closeflag").get());
	
		return false;
	};
	
	var clearFn = function() {
		$("#id").val("");
		$("#action").val("add");
		$("#rule_name").val("");
		$("#btnSubmit").val("Add");
	}
	
	var findOneFn = function(id) {
		// http://localhost:3000/find-user/58035b7cb4566c158bcecacf
		$.ajax({
			url:restfulURL+"/api/dqs_branch/"+ id,
			type : "get",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			success : function(data) {
				
				$("#branchOperationName").val(data['desc']);
			
			}
		});
	};
	
	var searchFn = function(searchText) {
		$.ajax({
			url : restfulURL + "/api/dqs_branch/?desc__regex=/^"+searchText+"/i",
			type : "get",
			dataType : "json",
			success : function(data) {
				listBranchFn(data);
			}
		});
	}
	
	var dropdownCheckbox = function(id) {
		$.ajax({
			url : restfulURL + "/api/dqs_branch/?rule_name__regex=/^"+searchText+"/i",
			type : "get",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			success : function(data) {
				listBranchFn(data);
			}
		});
	}
	
var dropdownYear = function(){
		
		var currentTime = new Date();
		var year = currentTime.getFullYear();
		year=year+543;
		var selectYearHTML="";
		//selectYearHTML+="<option>2559</option>";
		selectYearHTML+="<option value=''>เลือกปี</option>";
		selectYearHTML+="<option value='All'>ทุกปี</option>";
		for(var i=year; i>(year-100);i--){
			
			selectYearHTML+="<option>"+i+"</option>";
			
		}
		
		//alert(selectYearHTML);
		$("#yearImportExport").html(selectYearHTML);
	}

var dropdownCustomerType = function(){
	var selectCustomerHTML="";

	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_import_export/cust_type",
		type : "get",
		dataType : "json",
		async:false,
		headers:{Authorization:"Bearer "+tokenID.token},
		success : function(data) {	
			console.log(data);
			$.each(data,function(index,indexEntry){
				selectCustomerHTML+="<option value="+indexEntry['gsbccode']+">"+indexEntry['desc_1']+"</option>";  
			});
		}
	});
	$(".customerImportExport").html(selectCustomerHTML);
}
	
$(document).ready(function(){

	dropdownYear();
	dropdownCustomerType();
	

	$("#radioCustomer").click(function() {
		
		$("#yearImportExport").removeAttr("disabled");
		$("#customerType").removeAttr("disabled");
		$('#customerTypeNew').prop('disabled', true);
		
	});
	
	$("#radioNewCustomer").click(function() {
		
		$("#customerTypeNew").removeAttr("disabled");
		$('#customerType').prop('disabled', true);
		$('#yearImportExport').prop('disabled', true);
		
	});
	
	
	$(".btnCancle").click(function() {
		clearFn();
	});
	$("#btnEditBranchOperation").click(function() {
		getDataBranchOperationFn();
	});
	
	
	
	//Export File
//	$("#exportFile").click(function(){
//		
//		$.ajax({
//			url:restfulURL+"/dqs_api/public/dqs_import_export/export",
//			type : "post",
//			dataType : "json",
//			async:false,
//			headers:{Authorization:"Bearer "+tokenID.token},
//			success : function(data) {	
//				//console.log(data);
//				 location.href = data.zip;
//			 	
//			}
//		});
//		
//		return false;
//	});
	
	$("#csrf-token").val("Bearer "+tokenID.token);
	
//Import File

//$("form#uploadFile").submit( function( e ) {
//	
//	var data = new FormData( this );
//	console.log(data);
//	 e.preventDefault();
//	/*
//	    $.ajax( {
//	      url:restfulURL+"/dqs_api/public/dqs_import_export/import",
//	      type: 'POST',
//	      data: new FormData( this ),
//	      //data: new FormData($("#filename")),
//	      processData: false,
//	      contentType: false,
//	      headers:{Authorization:"Bearer "+tokenID.token},
//	      success:function(data){
//	    	  console.log(data);
//	      }
//	      
//	    } );
//	    e.preventDefault();
//	    
//	    return false;
//	  } );
//	  */
//});

// Variable to store your files
var files;
// Add events
$('input[type=filename]').on('change', prepareUpload);

// Grab the files and set them to our variable
function prepareUpload(event)
{
  files = event.target.files;
}
$('form#uploadFile').on('submit', uploadFiles);

// Catch the form submit and upload the files
function uploadFiles(event)
{
  event.stopPropagation(); // Stop stuff happening
  event.preventDefault(); // Totally stop stuff happening

	// START A LOADING SPINNER HERE

	// Create a formdata object and add the files
	var data = new FormData();
	$.each(files, function(key, value)
	{
		data.append(key, value);
	});

	//console.log(data);
	
	$.ajax({
		url:restfulURL+"/dqs_api/public/dqs_import_export/import",
		type: 'POST',
		data: data,
		cache: false,
		dataType: 'json',
		processData: false, // Don't process the files
		contentType: false, // Set content type to false as jQuery will tell the server its a query string request
		headers:{Authorization:"Bearer "+tokenID.token},
		success: function(data, textStatus, jqXHR)
		{
			console.log(data);
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			// Handle errors here
			console.log('ERRORS: ' + textStatus);
			// STOP LOADING SPINNER
		}
	});
}	

	
	
});