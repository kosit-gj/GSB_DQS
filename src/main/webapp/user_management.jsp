<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>User | Management</title>

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/plugins/iCheck/custom.css">
    <link rel="stylesheet" href="css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css">
    <link href="font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="css/animate.css" rel="stylesheet">
    
    
    
    
    
    <link href="css/style.css" rel="stylesheet">
     <link href="css/gsbMain.css" rel="stylesheet">
     <link href="css/user_management.css" rel="stylesheet">
     


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
				        <h2><i class="fa fa fa-pencil-square-o icon-title"></i>User Management</h2>       
				        <ol class="breadcrumb">
				            <li>
				                <a href="#">Home</a>
				            </li>
				            <li>
				               System Management
				            </li>
				             <li class="active">
				                <strong>User Management</strong>
				            </li>
				        </ol>
				    </div>
				   
				</div>
                
				<div class="row">
                    <div class="col-lg-12">
                        <div class="ibox float-e-margins">
                        
                           <div class="ibox-title">
                                <h5>Advance Search</h5>
                            </div>
                            <div class="ibox-content">
                            	 <div class="row">
                            	 
                                    <div class="col-sm-2">
 												
										<input class="form-control" id="" placeholder="Personnel ID">
									</div>
									<div class="col-sm-2">
										<input class="form-control" id="" placeholder="Own CostCenter">
									</div>
									<div class="col-sm-2">
										<input class="form-control" id="" placeholder="Revised CostCenter">
									</div>
									<div class="col-sm-2">
										<select class="input form-control" id="listRole">
				                              <option value="">Role</option>
				                              <option></option>
	                                    </select>
	                                </div>
	                                <div class="col-sm-2">
				                        <select class="form-control">
				                              <option>Is Active</option>
				                              <option>20</option>
				                        </select>
									</div>
                                     <div class="col-sm-2" align="right">	                                
                                         <button type="button" class="btn btn-info"><i class="fa fa-search"></i>&nbsp;&nbsp;Search</button>
                                     </div>
                             	</div>
                             	<br>
                            </div>
                            
                            </div>
                       </div>
                   </div>
                            
                            
                            
                            
                  <div class="row">
                    <div class="col-lg-12">
                        <div class="ibox float-e-margins">      
                            
                            <div class="ibox-title">
                                <h5>File List </h5>
                            </div>
                            
                            
                            <div class="ibox-content">
                            
	                             <div class="row">
	                             		<div class="col-sm-12 m-b-xs" align="right">
	                             			<button type="button" class="btn btn-info"><i class="fa fa-download"></i>&nbsp;&nbsp;Export to Excel</button>
	                             		</div>
	                             </div>
                             
	                             <div class="row">
	                                    <div class="col-sm-8 m-b-xs">
		                                    <button type="button" class="btn btn-info " id="btnEdit"><i class="fa fa-pencil-square-o"></i>&nbsp;Edit</button>
		                                    <button type="button" class="btn btn-warning " id="btnSave"><i class="fa fa-save"></i>&nbsp;Save</button>
		                                    <button type="button" class="btn btn-danger " id="btnCancel"><i class="fa fa-trash-o"></i>&nbsp;Cancel</button>
	                                    </div>
	                                     <div class="col-sm-4">
		                                     <div class="input-group"><input type="text" placeholder="Search" id="searchText" class="input-sm form-control"> <span class="input-group-btn">
	                                         <button type="button" class="btn btn-sm btn-primary" id="btnSearch">&nbsp;<i class="fa fa-search"></i></button> </span></div>
	                                     </div>
	                                     
	                                      <input type="hidden" name="id" id="id" value="">
                                    	  <input type="hidden" name="action" id="action" value="add">
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
                                    <table class="table table-striped" id="tableUser">
                                        <thead>
                                        <tr>

                                            <th>Personnel Name</th>
                                            <th>Position</th>
                                            <th>OwnCostCenter</th>
                                            <th>RevisedCostCenter</th>
                                            <th>Role</th>
                                            <th>Operation</th>
                                        </tr>
                                        </thead>
                                        <tbody id="listUser">
                                        <tr>
                                            <td><div class='text-inline-table'>Nanny Moos</div></td>
                                            <td><div class='text-inline-table'>Position</div></td>
                                            <td><div class='text-inline-table'>OCostCenter-1</div></td>
                                            <td><div class='text-inline-table'>RCostCenter-1</div></td>
                                            <td><div class='text-inline-table'>User</div></td>
                                             <td>
					                                <select class="form-control input-inline-table input-contact-selecttype">
				                                        <option>All Branch</option>
				                                        <option>line</option>   
		                                            </select>
		                                    </td> 
                                        </tr>
                                        
                                         <tr>
                                            <td><div class='text-inline-table'>Guyda Json</div></td>
                                            <td><div class='text-inline-table'>Position</div></td>
                                            <td><div class='text-inline-table'>OCostCenter-2</div></td>
                                            <td><div class='text-inline-table'>RCostCenter-2</div></td>
                                            <td><div class='text-inline-table'>Monitor</div></td> 
                                             <td>
					                                <select class="form-control input-inline-table input-contact-selecttype">
														<option>All Branch</option>
				                                        <option>line</option>  
		                                            </select>
		                                    </td>                                        
                                        </tr>
                                        
                                         <tr>
                                            <td><div class='text-inline-table'>Honna Hoos</div></td>
                                            <td><div class='text-inline-table'>Position</div></td>
                                            <td><div class='text-inline-table'>OCostCenter-3</div></td>
                                            <td><div class='text-inline-table'>RCostCenter-3</div></td>
                                            <td><div class='text-inline-table'>Branch</div></td>
                                             <td>
					                                <select class="form-control input-inline-table input-contact-selecttype">
				                                        <option>All Branch</option>
				                                        <option>line</option>
		                                            </select>
		                                    </td>                                       
                                        </tr>
                                        
                                         <tr>
                                            <td><div class='text-inline-table'>Maark Mission</div></td>
                                            <td><div class='text-inline-table'>Position</div></td>
                                            <td><div class='text-inline-table'>OCostCenter-4</div></td>
                                            <td><div class='text-inline-table'>RCostCenter-4</div></td>
                                            <td><div class='text-inline-table'>PowerUser</div></td>
                                             <td>
					                                <select class="form-control input-inline-table input-contact-selecttype">
				                                        <option>All Branch</option>
				                                        <option>line</option>
		                                            </select>
		                                    </td>                                           
                                        </tr>
                                        
                                         <tr>
                                            <td><div class='text-inline-table'>Diane Diller</div></td>
                                            <td><div class='text-inline-table'>Position</div></td>
                                            <td><div class='text-inline-table'>OCostCenter-5</div></td>
                                            <td><div class='text-inline-table'>RCostCenter-5</div></td>
                                            <td><div class='text-inline-table'>Administrator</div></td>
                                             <td>
					                                <select class="form-control input-inline-table input-contact-selecttype">
				                                        <option>All Branch</option>
				                                        <option>line</option>
		                                            </select>
		                                    </td>                                          
                                        </tr>
                                        
                                         <tr>
                                            <td><div class='text-inline-table'>Mary Maruc</div></td>
                                            <td><div class='text-inline-table'>Position</div></td>
                                            <td><div class='text-inline-table'>OCostCenter-6</div></td>
                                            <td><div class='text-inline-table'>RCostCenter-6</div></td>
                                            <td><div class='text-inline-table'>PowerUser</div></td>
                                             <td>
					                                <select class="form-control input-inline-table input-contact-selecttype">
				                                        <option>All Branch</option>
				                                        <option>line</option>
		                                            </select>
		                                    </td>                                          
                                        </tr>
                                        
                                         <tr>
                                            <td><div class='text-inline-table'>James jason</div></td>
                                            <td><div class='text-inline-table'>Position</div></td>
                                            <td><div class='text-inline-table'>OCostCenter-7</div></td>
                                            <td><div class='text-inline-table'>RCostCenter-7</div></td>
                                            <td><div class='text-inline-table'>Administrator</div></td>
                                            <td>
					                                <select class="form-control input-inline-table input-contact-selecttype">
				                                        <option>All Branch</option>
				                                        <option>line</option>
		                                            </select>
		                                    </td>                                     
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




    <!-- Mainly scripts -->
    <script src="js/jquery-2.1.1.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

    <!-- Custom and plugin javascript -->
    <script src="js/inspinia.js"></script>
    <script src="js/plugins/pace/pace.min.js"></script>

	 <script src="Controller/cUserManagement.js"></script>


</body>

</html>
