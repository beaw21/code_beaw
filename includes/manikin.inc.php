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
				$data['Wifi_Contig'][$arr]=$graph->ReadDataSeek($i, "Wifi_Contig");
				$data['Mix_Address'][$arr]=$graph->ReadDataSeek($i, "Mix_Address");
				$data['AIminikin_id'][$arr]=$graph->ReadDataSeek($i,"AIminikin_id");
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