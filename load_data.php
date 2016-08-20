<?php

 	// header('content-type: application/json; charset=utf-8');
  //   header("access-control-allow-origin: *");
  //   header('Access-Control-Allow-Credentials: true');
  //   header('Access-Control-Allow-Methods: GET, POST');
  //   header('Access-Control-Max-Age: 604800');
  //   header('Access-Control-Allow-Headers : Content-Type, Accept, Authorization, X-Requested-With');
// require_once 'database.php';
// $connect = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
// if(!empty($_GET['q']))
// {
// 	// echo $_GET['q'];
// 	$uniqueTag=$_GET['q'];
// 	// var_dump($uniqueTag);
// 	// die();
// 	$query="SELECT * from blog where uniqueTag='$uniqueTag'";
// 	if($result=$connect->query($query))
// 	{
// 		if($result->num_rows>0)
// 		{
// 			$row=$result->fetch_assoc();
// 			$row['topics']=unserialize($row['topics']);
// 			$row=json_encode($row);
// 			// var_dump($row);
// 			// die();
// 			echo $row;
// 		}
// 		else
// 		{
// 			die("Invalid URL");
// 		}
// 	}
// 	else
// 	{
// 		die("Invalid URL");
// 	}
// }

$uri="mongodb://ankitjain28:9463@ds021994.mlab.com:21994/ncsblog";

if(!empty($_GET['q']))
{
	$data=$_GET['q'];
	$find=array('uniqueTag' => $data );

	// $m = new Mongo(); 	// Default localhost
	$options = array("connectTimeoutMS" => 30000, "replicaSet" => "replicaSetName");
	$m=new Mongo($uri);
	// var_dump($m);

	$db=$m->ncsblog;
	$collection=$db->blog;
	$cursor=$collection->findone($find);
	echo json_encode($cursor);
	// var_dump(json_encode($cursor));
}



?>
