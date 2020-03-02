<?php
require_once '../includes/Connectdb.inc.php';
class Data extends Database
{
	public function getListData($last = null)
	{
		$data=new Database;
		$last="1";
		$sql="call getListData($last)";
		if($data->query($sql))
		{
			$numRow=$data->CountRows();
			for($i=1;$i<=$numRow;$i++)
			{
				$arr=$i-1;
				$data['pushFast'][$arr]=$Data->ReadDataSeek($i,"pushFast");
				
			}
			$Process['Error']=0;
			$Process['data']=$data;
			$Process['numRow']=$numRow;
		}
		else
		{
			$Process['Error']=1;
			$Process['sql']=$sql;
			$Process['ErrorMessage']="Error get list data pushFast";
		}
		return $Process;
	}
	
}
?>