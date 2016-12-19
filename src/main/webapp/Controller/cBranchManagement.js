var golbalDataBranch=[];
$(document).ready(function(){

	//set paginate start
	var paginationSetUpFn = function(pageIndex,pageButton,pageTotal){
		
		
		$('.pagination_top,.pagination_bottom').off("page");
		$('.pagination_top,.pagination_bottom').bootpag({
		    total: pageTotal,//page Total
		    page: pageIndex,//page index
		    maxVisible: pageButton,//จำนวนปุ่ม
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
			var rpp=10;
			if($("#rpp").val()==undefined){
				rpp=10;
			}else{
				rpp=$("#rpp").val();
			}
			
			getDataFn(num,rpp);
			
		    $(".pagingNumber").remove();
		    var htmlPageNumber= "<input type='hidden' id='pageNumber' name='pageNumber' class='pagingNumber' value='"+num+"'>";
		    $("body").append(htmlPageNumber);
		   
		}); 
		
		
		$(".countPagination").off("change");
		$(".countPagination").on("change",function(){

			$("#countPaginationTop").val($(this).val());
			$("#countPaginationBottom").val($(this).val());
			
			getDataFn(1,$(this).val());
			
			$(".rpp").remove();
		    var htmlRrp= "<input type='hidden' id='rpp' name='rpp' class='rpp' value='"+$(this).val()+"'>";
		    $("body").append(htmlRrp);
		   
		});
		
	}

	//set paginate end
	var updateFn = function() {
		
		var closeflagCheckbox = "";
		var embed_closeflag="";
		var embed_closeflag_obj="";
		var branches=[];
		embed_closeflag_obj=$(".embed_closeflag").get();
	
		//console.log(embed_closeflag_obj);
		$.each($(".embed_closeflag").get(),function(index,indexEntry){
			
			var id=$(indexEntry).val();
			
			if($("#closeCheckbox-"+id).prop('checked')){ 
	        	closeflagCheckbox = 1;
	        }else{ 
	        	closeflagCheckbox = 0;
	        }
			branches.push({"brcd":id,"close_flag":closeflagCheckbox});
			
			//requirement data
			
			/*
			branches: [
			           {
			             brcd: "",
			             close_flag: ""
			           }, ...
			         ]
			*/
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
					callFlashSlide("Update Successfully.");
					getDataFn($("#pageNumber").val(),$("#rpp").val());
				}
			}
		});
	
		return false;
	};
	
	var clearFn = function(){
		$("#action").val("");
	}
	
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
		
//		if ($.fn.DataTable.isDataTable('#tableBranch')) {
//			$('#tableBranch').DataTable().destroy(); 
//		}
		
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
		
		//$('#tableBranch').DataTable( { "dom": '<"top"flp>rt<"bottom"lp><"clear">',"bSort" : false } );
		
		//function popover
		$(".popover-edit-del").popover();
		
		//ปุ่ม Edit ใน table
		$("#tableBranch").on("click",".editCheckboxCloseFlag",function(){  
			
			var id = this.id.split("-"); 
			
			embedParam(id[1]);
			
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
			async:false,
			headers:{Authorization:"Bearer "+tokenID.token},
			success : function(data) {
				listBranchFn(data['data']);
				golbalDataBranch=data;
				paginationSetUpFn(golbalDataBranch['current_page'],golbalDataBranch['last_page'],golbalDataBranch['last_page']);
				//console.log(data);
			}
		});
	};

	//Call Function start
	  getDataFn($("#pageNumber").val(),$("#rpp").val());
	  
	  paginationSetUpFn(golbalDataBranch['current_page'],golbalDataBranch['last_page'],golbalDataBranch['last_page']);
	
	//ปุ่ม Save
	$("#btnSubmit").click(function(){
		if ($("#action").val() == "edit"){	
				updateFn();
		}else{
			return false;
		}
	});
	  
	
	$("#btnSearch")	.click(function(){
		searchFn("searchText","tableBranch");
		//alert($("#searchText").val());
		//searchMultiFn($("#searchText").val());
		;
	});
	$("#btnCancle").click(function(){
		getDataFn($("#pageNumber").val(),$("#rpp").val());
		clearFn();
	});
	
	$("#btnEditBranchOperation").click(function(){
		$(".editCheckboxCloseFlag").removeAttr("disabled");
		$("#action").val("edit");
	});
	
});
