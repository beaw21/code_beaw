<?php
require_once '../includes/objectManikins.inc.php';

if(!isset($_POST) || (is_array($_POST) && count($_POST) == 0))
{
    $post_data = file_get_contents("php://input");
    $_POST = json_decode($post_data,true);
}

if($_POST['CMD'])
{
	if($_POST['CMD']=="DATA-CLEAR")
	{
		$manikins = new Manikins;
		$Process= $manikins->clearValue();
	}
	else
	{
		$Process['Error']=1;
		$Process['ErrorMessage']="command fail " . $_POST['CMD'] ;
	}
}
else
{
	$Process['Error']=1;
	$Process['ErrorMessage']="Unknow Command";
}


if(isset($_POST['CMD']))
{
    if($_POST['CMD']=="GET-ALL-CALCULATE-DATA")
    {
        $manikins = new Manikins;
        $AvgDepth = $manikins->getAvgDepth();
        $Frequency= $manikins->getFrequency();
        $PushRate = $manikins->getPushRate();
        $Pressure = $manikins->getPressure();

        $Process = array(
            'Error' => 0,
            'frequency' => $Frequency,
            'avgDepth' => $AvgDepth,
            'pushRate' => $PushRate,
            'pressure' => $Pressure,
        );
    }
    else
    {
        $Process['Error']=1;
        $Process['ErrorMessage']="command fail " . $_POST['CMD'] ;
    }
    
}
else
{
    $Process['Error']=1;
    $Process['ErrorMessage']="Unknow Command";
}
echo json_encode($Process);

?>
