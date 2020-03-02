let StatGraphInitialize = function ()
{
    var dps =[] ;
    var dataPointsUpper = [{ x: 0, y: lineRed},{ x:100, y:lineRed}];
    var dataPointsLower = [{ x: 0, y: lineNormal},{ x:100, y:lineNormal}];
    var lineRed=6;
    var lineNormal=5;

    const preProcess = () => {

        if (typeof(Worker) !== "undefined") {
            // console.log('Yes! Web worker support!');

            let dataWorker;

            if (typeof(dataWorker) == "undefined") {
                dataWorker = new Worker('/js/performance/graph_worker.js');
            }

            dataWorker.onmessage = function(event) {
                // console.log(event.data);
                // dps.push({ x: xNum, y: parseFloat(event.data.data.Distance[0]) });
                //console.log(dps);
                let found;
                event.data.payload.forEach(function(element) {

                    found = dps.find((findElement) => {
                        return findElement.timeStamp === element.TimeStamp;
                    });

                    if(found === undefined || found === 'undefined') {
                        xNum++;
                        dataPointsUpper.push({ x: xNum , y: lineRed });
                        dataPointsLower.push({ x: xNum,  y: lineNormal});
                        dps.push({ x: xNum, y: parseFloat(element.Distance < 0.3 ? 0 : element.Distance),'timeStamp':element.TimeStamp });

                        if (dps.length > 60) {
                            dps.shift();
                            dataPointsUpper.shift();
                            dataPointsLower.shift();
                        }
                    }
                });

                chart.render();
            };

        } else {
            console.log('Sorry! No Web Worker support..')
        }
    };



    var chart = new CanvasJS.Chart
    (
        "chartContainer",
        {
            exportEnabled: true,
            backgroundColor: "#313030",
            legend :
                {
                    horizontalAlign : "right"
                },
            axisX :
                {
                    labelFontColor: false,
                    lineThickness: false,
                    tickColor: false,
                },
            axisY:
                {
                    includeZero: false,
                    gridColor: false ,
                    tickColor: false,
                    tickMarkColor : false,
                    drawOnChartArea : false,
                    labelFontColor: false,
                    lineThickness: false,
                },
            data:
                [{
                    type: "spline",
                    dataPoints: dataPointsUpper , //เส้นแดง ห้ามเกินนี้     deltay1
                    markerColor : "#c45850" ,
                    markerSize: 0,
                    lineColor:"#c45850",
                    lineThickness : 4
                },
                {
                    type: "spline",
                    dataPoints: dataPointsLower,   //เส้นเขียว    deltay2
                    markerColor : "#3cba9f" ,
                    markerSize: 0,
                    lineColor:"#3cba9f",
                    lineThickness : 4
                },
                {
                    type: "line",
                    markerSize: 2,
                    markerColor : "#3e95cd" ,
                    dataPoints: dps ,
                    lineColor:"#3e95cd",
                    lineThickness : 4

                }]
        }
    );

    var xNum = 0;
    var xVal = 0;
    var yVal = 0;
    var updateInterval = 1;


    return {
        init: function ()
        {
            chart.render();
            preProcess();
        }
    }
}();

jQuery(document).ready(function ()
{
    StatGraphInitialize.init()
});

function update_chart() {
    
}

function showGraph()
{
	//=== 
	$.ajax
	({
		  url: "process/graphProcess.php",
		  method: "POST",
		  data: 
		  {
			  CMD: "GET-GRAPH"
		  }
	    ,async:false
	    ,success: function( result ) 
	    {
	    	console.log( result );
	    	obj=jQuery.parseJSON(result); // แปลง JSON เป็น Array
	    	console.log(obj.data);
	    	if(obj.Error==0)
	    	{
	    		$("#graph1").html(obj.data.graph); // show1 เป็น ID 

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
