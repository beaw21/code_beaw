<?php
class Database
{
	public $Result;
	private $ServerName="localhost";
	private $DB_Name="aed";
	private $Username="db@aed.ibsx.net";
	private $Password="aedPassWord";
	
	function __construct()
	{
		$this->connectdb($this->ServerName,$this->Username,$this->Password,$this->DB_Name);
	}
	public function connectdb($ServerName,$Username,$Password,$DB_Name)
	{
		$this->conn=mysqli_init();
		// Create connection
		$this->conn->options(MYSQLI_OPT_CONNECT_TIMEOUT, 5);
		$this->conn->real_connect($ServerName,$Username,$Password,$DB_Name);
		// Check connection
		if ($this->conn->connect_error)
		{
			die("Connection failed: " . $this->conn->connect_error);
		}
		else
		{
			$this->conn->set_charset("UTF8");
		}
		//echo "Connected successfully" . "<br>";
	}
	public function CountField()
	{
		return $this->result->field_count;
	}
	public function CountRows()
	{
		return $this->result->num_rows;
	}
	
	
	public function FieldName($index)
	{
		$obj=$this->result->fetch_field_direct($index-1);
		return $obj->name;
	}
	
	
	public function ReadDataSeek($Row,$Col = null)
	{
		$this->result->data_seek($Row-1);
		if($Col==null)
		{
			$Data=$this->result->fetch_row();
		}
		else
		{
			//check col is number? 
			if(is_numeric($Col))
			{
				$row=$this->result->fetch_row();
				$Data=$row[$Col-1];
			}
			else
			{
				$row=$this->result->fetch_row();
				$numfield=$this->CountField();
				for($i=1;$i<=$numfield;$i++)
				{
					//echo FieldName(0);
					//echo FieldName(1);
					if($this->FieldName($i) == $Col)
					{
						$Data=$row[$i-1];
					}
				}
			}
		}
		/* fetch row */
		return $Data;
	}
	
	public function select($sql)
	{
		if ($this->Result = $this->conn->query($sql))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	public function query($sql)
	{
		if($this->result = $this->conn->query($sql))
		{
			return true;
		}
		else
		{	
			return false;
		}
	}
}
?>
