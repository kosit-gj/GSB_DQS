<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Role | Management</title>

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/plugins/iCheck/custom.css">
    <link rel="stylesheet" href="css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css">
    <link href="font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="css/animate.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <link href="css/gsbMain.css" rel="stylesheet">
   	<link href="css/rolemanagement.css" rel="stylesheet">
	
	
</head>
<body class="top-navigation">
	<div id="wrapper">
		<div id="page-wrapper" class="gray-bg">
		
        <div class="row border-bottom pink-bg" >
        <nav class="navbar navbar-static-top" role="navigation"><!-- nav header start -->
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
                            </button> <span class='fullName'>Apiwat Tongsukmak </span> 
                    </li>
                </ul>
            </div>
            
            </div> <!-- container end -->  
			
         </nav><!-- nav header end --> 
         </div>
         
          <div class="wrapper wrapper-content">
            <div class="container"><!-- container start -->  
         
         		<div class="row wrapper border-bottom  page-heading">
				    <div class="col-lg-12">
				        <h2><i class="fa fa fa-pencil-square-o icon-title"></i> Role Management</h2>
				        <ol class="breadcrumb">
				            <li>
				                <a href="#">Home</a>
				            </li>
				            <li>
				               System Management
				            </li>
				             <li class="active">
				                <strong>Role Management</strong>
				            </li>
				        </ol>
				    </div>
				</div>
				<div class="row"><!-- start--row -->

                    <div class="col-lg-12">
                        <div class="ibox float-e-margins">
                       
					         	<div class="ibox-title">
	                                <h5>Role List </h5>
	         					</div>
	         					
	         					<div class="ibox-content"> 

         							<div class="row">
         							
         								<div class="col-sm-9 m-b-xs">
	                                   		<button type="button" class="btn btn-info" id="btnAddRole" data-target="#addModalRole" data-toggle="modal"><i class="fa fa-plus-square"></i>&nbsp;Add New Rule</button>	                                    	
	                                    </div>
                                    
                                     	<div class="col-sm-3">
	                                    	<div class="input-group"><input type="text" placeholder="Search" id="searchText" name="searchText" class="input-sm form-control"> 
		                                    	<span class="input-group-btn">
	                                        		<button type="button" id="btnSearch"  class="btn btn-sm btn-primary">&nbsp;<i class="fa fa-search"></i>&nbsp;</button> 
	                                        	</span>
                                        	</div>
                                     	</div>
                                     	
         							</div>
         							
                                    	<!-- start table ////////////////////////////////////////////////-->
                                    	<div class="table-responsive">
                                   		<table class="table table-striped">
                                        <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Role Name</th>
                                            <th>Authorize</th>
                                            <th align="center">Manage</th>
                                        </tr>
                                        </thead>
                                        <tbody id="listRole">
                                        <tr>
                                            <td>1</td>
                                            <td>Administrator</td>
                                            <td><i class="fa fa-paste font-setseeuser" data-target="#ModalRoleAuthorize" data-toggle="modal"></i></td>  
                                            <td>
												<i class="fa fa-cog font-gear" id="popover-edit-del"  data-html="true" data-toggle="popover" data-placement="top" data-content="<button class='btn btn-warning btn-xs' data-target=#editModalRole data-toggle='modal'>Edit</button>&nbsp;<button class='btn btn-danger btn-xs'>Delete</button>"></i>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Deployed</td>
                                            <td><i class="fa fa-paste font-setseeuser" data-target="#ModalRoleAuthorize" data-toggle="modal"></i></td> 
                                            <td>
												<i class="fa fa-cog font-gear" id="popover-edit-del"  data-html="true" data-toggle="popover" data-placement="top" data-content="<button class='btn btn-warning btn-xs' data-target=#editModalRole data-toggle='modal'>Edit</button>&nbsp;<button class='btn btn-danger btn-xs'>Delete</button>"></i>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Monitor</td>
                                            <td><i class="fa fa-paste font-setseeuser" data-target="#ModalRoleAuthorize" data-toggle="modal"></i></td>  
                                            <td>
												<i class="fa fa-cog font-gear" id="popover-edit-del"  data-html="true" data-toggle="popover" data-placement="top" data-content="<button class='btn btn-warning btn-xs' data-target=#editModalRole data-toggle='modal'>Edit</button>&nbsp;<button class='btn btn-danger btn-xs'>Delete</button>"></i>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>Oparator</td>
                                            <td><i class="fa fa-paste font-setseeuser" data-target="#ModalRoleAuthorize" data-toggle="modal"></i></td>  
                                            <td>
												<i class="fa fa-cog font-gear" id="popover-edit-del"  data-html="true" data-toggle="popover" data-placement="top" data-content="<button class='btn btn-warning btn-xs' data-target=#editModalRole data-toggle='modal'>Edit</button>&nbsp;<button class='btn btn-danger btn-xs'>Delete</button>"></i>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>Power User</td>
                                            <td><i class="fa fa-paste font-setseeuser" data-target="#ModalRoleAuthorize" data-toggle="modal"></i></td>
                                            <td>
												<i class="fa fa-cog font-gear" id="popover-edit-del"  data-html="true" data-toggle="popover" data-placement="top" data-content="<button class='btn btn-warning btn-xs' data-target=#editModalRole data-toggle='modal'>Edit</button>&nbsp;<button class='btn btn-danger btn-xs'>Delete</button>"></i>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td>User</td>
                                            <td><i class="fa fa-paste font-setseeuser" data-target="#ModalRoleAuthorize" data-toggle="modal"></i></td> 
                                            <td>
												<i class="fa fa-cog font-gear" id="popover-edit-del"  data-html="true" data-toggle="popover" data-placement="top" data-content="<button class='btn btn-warning btn-xs' data-target=#editModalRole data-toggle='modal'>Edit</button>&nbsp;<button class='btn btn-danger btn-xs'>Delete</button>"></i>
                                            </td>
                                        </tr>
                                        
                                        
                                        </tbody>
                                        </table>
                                        </div>
                                        
                                    	<!-- end table //////////////////////////////////////////////////-->
                                	
         						</div><!-- content end -->
         					</div>
         				</div>
	
         			</div><!-- end--row -->
         		</div>	<!-- container end -->
         	</div> 
         	
         	<div class="footer">
				<div class="pull-right">
					11GB of <strong>250GB</strong> Free.
				</div>
				<div>
					<strong>Copyright</strong> Example Company &copy; 2014-2015
				</div>
			</div>
			
		</div>  
	</div><!-- sum content -->
	
<!-- Modal Start Edit -->

  <div aria-hidden="true" role="dialog" tabindex="-1" id="editModalRole" class="modal inmodal" style="display: none;">
    <div class="modal-dialog">
    <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                <!-- <i class="fa fa-laptop modal-icon"></i> -->
                <h4 class="modal-title">Edit Role</h4>
                <!-- 
                <small class="font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                 -->
            </div>
            <div class="modal-body">
                <!-- content start -->
                <h2><i class="fa fa fa-folder-open icon-title"></i>EDIT ROLE</h2>
                <hr>
                
                <!-- form start -->
                <div class='form-file-mangement'>
	                <div class="form-label-role">
	                	Rule Name
	                </div>
	                
	                <div class="form-input-role">
	                	<input type="text" class="form-control" placeholder="" id="role_name_edit" name="role_name_edit">
	                </div>
	                
	                <br style="clear:both">
	                
                </div>
            </div>
            <div class="modal-footer">
                <button data-dismiss="modal" class="btn btn-white btnCancle" type="button">Cancel</button>
                <button class="btn btn-primary" type="button" id="btnSubmitEdit" name="btnSubmitEdit">Save</button>
            </div>
        </div>
    </div>
</div>                      
                 
<!-- Modal End Edit -->
	
<!-- Modal Start -->
  <div aria-hidden="true" role="dialog" tabindex="-1" id="addModalRole" class="modal inmodal" style="display: none;">
    <div class="modal-dialog">
    <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                <!-- <i class="fa fa-laptop modal-icon"></i> -->
                <h4 class="modal-title">Add New Role</h4>
                <!-- 
                <small class="font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                 -->
            </div>
            <div class="modal-body">
                <!-- content start -->
                <h2><i class="fa fa fa-folder-open icon-title"></i> ADD NEW ROLE</h2>
                <hr>
                
                <!-- form start -->
                <div class='form-file-mangement'>
	                <div class="form-label-role">
	                	Rule Name
	                </div>
	                
	                <div class="form-input-role">
	                	<input type="text" class="form-control" placeholder="" id="role_name" name="role_name">
	                </div>
	                
	                <br style="clear:both">
	                
                </div>
            </div>
            <div class="modal-footer">
            	<input type="hidden" name="id" id="id" value="">
   				<input type="hidden" name="action" id="action" value="add">
   				
                <button data-dismiss="modal" class="btn btn-white btnCancle"  type="button">Cancel</button>
                <button class="btn btn-primary" type="button" id="btnSubmit" name="btnSubmit">Save</button>
            </div>
        </div>
    </div>
</div>                      
<!-- Modal End -->

<!-- ModalAuthorize Start -->
  <div aria-hidden="true" role="dialog" tabindex="-1" id="ModalRoleAuthorize" class="modal inmodal" style="display: none;">
    <div class="modal-dialog">
    <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                <!-- <i class="fa fa-laptop modal-icon"></i> -->
                <h4 class="modal-title">Authorize</h4>
               
            </div>
            <div class="modal-body">
                <!-- content start -->
                <h2><i class="fa fa fa-folder-open icon-title"></i>AUTHORIZE</h2>
                <hr>
                
                <!-- form start -->
                <div class='form-file-mangement'>
	                <div class="form-label-role">
	                	Role : Oparator
	                </div>
                </div>
                
                <div class="table-responsive">
                   <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>Menu</th> 
                            </tr>
                        </thead>
                        <tbody id="listMenu">
                            <tr>
                                <td><input id="" type="checkbox"></td>
                                <td>Branch_Management</td>
                            </tr>
                            <tr>
                                <td><input id="" type="checkbox"></td>
                                <td>Data_Quality_Monitoring</td>
                            </tr>
                            <tr>
                                <td><input id="" type="checkbox"></td>
                                <td>File_Management</td>
                            </tr>
                            <tr>
                                <td><input id="" type="checkbox"></td>
                                <td>Gread_Management</td>
                            </tr>
                            <tr>
                                <td><input id="" type="checkbox"></td>
                                <td>Import_Export</td>
                            </tr>
                            <tr>
                                <td><input id="" type="checkbox"></td>
                                <td>KPI_Calculation</td>
                            </tr>
                            <tr>
                                <td><input id="" type="checkbox"></td>
                                <td>Region_Management</td>
                            </tr>
                            <tr>
                                <td><input id="" type="checkbox"></td>
                                <td>Role_Management</td>
                            </tr>
                            <tr>
                                <td><input id="" type="checkbox"></td>
                                <td>Rule_Management</td>
                            </tr>
                            <tr>
                                <td><input id="" type="checkbox"></td>
                                <td>System_Configuration</td>
                            </tr>
                            <tr>
                                <td><input id="" type="checkbox"></td>
                                <td>User_Management</td>
                            </tr>
                        </tbody>
                    </table>
                
            </div>
            <div class="modal-footer">
                <button data-dismiss="modal" class="btn btn-white btnCancle" type="button">Cancel</button>
                <button class="btn btn-primary" type="button">Save</button>
            </div>
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


	<script src="Controller/cRoleManagement.js"></script> 
	
    
</body>