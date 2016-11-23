$(document).ready(function(){

	
	var updateFn = function() {
		
		var closeflagCheckbox = "";
		var embed_closeflag="";
		var embed_closeflag_obj="";
		var branches=[];
		embed_closeflag_obj=$(".embed_closeflag").get();
		/*
		branches: [
		           {
		             brcd: "",
		             close_flag: ""
		           }, ...
		         ]
		         */
		//console.log(embed_closeflag_obj);
		$.each($(".embed_closeflag").get(),function(index,indexEntry){
			
			var id=$(indexEntry).val();
			
			if($("#closeCheckbox-"+id).prop('checked')){ 
	        	closeflagCheckbox = 1;
	        }else{ 
	        	closeflagCheckbox = 0;
	        }
			branches.push({"brcd":id,"close_flag":closeflagCheckbox});

		});
		
		
		
	    console.log(branches);
	    
		$.ajax({
			url:restfulURL+"/dqs_api/public/dqs_branch",
			type : "PATCH",
			dataType : "json",
			data : {"branches" :branches},
			async:false,
			headers:{Authorization:"Bearer "+tokenID.token},
			success : function(data) {
				if (data = "success") {
					getDataFn();
				}
			}
		});
	
		
		//$(".alert-success").fadeTo(1000,2000).slideUp(500);

		//getDataFn();
		//clearFn();
		
		//$('#addModalRule').modal('hide');
		
		//console.log($(".embed_closeflag").get());
	
		return false;
	};
	
	var clearFn = function(){
		$("#action").val("");
	}
	
	/*var findOneFn = function(id) {
		// http://localhost:3000/find-user/58035b7cb4566c158bcecacf
		$.ajax({
			url:restfulURL+"/dqs_api/public/dqs_branch/"+ id,
			type : "get",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			success : function(data) {
				$("#branchOperationName").val(data['desc']);
			}
		});
	};*/
	
	/*var searchFn = function(searchText) {
		$.ajax({
			url : restfulURL + "/dqs_api/public/dqs_branch/?desc__regex=/^"+searchText+"/i",
			type : "get",
			dataType : "json",
			success : function(data) {
				listBranchFn(data);
			}
		});
	}*/
	
	
	
	var listBranchFn = function(data) {
		
		if ($.fn.DataTable.isDataTable('#tableBranch')) {
			$('#tableBranch').DataTable().destroy(); 
		}
		
		//console.log(data);
		var htmlTable = "";
		

		$.each(data,function(index,indexEntry) {
		htmlTable += "<tr>";
		
		htmlTable += "<td>"+ indexEntry["brcd"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["desc_1"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["ccdef"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["regdesc"]+ "</td>";
		htmlTable += "<td>"+ indexEntry["distdesc"]+ "</td>";
		
		if(indexEntry["close_flag"]==1){
			htmlTable += "<td><input type=\"checkbox\" disabled class=\"editCheckboxCloseFlag\" id=closeCheckbox-"+indexEntry["brcd"]+" checked='checked' ></td>";
		}else if(indexEntry["close_flag"]==0){
			htmlTable += "<td><input type=\"checkbox\" disabled class=\"editCheckboxCloseFlag\" id=closeCheckbox-"+indexEntry["brcd"]+" ></td>";
		}	 
		
		htmlTable += "</tr>";
		});
		
		$("#listBranch").html(htmlTable);
		
		$('#tableBranch').DataTable( { "dom": '<"top"flp>rt<"bottom"lp><"clear">',"bSort" : false } );
		
		
		/*$(".paginate_button").on("click",function(){
			alert("click");
		})*/
		
		//function popover
		$(".popover-edit-del").popover();
		
		//ปุ่ม Edit ใน table
		$("#tableBranch").on("click",".editCheckboxCloseFlag",function(){  
			
			var id = this.id.split("-"); 
			
			//alert(id[1]);
			embedParam(id[1]);
			//$("#embed_closeflag_id").remove();	
			//$("body").append("<input type='hidden' class='embed_closeflag' id='embed_closeflag-"+id[1]+"' name='embed_closeflag-"+id[1]+"' value='"+id[1]+"'>");	
		});
		
	};
	var embedParam = function(id){
		//alert(id);
		var count = 0;
		
		$.each($(".embed_closeflag").get(),function(index,indexEnry){
		//ถ้า id ที่วน == id ที่มี	
			if($(indexEnry).val()==id){
				count+=1;
			}
		});
		
		if(count>0){
			$("#embed_closeflag-"+id).remove();
			$("body").append("<input type='hidden' class='embed_closeflag' id='embed_closeflag-"+id+"' name='embed_closeflag-"+id+"' value='"+id+"'>");
		}else{
			$("body").append("<input type='hidden' class='embed_closeflag' id='embed_closeflag-"+id+"' name='embed_closeflag-"+id+"' value='"+id+"'>");
		}
	
	}
	
	// get ของ branch management
	var getDataFn = function() {
		$.ajax({
			url : restfulURL + "/dqs_api/public/dqs_branch",
			type : "get",
			dataType : "json",
			headers:{Authorization:"Bearer "+tokenID.token},
			success : function(data) {
				listBranchFn(data['data']);
				//console.log(data);
			}
		});
	};

	//Call Function start
	  getDataFn();
	
	//ปุ่ม Save
	$("#btnSubmit").click(function(){
		if ($("#action").val() == "edit"){	
				updateFn();
		}else{
			return false;
		}
	});
	  
	$("#btnSearch").click(function(){
		searchFn($("#searchBranch").val());
		return false;
	});

	$("#btnCancle").click(function(){
		getDataFn();
		clearFn();
	});
	
	$("#btnEditBranchOperation").click(function(){
		$(".editCheckboxCloseFlag").removeAttr("disabled");
		$("#action").val("edit");
	});
});
