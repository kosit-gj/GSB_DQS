<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Grade | Management</title>

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/plugins/iCheck/custom.css">
    <link rel="stylesheet" href="css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css">
    <link href="font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="css/animate.css" rel="stylesheet">
    
    
    
    
    
    <link href="css/style.css" rel="stylesheet">
    <link href="css/gsbMain.css" rel="stylesheet">
    <link href="css/grade_management.css" rel="stylesheet">


</head>

<body class="top-navigation">





    <div id="wrapper">
        <div id="page-wrapper" class="gray-bg">
        <div class="row border-bottom pink-bg" >
        <nav class="navbar navbar-static-top" role="navigation">
        
        <!-- nav header start -->
        <div class="container"><!-- container start -->  
            <div class="navbar-header gsb-logo" >
                <button aria-controls="navbar" aria-expanded="false" data-target="#navbar" data-toggle="collapse" class="navbar-toggle collapsed" type="button">
                    <i class="fa fa-reorder"></i>
                </button>
                <!-- <i class="fa fa-cc-mastercard icon-logo"></i> -->
                <img class="grayscale" src="img/small-logo3.png">
               <!--  <a href="#" class="  navbar-brand"></a>  --> 
            </div>
            <div class="navbar-collapse collapse" id="navbar">
                <ul class="nav navbar-nav">
                <!-- 
                    <li class="active">
                        <a aria-expanded="false" role="button" href="layouts.html"> Back to main Layout page</a>
                    </li>
                   -->

                </ul>
                <ul class="nav navbar-top-links navbar-right">
                    <li>
                    <button type="button" class="btn btn-pink btn-circle "><i class="fa fa-user font-user"></i>
                            </button> <span class='fullName'>Firstname Lastname </span>
                       
                    </li>
                </ul>
            </div>
            
            </div> <!-- container end -->  
         <!-- nav header end -->  
          
           
            
        </nav>
        </div>
        <div class="wrapper wrapper-content">
            <div class="container">
            
               
				

				
				<div class="row wrapper border-bottom  page-heading">
				    <div class="col-lg-12">
				        <h2><i class="fa fa fa-folder-open icon-title"></i> Grade Management</h2>
				        <ol class="breadcrumb">
				            <li>
				                <a href="#">Home</a>
				            </li>
				            <li>
				               System Management
				            </li>
				             <li class="active">
				                <strong>Grade Management</strong>
				            </li>
				        </ol>
				    </div>
				   
				</div>
				 
	
				
				

				
                <div class="row">

                    <div class="col-lg-12">
                        <div class="ibox float-e-margins">
                            <div class="ibox-title">
                                <h5>Grade List </h5>
                                
                                <!-- 
                                <div class="ibox-tools">
                                    <a class="collapse-link">
                                        <i class="fa fa-chevron-up"></i>
                                    </a>
                                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                        <i class="fa fa-wrench"></i>
                                    </a>
                                    <ul class="dropdown-menu dropdown-user">
                                        <li><a href="#">Config option 1</a>
                                        </li>
                                        <li><a href="#">Config option 2</a>
                                        </li>
                                    </ul>
                                    <a class="close-link">
                                        <i class="fa fa-times"></i>
                                    </a>
                                </div>
                                 -->
                            </div>
                            <div class="ibox-content">
                            
                             <div class="row">
                                    <div class="col-sm-8 m-b-xs">
                                    
                                    
                                    
                                    <button type="button" class="btn btn-info " data-target="#addModal" data-toggle="modal"><i class="fa fa-plus"></i>&nbsp;&nbsp;Add New Grade</button>
                                    
                                    
                                    </div>
                                    
                                     <div class="col-sm-4">
	                                     <div class="input-group"><input type="text" placeholder="Search" class="input-sm form-control"> <span class="input-group-btn">
                                         <button type="button" class="btn btn-sm btn-primary"> Go!</button> </span></div>
                                     </div>
                             </div>
                             
                                <div class="row">
                                    <div class="col-sm-9 m-b-xs">
                                    
                                  
										<div class="btn-group">
					                        <button class="btn btn-white" type="button"><i class="fa fa-chevron-left"></i></button>
					                        <button class="btn btn-white">1</button>
					                        <button class="btn btn-white  active">2</button>
					                        <button class="btn btn-white">3</button>
					                        <button class="btn btn-white">4</button>
					                        <button class="btn btn-white" type="button"><i class="fa fa-chevron-right"></i> </button>
					                    </div>
                    

										<!-- 
                                        <div data-toggle="buttons" class="btn-group">
                                            <label class="btn btn-sm btn-white"> <input type="radio" id="option1" name="options"> Day </label>
                                            <label class="btn btn-sm btn-white active"> <input type="radio" id="option2" name="options"> Week </label>
                                            <label class="btn btn-sm btn-white"> <input type="radio" id="option3" name="options"> Month </label>
                                        </div>
                                         -->
                                    </div>
                                    
                                    <div class="col-sm-2 object-right paging-text">Results per page</div>
                                    <div class="col-sm-1">
                                    
                                    	<select name="account" class="form-control m-b">
	                                        <option>10</option>
	                                        <option>20</option>
	                                        <option>30</option>
	                                        <option>40</option>
	                                    </select>
	                                    
                                        
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-striped">
                                        <thead>
                                        <tr>

                                            <th>No.</th>
                                            <th>Grade</th>
                                            <th>Decription</th>
                                            <th>Sep</th>
                                            <th>Show Condition</th>
                                            <th>Manage</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        
	                                        <tr>
	                                            <td><div class='text-inline-table'>1</div></td>
	                                            <td><div class='text-inline-table'>A</div></td>
	                                            <td><div class='text-inline-table'>ไม่มี Rule Cleansing ผ่านทุก Rule</div></td>
	                                            <td><div class='text-inline-table'><input class="form-control input-inline-table input-seq" type="text" name="" id="" value="1"></div></td>
	                                            <td><div class='text-inline-table'><i class="fa fa-search font-management" data-target="#condition" data-toggle="modal"></i></div></td>
	                                            <td><div class='text-inline-table'> <i class="fa fa-gear font-management" data-html="true" data-container="body" data-toggle="popover" data-placement="top" 
                                    data-content="<button class='btn btn-warning btn-xs edit-action' type='button'>Edit</button> <button class='btn btn-danger btn-xs' type='button'>Delete</button>"></i></div></td>                
	                                        </tr>
	                                        
	                                        <tr>
	                                            <td><div class='text-inline-table'>2</div></td>
	                                            <td><div class='text-inline-table'>B</div></td>
	                                            <td><div class='text-inline-table'>มี Rule Clansing แต่ มี ID และ (มีที่อยู่ให้ติดต่อได้หรือมีเบอร์โทรศัพท์ที่ถูกต้องให้ติดต่อได้)</div></td>
	                                            <td><div class='text-inline-table'><input class="form-control input-inline-table input-seq" type="text" name="" id="" value="1"></div></td>
	                                            <td><div class='text-inline-table'><i class="fa fa-search font-management" data-target="#condition" data-toggle="modal"></i></div></td>
	                                            <td><div class='text-inline-table'> <i class="fa fa-gear font-management"></i></div></td>                
	                                        </tr>
	                                        
	                                        <tr>
	                                            <td><div class='text-inline-table'>3</div></td>
	                                            <td><div class='text-inline-table'>C</div></td>
	                                            <td><div class='text-inline-table'>อื่นๆ ที่ไม่ใช่ A B D (มี ID ไม่มีที่อยู่และเบอร์โทร)</div></td>
	                                            <td><div class='text-inline-table'><input class="form-control input-inline-table input-seq" type="text" name="" id="" value="1"></div></td>
	                                            <td><div class='text-inline-table'><i class="fa fa-search font-management" data-target="#condition" data-toggle="modal"></i></div></td>
	                                            <td><div class='text-inline-table'> <i class="fa fa-gear font-management"></i></div></td>                
	                                        </tr>
	                                        
	                                        <tr>
	                                            <td><div class='text-inline-table'>4</div></td>
	                                            <td><div class='text-inline-table'>D</div></td>
	                                            <td><div class='text-inline-table'>บุคคลที่ไม่มีหมายเลขบัตรประชาชน  หรือ มี ID = 1 ไม่มี ID</div></td>
	                                            <td><div class='text-inline-table'><input class="form-control input-inline-table input-seq" type="text" name="" id="" value="1"></div></td>
	                                            <td><div class='text-inline-table'><i class="fa fa-search font-management" data-target="#condition" data-toggle="modal"></i></div></td>
	                                            <td><div class='text-inline-table'> <i class="fa fa-gear font-management"></i></div></td>                
	                                        </tr>
	                                        
	                                        <tr>
	                                            <td><div class='text-inline-table'>5</div></td>
	                                            <td><div class='text-inline-table'>E</div></td>
	                                            <td><div class='text-inline-table'></div></td>
	                                            <td><div class='text-inline-table'><input class="form-control input-inline-table input-seq" type="text" name="" id="" value="1"></div></td>
	                                            <td><div class='text-inline-table'><i class="fa fa-search font-management" data-target="#condition" data-toggle="modal"></i></div></td>
	                                            <td><div class='text-inline-table'> <i class="fa fa-gear font-management"></i></div></td>                
	                                        </tr>
	                                        
	                                        <tr>
	                                            <td><div class='text-inline-table'>6</div></td>
	                                            <td><div class='text-inline-table'>F</div></td>
	                                            <td><div class='text-inline-table'></div></td>
	                                            <td><div class='text-inline-table'><input class="form-control input-inline-table input-seq" type="text" name="" id="" value="1"></div></td>
	                                            <td><div class='text-inline-table'><i class="fa fa-search font-management" data-target="#condition" data-toggle="modal"></i></div></td>
	                                            <td><div class='text-inline-table'> <i class="fa fa-gear font-management"></i></div></td>                
	                                        </tr>
	                                        
	                                        <tr>
	                                            <td><div class='text-inline-table'>7</div></td>
	                                            <td><div class='text-inline-table'>G</div></td>
	                                            <td><div class='text-inline-table'></div></td>
	                                            <td><div class='text-inline-table'><input class="form-control input-inline-table input-seq" type="text" name="" id="" value="1"></div></td>
	                                            <td><div class='text-inline-table'><i class="fa fa-search font-management" data-target="#condition" data-toggle="modal"></i></div></td>
	                                            <td><div class='text-inline-table'> <i class="fa fa-gear font-management"></i></div></td>                
	                                        </tr>
                                        
                                         
                                        
                                       
                                       
                                       
                                        </tbody>
                                    </table>
                                </div>
                                
                                
                                <!-- footer paging start -->
                                
                                 <div class="row">
                                    <div class="col-sm-9 m-b-xs">
 
										<div class="btn-group">
					                        <button class="btn btn-white" type="button"><i class="fa fa-chevron-left"></i></button>
					                        <button class="btn btn-white">1</button>
					                        <button class="btn btn-white  active">2</button>
					                        <button class="btn btn-white">3</button>
					                        <button class="btn btn-white">4</button>
					                        <button class="btn btn-white" type="button"><i class="fa fa-chevron-right"></i> </button>
					                    </div>
                    
                 
                            
			
										
                                    </div>
                                    
                                    <div class="col-sm-2 object-right paging-text">Results per page</div>
                                    <div class="col-sm-1">
                                    
                                    	<select name="account" class="form-control m-b">
	                                        <option>10</option>
	                                        <option>20</option>
	                                        <option>30</option>
	                                        <option>40</option>
	                                    </select>
	                                    
                                        
                                    </div>
                                </div>
                                <!-- footer paging end -->

                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
        <div class="footer">
            <div class="pull-right">
                10GB of <strong>250GB</strong> Free.
            </div>
            <div>
                <strong>Copyright</strong> Example Company &copy; 2014-2015
            </div>
        </div>

        </div>
        </div>




<!-- Add Modal Start -->

  <div aria-hidden="true" role="dialog" tabindex="-1" id="addModal" class="modal inmodal" style="display: none;">
    <div class="modal-dialog">
    <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                <!-- <i class="fa fa-laptop modal-icon"></i> -->
                <h4 class="modal-title">Add New Grade</h4>
                <!-- 
                <small class="font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                 -->
            </div>
            <div class="modal-body">
                <!-- content start -->
                <h2><i class="fa fa fa-pencil-square-o icon-title"></i> ADD NEW GRADE</h2>
                <hr>
                
                <!-- form start -->
                <div class='form-grade-mangement'>
	                <div class="form-grade-label">
	                
	                 Grade  :
	                </div>
	                
	                <div class="form-grade-input">
	                
	                	<input type="text" class="form-control" placeholder="">
	                </div>
	                <br style="clear:both">
                </div>
                
                <div class='form-grade-mangement'>
	                <div class="form-grade-label">
	                
	                Grade Description :
	                </div>
	            </div> 
	            <div class='form-grade-mangement'> 
	            
	                <div class="form-grade-labeltext">
						<textarea class="form-control input-contact-textinput"  placeholder="" ></textarea>
	                </div>
	                <br style="clear:both">
                </div>
                
               
                <!-- form start -->
                <!-- content end -->
                <br style="clear:both">
            </div>
            <div class="modal-footer">
                <button data-dismiss="modal" class="btn btn-white" type="button">Cancel</button>
                <button class="btn btn-primary" type="button">Save</button>
            </div>
        </div>
    </div>
</div>                            
<!-- Add Modal End -->

<!-- Edit Modal Start -->

  <div aria-hidden="true" role="dialog" tabindex="-1" id="editModal" class="modal inmodal" style="display: none;">
    <div class="modal-dialog">
    <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                <!-- <i class="fa fa-laptop modal-icon"></i> -->
                <h4 class="modal-title">Edit Grade</h4>
                <!-- 
                <small class="font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                 -->
            </div>
            <div class="modal-body">
                <!-- content start -->
                <h2><i class="fa fa fa-pencil-square-o icon-title"></i>  EDIT GRADE</h2>
                <hr>
                
                
               <!-- form start -->
                <div class='form-grade-mangement'>
	                <div class="form-grade-label">
	                
	                 Grade  :
	                </div>
	                
	                <div class="form-grade-input">
	                
	                	<input type="text" class="form-control" placeholder="">
	                </div>
	                <br style="clear:both">
                </div>
                
                <div class='form-grade-mangement'>
	                <div class="form-grade-label">
	                
	                Grade Description :
	                </div>
	            </div> 
	            <div class='form-grade-mangement'> 
	            
	                <div class="form-grade-labeltext">
						<textarea class="form-control input-contact-textinput"  placeholder="" ></textarea>
	                </div>
	                <br style="clear:both">
                </div>
                

                <!-- form start -->
                <!-- content end -->
                <br style="clear:both">
            </div>
            <div class="modal-footer">
                <button data-dismiss="modal" class="btn btn-white" type="button">Cancel</button>
                <button class="btn btn-primary" type="button">Save</button>
            </div>
        </div>
    </div>
</div>                        
<!-- Edit Modal End -->

<!-- Condition Start -->
<div aria-hidden="true" role="dialog" tabindex="-1" id="condition" class="modal inmodal" style="display: none;">
    <div class="modal-dialog modal-lg">
    <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                <!-- <i class="fa fa-laptop modal-icon"></i> -->
                <h4 class="modal-title">Condition</h4>
                <!-- 
                <small class="font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                 -->
            </div>
            <div class="modal-body">
                <!-- content start -->
                <h2><i class="fa fa fa-pencil-square-o icon-title"></i>CONDITION</h2>
                <hr>
                
                
               <!-- form start -->
               <div class='form-grade-mangement'>
	                <div class="form-grade-label">
	                
	                 <label>Grade : </label>
	                </div>
	            </div>
                <div class="row">
					<div class="col-sm-4">
						<div class="form-grade-input2">
							<select class="input form-control">
					                <option>Rule Name</option>
					                <option>20</option>
		                     </select>
	                     </div>
	                </div>
	                <div class="col-sm-2">	   
	                	<div class="form-grade-input3">                             
                         	<button type="button" class="btn btn-warning"><i class="fa fa-plus"></i>&nbsp;&nbsp;Add</button>
                    	</div>
                    </div>
					<div class="col-sm-4">
						<div class="form-grade-input2"> 
							<select class="input form-control">
					                <option>Field Name</option>
					                <option>20</option>
		                     </select>
	                     </div>
	                </div>
                    <div class="col-sm-1">	                                
                         <button type="button" class="btn btn-warning"><i class="fa fa-plus"></i>&nbsp;&nbsp;Add</button>
                    </div>
                    
                </div>
                <br style="clear:both">
                <br style="clear:both">
                <div class="table-responsive">
                      <table class="table table-striped">
                            <thead>
                                 <tr>
                                      <th>Sep</th>
                                      <th>Oparetors</th>
                                      <th>Rule/Field</th>
                                      <th>Funcion</th>
                                      <th>Value1</th>
                                      <th>Value2</th>
                                      <th>Delete</th>
                                  </tr>
                            </thead>
                            <tbody>                                       
	                             <tr>
	                                  <td><div class='text-inline-table'><input class="form-control input-inline-table input-seq" type="text" name="" id="" value="1"></div></td>
	                                  <td>
			                                <select class="form-control input-inline-table input-contact-type">
		                                            
		                                            	<option></option>
		                                            	<option></option>
		                                            
                                            </select>
                                      </td>
	                                  <td><div class='text-inline-table'>ZCIZID</div></td>
	                                  <td>
			                                <select class="form-control input-inline-table input-contact-selecttype">
		                                            
		                                            	<option>Is Null</option>
		                                            	<option> = </option>
		                                            	<option>Between</option>
		                                            
                                            </select>
                                      </td>
	                                  <td><div class='text-inline-table'><input class="form-control input-inline-table input-seq" type="text" name="" id="" value="1"></div></td>
	                                  <td><div class='text-inline-table'><input class="form-control input-inline-table input-seq" type="text" name="" id="" value="1"></div></td>
	                                  <td><div class='text-inline-table'><i class="fa fa-times font-management"></i></div></td>
	                         	 </tr>
	                         	 <tr>
	                                  <td><div class='text-inline-table'><input class="form-control input-inline-table input-seq" type="text" name="" id="" value="1"></div></td>
	                                  <td>
			                                <select class="form-control input-inline-table input-contact-type">
		                                            
		                                            	<option>or</option>
		                                            	<option>and </option>
		                                            
                                            </select>
                                      </td>
	                                  <td><div class='text-inline-table'>ZCIZID</div></td>
	                                  <td>
			                                <select class="form-control input-inline-table input-contact-selecttype">
		                                            
		                                            	<option>Is Null</option>
		                                            	<option> = </option>
		                                            	<option>Between</option>
		                                            
                                            </select>
                                      </td>
	                                  <td><div class='text-inline-table'><input class="form-control input-inline-table input-seq" type="text" name="" id="" value="1"></div></td>
	                                  <td><div class='text-inline-table'><input class="form-control input-inline-table input-seq" type="text" name="" id="" value="1"></div></td>
	                                  <td><div class='text-inline-table'><i class="fa fa-times font-management"></i></div></td>
	                         	 </tr>
	                         	 <tr>
	                                  <td><div class='text-inline-table'><input class="form-control input-inline-table input-seq" type="text" name="" id="" value="1"></div></td>
	                                  <td>
			                                <select class="form-control input-inline-table input-contact-type">
		                                            
		                                            	<option>or</option>
		                                            	<option>and </option>

		                                            
                                            </select>
                                      </td>
	                                  <td><div class='text-inline-table'>ZCIZID</div></td>
	                                   <td>
			                                <select class="form-control input-inline-table input-contact-selecttype">
		                                            
		                                            	<option>Is Null</option>
		                                            	<option> = </option>
		                                            	<option>Between</option>
		                                            
                                            </select>
                                      </td>
	                                  <td><div class='text-inline-table'><input class="form-control input-inline-table input-seq" type="text" name="" id="" value="1"></div></td>
	                                  <td><div class='text-inline-table'><input class="form-control input-inline-table input-seq" type="text" name="" id="" value="1"></div></td>
	                                  <td><div class='text-inline-table'><i class="fa fa-times font-management"></i></div></td>
	                         	 </tr> 
	                         	 <tr>
	                                  <td><div class='text-inline-table'><input class="form-control input-inline-table input-seq" type="text" name="" id="" value="1"></div></td>
	                                  <td>
			                                <select class="form-control input-inline-table input-contact-type">
		                                            
		                                            	<option>or</option>
		                                            	<option>and</option>
		                                            
                                            </select>
                                      </td>
	                                  <td><div class='text-inline-table'>เลขบัตรประชาชนที่เป็น 1 หรือค่าว่างต้องอายัต 123</div></td>
	                                  <td>
			                                <select class="form-control input-inline-table input-contact-selecttype">
		                                            
		                                            	<option>Is Null</option>
		                                            	<option> = </option>
		                                            	<option>Between</option>
		                                            
                                            </select>
                                      </td>
	                                  <td><div class='text-inline-table'><input class="form-control input-inline-table input-seq" type="text" name="" id="" value="1"></div></td>
	                                  <td><div class='text-inline-table'><input class="form-control input-inline-table input-seq" type="text" name="" id="" value="1"></div></td>
	                                  <td><div class='text-inline-table'><i class="fa fa-times font-management"></i></div></td>
	                         	 </tr>       
     						</tbody>
     				 </table>
     			</div>
                

                <!-- form start -->
                <!-- content end -->
            </div>
            <div class="modal-footer">
                <button data-dismiss="modal" class="btn btn-white" type="button">Cancel</button>
                <button class="btn btn-primary" type="button">Save</button>
            </div>
        </div>
    </div>
</div>  
<!-- Condition End -->                     


    <!-- Mainly scripts -->
    <script src="js/jquery-2.1.1.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

    <!-- Custom and plugin javascript -->
    <script src="js/inspinia.js"></script>
    <script src="js/plugins/pace/pace.min.js"></script>
    
    <script src="Controller/cGradeManagement.js"></script>




   


</body>

</html>
