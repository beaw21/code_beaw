<?php
require_once '../includes/graph.inc.php';

/*
if(isset($_POST['CMD']))
{
	if($_POST['CMD']=="GET-GRAPH")
	{
		$graph = new Graph ;
		$Process = $graph ->getGraph();
	}
}
else
{
	$Process['Error']=1;
	$Process['ErrorMessage']="Unknow Command";
}
*/
$graph = new Graph ;
$TimeStamp = $_POST['TimeStamp'] ?? date("Y-m-d H:i:s").'.000000';
$Process=$graph->getListData($TimeStamp);

echo json_encode($Process);

?>
