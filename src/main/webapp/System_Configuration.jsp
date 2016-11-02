<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>System | Configuration</title>

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/plugins/iCheck/custom.css">
    <link rel="stylesheet" href="css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css">
    <link href="font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="css/animate.css" rel="stylesheet">

    
    
    
    
    <link href="css/style.css" rel="stylesheet">
     <link href="css/gsbMain.css" rel="stylesheet">
	 <link href="css/system_comfiguration.css" rel="stylesheet">

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
				        <h2><i class="fa fa fa-pencil-square-o icon-title"></i>System Configuration</h2>       
				        <ol class="breadcrumb">
				            <li>
				                <a href="#">Home</a>
				            </li>
				            <li>
				               System Management
				            </li>
				             <li class="active">
				                <strong>System Configuration</strong>
				            </li>
				        </ol>
				    </div>
				   
				</div>
                
				
				<!-- Default KPI Calculation Date -->
				
				<div class="row">
                    <div class="col-lg-12">
                        <div class="ibox float-e-margins">
                        
                           <div class="ibox-title">
                                <h5>Default KPI Calculation Date</h5>
                            </div>
                            <div class="ibox-content">
                            	 <div class="row">
                            	 		<div class="col-lg-12">
											<div class="col-sm-9" >
												<label>Note :กําหนดวันในแต่ละเดือน สําหรับการคิด KPI</label>
											</div>
											<div class="col-sm-2" align="right">
												<input type="text"  class="form-control input-inline-table input-seq" value="1">
											&nbsp;&nbsp;
											</div>
											<div class="col-sm-1">
												<button class="btn btn-info btn-sm" style="padding-left:15px"><FONT COLOR=white>Set All</FONT></button>
											</div>
										</div>
									</div>

										<div class="table-responsive">
											<table class="table table-striped">
												<thead>
													<tr>
														<th>Month</th>
														<th>Days</th>
														<th>Month</th>
														<th>Days</th>
														<th>Month</th>
														<th>Days</th>
													</tr>
												</thead>
												<tbody id="listSystem">
													<tr>
														<td>
															<div class='text-inline-table'>มกราคม</div>
														</td>
														<td>
															<input class="form-control input-inline-table input-seq" type="text" name="" id="" value="1">
														</td>
														<td>
															<div class='text-inline-table'>กุมภาพันธ์</div>
														</td>
														<td>
															<input class="form-control input-inline-table input-seq" type="text" name="" id="" value="1">
														</td>
														<td>
															<div class='text-inline-table'>มีนาคม</div>
														</td>
														<td>
															<input class="form-control input-inline-table input-seq" type="text" name="" id="" value="1">
														</td>
													</tr>
													<tr>
														<td>
															<div class='text-inline-table'>เมษายน</div>
														</td>
														<td>
															<input class="form-control input-inline-table input-seq" type="text" name="" id="" value="1">
														</td>
														<td>
															<div class='text-inline-table'>พฤษภาคม</div>
														</td>
														<td>
															<input class="form-control input-inline-table input-seq" type="text" name="" id="" value="1">
														</td>
														<td>
															<div class='text-inline-table'>มิถุนายน</div>
														</td>
														<td>
															<input class="form-control input-inline-table input-seq" type="text" name="" id="" value="1">
														</td>
													</tr>
													<tr>
														<td>
															<div class='text-inline-table'>กรกฎาคม</div>
														</td>
														<td>
															<input class="form-control input-inline-table input-seq" type="text" name="" id="" value="1">
														</td>
														<td>
															<div class='text-inline-table'>สิงหาคม</div>
														</td>
														<td>
															<input class="form-control input-inline-table input-seq" type="text" name="" id="" value="1">
														</td>
														<td>
															<div class='text-inline-table'>กันยายน</div>
														</td>
														<td>
															<input class="form-control input-inline-table input-seq" type="text" name="" id="" value="1">
														</td>
													</tr>							
												</tbody>				
											</table>
									<br>
									<div align="left">
										<button class="btn btn-warning" >&nbsp;&nbsp;<i class="fa fa-save"></i>&nbsp;&nbsp;Save&nbsp;&nbsp;</button>
									</div>                             
				             	</div>
				            </div>
				     	</div>
				     </div>
				 </div>
				                 
				         
				    <!-- Exporting File   -->         
				      
				  <div class="row">
                    <div class="col-lg-12">
                        <div class="ibox float-e-margins">
                                                  
		                            <div class="ibox-title">
		                                <h5>Exporting File</h5>
		                            </div>
		                            
		                            <div class="ibox-content">
		                            
		                            	<div class="row">
	                            	 		<div class="col-lg-12">
												<div class="col-sm-3" >
													<label>Root directory &nbsp;:</label>
												</div>
												<div class="col-sm-6" align="left">
													<input class="form-control input-dataroot" id="export_file_path" placeholder="">
												</div>
											</div>
										</div>
										
										<div class="row">
	                            	 		<div class="col-lg-12">
												<div class="col-sm-3 form-data" >
													<label>Maximum record for citizen file&nbsp; :</label>
												</div>
												<div class="col-sm-1 form-data" align="left">
													<input class="form-control input-data" id="export_citizen_max_record" placeholder="">
												</div>
												<div class="col-sm-2 form-data" align="right">
													<label style="padding-left:10px">Records</label>
												</div>
												<div class="col-sm-3 form-data" align="right">
													<label>Maximum record for mobile file &nbsp;:</label>
												</div>
												<div class="col-sm-2 form-data" align="left">
													<input class="form-control input-data" id="export_mobile_max_record" placeholder="">
												</div>
												<div class="col-sm-1 form-data" align="right">
													<label style="padding-left:10px">Records</label>
												</div>
											</div>
										</div>
										
										<div class="row">
	                            	 		<div class="col-lg-12">
												<div class="col-sm-3 form-data" >
													<label>Include date in filename &nbsp;:</label>
												</div>
												<div class="col-sm-3 form-data" align="left">
													<div class="radio radio-info radio-inline">
								                               <input type="radio" checked="" name="radioInline" value="option1" id="inlineRadio1">
								                               <label for="inlineRadio1"> Yes </label>
								                    </div>
								                    <div class="radio radio-inline">
								                              <input type="radio" name="radioInline" value="option2" id="inlineRadio2">
								                              <label for="inlineRadio2"> No </label>
								                    </div>
												</div>
												<div class="col-sm-3 form-data" align="right">
													<label>Delete file older then &nbsp;:</label>
												</div>
												<div class="col-sm-2 form-data" align="left">
													<input class="form-control input-data" id="export_nof_date_delete" placeholder="">
												</div>
												<div class="col-sm-1 form-data" align="left">
													<label style="padding-left:10px">Days</label>
												</div>
											</div>
										</div><br>
										
			                             <div class="row">
											<div style="padding-left:25px">
												<button class="btn btn-warning" id="btnSubmit">&nbsp;&nbsp;<i class="fa fa-save"></i>&nbsp;&nbsp;Save&nbsp;&nbsp;</button>
											</div>
		                                </div>
		                                
		                            </div>
		                         </div>
		                      </div>
		                   </div>   
		                            
		       
		       
		      		 <!-- Importing File -->
		      		 
		         <div class="row">
                    <div class="col-lg-12">
                        <div class="ibox float-e-margins">            
	                            <div class="ibox-title">
	                                <h5>Importing File</h5>
	                            </div>
		                            <div class="ibox-content">
		                            	<div class="row">
	                            	 		<div class="col-lg-12">
												<div class="col-sm-3" >
													<label>Root directory &nbsp;:</label>
												</div>
												<div class="col-sm-6" align="left">
													<input class="form-control input-dataroot" id="" placeholder="">
												</div>
											</div>
										</div>
										
										<div class="row">
	                            	 		<div class="col-lg-12">
												<div class="col-sm-3 form-data" >
													<label>Maximum file size &nbsp; :</label>
												</div>
												<div class="col-sm-2 form-data" align="left">
													<input class="form-control input-data" id="" placeholder="">
												</div>
												<div class="col-sm-1 form-data" align="left">
													<label style="padding-left:10px">MB.</label>
												</div>
												<div class="col-sm-3 form-data" align="right">
													<label>Delete file older then &nbsp;:</label>
												</div>
												<div class="col-sm-2 form-data" align="left">
													<input class="form-control input-data" id="" placeholder="">
												</div>
												<div class="col-sm-1 form-data" align="left">
													<label style="padding-left:10px">Days</label>
												</div>
											</div>
										</div>
										
										<div class="row">
	                            	 		<div class="col-lg-12">
												<div class="col-sm-3 form-data" >
													<label>Include date in filename &nbsp;:</label>
												</div>
												<div class="col-sm-3 form-data" align="left">
													<div class="radio radio-info radio-inline">
								                               <input type="radio" checked="" name="radioInline" value="option1" id="inlineRadio1">
								                               <label for="inlineRadio1"> Yes </label>
								                    </div>
								                    <div class="radio radio-inline">
								                              <input type="radio" name="radioInline" value="option2" id="inlineRadio2">
								                              <label for="inlineRadio2"> No </label>
								                    </div>
												</div>
											</div>
										</div><br>
										
			                             <div class="row">
											<div style="padding-left:25px">
												<button class="btn btn-warning">&nbsp;&nbsp;<i class="fa fa-save"></i>&nbsp;&nbsp;Save&nbsp;&nbsp;</button>
											</div>
		                                </div>
		                                
		                            </div>
		                        </div>
		                     </div>
		                 </div>
		                     		
		      
		      
		      
		      			<!-- Warning Branch -->
		      			
		       <div class="row">
                    <div class="col-lg-12">
                    
                        <div class="ibox float-e-margins">       		
		                     	<div class="row">
		                     	
		                     		<div class="col-lg-6">
		                     			<div class="ibox-title">
		                                	<h5>Warning Branch</h5>
		                            	</div>
		                            	
			                            <div class="ibox-content">
			                            
											 <div class="row">
					                             <div class="col-lg-12">
													<div class="col-lg-7 form-data" >
														<label>#Last contact date to warning branch &nbsp;:</label>
													</div>
													<div class="col-lg-4 form-data" align="left">
														<input class="form-control input-data" id="" placeholder="">
													</div>
													<div class="col-lg-1 form-data" align="right">
														<label>Days</label>
													</div>
												</div>
											</div>	
											
											<div class="row">
												<div class="col-lg-12">
													<div class="col-lg-7 form-data" >
														<label>when no document to update data &nbsp;:</label>
													</div>
													<div class="col-lg-2 form-data" align="left">
														<label></label>
													</div>
												</div>
											</div>
											
											<div class="row">
												<div class="form-save" style="padding-left:25px">
													<button class="btn btn-warning">&nbsp;&nbsp;<i class="fa fa-save"></i>&nbsp;&nbsp;Save&nbsp;&nbsp;</button>
												</div>
											</div>
											
			                            </div>
		                     		</div>
		                     		
		                     		
		                     		<!-- Grade Calculation Date -->
		                     		
		                     		<div class="col-lg-6">
		                     			<div class="ibox-title">
		                                	<h5>Grade Calculation Date</h5>
		                            	</div>
			                            <div class="ibox-content">
			                            
				                             <div class="row">
					                             <div class="col-lg-12">
													<div class="col-lg-6 form-data" >
														<label>Grade Calculation Date &nbsp;:</label>
													</div>
													<div class="col-lg-2 form-data" align="left">
														<input class="form-control input-data" id="" placeholder="">
													</div>
												</div>
											</div>	
											
											<div class="row">
												<div class="col-lg-12">
													<div class="col-lg-6 form-data" >
														<label>Grade Calulation Source Table &nbsp;:</label>
													</div>
													<div class="col-lg-2 form-data" align="left">
														<select class="form-control input-data" id="" ></select>
													</div>
												</div>
											</div>
											
											<div class="row">
												<div class="form-save" style="padding-left:25px">
													<button class="btn btn-warning">&nbsp;&nbsp;<i class="fa fa-save"></i>&nbsp;&nbsp;Save&nbsp;&nbsp;</button>
												</div>
											</div>	
											
			                            </div>
		                     		</div>
		                     		
		                     		
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

	 <script src="Controller/cSystemConfiguration.js"></script>


</body>

</html>
