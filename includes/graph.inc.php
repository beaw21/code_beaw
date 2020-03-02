<?php
require_once '../includes/Connectdb.inc.php';
class Graph extends Database
{
	public function getListData($last = null)
	{
		$graph=new Database;
		$last="1";
		$sql="call getListData($last)";
		if($graph->query($sql))
		{
			$numRow=$graph->CountRows();
			for($i=1;$i<=$numRow;$i++)
			{
				$arr=$i-1;
				$data['Distance'][$arr]=$graph->ReadDataSeek($i,"Distance");
				$data['Pressure'][$arr]=$graph->ReadDataSeek($i,"Pressure");
				$data['TimeStamp'][$arr]=$graph->ReadDataSeek($i,"TimeStamp");
			}
			$Process['Error']=0;
			$Process['data']=$data;
			$Process['numRow']=$numRow;
		}
		else 
		{
			$Process['Error']=1;
			$Process['sql']=$sql;
			$Process['ErrorMessage']="Error get list data";
		}
		return $Process;
	}
	
}
?>