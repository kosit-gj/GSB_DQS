<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Import | Export</title>

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/plugins/iCheck/custom.css">
    <link rel="stylesheet" href="css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css">
    <link href="font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="css/animate.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <link href="css/gsbMain.css" rel="stylesheet">
   	<link href="css/import_export.css" rel="stylesheet">
   	
   	<!-- Mainly scripts -->
    <script src="js/jquery-2.1.1.js"></script>
    <script src="js/bootstrap.min.js"></script>

</head>
<body class="top-navigation import-export-content">
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
				        <h2><i class="fa fa fa-pencil-square-o icon-title"></i>Import/Export</h2>
				        <ol class="breadcrumb">
				            <li>
				                <a href="#">Home</a>
				            </li>
				            <li>
				               System Management
				            </li>
				             <li class="active">
				                <strong>Import/Export</strong>
				            </li>
				        </ol>
				    </div>
				</div>
				<div class="row"><!-- start--row -->

                    <div class="col-lg-12">
                        <div class="ibox float-e-margins">
                       
					         	<div class="ibox-title">
	                                <h5>Import/Export</h5>
	         					</div>
	         					
	         					<div class="ibox-content"> 
	         						<div class="tabs-container">
	         						
	         						
					                      <div class="row">
					                      
						                    <div class="tabs-container" id="import-export-tabs">
						                        <ul class="nav nav-tabs">
						                            <li class="active"><a data-toggle="tab" href="#tab-1" aria-expanded="false"><FONT COLOR=gray>ข้อมูลทะเบียนราษฎร์</FONT></a></li>
						                            <li class=""><a data-toggle="tab" href="#tab-2" aria-expanded="true"><FONT COLOR=gray>เบอร์โทรศัพท์ที่ส่ง SMS</FONT></a></li>
						                        </ul>
						                        <div class="tab-content">
						                            <div id="tab-1" class="tab-pane fade in active">
						                            
						                                <div class="panel-body">
						                                
						                                    <h3>FILE EXPORT</h3><br>
						                                    <p>เลือกข้อมูลลูกค้าที่ท่านต้องการ Export เพื่อนำข้อมูลไปครวจสอบกับทะเบียนราษฏร์</p>
						                                   
						                                    
								                          	<div class="row">
								                          	<div class="col-sm-12 m-b-xs"> 
								                          	<div class="radio"> 
								                              <input type="radio" name="" value="" id="">
								                              <label for="inlineRadio2">ข้อมูลลูกค้าทั้งหมด</label>
								                          	</div>
								                          	
									                          	<div class="label-import-export">
									                          	<label for="selectboxyear">ระบุปี&nbsp;</label>
								                                    <select class="form-control-sm m-b">
								                                    	<option>2559</option>
																		<option>2560</option>
																		<option>2561</option>
																	</select>
																	&nbsp;&nbsp;
																	<label for="selectboxyear">ประเภทลูกค้า&nbsp;</label>
								                                    <select class="form-control-sm m-b">
								                                    	<option>บุคคล</option>
																		<option>นิติบุคคล</option>
																		<option>ไม่เป็นบุคคล</option>
																	</select>
																</div>
															</div>
															</div>
								                          	
								                          	<div class="row">
								                          	<div class="col-sm-12 m-b-xs"> 
									                          	<div class="radio"> 
									                              <input type="radio" name="" value="" id="">
									                              <label for="inlineRadio2">ข้อมูลลูกใหม่ หรือลูกค้าที่มาติดต่อล่าสุด หรือข้อมูลลูกค้าที่แก้ไขบัตรประชาชน</label>
									                          	</div>
																<div class="label-import-export">
																	<label for="selectboxyear">ประเภทลูกค้า&nbsp;</label>
								                                    <select class="form-control-sm m-b">
								                                    	<option>บุคคล</option>
																		<option>นิติบุคคล</option>
																		<option>ไม่เป็นบุคคล</option>
																	</select>
																</div>
															</div>
														 </div>
														
														 <button class="btn btn-primary">Export</button>
														 <!-- END EXPORT -->
														 <br>
														 <br>
														 <hr> 
														 
						                                <h3>FILE IMPORT</h3>
						                                <h6>Browse Files from you computer (Maximum size: 10 MB)</h6>
						                                	<input id="uploadFile" placeholder="Choose File" disabled="disabled"/>
															<div class="fileUpload btn btn-primary">
															    <span>Browse File</span>
															    
															    <input id="btn-upload" type="file" class="upload"/>
															</div>
															<h6>
																Filename-1<font color=red>.txt</font>&nbsp;&nbsp;&nbsp;
																Filename-2<font color=red>.txt</font>&nbsp;&nbsp;&nbsp;
																Filename-3<font color=red>.txt</font>&nbsp;&nbsp;&nbsp;
															</h6>
															<br>
															<h6 class="label-content-import-export"><button class="btn btn-primary">Import</button> &nbsp;
																<strong>Note</strong> : Data size should de less 10MB
															</h6>
						                                </div>
						                                <!-- end body -->
						                            </div>
						                            <div id="tab-2" class="tab-pane fade">
						                                <div class="panel-body">
						                                	<div class="row">
						                                		<div class="col-sm-6 m-b-xs"> 
								                                    <h3>FILE EXPORT</h3>
								                                    <p>ทำการ Export ข้อมูลเบอร์โทรศัพท์ที่มีข้อมูลถูกต้องทั้งหมด</p>
								                                    <br>
								                                    <button class="btn btn-primary">Export</button>
							                                    </div>
							                                    <div class="col-sm-6 m-b-xs"> 
							                                    	<label>เงื่อนไขในการ Export ข้อมูล (Query)</label><br>
								                                    <textarea name="" id="export-inputdata" class="form-control"></textarea>
							                                    </div>
						                                 	</div>
						                                 
														 <br>
														 <hr>
						                                 	<h3>FILE IMPORT</h3>
						                                	<h6>Browse Files from you computer (Maximum size: 10 MB)</h6>
						                                	<input id="uploadFile" placeholder="Choose File" disabled="disabled"/>
															<div class="fileUpload btn btn-primary">
															    <span>Browse File</span>
															    
															    <input id="btn-upload" type="file" class="upload"/>
															</div>
															<h6>
																Filename-1<font color=red>.txt</font>&nbsp;&nbsp;&nbsp;
																Filename-2<font color=red>.txt</font>&nbsp;&nbsp;&nbsp;
																Filename-3<font color=red>.txt</font>&nbsp;&nbsp;&nbsp;
															</h6>
															<br>
															<h6 class="label-content-import-export"><button class="btn btn-primary">Import</button> &nbsp;
																<strong>Note</strong> : Data size should de less 10MB
															</h6>
						                                </div>
						                                <!-- end body -->
						                            </div>
						                        </div>	
						                    </div>
					               		</div>
					               		
					               		
                    				</div>
								</div>
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
	
</body>