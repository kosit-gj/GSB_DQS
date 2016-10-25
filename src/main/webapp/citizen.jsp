<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Citizen</title>

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/plugins/iCheck/custom.css">
    <link rel="stylesheet" href="css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css">
    <link href="font-awesome/css/font-awesome.css" rel="stylesheet">
    <link href="css/animate.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <link href="css/gsbMain.css" rel="stylesheet">
    <link href="css/citizen.css" rel="stylesheet">

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
				        <h2><i class="fa fa fa-pencil-square-o icon-title"></i>ข้อมูลทะเบียนราฏษร์</h2>
				        <ol class="breadcrumb">
				            <li>
				                <a href="#">Home</a>
				            </li>
				            <li>
				               System Management
				            </li>
				             <li class="active">
				                <strong>ข้อมูลทะเบียนราฏษร์</strong>
				            </li>
				        </ol>
				    </div>
				</div>
				<div class="row"><!-- start--row -->

                    <div class="col-lg-12">
                        <div class="ibox float-e-margins">
                            <div class="ibox-title">
                                <h5>Advance Seach </h5>
         					</div>
         					
         						<div class="ibox-content"> 
         							<div class="row">
	                                    <div class="col-sm-3 m-b-xs">
		                                    <select class="input form-control">
		                                    	<option>No.</option>
												<option>Type02</option>
												<option>Type03</option>
											</select>
										</div>
										
										<div class="col-sm-4 m-b-xs">            
											<input class="form-control" placeholder="NPID" type="text" id="" name="">		
										</div>
                                  		
	                                    <div class="col-sm-3 m-b-xs">
		                                    <select class="input form-control">
		                                    	<option>FLAG</option>
												<option>Type02</option>
												<option>Type03</option>
											</select>
										</div>
                                    
                                     	 <div class="col-sm-2" align="right">
	                                     	<div class="input-group" >
		                                     	<div >
	                                         		<button type="button" class="btn btn-info" id=""><i class="fa fa-search"></i>&nbsp;Search</button>
	                                         	</div>
                                         	</div>
                                     	</div>
                             		</div>
				         		</div><!-- content end -->
				         		</div>
				         		<div class="row">
				         		<div class="col-lg-12">
					         	<div class="ibox-title">
	                                <h5>Rule List </h5>
	         					</div>
	         					
	         					
	         					<div class="ibox-content"> 

         							<div class="row">
         								<div class="col-sm-9">
	                                    	
                                     	</div>
                                    
                                     	<div class="col-sm-3">
	                                    	<div class="input-group"><input type="text" placeholder="Search" class="input-sm form-control"> <span class="input-group-btn">
                                        	<button type="button" class="btn btn-sm btn-primary"> Go!</button> </span></div>
                                     	</div>
                                     	<br><br>
         							</div>
         							
         							<div class="row">
                                    	<div class="col-sm-9 m-b-xs">

											<div class="btn-group">
						                        <button class="btn btn-white" type="button"><i class="fa fa-chevron-left"></i></button>
						                        <button class="btn btn-white active">1</button>
						                        <button class="btn btn-white">2</button>
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
                                    	</div> <!-- end row -->
                                    	<!-- start table ////////////////////////////////////////////////-->
                                    	<div class="table-responsive">
                                   		<table class="table table-striped">
                                        <thead>
                                        <tr>
                                            <th>CIF NO.</th>
                                            <th>ID </th>
                                            <th>Title</th>
                                            <th>Name</th>
                                            <th>Lastname</th>
                                            <th>Date of Birth</th>
                                            <th>Sex</th>	
                                            <th>Manage</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>1234567891234</td>
                                            <td>00001</td>
                                            <td>นาย</td>
                                            <td>ดีใจ</td>
                                            <td>จริงจริงเล้ย</td>
                                            <td>29/12/2023</td>
                                            <td>ชาย</td>
                                            <td>
												<i class="fa fa-cog font-gear" id="popover-edit-del"  data-html="true" data-toggle="popover" data-placement="top" data-content="<button class='btn btn-warning btn-xs' data-target=#editModalRule data-toggle='modal'>Edit</button>&nbsp;<button class='btn btn-danger btn-xs'>Delete</button>"></i>
                                            </td>
                                        </tr>
                                          
                                        <!-- ////// -->
                                        <tr>
                                            <td>1234567891234</td>
                                            <td>00002</td>
                                            <td>นาย</td>
                                            <td>ดีใจ</td>
                                            <td>จริงจริงเล้ย</td>
                                            <td>29/12/2023</td>
                                            <td>ชาย</td>
                                            <td>
												<i class="fa fa-cog font-gear" id="popover-edit-del"  data-html="true" data-toggle="popover" data-placement="top" data-content="<button class='btn btn-warning btn-xs' data-target=#editModalRule data-toggle='modal'>Edit</button>&nbsp;<button class='btn btn-danger btn-xs'>Delete</button>"></i>
                                            </td>
                                        </tr>
                                        <!-- ////// -->
                                        <tr>
                                            <td>1234567891234</td>
                                            <td>00003</td>
                                            <td>นาย</td>
                                            <td>ดีใจ</td>
                                            <td>จริงจริงเล้ย</td>
                                            <td>29/12/2023</td>
                                            <td>ชาย</td>
                                            <td>
												<i class="fa fa-cog font-gear" id="popover-edit-del"  data-html="true" data-toggle="popover" data-placement="top" data-content="<button class='btn btn-warning btn-xs' data-target=#editModalRule data-toggle='modal'>Edit</button>&nbsp;<button class='btn btn-danger btn-xs'>Delete</button>"></i>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>1234567891234</td>
                                            <td>00004</td>
                                            <td>นาย</td>
                                            <td>ดีใจ</td>
                                            <td>จริงจริงเล้ย</td>
                                            <td>29/12/2023</td>
                                            <td>ชาย</td>
                                            <td>
												<i class="fa fa-cog font-gear" id="popover-edit-del"  data-html="true" data-toggle="popover" data-placement="top" data-content="<button class='btn btn-warning btn-xs' data-target=#editModalRule data-toggle='modal'>Edit</button>&nbsp;<button class='btn btn-danger btn-xs'>Delete</button>"></i>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>1234567891234</td>
                                            <td>00005</td>
                                            <td>นาย</td>
                                            <td>ดีใจ</td>
                                            <td>จริงจริงเล้ย</td>
                                            <td>29/12/2023</td>
                                            <td>ชาย</td>
                                            <td>
												<i class="fa fa-cog font-gear" id="popover-edit-del"  data-html="true" data-toggle="popover" data-placement="top" data-content="<button class='btn btn-warning btn-xs' data-target=#editModalRule data-toggle='modal'>Edit</button>&nbsp;<button class='btn btn-danger btn-xs'>Delete</button>"></i>
                                            </td>
                                        </tr> 	
                                        
                                        </tbody>
                                        </table>
                                        </div>
                                        
                                    	<!-- end table //////////////////////////////////////////////////-->
                                    	
                                	<!-- footer paging start -->
                                
                                 <div class="row">
                                    <div class="col-sm-9 m-b-xs">
 
										<div class="btn-group">
					                        <button class="btn btn-white" type="button"><i class="fa fa-chevron-left"></i></button>
					                        <button class="btn btn-white active">1</button>
					                        <button class="btn btn-white ">2</button>
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
                                	
         						</div><!-- content end -->
         					</div>
         					</div>
         				</div>
	
         			</div><!-- end--row -->
         		</div>	<!-- container end -->
         			
         	</div> 
         	<br>
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

  <div aria-hidden="true" role="dialog" tabindex="-1" id="editModalRule" class="modal inmodal" style="display: none;">
    <div class="modal-dialog">
    <div class="modal-content animated bounceInRight">
            <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                <!-- <i class="fa fa-laptop modal-icon"></i> -->
                <h4 class="modal-title">Edit File</h4>
                <!-- 
                <small class="font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
                 -->
            </div>
            <div class="modal-body">
                <!-- content start -->
                <h2><i class="fa fa fa-folder-open icon-title"></i> EDIT FILE</h2>
                <hr>
                
                <!-- form start -->
                <div class='form-file-mangement'>
	                <div class="form-label-citizen">
	                
	                	CIFNO  
	                </div>
	                
	                <div class="form-input-citizen">
	                
	                	<input type="text" class="form-control" placeholder="">
	                </div>
	                <br style="clear:both">
                </div>
                
                <div class='form-file-mangement'>
	                <div class="form-label-citizen">
	                
	                	NPID
	                </div>
	                
	                <div class="form-input-citizen">
	                
	                	<input type="text" class="form-control" placeholder="">
	                </div>
	                <br style="clear:both">
                </div>
                
                <div class='form-file-mangement'>
                
	                <div class="form-label-citizen">
	                
	                	NTTITLE
	                </div>
	                
	                <div class="form-input-citizen-title">
	                
	                	<input type="text" class="form-control" placeholder="">
	                </div>
	                <br style="clear:both">
                </div>
             
                <div class='form-file-mangement'>
	                <div class="form-label-citizen">
	                
	                	NFNAME
	                </div>
	                
	                <div class="form-input-citizen">
	                
	                	<input type="text" class="form-control" placeholder="">
	                </div>
	                <br style="clear:both">
                </div>
                
                <div class='form-file-mangement'>
	                <div class="form-label-citizen">
	                
	                	NLNAME
	                </div>
	                
	                <div class="form-input-citizen">
	                
	                	<input type="text" class="form-control" placeholder="">
	                </div>
	                <br style="clear:both">
                </div>
                
                
                <div class="row">
               
                <div class="col-lg-12">
	                <div class="form-label-citizen-manual">
		               		NDOB
		                </div>
		                
	                <div class="col-lg-2">
		                <div class='form-file-mangement-radio'>
		        
			                <div class="input-inline-table-citizen">
			                	
				           		<select class="form-control input-inline-table-citizen input-contact-citizen">
		                           <option>01</option>
		                           <option>02</option>
		                           <option>03</option>
		                        </select>
		                        
			                       
			                </div>
			                
			                <br style="clear:both">
		                </div>
	                </div>
	                
	                <div class="col-lg-3">
		                <div class='form-file-mangement-radio'>
		        
			                <div class="input-inline-table-citizen">
			                	
				           		<select class="form-control input-inline-table-citizen ">
		                           <option>มกราคม</option>
		                           <option>กันยายน</option>
		                           <option>ธันวาคม</option>
		                           
		                        </select>
		                        
			                </div>
			                
			                <br style="clear:both">
		                </div>
	                </div>
	                
	                <div class="col-lg-2">
		                <div class='form-file-mangement-radio'>
		        
			                <div class="input-inline-table-citizen">
			                	
				           		<select class="form-control input-inline-table-citizen input-contact-citizen">
		                           <option>2559</option>
		                           <option>2560</option>
		                           <option>2561</option>
		                        </select>
		                        
			                       
			                </div>
			                
			                <br style="clear:both">
		                </div>
	                </div>
              	</div>  
          
                
                </div>
                <div class='form-file-mangement-radio'>
	                <div class="form-label-citizen">
	                	NSEX
	                </div>
	                
	                <div class="input-inline-table-citizen">
	                	
		                	<div class="radio radio-info radio-inline">
                               <input type="radio" checked name="radioInline" value="option1" id="inlineRadio1">
                               <label for="inlineRadio1"> ชาย </label>
                           </div>
                           
                           <div class="radio radio-inline">
                              <input type="radio" name="radioInline" value="option2" id="inlineRadio2">
                              <label for="inlineRadio2"> หญิง </label>
                          </div>
	                       
	                </div>
	                
	                <br style="clear:both">
                </div>
                
                <div class='form-file-mangement'>
	                <div class="form-label-citizen">
	                
	                	HNO
	                </div>
	                
	                <div class="form-input-citizen-address">
	                
	                	<input type="text" class="form-control" placeholder="">
	                </div>
	                <br style="clear:both">
                </div>
                
                <div class='form-file-mangement'>
	                <div class="form-label-citizen">
	                
	                	MOO
	                </div>
	                
	                <div class="form-input-citizen-address">
	                
	                	<input type="text" class="form-control" placeholder="">
	                </div>
	                <br style="clear:both">
                </div>
                
                <div class='form-file-mangement'>
	                <div class="form-label-citizen">
	                
	                	TROK
	                </div>
	                
	                <div class="form-input-citizen-address">
	                
	                	<input type="text" class="form-control" placeholder="">
	                </div>
	                <br style="clear:both">
                </div>
                
                <div class='form-file-mangement'>
	                <div class="form-label-citizen">
	                
	                	SOI
	                </div>
	                
	                <div class="form-input-citizen-address">
	                
	                	<input type="text" class="form-control" placeholder="">
	                </div>
	                <br style="clear:both">
                </div>
                <div class='form-file-mangement'>
	                <div class="form-label-citizen">
	                
	                	THANON
	                </div>
	                
	                <div class="form-input-citizen-address">
	                
	                	<input type="text" class="form-control" placeholder="">
	                </div>
	                <br style="clear:both">
                </div>
                
                <div class='form-file-mangement'>
	                <div class="form-label-citizen">
	                
	                	THUMBOL
	                </div>
	                
	                <div class="form-input-citizen">
	                
	                	<input type="text" class="form-control" placeholder="">
	                </div>
	                <br style="clear:both">
                </div>
                
                <div class='form-file-mangement'>
	                <div class="form-label-citizen">
	                
	                	AMPHUR
	                </div>
	                
	                <div class="form-input-citizen">
	                
	                	<input type="text" class="form-control" placeholder="">
	                </div>
	                <br style="clear:both">
                </div>
                
                <div class='form-file-mangement'>
	                <div class="form-label-citizen">
	                
	                	PROVINCE
	                </div>
	                
	                <div class="form-input-citizen">
	                
	                	<input type="text" class="form-control" placeholder="">
	                </div>
	                <br style="clear:both">
                </div>
                
                <div class='form-file-mangement'>
	                <div class="form-label-citizen">
	                
	                	FLAG-1
	                </div>
	                
	                <div class="form-input-citizen-address">
	                
	                	<input type="text" class="form-control" placeholder="">
	                </div>
	                <br style="clear:both">
                </div>
                
                <div class='form-file-mangement'>
	                <div class="form-label-citizen">
	                
	                FLAG-2
	                </div>
	                
	                <div class="form-input-citizen-address">
	                
	                	<input type="text" class="form-control" placeholder="">
	                </div>
	                <br style="clear:both">
                </div>
      
                
                <div class='form-file-mangement-radio'>
	                <div class="form-label-citizen"> 
	               	NATION
	                </div>
	                
	                <div class="input-inline-table-citizen">
	                	
		                	<div class="radio radio-info radio-inline">
                               <input type="radio" checked name="radioInline" value="option1" id="inlineRadio1">
                               <label for="inlineRadio1"> คนไทย </label>
                           </div>
                           
                           <div class="radio radio-inline">
                              <input type="radio" name="radioInline" value="option2" id="inlineRadio2">
                              <label for="inlineRadio2"> คนต่างด้าว </label>
                          </div>
	                       
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
<!-- Modal End Edit -->



 <!-- Mainly scripts -->
    <script src="js/jquery-2.1.1.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

    <!-- Custom and plugin javascript -->
    <script src="js/inspinia.js"></script>
    <script src="js/plugins/pace/pace.min.js"></script>

    <!-- Flot -->
    <script src="js/plugins/flot/jquery.flot.js"></script>
    <script src="js/plugins/flot/jquery.flot.tooltip.min.js"></script>
    <script src="js/plugins/flot/jquery.flot.resize.js"></script>

    <!-- ChartJS-->
    <script src="js/plugins/chartJs/Chart.min.js"></script>

    <!-- Peity -->
    <script src="js/plugins/peity/jquery.peity.min.js"></script>
    <!-- Peity demo -->
    <script src="js/demo/peity-demo.js"></script>


    <script>
        $(document).ready(function() {


            var d1 = [[1262304000000, 6], [1264982400000, 3057], [1267401600000, 20434], [1270080000000, 31982], [1272672000000, 26602], [1275350400000, 27826], [1277942400000, 24302], [1280620800000, 24237], [1283299200000, 21004], [1285891200000, 12144], [1288569600000, 10577], [1291161600000, 10295]];
            var d2 = [[1262304000000, 5], [1264982400000, 200], [1267401600000, 1605], [1270080000000, 6129], [1272672000000, 11643], [1275350400000, 19055], [1277942400000, 30062], [1280620800000, 39197], [1283299200000, 37000], [1285891200000, 27000], [1288569600000, 21000], [1291161600000, 17000]];

            var data1 = [
                { label: "Data 1", data: d1, color: '#17a084'},
                { label: "Data 2", data: d2, color: '#127e68' }
            ];
            $.plot($("#flot-chart1"), data1, {
                xaxis: {
                    tickDecimals: 0
                },
                series: {
                    lines: {
                        show: true,
                        fill: true,
                        fillColor: {
                            colors: [{
                                opacity: 1
                            }, {
                                opacity: 1
                            }]
                        },
                    },
                    points: {
                        width: 0.1,
                        show: false
                    },
                },
                grid: {
                    show: false,
                    borderWidth: 0
                },
                legend: {
                    show: false,
                }
            });

            var lineData = {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "Example dataset",
                        fillColor: "rgba(220,220,220,0.5)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: [65, 59, 40, 51, 36, 25, 40]
                    },
                    {
                        label: "Example dataset",
                        fillColor: "rgba(26,179,148,0.5)",
                        strokeColor: "rgba(26,179,148,0.7)",
                        pointColor: "rgba(26,179,148,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(26,179,148,1)",
                        data: [48, 48, 60, 39, 56, 37, 30]
                    }
                ]
            };

            var lineOptions = {
                scaleShowGridLines: true,
                scaleGridLineColor: "rgba(0,0,0,.05)",
                scaleGridLineWidth: 1,
                bezierCurve: true,
                bezierCurveTension: 0.4,
                pointDot: true,
                pointDotRadius: 4,
                pointDotStrokeWidth: 1,
                pointHitDetectionRadius: 20,
                datasetStroke: true,
                datasetStrokeWidth: 2,
                datasetFill: true,
                responsive: true,
            };


            var ctx = document.getElementById("lineChart").getContext("2d");
            var myNewChart = new Chart(ctx).Line(lineData, lineOptions);
            
            
            
            $(function () {
            	  $("#popover-edit-del").popover()
            })

        });
    </script>
</body>