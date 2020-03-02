let StatCalculateInitialize = function ()
{
	const preProcess = () => {
		if (typeof(Worker) !== "undefined") {
			// console.log('Yes! Web worker support!');

			let calculateWorker;

			if (typeof(calculateWorker) == "undefined") {
				calculateWorker = new Worker('/js/performance/calculate_worker.js');
			}

			calculateWorker.onmessage = function(event) {
				set_calculate_data(event.data);
			};

		} else {
			console.log('Sorry! No Web Worker support..')
		}
	};

	function set_calculate_data({frequency,avgDepth,pushRate,pressure})
	{
		// console.log(frequency,avgDepth,pushRate,pressure);
		$('#averageDepth1').html(avgDepth);
		$('#averageSpeed1').html(frequency);
		$('#releaseHands1').html(pushRate);
		$('#resuscitation1').html(pressure);
	}
	return {
		init: function ()
		{
			preProcess();
		}
	};
}();

$(document).ready(function()
{
	$(document).on("click","#startTest",function()
	{
		startTest();
	});
});
function startTest()
{
	console.log("clear Data");
	clear();
}
function clear ()
{
	$.ajax
	({
		  url: "process/objectManikinsProcess.php",
		  method: "POST",
		  data: 
		  {
			  CMD: "DATA-CLEAR"
		  }
        ,async:false
        ,success: function( result ) 
        {
        	console.log( result );
        	console.log(obj);
        	if(obj.Error==0)
        	{
        		$("#startTest").reset(obj.data.clearValue);  		
        	}
        	else
        	{
        		console.log("Error: clearValue" + obj.ErrorMessage);
        	}
        },
        error : function(jqXHR, textStatus, errorThrown)
        {
        	console.log("Error Clear")
        }
	}); //end ajax
}
0
jQuery(document).ready(function ()
{
	StatCalculateInitialize.init()
});


$(document).ready( function()
{
	setInterval("show();",3000);
});
function show()
{

	// ===== frequency ====
	$.ajax
	({
		  url: "process/objectManikinsProcess.php",
		  method: "POST",
		  data: 
		  {
			  CMD: "GET-FREQUENCY"
		  }
        ,async:false
        ,success: function( result ) 
        {
        	console.log( result );
        	obj=jQuery.parseJSON(result); // แปลง JSON เป็น Array
        	console.log(obj.data);
        	if(obj.Error==0)
        	{
        		$("#averageSpeed1").html(obj.data.Frequency); 
        	}
        	else
        	{
        		console.log("Error: " + obj.ErrorMessage);
        	}
        },
        error : function(jqXHR, textStatus, errorThrown)
        {
        	console.log("Error print")
        }
	}); //end ajax
	
	//=== 
	$.ajax
	({
		  url: "process/objectManikinsProcess.php",
		  method: "POST",
		  data: 
		  {
			  CMD: "GET-DEPTH"
		  }
        ,async:false
        ,success: function( result ) 
        {
        	console.log( result );
        	obj=jQuery.parseJSON(result); // แปลง JSON เป็น Array
        	console.log(obj.data);
        	if(obj.Error==0)
        	{
        		$("#averageDepth1").html(obj.data.avgDepth); // show1 เป็น ID 

        	}
        	else
        	{
        		console.log("Error: " + obj.ErrorMessage);
        	}
        },
        error : function(jqXHR, textStatus, errorThrown)
        {
        	console.log("Error print")
        }
	}); //end ajax
	
	//=== 
	$.ajax
	({
		  url: "process/objectManikinsProcess.php",
		  method: "POST",
		  data: 
		  {
			  CMD: "GET-PUSHRATE" //ปล่อยมือ
		  }
        ,async:false
        ,success: function( result ) 
        {
        	console.log( result );
        	obj=jQuery.parseJSON(result); // แปลง JSON เป็น Array
        	console.log(obj.data);
        	if(obj.Error==0)
        	{
        		$("#releaseHands1").html(obj.data.pushRate); // show1 เป็น ID 

        	}
        	else
        	{
        		console.log("Error: " + obj.ErrorMessage);
        	}
        },
        error : function(jqXHR, textStatus, errorThrown)
        {
        	console.log("Error print")
        }
	}); //end ajax
	
	//=== 
	$.ajax
	({
		  url: "process/objectManikinsProcess.php",
		  method: "POST",
		  data: 
		  {
			  CMD: "GET-PRESSURE" //ช่วยหายใจ
		  }
        ,async:false
        ,success: function( result ) 
        {
        	console.log( result );
        	obj=jQuery.parseJSON(result); // แปลง JSON เป็น Array
        	console.log(obj.data);
        	if(obj.Error==0)
        	{
        		$("#resuscitation1").html(obj.data.Pressure); // show1 เป็น ID 

        	}
        	else
        	{
        		console.log("Error: " + obj.ErrorMessage);
        	}
        },
        error : function(jqXHR, textStatus, errorThrown)
        {
        	console.log("Error print")
        }
	}); //end ajax

}

 
