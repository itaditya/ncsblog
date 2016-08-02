<?php
// require 'database.php';
// $connect = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
// // var_dump($_REQUEST['q']);
// if(isset($_REQUEST['q']))
// {
// 	$data=json_decode($_REQUEST['q']);
// 	var_dump($data);
// 	$pgname=$data->pagename;
// 	$image=$data->author->image;
// 	$name=$data->author->name;
// 	$title=$data->author->title;
// 	$unique=$data->uniqueTag;
// 	$topics=$data->topics;
// 	$topics=serialize($topics);
// 	$content=$data->content;
// 	$query="SELECT * from blog where uniqueTag='$unique'";
// 	if($result=$connect->query($query))
// 	{
// 		if($result->num_rows>0)
// 		{
// 			echo "Please Input Unique Tag";
// 		}
// 		else
// 		{
// 			$query="INSERT into blog values(null,'$pgname','$image','$name','$title','$unique','$topics','$content')";
// 			if($result=$connect->query($query))
// 			{
// 				echo "True";
// 			}
// 			else
// 			{
// 				echo "False";
// 			}
// 		}
// 	}
	
// }

$uri="mongodb://ankitjain28:9463@ds021994.mlab.com:21994/ncsblog";

if(isset($_REQUEST['q']))
{
	$data=json_decode($_REQUEST['q']);

	// $m = new Mongo(); 	// Default localhost

	$options = array("connectTimeoutMS" => 30000, "replicaSet" => "replicaSetName");
	$m=new MongoClient($uri,$options);


	$db=$m->ncsblog; 	//"Database mydb selected";

	$collection = $db->createCollection("blog"); 	// Collection blog is created

	$collection->insert($data);
	echo 'Done';
}


?>