<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Region | Management</title>

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/plugins/iCheck/custom.css">
    <link rel="stylesheet" href="css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css">
    <link href="font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="css/animate.css" rel="stylesheet">
    
    
    
    
    
    <link href="css/style.css" rel="stylesheet">
    <link href="css/gsbMain.css" rel="stylesheet">
    <link href="css/region_management.css" rel="stylesheet">


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
				        <h2><i class="fa fa fa-folder-open icon-title"></i> Region Management</h2>
				        <ol class="breadcrumb">
				            <li>
				                <a href="#">Home</a>
				            </li>
				            <li>
				               System Management
				            </li>
				             <li class="active">
				                <strong>Region Management</strong>
				            </li>
				        </ol>
				    </div>
				   
				</div>
				 
	
				
				

				
                <div class="row">

                    <div class="col-lg-12">
                        <div class="ibox float-e-margins">
                            <div class="ibox-title">
                                <h5>Region List </h5>
                                
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
                                    <div class="col-sm-9 m-b-xs">
                                    
                                    
                                    
                                    <button type="button" class="btn btn-info " data-target="#addModal" data-toggle="modal"><i class="fa fa-save"></i>&nbsp;Add New Regional Office</button>
                                    
                                    
                                    </div>
                                    
                                     <div class="col-sm-3">
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
                                            <th>Regional Office Name </th>
                                            <th>Branch Operation </th>
                                            <th>Manage</th>
                                            
                                        </tr>
                                        </thead>
                                        <tbody>
                                        
	                                        <tr>
	                                            <td><div class='text-inline-table'>1</div></td>
	                                            <td><div class='text-inline-table'>Regional Office Name 1 </div></td>
	                                            <td><div class='text-inline-table'>Branch Operation 1</div></td>
	                                            <td><div class='text-inline-table'> <i class="fa fa-gear font-management" data-html="true" data-container="body" data-toggle="popover" data-placement="top" 
                                    data-content="<button class='btn btn-warning btn-xs edit-action' type='button'>Edit</button> <button class='btn btn-danger btn-xs' type='button'>Delete</button>"></i></div></td>                
	                                        </tr>
	                                        
	                                        <tr>
	                                            <td><div class='text-inline-table'>2</div></td>
	                                            <td><div class='text-inline-table'>Regional Office Name 2 </div></td>
	                                            <td><div class='text-inline-table'>Branch Operation 2</div></td>
	                                            <td><div class='text-inline-table'> <i class="fa fa-gear font-management"></i></div></td>                
	                                        </tr>
	                                        
	                                        <tr>
	                                            <td><div class='text-inline-table'>3</div></td>
	                                            <td><div class='text-inline-table'>Regional Office Name 3 </div></td>
	                                            <td><div class='text-inline-table'>Branch Operation 3</div></td>
	                                            <td><div class='text-inline-table'> <i class="fa fa-gear font-management"></i></div></td>                
	                                        </tr>
	                                        
	                                        <tr>
	                                            <td><div class='text-inline-table'>4</div></td>
	                                            <td><div class='text-inline-table'>Regional Office Name 4 </div></td>
	                                            <td><div class='text-inline-table'>Branch Operation 4</div></td>
	                                            <td><div class='text-inline-table'> <i class="fa fa-gear font-management"></i></div></td>                
	                                        </tr>
	                                        
	                                        <tr>
	                                            <td><div class='text-inline-table'>5</div></td>
	                                            <td><div class='text-inline-table'>Regional Office Name 5 </div></td>
	                                            <td><div class='text-inline-table'>Branch Operation 5</div></td>
	                                            <td><div class='text-inline-table'> <i class="fa fa-gear font-management"></i></div></td>                
	                                        </tr>
	                                        
	                                        <tr>
	                                            <td><div class='text-inline-table'>6</div></td>
	                                            <td><div class='text-inline-table'>Regional Office Name 6 </div></td>
	                                            <td><div class='text-inline-table'>Branch Operation 6</div></td>
	                                            <td><div class='text-inline-table'> <i class="fa fa-gear font-management"></i></div></td>                
	                                        </tr>
	                                        
	                                        <tr>
	                                            <td><div class='text-inline-table'>7</div></td>
	                                            <td><div class='text-inline-table'>Regional Office Name 7 </div></td>
	                                            <td><div class='text-inline-table'>Branch Operation 7</div></td>
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




<!-- Modal Start -->

  <div aria-hidden="true" role="dialog" tabindex="-1" id="addModal" class="modal inmodal" style="display: none;">
    <div class="modal-dialog">
    <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                <!-- <i class="fa fa-laptop modal-icon"></i> -->
                <h4 class="modal-title">Add Regional Office</h4>
                <!-- 
                <small class="font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                 -->
            </div>
            <div class="modal-body">
                <!-- content start -->
                <h2><i class="fa fa fa-folder-open icon-title"></i> ADD REGIONAL OFFICE</h2>
                <hr>
                
                <!-- form start -->
                <div class='form-region-mangement'>
	                <div class="form-region-label">
	                
	                 Regional Office Name 
	                </div>
	                
	                <div class="form-region-input">
	                
	                	<input type="text" class="form-control" placeholder="">
	                </div>
	                <br style="clear:both">
                </div>
                
                <div class='form-region-mangement'>
	                <div class="form-region-label">
	                
	                Branch Operation
	                </div>
	                
	                <div class="form-region-input">
	                
	                	
	                	
	                	<select class="form-control" >
	                		<option>Branch Operation1</option>
	                		<option>Branch Operation2</option>
	                		<option>Branch Operation3</option>
	                	</select>
	                	
	                </div>
	                <br style="clear:both">
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
                            
<!-- Modal End -->
<!-- Modal Start -->

  <div aria-hidden="true" role="dialog" tabindex="-1" id="editModal" class="modal inmodal" style="display: none;">
    <div class="modal-dialog">
    <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                <!-- <i class="fa fa-laptop modal-icon"></i> -->
                <h4 class="modal-title">Edit Regional Office</h4>
                <!-- 
                <small class="font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                 -->
            </div>
            <div class="modal-body">
                <!-- content start -->
                <h2><i class="fa fa fa-folder-open icon-title"></i>  EDIT REGIONAL OFFICE</h2>
                <hr>
                
                
               <!-- form start -->
                <div class='form-region-mangement'>
	                <div class="form-region-label">
	                
	                 Regional Office Name 
	                </div>
	                
	                <div class="form-region-input">
	                
	                	<input type="text" class="form-control" placeholder="">
	                </div>
	                <br style="clear:both">
                </div>
                
                <div class='form-region-mangement'>
	                <div class="form-region-label">
	                
	                Branch Operation
	                </div>
	                
	                <div class="form-region-input">
	                
	                	
	                	
	                	<select class="form-control" >
	                		<option>Branch Operation1</option>
	                		<option>Branch Operation2</option>
	                		<option>Branch Operation3</option>
	                	</select>
	                	
	                </div>
	                <br style="clear:both">
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
                            
<!-- Modal End -->


    <!-- Mainly scripts -->
    <script src="js/jquery-2.1.1.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

    <!-- Custom and plugin javascript -->
    <script src="js/inspinia.js"></script>
    <script src="js/plugins/pace/pace.min.js"></script>
    
    <script src="Controller/cRegionManagement.js"></script>




   


</body>

</html>
