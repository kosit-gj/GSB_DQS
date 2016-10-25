var restfulURL="http://192.168.1.42:3000";
 $(document).ready(function(){
  


  var insertFn = function(){

    $.ajax({
     url:restfulURL+"/insert-menu",
     type:"POST",
     dataType:"json",
     data:{"menu_name":$("#menu_name").val()},
     success:function(data){
      //alert(data);
      if(data="success"){
       alert("Insert Success");
       listMenuFn();
       clearFn();
      }
     }
    });         

    return false;
   };

  var updateFn = function(){

   $.ajax({
    url:restfulURL+"/update-menu",
    type:"PUT",
    dataType:"json",
    data:{"id":$("#id").val(),"menu_name":$("#menu_name").val()},
    success:function(data){
     //alert(data);
     if(data="success"){
      alert("Upate Success");
      listMenuFn();
      clearFn();
     }
    }
   });

   return false;


  };

  var clearFn =function(){

   $("#id").val("");
   $("#action").val("add");
   $("#menu_name").val("");
   $("#btnSubmit").val("Add");

  }

  var findOneFn = function(id){
   //http://localhost:3000/find-user/58035b7cb4566c158bcecacf
   $.ajax({
    url:restfulURL+"/find-menu/"+id,
    type:"get",
    dataType:"json",
    success:function(data){

      $("#menu_name").val(data['menu_name']);
      
    }
   });
  };

  var listMenuFn = function(){
   $.ajax({
    url:restfulURL+"/get-menu",
    type:"get",
    dataType:"json",
    success:function(data){
     console.log(data[0]);
     var htmlTable="";
     $.each(data,function(index,indexEntry){
       htmlTable+="<tr >";
        htmlTable+="<td>"+(index+1)+"</td>";
        htmlTable+="<td>"+indexEntry["menu_name"]+"</td>";
     
        htmlTable+="<td><i class='fa fa-paste font-management' data-target='#authorize' data-toggle='modal'></i></td>";
       	
		htmlTable+="<td><i class='fa fa-gear font-management' data-html='true' data-container='body' data-toggle='popover' data-placement='top' data-content=\"<button class='btn btn-warning btn-xs edit-action edit' type='button' id="+indexEntry["_id"]+">Edit</button> <button class='btn btn-danger btn-xs del' type='button' id="+indexEntry["_id"]+">Delete</button>\"></i></td>";

		htmlTable+="</tr>";
     });

     $("#listMenu").html(htmlTable);

   

	//popover 
	$(".font-management").popover(); 

	$(".font-management").on("click",function(){
		$(".edit-action").click(function(){
			//alert("alert data here.");
			$("#editModal").modal();
		});
	});

	//delete
	$(".font-management").click(function(){
		$(".del").click(function(){
	      //alert(this.id);
	
	      $.ajax({
	       url:restfulURL+"/del-menu/"+this.id,
	       type:"get",
	       dataType:"json",
	       //data:{"_id":this.id},
	       success:function(data){
	        console.log(data["ok"]);
	        console.log(data["n"]);
	
	        if(data["ok"]==1 && data["n"]==1){
	         alert("delte success");
	         listMenuFn();
	
	        }
	       }
	      });
	
	     });

     //findOnd

     $(".edit").click(function(){

      findOneFn(this.id);
      $("#id").val(this.id);
      $("#action").val("edit");
      $("#btnSubmit").val("Edit");

     });
});
	
	
    }
   });

  };
  listMenuFn();



  $("#btnSubmit").click(function(){
   //alert($("#fullname").val());
   //alert($("#age").val());
   //alert($("#action").val());
   if($("#action").val()=="add" || $("#action").val()=="" ){
    insertFn();
   }else{
    updateFn();

   }
  
   return false;

  });


	



  $("#btnCancle").click(function(){

   clearFn();

   return false;

  });

  
 });



$(document).ready(function(){

	

	
	
	//font-management edit-action
});