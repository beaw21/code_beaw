<?php
require_once $_SERVER['HOME'].'/public_html/includes/Connectdb.inc.php';
class Data extends Database
{
	public function addData($data)
	{

		$tmp=(string)$data;
		$db=new Database;
		$sql='call aed.addValue("' . $tmp . '")';
		if(!$db->query($sql))
		{
			echo "error>>>>>$data<<<<<<";
		}
	}
}