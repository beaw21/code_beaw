<?php
require_once $_SERVER['HOME'].'/public_html/includes/getData.inc.php';
function getData($data)
{
	$db = new Data;
	$db->addData($data);
} 
getData($argv[1]);
?>